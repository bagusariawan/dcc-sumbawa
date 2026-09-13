/**
 * MAIN INTERACTIVE APPLICATION LOGIC
 * Mengelola render data, efek typewriter, filter proyek, modal detail,
 * toggle tema gelap/terang, dan widget simulasi Live Sensor-to-Database.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderHeroAndAbout();
  renderServices();
  renderDatabaseVault();
  initVaultEventListeners();
  renderProjects('all');
  renderTimeline();
  renderContact();
  initTypewriter();
  initMobileMenu();
  initScrollSpy();
  initLiveSimulator();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon text-amber-400';
  } else {
    document.documentElement.classList.remove('light-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun text-cyan-400';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-theme');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      if (themeIcon) {
        themeIcon.className = isLight 
          ? 'fa-solid fa-moon text-amber-500' 
          : 'fa-solid fa-sun text-cyan-400';
      }
    });
  }
}

/* ==========================================================================
   2. HERO & ABOUT SECTION RENDERING
   ========================================================================== */
function renderHeroAndAbout() {
  const p = portfolioData.personal;

  // Hero Texts
  const heroBadge = document.getElementById('hero-status-badge');
  if (heroBadge) heroBadge.innerText = p.status;

  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.innerText = p.name;

  const heroBio = document.getElementById('hero-bio');
  if (heroBio) heroBio.innerText = p.bio.replace(/\*\*/g, '');

  // About Bio
  const aboutBio = document.getElementById('about-bio-text');
  if (aboutBio) {
    aboutBio.innerHTML = p.bio.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400 font-semibold">$1</strong>');
  }

  // Hero Quick Links
  const heroGithub = document.getElementById('hero-github-link');
  if (heroGithub) heroGithub.href = p.github;

  const heroLinkedin = document.getElementById('hero-linkedin-link');
  if (heroLinkedin) heroLinkedin.href = p.linkedin;

  const heroWhatsapp = document.getElementById('hero-whatsapp-link');
  if (heroWhatsapp) heroWhatsapp.href = `https://wa.me/${p.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20keahlian%20Electrical%20Engineering%20dan%20Web%20Database%20Anda.`;

  // Stats Counters
  const statsContainer = document.getElementById('stats-grid');
  if (statsContainer && p.stats) {
    statsContainer.innerHTML = p.stats.map(stat => `
      <div class="circuit-card p-5 rounded-2xl text-center flex flex-col items-center justify-center border border-cyan-500/20 bg-slate-900/60 shadow-lg">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl mb-3 border border-cyan-500/30">
          <i class="${stat.icon}"></i>
        </div>
        <span class="text-3xl font-tech font-bold text-white mb-1 tracking-tight">${stat.value}</span>
        <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">${stat.label}</span>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const roles = portfolioData.personal.roles || ["Electrical Engineer", "Web Database Specialist"];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      delay = 50;
    } else {
      element.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      delay = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      delay = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   4. SERVICES SECTION
   ========================================================================== */
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container || !portfolioData.services) return;

  container.innerHTML = portfolioData.services.map(srv => `
    <div class="circuit-card p-7 rounded-2xl border border-cyan-500/20 bg-slate-900/60 hover:border-cyan-400/60 transition-all duration-300 group">
      <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-transform duration-300">
        <i class="${srv.icon}"></i>
      </div>
      <h3 class="text-xl font-tech font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">${srv.title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed">${srv.description}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   5. DATABASE BERKAS & DOKUMEN PENTING DCC SUMBAWA
   ========================================================================== */
let activeVaultFolderId = 'folder-sld';
let vaultSearchQuery = '';
let currentUploadedFileData = null;

// Helper: Format ukuran file dalam Bytes / KB / MB
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Helper: Ambil semua folder & berkas (termasuk yang ditambah user)
function getVaultFolders() {
  const baseFolders = JSON.parse(JSON.stringify(portfolioData.databaseVault.folders || []));
  
  // Custom Folders dari localStorage
  const customFoldersStr = localStorage.getItem('dcc_vault_custom_folders');
  if (customFoldersStr) {
    try {
      const customFolders = JSON.parse(customFoldersStr);
      customFolders.forEach(cf => {
        if (!baseFolders.some(f => f.id === cf.id)) {
          baseFolders.push(cf);
        }
      });
    } catch (e) {
      console.error('Error parsing custom folders:', e);
    }
  }

  // Custom Files dari localStorage
  const customFilesStr = localStorage.getItem('dcc_vault_custom_files');
  if (customFilesStr) {
    try {
      const customFiles = JSON.parse(customFilesStr);
      customFiles.forEach(cf => {
        const targetFolder = baseFolders.find(f => f.id === cf.folderId);
        if (targetFolder) {
          targetFolder.files.unshift(cf);
        }
      });
    } catch (e) {
      console.error('Error parsing custom files:', e);
    }
  }
  return baseFolders;
}

// Helper: Dapatkan ikon & styling berdasarkan tipe file
function getFileTypeMeta(type) {
  switch ((type || '').toLowerCase()) {
    case 'pdf':
      return { icon: 'fa-solid fa-file-pdf', color: 'text-red-400', bg: 'bg-red-950/60 text-red-300 border-red-800/40', label: 'PDF' };
    case 'dwg':
      return { icon: 'fa-solid fa-compass-drafting', color: 'text-blue-400', bg: 'bg-blue-950/60 text-blue-300 border-blue-800/40', label: 'DWG CAD' };
    case 'excel':
      return { icon: 'fa-solid fa-file-excel', color: 'text-emerald-400', bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40', label: 'EXCEL' };
    case 'word':
      return { icon: 'fa-solid fa-file-word', color: 'text-blue-500', bg: 'bg-blue-950/60 text-blue-300 border-blue-800/40', label: 'WORD' };
    case 'csv':
      return { icon: 'fa-solid fa-file-csv', color: 'text-emerald-300', bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40', label: 'CSV' };
    case 'sql':
      return { icon: 'fa-solid fa-database', color: 'text-cyan-400', bg: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/40', label: 'SQL DB' };
    case 'code':
      return { icon: 'fa-solid fa-file-code', color: 'text-amber-400', bg: 'bg-amber-950/60 text-amber-300 border-amber-800/40', label: 'SCRIPT' };
    case 'binary':
      return { icon: 'fa-solid fa-microchip', color: 'text-purple-400', bg: 'bg-purple-950/60 text-purple-300 border-purple-800/40', label: 'BINARY' };
    case 'image':
      return { icon: 'fa-solid fa-file-image', color: 'text-amber-300', bg: 'bg-amber-950/60 text-amber-300 border-amber-800/40', label: 'GAMBAR' };
    default:
      return { icon: 'fa-solid fa-file', color: 'text-slate-400', bg: 'bg-slate-900 text-slate-300 border-slate-700', label: 'DOC' };
  }
}

// Toast Notifikasi
function showDbToast(message) {
  const toast = document.getElementById('db-toast');
  const toastMsg = document.getElementById('db-toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 3400);
}

// Unduh Berkas (Mendukung unduh berkas asli yang diupload!)
window.downloadVaultFile = function(fileId) {
  const folders = getVaultFolders();
  let foundFile = null;
  for (const f of folders) {
    const item = f.files.find(fi => fi.id === fileId);
    if (item) { foundFile = item; break; }
  }
  if (!foundFile) return;

  // Jika berkas asli diupload pengguna dan memiliki data payload
  if (foundFile.fileData) {
    const a = document.createElement('a');
    a.href = foundFile.fileData;
    a.download = foundFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showDbToast(`Mengunduh berkas asli: ${foundFile.name}`);
  } else {
    // Berkas demo sistem
    const dummyContent = `=======================================================\n` +
      `DCC SUMBAWA - DISTRIBUTION CONTROL CENTER & DATABASE\n` +
      `Berkas: ${foundFile.name}\n` +
      `Tipe: ${(foundFile.type || 'DOC').toUpperCase()}\n` +
      `Diunduh pada: ${new Date().toLocaleString('id-ID')}\n` +
      `Status Dokumen: TERVERIFIKASI & TERENKRIPSI DI DATABASE\n` +
      `=======================================================\n\n` +
      `Dokumen resmi ini merupakan arsip sistem tenaga listrik DCC Sumbawa.\n` +
      `Deskripsi: ${foundFile.desc || '-'}\n` +
      `Versi: ${foundFile.version || 'v1.0'}\n` +
      `Isi berkas telah tersimpan secara aman di database server terpusat.`;

    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = foundFile.name.includes('.') ? foundFile.name : `${foundFile.name}.${foundFile.type || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showDbToast(`Memulai pengunduhan: ${foundFile.name}`);
  }
};

// Render Seluruh Komponen Database Vault
function renderDatabaseVault() {
  const folders = getVaultFolders();
  const foldersContainer = document.getElementById('db-folders-container');
  const filesTbody = document.getElementById('db-files-tbody');
  const activeFolderTitle = document.getElementById('active-folder-title');
  const activeFolderDesc = document.getElementById('active-folder-desc');
  const activeFolderIcon = document.getElementById('active-folder-icon');
  const activeFolderCount = document.getElementById('active-folder-count');
  const emptyState = document.getElementById('db-empty-state');
  const storageStat = document.getElementById('db-storage-stat');

  if (!foldersContainer || !filesTbody) return;

  // Hitung total berkas
  let totalFileCount = 0;
  folders.forEach(f => totalFileCount += f.files.length);
  if (storageStat && portfolioData.databaseVault) {
    storageStat.innerText = `${totalFileCount} Berkas | ${portfolioData.databaseVault.usedStorage} / ${portfolioData.databaseVault.totalStorage}`;
  }

  // Cari folder aktif
  const currentFolder = folders.find(f => f.id === activeVaultFolderId) || folders[0];

  // Sinkronisasi opsi dropdown folder pada modal upload
  const folderSelect = document.getElementById('add-file-folder');
  if (folderSelect) {
    const prevSelected = folderSelect.value;
    folderSelect.innerHTML = folders.map(f => `
      <option value="${f.id}">📁 ${f.name}</option>
    `).join('');
    if (prevSelected && folders.some(f => f.id === prevSelected)) {
      folderSelect.value = prevSelected;
    } else {
      folderSelect.value = currentFolder.id;
    }
  }

  // 1. Render Folder List (Kiri)
  foldersContainer.innerHTML = folders.map(f => {
    const isActive = f.id === currentFolder.id && vaultSearchQuery.trim() === '';
    return `
      <div onclick="selectVaultFolder('${f.id}')" class="circuit-card p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${isActive ? 'border-cyan-400 bg-slate-950/90 shadow-[0_0_20px_rgba(0,242,254,0.25)]' : 'border-cyan-500/20 bg-slate-900/60 hover:border-cyan-500/50'}">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5">
            <i class="${f.icon} ${f.color} text-lg"></i>
            <span class="text-sm font-tech font-bold ${isActive ? 'text-cyan-300' : 'text-white'}">${f.name}</span>
          </div>
          <span class="text-[11px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}">
            ${f.files.length}
          </span>
        </div>
        <p class="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">${f.description}</p>
      </div>
    `;
  }).join('') + `
    <button onclick="createNewVaultFolder()" class="w-full py-3 px-4 rounded-2xl border border-dashed border-cyan-500/40 text-xs font-tech font-bold text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 mt-2">
      <i class="fa-solid fa-folder-plus text-sm"></i>
      <span>+ Buat Folder Baru</span>
    </button>
  `;

  // 2. Filter Berkas berdasarkan Folder & Pencarian
  let visibleFiles = [];
  if (vaultSearchQuery.trim() !== '') {
    const q = vaultSearchQuery.toLowerCase();
    folders.forEach(f => {
      f.files.forEach(file => {
        const matchName = (file.name || '').toLowerCase().includes(q);
        const matchDesc = (file.desc || '').toLowerCase().includes(q);
        const matchTags = file.tags && file.tags.some(t => t.toLowerCase().includes(q));
        if (matchName || matchDesc || matchTags) {
          visibleFiles.push({ ...file, folderName: f.name });
        }
      });
    });

    if (activeFolderTitle) activeFolderTitle.innerText = `Hasil Pencarian: "${vaultSearchQuery}"`;
    if (activeFolderDesc) activeFolderDesc.innerText = `Menampilkan berkas di seluruh folder yang cocok dengan kata kunci.`;
    if (activeFolderIcon) activeFolderIcon.innerHTML = `<i class="fa-solid fa-magnifying-glass text-cyan-400 text-base"></i>`;
    if (activeFolderCount) activeFolderCount.innerText = `${visibleFiles.length} Berkas`;
  } else {
    visibleFiles = currentFolder.files.map(file => ({ ...file, folderName: currentFolder.name }));
    if (activeFolderTitle) activeFolderTitle.innerText = currentFolder.name;
    if (activeFolderDesc) activeFolderDesc.innerText = currentFolder.description;
    if (activeFolderIcon) activeFolderIcon.innerHTML = `<i class="${currentFolder.icon} ${currentFolder.color} text-base"></i>`;
    if (activeFolderCount) activeFolderCount.innerText = `${visibleFiles.length} Berkas`;
  }

  // 3. Render Files Table (Kanan)
  if (visibleFiles.length === 0) {
    filesTbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
  } else {
    if (emptyState) emptyState.classList.add('hidden');
    filesTbody.innerHTML = visibleFiles.map(file => {
      const meta = getFileTypeMeta(file.type);
      return `
        <tr class="border-b border-slate-800/80 hover:bg-slate-900/60 transition-colors group text-xs font-mono ${file.isRecent ? 'new-row-flash' : ''}">
          <!-- Nama & Deskripsi -->
          <td class="py-3.5 px-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center ${meta.color} text-sm flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <i class="${meta.icon}"></i>
              </div>
              <div>
                <span class="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors block text-xs break-all">
                  ${file.name}
                </span>
                <span class="text-[11px] text-slate-400 font-sans block mt-0.5 line-clamp-1">
                  ${file.desc || '-'}
                </span>
                <div class="flex flex-wrap gap-1 mt-1">
                  ${file.isCustom ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">Tersimpan di DB</span>` : ''}
                  ${file.tags ? file.tags.map(t => `<span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">#${t}</span>`).join('') : ''}
                  ${file.folderName ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">${file.folderName}</span>` : ''}
                </div>
              </div>
            </div>
          </td>

          <!-- Tipe -->
          <td class="py-3.5 px-3 whitespace-nowrap">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${meta.bg}">
              ${meta.label}
            </span>
          </td>

          <!-- Ukuran -->
          <td class="py-3.5 px-3 whitespace-nowrap text-slate-300 font-medium">
            ${file.size || '1.0 MB'}
          </td>

          <!-- Tanggal -->
          <td class="py-3.5 px-3 whitespace-nowrap text-slate-400 text-[11px]">
            ${file.date || '-'}
          </td>

          <!-- Aksi -->
          <td class="py-3.5 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="previewVaultFile('${file.id}')" class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center transition-colors" title="Lihat Rincian">
                <i class="fa-solid fa-eye text-xs"></i>
              </button>
              <button onclick="downloadVaultFile('${file.id}')" class="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 flex items-center justify-center transition-colors" title="Unduh Berkas">
                <i class="fa-solid fa-download text-xs"></i>
              </button>
              ${file.isCustom ? `
                <button onclick="deleteCustomVaultFile('${file.id}')" class="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors" title="Hapus Berkas">
                  <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }
}

// Window function: Ganti folder aktif
window.selectVaultFolder = function(folderId) {
  activeVaultFolderId = folderId;
  vaultSearchQuery = '';
  const searchInput = document.getElementById('db-search-input');
  if (searchInput) searchInput.value = '';
  renderDatabaseVault();
};

// Window function: Buat folder database baru
window.createNewVaultFolder = function() {
  const folderName = prompt('Masukkan nama folder database baru (contoh: Laporan Gardu Hubung):');
  if (!folderName || !folderName.trim()) return;

  const newFolderId = `custom-folder-${Date.now()}`;
  const newFolder = {
    id: newFolderId,
    name: folderName.trim(),
    icon: "fa-solid fa-folder-open",
    color: "text-cyan-400",
    badge: "Folder Kustom",
    description: `Folder kustom untuk arsip ${folderName.trim()}.`,
    files: [],
    isCustomFolder: true
  };

  const customFoldersStr = localStorage.getItem('dcc_vault_custom_folders');
  let customFolders = customFoldersStr ? JSON.parse(customFoldersStr) : [];
  customFolders.push(newFolder);
  localStorage.setItem('dcc_vault_custom_folders', JSON.stringify(customFolders));

  activeVaultFolderId = newFolderId;
  renderDatabaseVault();
  showDbToast(`✅ Folder "${folderName.trim()}" berhasil dibuat!`);
};

// Window function: Buka modal simpan berkas dengan folder tertentu terpilih
window.openAddFileModal = function(preselectedFolderId = null) {
  const modalAdd = document.getElementById('modal-add-file');
  const folderSelect = document.getElementById('add-file-folder');
  const badge = document.getElementById('selected-file-badge');
  const form = document.getElementById('form-add-file');

  if (form) form.reset();
  if (badge) badge.classList.add('hidden');
  currentUploadedFileData = null;

  if (folderSelect) {
    folderSelect.value = preselectedFolderId || activeVaultFolderId || 'folder-sld';
  }

  if (modalAdd) {
    modalAdd.classList.remove('modal-hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAddFileModal = function() {
  const modalAdd = document.getElementById('modal-add-file');
  if (modalAdd) {
    modalAdd.classList.add('modal-hidden');
    document.body.style.overflow = '';
  }
};

// Window function: Lihat rincian berkas
window.previewVaultFile = function(fileId) {
  const folders = getVaultFolders();
  let foundFile = null;
  let folderName = '';

  for (const f of folders) {
    const item = f.files.find(fi => fi.id === fileId);
    if (item) {
      foundFile = item;
      folderName = f.name;
      break;
    }
  }

  if (!foundFile) return;

  const modal = document.getElementById('modal-preview-file');
  const title = document.getElementById('preview-file-title');
  const folderTag = document.getElementById('preview-file-folder-tag');
  const icon = document.getElementById('preview-file-icon');
  const typeTag = document.getElementById('preview-file-type');
  const size = document.getElementById('preview-file-size');
  const date = document.getElementById('preview-file-date');
  const version = document.getElementById('preview-file-version');
  const desc = document.getElementById('preview-file-desc');
  const dlBtn = document.getElementById('btn-download-preview-file');

  const meta = getFileTypeMeta(foundFile.type);

  if (title) title.innerText = foundFile.name;
  if (folderTag) folderTag.innerText = `Folder: ${folderName}`;
  if (icon) icon.className = meta.icon;
  if (typeTag) {
    typeTag.className = `px-3 py-1 rounded-full text-xs font-mono font-semibold border ${meta.bg}`;
    typeTag.innerText = `${meta.label} DOCUMENT`;
  }
  if (size) size.innerText = foundFile.size;
  if (date) date.innerText = foundFile.date;
  if (version) version.innerText = foundFile.version || 'v1.0';
  if (desc) desc.innerText = foundFile.desc || 'Berkas sistem terverifikasi DCC Sumbawa.';

  if (dlBtn) {
    dlBtn.onclick = () => {
      window.downloadVaultFile(foundFile.id);
      closePreviewVaultFile();
    };
  }

  if (modal) {
    modal.classList.remove('modal-hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closePreviewVaultFile = function() {
  const modal = document.getElementById('modal-preview-file');
  if (modal) {
    modal.classList.add('modal-hidden');
    document.body.style.overflow = '';
  }
};

// Window function: Hapus berkas kustom
window.deleteCustomVaultFile = function(fileId) {
  if (!confirm('Apakah Anda yakin ingin menghapus berkas ini dari database?')) return;

  const customFilesStr = localStorage.getItem('dcc_vault_custom_files');
  if (customFilesStr) {
    let customFiles = JSON.parse(customFilesStr);
    customFiles = customFiles.filter(cf => cf.id !== fileId);
    localStorage.setItem('dcc_vault_custom_files', JSON.stringify(customFiles));
    showDbToast('Berkas berhasil dihapus dari database.');
    renderDatabaseVault();
  }
};

// Event Listeners untuk Toolbar Database Vault & Modal Add File
function initVaultEventListeners() {
  // Search input live filtering
  const searchInput = document.getElementById('db-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      vaultSearchQuery = e.target.value;
      renderDatabaseVault();
    });
  }

  // Tombol "+ Simpan File Baru" di toolbar atas
  const btnOpenAdd = document.getElementById('btn-open-add-file');
  if (btnOpenAdd) {
    btnOpenAdd.addEventListener('click', () => {
      window.openAddFileModal(activeVaultFolderId);
    });
  }

  // Tombol "Upload ke Folder Ini" langsung di dalam folder aktif
  const btnAddDirect = document.getElementById('btn-add-file-direct');
  if (btnAddDirect) {
    btnAddDirect.addEventListener('click', () => {
      window.openAddFileModal(activeVaultFolderId);
    });
  }

  // Tombol Batal & Tutup Modal Add File
  const btnCloseAdd = document.getElementById('btn-close-add-file');
  const btnCancelAdd = document.getElementById('btn-cancel-add-file');
  if (btnCloseAdd) btnCloseAdd.addEventListener('click', window.closeAddFileModal);
  if (btnCancelAdd) btnCancelAdd.addEventListener('click', window.closeAddFileModal);

  // File Picker & Dropzone Event Handlers
  const filePickerInput = document.getElementById('file-picker-input');
  const dropzoneArea = document.getElementById('dropzone-area');
  const fileNameInput = document.getElementById('add-file-name');
  const fileSizeInput = document.getElementById('add-file-size');
  const fileTypeSelect = document.getElementById('add-file-type');
  const fileBadge = document.getElementById('selected-file-badge');
  const selectedFileNameEl = document.getElementById('selected-file-name');
  const selectedFileSizeEl = document.getElementById('selected-file-size');
  const selectedFileIconEl = document.getElementById('selected-file-icon');

  function handleFileSelected(file) {
    if (!file) return;

    if (fileNameInput) fileNameInput.value = file.name;
    const formattedSize = formatBytes(file.size);
    if (fileSizeInput) fileSizeInput.value = formattedSize;

    // Deteksi ekstensi otomatis
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    let detectedType = 'pdf';
    if (['dwg', 'dxf'].includes(ext)) detectedType = 'dwg';
    else if (['xlsx', 'xls'].includes(ext)) detectedType = 'excel';
    else if (['doc', 'docx'].includes(ext)) detectedType = 'word';
    else if (['sql'].includes(ext)) detectedType = 'sql';
    else if (['csv'].includes(ext)) detectedType = 'csv';
    else if (['bin', 'hex'].includes(ext)) detectedType = 'binary';
    else if (['py', 'js', 'json', 'sh', 'c', 'cpp'].includes(ext)) detectedType = 'code';
    else if (['jpg', 'jpeg', 'png', 'svg', 'webp'].includes(ext)) detectedType = 'image';

    if (fileTypeSelect) fileTypeSelect.value = detectedType;

    // Tampilkan badge file terpilih
    if (fileBadge) {
      fileBadge.classList.remove('hidden');
      if (selectedFileNameEl) selectedFileNameEl.innerText = file.name;
      if (selectedFileSizeEl) selectedFileSizeEl.innerText = `(${formattedSize})`;
      if (selectedFileIconEl) {
        const meta = getFileTypeMeta(detectedType);
        selectedFileIconEl.className = `${meta.icon} text-cyan-400`;
      }
    }

    // Baca file nyata menggunakan FileReader (Data URL base64)
    // Jika ukuran file < 15MB, baca data untuk unduh nyata
    if (file.size < 15 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        currentUploadedFileData = evt.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      currentUploadedFileData = null;
    }
  }

  if (filePickerInput) {
    filePickerInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      handleFileSelected(file);
    });
  }

  // Drag and Drop pada Dropzone
  if (dropzoneArea) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzoneArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneArea.classList.add('border-cyan-400', 'bg-slate-900/90');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzoneArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneArea.classList.remove('border-cyan-400', 'bg-slate-900/90');
      }, false);
    });

    dropzoneArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const file = dt && dt.files && dt.files[0];
      handleFileSelected(file);
    }, false);
  }

  // Form Add File Submit
  const formAdd = document.getElementById('form-add-file');
  if (formAdd) {
    formAdd.addEventListener('submit', (e) => {
      e.preventDefault();
      const fileName = (fileNameInput ? fileNameInput.value : '').trim();
      const folderId = document.getElementById('add-file-folder').value;
      const fileType = fileTypeSelect ? fileTypeSelect.value : 'pdf';
      const version = (document.getElementById('add-file-version').value || '').trim() || 'v1.0';
      const size = (fileSizeInput ? fileSizeInput.value : '').trim() || '1.0 MB';
      const desc = (document.getElementById('add-file-desc').value || '').trim() || 'Dokumen resmi diupload ke database DCC Sumbawa.';

      if (!fileName) {
        alert('Mohon masukkan nama berkas atau pilih file.');
        return;
      }

      // Ambil nama folder tujuan untuk notifikasi
      const folders = getVaultFolders();
      const targetFolder = folders.find(f => f.id === folderId);
      const folderName = targetFolder ? targetFolder.name : 'Folder Database';

      const newFile = {
        id: `custom-f-${Date.now()}`,
        name: fileName,
        type: fileType,
        size: size,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        version: version,
        desc: desc,
        tags: ["Tersimpan", fileType.toUpperCase()],
        folderId: folderId,
        isCustom: true,
        isRecent: true,
        fileData: currentUploadedFileData
      };

      // Simpan ke localStorage dengan try-catch
      try {
        const customFilesStr = localStorage.getItem('dcc_vault_custom_files');
        let customFiles = customFilesStr ? JSON.parse(customFilesStr) : [];
        customFiles.unshift(newFile);
        localStorage.setItem('dcc_vault_custom_files', JSON.stringify(customFiles));
      } catch (err) {
        // Jika file terlalu besar untuk localStorage, simpan tanpa payload base64
        console.warn('Storage quota limit reached, saving metadata only:', err);
        newFile.fileData = null;
        const customFilesStr = localStorage.getItem('dcc_vault_custom_files');
        let customFiles = customFilesStr ? JSON.parse(customFilesStr) : [];
        customFiles.unshift(newFile);
        localStorage.setItem('dcc_vault_custom_files', JSON.stringify(customFiles));
      }

      window.closeAddFileModal();
      
      // Pindahkan tampilan aktif ke folder yang dipilih user!
      activeVaultFolderId = folderId;
      vaultSearchQuery = '';
      if (searchInput) searchInput.value = '';
      
      // Re-render UI
      renderDatabaseVault();
      showDbToast(`✅ Berkas "${fileName}" berhasil dimasukkan ke ${folderName}!`);
    });
  }

  // Close Preview Modal listeners
  const btnClosePreview = document.getElementById('btn-close-preview-file');
  const btnClosePreviewAlt = document.getElementById('btn-close-preview-alt');
  if (btnClosePreview) btnClosePreview.addEventListener('click', window.closePreviewVaultFile);
  if (btnClosePreviewAlt) btnClosePreviewAlt.addEventListener('click', window.closePreviewVaultFile);
}

/* ==========================================================================
   6. PROJECTS & FILTERING
   ========================================================================== */
function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container || !portfolioData.projects) return;

  const filtered = filter === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === filter);

  container.innerHTML = filtered.map(p => `
    <div class="circuit-card rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-900/70 hover:border-cyan-400/50 flex flex-col group shadow-lg">
      <div class="relative h-52 overflow-hidden bg-slate-950">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <span class="absolute top-4 left-4 px-3 py-1 text-xs font-mono font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
          ${p.badge}
        </span>
        <span class="absolute top-4 right-4 px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900/80 text-slate-300 border border-slate-700 backdrop-blur-md">
          ${p.categoryLabel}
        </span>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-tech font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">${p.title}</h3>
          <p class="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">${p.shortDesc}</p>
          
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${p.tech.map(t => `
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button onclick="openProjectModal('${p.id}')" class="flex-1 py-2 px-3 text-xs font-bold font-tech rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 transition-all text-center flex items-center justify-center gap-2">
            <i class="fa-solid fa-circle-info"></i> Detail Arsitektur
          </button>
          <a href="${p.demoLink}" class="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors" title="Simulasi / Live">
            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Update filter buttons state
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
  });
}

// Filter button click listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    renderProjects(filter);
  });
});

/* ==========================================================================
   7. PROJECT DETAIL MODAL POPUP
   ========================================================================== */
window.openProjectModal = function(id) {
  const project = portfolioData.projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const badge = document.getElementById('modal-badge');
  const image = document.getElementById('modal-image');
  const desc = document.getElementById('modal-desc');
  const arch = document.getElementById('modal-architecture');
  const highlights = document.getElementById('modal-highlights');
  const tech = document.getElementById('modal-tech');
  const demoBtn = document.getElementById('modal-demo-btn');
  const codeBtn = document.getElementById('modal-code-btn');

  if (title) title.innerText = project.title;
  if (badge) badge.innerText = project.badge;
  if (image) image.src = project.image;
  if (desc) desc.innerText = project.fullDesc;
  if (arch) arch.innerText = project.architecture;

  if (highlights) {
    highlights.innerHTML = project.highlights.map(h => `
      <li class="flex items-start gap-2 text-sm text-slate-300">
        <i class="fa-solid fa-bolt text-cyan-400 text-xs mt-1"></i>
        <span>${h}</span>
      </li>
    `).join('');
  }

  if (tech) {
    tech.innerHTML = project.tech.map(t => `
      <span class="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
        ${t}
      </span>
    `).join('');
  }

  if (demoBtn) demoBtn.href = project.demoLink;
  if (codeBtn) codeBtn.href = project.codeLink;

  modal.classList.remove('modal-hidden');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('modal-hidden');
    document.body.style.overflow = '';
  }
};

// Close modal on escape key or outside click
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    if (typeof closePreviewVaultFile === 'function') closePreviewVaultFile();
    const modalAdd = document.getElementById('modal-add-file');
    if (modalAdd && !modalAdd.classList.contains('modal-hidden')) {
      modalAdd.classList.add('modal-hidden');
      document.body.style.overflow = '';
    }
  }
});

const modalEl = document.getElementById('project-modal');
if (modalEl) {
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeProjectModal();
  });
}

const modalAddEl = document.getElementById('modal-add-file');
if (modalAddEl) {
  modalAddEl.addEventListener('click', (e) => {
    if (e.target === modalAddEl) {
      modalAddEl.classList.add('modal-hidden');
      document.body.style.overflow = '';
    }
  });
}

const modalPrevEl = document.getElementById('modal-preview-file');
if (modalPrevEl) {
  modalPrevEl.addEventListener('click', (e) => {
    if (e.target === modalPrevEl) {
      modalPrevEl.classList.add('modal-hidden');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   8. TIMELINE & EXPERIENCE SECTION
   ========================================================================== */
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container || !portfolioData.timeline) return;

  container.innerHTML = portfolioData.timeline.map((item, idx) => `
    <div class="relative pl-8 pb-10 border-l-2 border-cyan-500/30 last:border-transparent group">
      <!-- Circuit Node Dot -->
      <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 group-hover:shadow-[0_0_15px_#00f2fe] transition-all">
        <div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
      </div>

      <div class="circuit-card p-6 rounded-xl border border-cyan-500/20 bg-slate-900/60 shadow-md group-hover:border-cyan-400/50 transition-all">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h4 class="text-lg font-tech font-bold text-white group-hover:text-cyan-300 transition-colors">${item.role}</h4>
          <span class="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">${item.period}</span>
        </div>
        <p class="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <i class="fa-solid fa-building text-cyan-400 text-xs"></i>
          ${item.institution}
        </p>
        <p class="text-slate-400 text-sm leading-relaxed">${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   9. CONTACT SECTION & INTERACTION
   ========================================================================== */
function renderContact() {
  const p = portfolioData.personal;

  const emailEl = document.getElementById('contact-email');
  if (emailEl) emailEl.innerText = p.email;

  const waEl = document.getElementById('contact-whatsapp');
  if (waEl) waEl.innerText = `+${p.whatsapp}`;

  const directWaBtn = document.getElementById('btn-direct-wa');
  if (directWaBtn) {
    directWaBtn.href = `https://wa.me/${p.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20proyek%20sistem%20monitoring%20dan%20database%20kelistrikan%20Anda.`;
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const projectType = document.getElementById('form-project-type').value;
      const message = document.getElementById('form-message').value;

      // Construct WhatsApp Direct Message
      const waText = encodeURIComponent(
        `*Pesan Baru dari Website Portofolio*\n\n` +
        `*Nama:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Kebutuhan:* ${projectType}\n` +
        `*Pesan:* ${message}`
      );

      window.open(`https://wa.me/${p.whatsapp}?text=${waText}`, '_blank');

      // Feedback message
      alert('Terima kasih! Pesan Anda akan dialihkan ke WhatsApp untuk respon instan.');
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE LIVE SIMULATOR: SENSOR-TO-DATABASE WIDGET
   Menampilkan simulasi nyata keahlian: Pembacaan Sensor Listrik -> Transmisi REST API -> Penyimpanan ke Database Table!
   ========================================================================== */
function initLiveSimulator() {
  const vEl = document.getElementById('live-val-voltage');
  const cEl = document.getElementById('live-val-current');
  const pEl = document.getElementById('live-val-power');
  const pfEl = document.getElementById('live-val-pf');
  const freqEl = document.getElementById('live-val-freq');

  const triggerBtn = document.getElementById('btn-trigger-log');
  const autoStreamBtn = document.getElementById('btn-toggle-stream');
  const dbTableBody = document.getElementById('db-table-body');
  const packetLine = document.getElementById('data-packet-anim');
  const statusApiBadge = document.getElementById('api-status-badge');

  let isStreaming = false;
  let streamInterval = null;
  let logCounter = 1001;

  // Setup Chart.js for real-time Voltage & Current Waveform
  const chartCanvas = document.getElementById('telemetry-chart');
  let telemetryChart = null;

  if (chartCanvas && typeof Chart !== 'undefined') {
    const ctx = chartCanvas.getContext('2d');
    const initialLabels = Array.from({ length: 12 }, (_, i) => `${i * 2}s`);
    const initialVoltages = [220.1, 220.5, 221.2, 220.8, 220.4, 221.0, 220.6, 221.4, 220.9, 221.1, 220.7, 221.3];

    telemetryChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: initialLabels,
        datasets: [
          {
            label: 'Tegangan Fasa (V)',
            data: initialVoltages,
            borderColor: '#00f2fe',
            backgroundColor: 'rgba(0, 242, 254, 0.12)',
            borderWidth: 2,
            tension: 0.35,
            fill: true,
            pointRadius: 2,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#00f2fe',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(0, 242, 254, 0.3)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b', font: { size: 10 } }
          },
          y: {
            min: 215,
            max: 230,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b', font: { size: 10 } }
          }
        }
      }
    });
  }

  // Generate realistic sensor data
  function generateSensorData() {
    const voltage = (219.5 + Math.random() * 2.8).toFixed(1); // 219.5 - 222.3 V
    const current = (4.8 + Math.random() * 1.8).toFixed(2);   // 4.8 - 6.6 A
    const pf = (0.94 + Math.random() * 0.04).toFixed(2);      // 0.94 - 0.98
    const power = Math.round(voltage * current * pf);        // Active Power W
    const freq = (49.95 + Math.random() * 0.1).toFixed(2);    // 49.95 - 50.05 Hz

    return { voltage, current, pf, power, freq };
  }

  // Trigger Log to Database Action
  function pushDataToDatabase() {
    const data = generateSensorData();

    // 1. Update Real-time displays
    if (vEl) vEl.innerText = `${data.voltage} V`;
    if (cEl) cEl.innerText = `${data.current} A`;
    if (pEl) pEl.innerText = `${data.power} W`;
    if (pfEl) pfEl.innerText = data.pf;
    if (freqEl) freqEl.innerText = `${data.freq} Hz`;

    // 2. Animate Data Packet Travel (Sensor -> API -> Database)
    if (packetLine) {
      packetLine.classList.remove('hidden');
      packetLine.style.animation = 'none';
      void packetLine.offsetWidth; // trigger reflow
      packetLine.style.animation = 'transmitPulse 0.9s ease-out';
      setTimeout(() => {
        packetLine.classList.add('hidden');
      }, 900);
    }

    // 3. API Status indicator
    if (statusApiBadge) {
      statusApiBadge.className = 'px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse';
      statusApiBadge.innerHTML = '<i class="fa-solid fa-check mr-1"></i> HTTP 201 CREATED';
      setTimeout(() => {
        statusApiBadge.className = 'px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40';
        statusApiBadge.innerHTML = '<i class="fa-solid fa-satellite-dish mr-1"></i> REST API LISTENING';
      }, 1200);
    }

    // 4. Insert row into live Database table
    if (dbTableBody) {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const rowId = `LOG-${logCounter++}`;

      const newRow = document.createElement('tr');
      newRow.className = 'border-b border-slate-800 text-xs font-mono new-row-flash text-slate-300';
      newRow.innerHTML = `
        <td class="py-2.5 px-3 text-cyan-400 font-bold">${rowId}</td>
        <td class="py-2.5 px-3 text-slate-400">${timeStr}</td>
        <td class="py-2.5 px-3"><span class="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/50">PZEM-01</span></td>
        <td class="py-2.5 px-3 text-amber-400 font-bold">${data.voltage}</td>
        <td class="py-2.5 px-3 text-cyan-300">${data.current}</td>
        <td class="py-2.5 px-3 text-emerald-400 font-bold">${data.power}</td>
        <td class="py-2.5 px-3 text-slate-300">${data.pf}</td>
        <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-[10px] border border-emerald-800/60">INSERTED</span></td>
      `;

      // Prepend to top of table
      dbTableBody.insertBefore(newRow, dbTableBody.firstChild);

      // Keep maximum 6 rows visible
      while (dbTableBody.children.length > 6) {
        dbTableBody.removeChild(dbTableBody.lastChild);
      }
    }

    // 5. Update Chart data
    if (telemetryChart) {
      const labels = telemetryChart.data.labels;
      const dataSet = telemetryChart.data.datasets[0].data;

      const timeLabel = new Date().toLocaleTimeString().split(' ')[0].substring(3);
      labels.push(timeLabel);
      dataSet.push(parseFloat(data.voltage));

      if (labels.length > 12) {
        labels.shift();
        dataSet.shift();
      }
      telemetryChart.update('none');
    }
  }

  // Button Listeners
  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      pushDataToDatabase();
    });
  }

  if (autoStreamBtn) {
    autoStreamBtn.addEventListener('click', () => {
      isStreaming = !isStreaming;
      if (isStreaming) {
        autoStreamBtn.innerHTML = '<i class="fa-solid fa-pause mr-1.5 text-amber-400"></i> Hentikan Auto-Stream';
        autoStreamBtn.classList.replace('border-slate-700', 'border-amber-400/60');
        streamInterval = setInterval(pushDataToDatabase, 1800);
      } else {
        autoStreamBtn.innerHTML = '<i class="fa-solid fa-play mr-1.5 text-cyan-400"></i> Mulai Auto-Streaming';
        autoStreamBtn.classList.replace('border-amber-400/60', 'border-slate-700');
        clearInterval(streamInterval);
      }
    });
  }

  // Pre-populate 3 initial database records
  for (let i = 0; i < 3; i++) {
    pushDataToDatabase();
  }
}

/* ==========================================================================
   11. MOBILE MENU & SCROLL BEHAVIOR
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }

    // Scroll spy active link
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      const sectionHeight = sec.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('text-cyan-400', link.getAttribute('href') === `#${current}`);
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
