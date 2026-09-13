<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DCC Sumbawa | Electrical Engineer & Web Database Developer</title>
  <meta name="description" content="Portofolio resmi Electrical Engineer spesialis sistem akuisisi data sensor, web telemetry monitoring, dan integrasi hardware ke database.">
  
  <!-- Favicon Icon -->
  <link rel="icon" type="image/jpeg" href="assets/logo-dcc.jpg">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            electric: {
              cyan: '#00f2fe',
              blue: '#0088ff',
              green: '#00ffaa',
              amber: '#f59e0b',
              dark: '#070b14',
              slate: '#0d1628'
            }
          }
        }
      }
    }
  </script>

  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- Chart.js CDN for Live Telemetry Waveform -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <!-- Custom Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-black">

  <!-- BACKGROUND ANIMASI PARTIKEL SIRKUIT LISTRIK INTERAKTIF -->
  <canvas id="circuit-canvas"></canvas>

  <!-- NAVBAR STICKY GLASS -->
  <header class="fixed top-0 left-0 w-full z-50 nav-glass transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <a href="#home" class="flex items-center gap-3 group">
        <div class="w-12 h-12 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.5)] group-hover:scale-105 group-hover:border-cyan-400 transition-all flex items-center justify-center p-0.5">
          <img src="assets/logo-dcc.jpg" alt="Logo DCC Sumbawa" class="w-full h-full object-cover rounded-lg">
        </div>
        <div class="flex flex-col">
          <span class="text-base font-tech font-extrabold text-white tracking-wider group-hover:text-cyan-400 transition-colors">
            DCC <span class="text-cyan-400">SUMBAWA</span>
          </span>
          <span class="text-[10px] font-mono text-cyan-400/80 -mt-1 tracking-widest">DISTRIBUTION CONTROL CENTER</span>
        </div>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden md:flex items-center gap-7">
        <a href="#home" class="desktop-nav-link text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Beranda</a>
        <a href="#about" class="desktop-nav-link text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Tentang</a>
        <a href="#live-simulator" class="desktop-nav-link text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Live Simulator
        </a>
        <a href="#database" class="desktop-nav-link text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Database Berkas</a>
        <a href="#projects" class="desktop-nav-link text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Proyek</a>
        <a href="#experience" class="desktop-nav-link text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Pengalaman</a>
        <a href="#contact" class="desktop-nav-link text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Kontak</a>
      </nav>

      <!-- Right Action: Theme Switcher & WhatsApp CTA -->
      <div class="flex items-center gap-3">
        <!-- Theme Toggle Button -->
        <button id="theme-toggle" class="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 flex items-center justify-center transition-colors" title="Toggle Tema Gelap / Terang">
          <i id="theme-icon" class="fa-solid fa-sun text-cyan-400 text-sm"></i>
        </button>

        <!-- WhatsApp Quick Chat Button -->
        <a id="btn-direct-wa" href="#contact" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-electric text-xs font-tech font-bold uppercase tracking-wider">
          <i class="fa-brands fa-whatsapp text-sm"></i>
          <span>Konsultasi</span>
        </a>

        <!-- Mobile Menu Toggle Button -->
        <button id="mobile-menu-btn" class="md:hidden w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400">
          <i class="fa-solid fa-bars text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div id="mobile-menu" class="hidden md:hidden px-4 pt-2 pb-6 bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-xl">
      <div class="flex flex-col space-y-3">
        <a href="#home" class="mobile-nav-link px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-400">Beranda</a>
        <a href="#about" class="mobile-nav-link px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-400">Tentang</a>
        <a href="#live-simulator" class="mobile-nav-link px-3 py-2 rounded-lg text-sm text-amber-400 hover:bg-slate-900 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Live Simulator
        </a>
        <a href="#database" class="mobile-nav-link px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-400">Database Berkas</a>
        <a href="#projects" class="mobile-nav-link px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-400">Proyek</a>
        <a href="#experience" class="mobile-nav-link px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-400">Pengalaman</a>
        <a href="#contact" class="mobile-nav-link px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-400">Kontak</a>
      </div>
    </div>
  </header>

  <main class="relative z-10 pt-20">

    <!-- ==========================================================================
         HERO SECTION
         ========================================================================== -->
    <section id="home" class="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative">
      <div class="max-w-5xl mx-auto text-center flex flex-col items-center">
        
        <!-- Availability Status Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-8 backdrop-blur-md glow-box-cyan">
          <span class="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
          <span id="hero-status-badge">🟢 Tersedia untuk Proyek & Kolaborasi</span>
        </div>

        <!-- Greeting & Name -->
        <h2 class="text-sm sm:text-base font-mono uppercase tracking-widest text-slate-400 mb-3">
          Halo & Selamat Datang — Portofolio Resmi
        </h2>
        <h1 id="hero-name" class="text-4xl sm:text-6xl md:text-7xl font-tech font-extrabold text-white tracking-tight mb-4 glow-cyan">
          Engineering Listrik & Web Developer
        </h1>

        <!-- Animated Typewriter Role -->
        <div class="h-10 sm:h-12 flex items-center justify-center text-xl sm:text-3xl font-tech font-bold text-cyan-400 mb-6">
          <span id="typewriter-text"></span>
          <span class="w-1 h-7 bg-cyan-400 ml-1 inline-block animate-pulse"></span>
        </div>

        <!-- Hero Subtitle / Summary -->
        <p id="hero-bio" class="max-w-3xl text-slate-300 text-base sm:text-lg leading-relaxed mb-10 text-center font-normal">
          Menjembatani sistem tenaga & sensor kelistrikan (PZEM, CT, Modbus, PLC) dengan database terdistribusi serta dashboard web monitoring real-time yang estetis dan interaktif.
        </p>

        <!-- CTA Action Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a href="#live-simulator" class="px-7 py-3.5 rounded-xl btn-electric text-sm font-tech font-bold uppercase tracking-wider flex items-center gap-2 glow-box-cyan">
            <i class="fa-solid fa-play text-xs"></i>
            <span>Uji Live Simulator</span>
          </a>
          <a href="#projects" class="px-7 py-3.5 rounded-xl btn-outline-electric text-sm font-tech font-bold uppercase tracking-wider flex items-center gap-2">
            <i class="fa-solid fa-diagram-project text-xs"></i>
            <span>Lihat Galeri Proyek</span>
          </a>
          <a href="#contact" class="px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-200 text-sm font-tech font-semibold transition-all flex items-center gap-2">
            <i class="fa-solid fa-envelope text-xs text-cyan-400"></i>
            <span>Hubungi Saya</span>
          </a>
        </div>

        <!-- Social Media Direct Links -->
        <div class="flex items-center gap-4 text-xl text-slate-400">
          <a id="hero-github-link" href="#" target="_blank" rel="noopener noreferrer" class="w-11 h-11 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 transition-all" title="GitHub">
            <i class="fa-brands fa-github"></i>
          </a>
          <a id="hero-linkedin-link" href="#" target="_blank" rel="noopener noreferrer" class="w-11 h-11 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 transition-all" title="LinkedIn">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a id="hero-whatsapp-link" href="#" target="_blank" rel="noopener noreferrer" class="w-11 h-11 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-400 hover:scale-110 transition-all" title="WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
        </div>

      </div>
    </section>

    <!-- ==========================================================================
         LIVE SIMULATOR SECTION: SENSOR-TO-DATABASE WIDGET (FITUR UNGGULAN)
         ========================================================================== -->
    <section id="live-simulator" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <i class="fa-solid fa-bolt text-xs"></i>
          <span>INTERACTIVE DEMOSTRATION</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-tech font-extrabold text-white mb-3 tracking-tight">
          Simulasi Live: <span class="text-cyan-400">Sensor Listrik ➔ Database</span>
        </h2>
        <p class="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
          Demonstrasi nyata bagaimana data sensor tegangan & arus dibaca, ditransmisikan melalui API, dan disimpan secara real-time ke dalam tabel database.
        </p>
      </div>

      <!-- Main Simulator Cockpit Card -->
      <div class="circuit-card rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-6 md:p-8 tech-grid-bg shadow-2xl">
        
        <!-- Cockpit Header: Control Buttons & Status -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-cyan-500/20">
          <div class="flex items-center gap-3">
            <div class="w-3.5 h-3.5 rounded-full bg-emerald-400 pulse-dot"></div>
            <div>
              <span class="text-sm font-tech font-bold text-white tracking-wider">PANEL TELEMETRI AKTIF</span>
              <span class="block text-[11px] font-mono text-cyan-400/80">NODE ID: ESP32-POWER-LOGGER-01</span>
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <span id="api-status-badge" class="px-2.5 py-1 text-[11px] font-mono rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <i class="fa-solid fa-satellite-dish mr-1"></i> REST API LISTENING
            </span>

            <button id="btn-toggle-stream" class="px-3.5 py-2 text-xs font-tech font-semibold rounded-lg bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 transition-all flex items-center">
              <i class="fa-solid fa-play mr-1.5 text-cyan-400"></i> Mulai Auto-Streaming
            </button>

            <button id="btn-trigger-log" class="px-4 py-2 text-xs font-tech font-bold rounded-lg btn-electric flex items-center gap-1.5 glow-box-cyan">
              <i class="fa-solid fa-bolt"></i>
              <span>Trigger & Catat Log</span>
            </button>
          </div>
        </div>

        <!-- Telemetry Gauges Grid (Voltage, Current, Power, PF, Freq) -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          
          <!-- Voltage Gauge -->
          <div class="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-center">
            <span class="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Tegangan (V)</span>
            <span id="live-val-voltage" class="text-2xl font-tech font-bold text-amber-400">220.4 V</span>
            <span class="text-[10px] font-mono text-emerald-400 block mt-1">Normal Range</span>
          </div>

          <!-- Current Gauge -->
          <div class="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-center">
            <span class="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Arus Beban (A)</span>
            <span id="live-val-current" class="text-2xl font-tech font-bold text-cyan-300">5.42 A</span>
            <span class="text-[10px] font-mono text-slate-400 block mt-1">CT Sensor 50A</span>
          </div>

          <!-- Active Power Gauge -->
          <div class="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-center">
            <span class="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Daya Aktif (W)</span>
            <span id="live-val-power" class="text-2xl font-tech font-bold text-emerald-400">1140 W</span>
            <span class="text-[10px] font-mono text-slate-400 block mt-1">P = V × I × cosφ</span>
          </div>

          <!-- Power Factor Gauge -->
          <div class="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-center">
            <span class="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Power Factor</span>
            <span id="live-val-pf" class="text-2xl font-tech font-bold text-purple-400">0.96</span>
            <span class="text-[10px] font-mono text-emerald-400 block mt-1">Optimal (&gt;0.85)</span>
          </div>

          <!-- Frequency Gauge -->
          <div class="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-center col-span-2 sm:col-span-1">
            <span class="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Frekuensi (Hz)</span>
            <span id="live-val-freq" class="text-2xl font-tech font-bold text-blue-400">50.01 Hz</span>
            <span class="text-[10px] font-mono text-slate-400 block mt-1">Grid Stabil</span>
          </div>

        </div>

        <!-- Telemetry Live Waveform Chart -->
        <div class="mb-6 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-tech text-slate-300 font-bold flex items-center gap-2">
              <i class="fa-solid fa-wave-square text-cyan-400 text-xs"></i>
              GRAFIK TEGANGAN REAL-TIME (VOLT)
            </span>
            <span class="text-[11px] font-mono text-cyan-400">Sampling Rate: 1000ms</span>
          </div>
          <div class="h-44 w-full">
            <canvas id="telemetry-chart"></canvas>
          </div>
        </div>

        <!-- Interactive Architecture Pipeline Graphic -->
        <div class="relative py-4 px-6 rounded-xl bg-slate-950/60 border border-cyan-500/20 mb-6 overflow-hidden">
          <div class="flex flex-wrap items-center justify-between text-xs font-mono text-slate-300 gap-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-bolt text-amber-400"></i>
              <span>Sensor Listrik (PZEM)</span>
            </div>
            <i class="fa-solid fa-arrow-right text-cyan-400"></i>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-microchip text-cyan-400"></i>
              <span>ESP32 MCU</span>
            </div>
            <i class="fa-solid fa-arrow-right text-cyan-400"></i>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-cloud-arrow-up text-blue-400"></i>
              <span>POST /api/telemetry</span>
            </div>
            <i class="fa-solid fa-arrow-right text-cyan-400"></i>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-database text-emerald-400"></i>
              <span>Database Table</span>
            </div>
          </div>
          <!-- Traveling Packet Animation line -->
          <div id="data-packet-anim" class="hidden packet-anim"></div>
        </div>

        <!-- Live Simulated Database Table -->
        <div class="rounded-xl border border-cyan-500/20 bg-slate-950/90 overflow-hidden">
          <div class="p-3 bg-slate-900/90 border-b border-cyan-500/20 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-table text-cyan-400 text-xs"></i>
              <span class="text-xs font-tech font-bold text-white">DATABASE LOG TABLE (telemetry_logs)</span>
            </div>
            <span class="text-[10px] font-mono text-slate-400">ENGINE: InnoDB / TimescaleDB</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-slate-900/40">
                  <th class="py-2.5 px-3">Log ID</th>
                  <th class="py-2.5 px-3">Timestamp</th>
                  <th class="py-2.5 px-3">Node</th>
                  <th class="py-2.5 px-3">Volt (V)</th>
                  <th class="py-2.5 px-3">Arus (A)</th>
                  <th class="py-2.5 px-3">Daya (W)</th>
                  <th class="py-2.5 px-3">cos φ</th>
                  <th class="py-2.5 px-3">Status Query</th>
                </tr>
              </thead>
              <tbody id="db-table-body">
                <!-- Dynamically updated by main.js -->
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>

    <!-- ==========================================================================
         ABOUT ME SECTION
         ========================================================================== -->
    <section id="about" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left: Profile Tech Card & Stats -->
        <div class="lg:col-span-5">
          <div class="circuit-card rounded-3xl p-8 border border-cyan-500/30 bg-slate-900/80 shadow-2xl relative">
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 mb-6 shadow-[0_0_25px_rgba(0,242,254,0.4)]">
              <div class="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-cyan-400 text-4xl">
                <i class="fa-solid fa-user-astronaut"></i>
              </div>
            </div>

            <h3 class="text-2xl font-tech font-bold text-white mb-1">Electrical & Web Specialist</h3>
            <p class="text-xs font-mono text-cyan-400 mb-6">HARDWARE-TO-DATABASE ARCHITECT</p>

            <div class="space-y-3 mb-8 text-sm text-slate-300">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-cyan-400 text-xs"></i>
                <span>Sistem Monitoring Daya 3-Fasa Real-time</span>
              </div>
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-cyan-400 text-xs"></i>
                <span>Logging Data Sensor ke MySQL / PostgreSQL</span>
              </div>
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-cyan-400 text-xs"></i>
                <span>Protokol Industri: Modbus, MQTT, HTTP API</span>
              </div>
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-cyan-400 text-xs"></i>
                <span>Dashboard Web SCADA & Analisis Energi</span>
              </div>
            </div>

            <a href="#contact" class="w-full py-3 rounded-xl btn-electric text-xs font-tech font-bold uppercase tracking-wider text-center block">
              Diskusikan Kebutuhan Sistem
            </a>
          </div>
        </div>

        <!-- Right: Bio Description & Services Summary -->
        <div class="lg:col-span-7">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <i class="fa-solid fa-microchip text-xs"></i>
            <span>PROFIL PROFESIONAL</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-tech font-extrabold text-white mb-6 tracking-tight">
            Perpaduan <span class="text-cyan-400">Teknik Elektro</span> & <span class="text-blue-400">Web Database</span>
          </h2>
          
          <div id="about-bio-text" class="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 space-y-4">
            <!-- Populated dynamically from data.js -->
          </div>

          <!-- Dynamic Stats Grid Counters -->
          <div id="stats-grid" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <!-- Rendered by main.js -->
          </div>
        </div>

      </div>

      <!-- Services Cards Grid -->
      <div class="mt-20">
        <div class="text-center mb-10">
          <h3 class="text-2xl font-tech font-bold text-white">Solusi & Layanan Utama</h3>
          <p class="text-slate-400 text-sm mt-1">Keahlian spesifik yang dapat Anda manfaatkan untuk proyek industri maupun riset</p>
        </div>
        <div id="services-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Rendered by main.js -->
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         DATABASE BERKAS & DOKUMEN PENTING (DCC SUMBAWA DIGITAL VAULT)
         ========================================================================== -->
    <section id="database" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <i class="fa-solid fa-folder-tree text-xs"></i>
          <span>ARSIP DIGITAL & DATABASE BERKAS</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-tech font-extrabold text-white mb-3 tracking-tight">
          Database Berkas & <span class="text-cyan-400">Dokumen Penting</span>
        </h2>
        <p class="max-w-3xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
          Penyimpanan terstruktur dokumen teknis kelistrikan, Single Line Diagram (SLD), Standar Operasional Prosedur (SOP) DCC Sumbawa, dan log sheet sistem tenaga yang dapat disimpan dan diakses secara aman.
        </p>
      </div>

      <!-- Main Database Vault Box -->
      <div class="circuit-card rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-6 md:p-8 shadow-2xl">
        
        <!-- Database Toolbar: Search, Storage Status, Add File Button -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-cyan-500/20">
          
          <!-- Search Box -->
          <div class="relative flex-1 min-w-[240px] max-w-md">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input type="text" id="db-search-input" placeholder="Cari berkas (contoh: SLD, SOP, Log, SQL)..." class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono transition-colors">
          </div>

          <!-- Storage Status & Add File Action -->
          <div class="flex items-center gap-3 flex-wrap">
            <div class="px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
              <i class="fa-solid fa-hard-drive text-cyan-400"></i>
              <span id="db-storage-stat">148.5 MB / 2 GB Terpakai</span>
            </div>

            <button id="btn-open-add-file" class="px-4 py-2.5 rounded-xl btn-electric text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-2 glow-box-cyan">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <span>+ Simpan File Baru</span>
            </button>
          </div>

        </div>

        <!-- Two Columns: Left = Folder Navigation, Right = File List Explorer -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Left: Folder Categories List -->
          <div class="lg:col-span-4 space-y-3" id="db-folders-container">
            <!-- Rendered by main.js -->
          </div>

          <!-- Right: Active Folder Header & Files Explorer Table -->
          <div class="lg:col-span-8 flex flex-col">
            
            <!-- Folder Header Card -->
            <div class="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20 mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <span id="active-folder-icon" class="text-cyan-400 text-base"></span>
                  <h3 id="active-folder-title" class="text-base font-tech font-bold text-white">Semua Berkas</h3>
                </div>
                <p id="active-folder-desc" class="text-xs text-slate-400 mt-0.5">Menampilkan berkas yang tersimpan di dalam database.</p>
              </div>
              <div class="flex items-center gap-2.5">
                <span id="active-folder-count" class="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 text-xs font-mono">
                  4 Berkas
                </span>
                <button id="btn-add-file-direct" class="px-3.5 py-1.5 rounded-xl btn-electric text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 transition-all">
                  <i class="fa-solid fa-plus text-xs"></i>
                  <span>Upload ke Folder Ini</span>
                </button>
              </div>
            </div>

            <!-- Files List Container -->
            <div class="rounded-2xl border border-cyan-500/20 bg-slate-950/60 overflow-hidden flex-1">
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead>
                    <tr class="text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-slate-900/60">
                      <th class="py-3 px-4">Nama Berkas & Deskripsi</th>
                      <th class="py-3 px-3">Tipe</th>
                      <th class="py-3 px-3">Ukuran</th>
                      <th class="py-3 px-3">Tanggal</th>
                      <th class="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody id="db-files-tbody">
                    <!-- Rendered by main.js -->
                  </tbody>
                </table>
              </div>
              <!-- Empty State Notification -->
              <div id="db-empty-state" class="hidden p-8 text-center text-slate-400">
                <i class="fa-solid fa-folder-open text-3xl text-slate-600 mb-3"></i>
                <p class="text-sm font-mono">Tidak ada berkas yang cocok dengan pencarian.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- ==========================================================================
         PORTFOLIO PROJECTS SECTION
         ========================================================================== -->
    <section id="projects" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <i class="fa-solid fa-folder-open text-xs"></i>
          <span>SHOWCASE KARYA</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-tech font-extrabold text-white mb-3 tracking-tight">
          Portofolio <span class="text-cyan-400">Proyek Terpilih</span>
        </h2>
        <p class="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
          Studi kasus sistem monitoring, database data logging, dan otomasi kendali yang telah berhasil dibangun dan diuji.
        </p>
      </div>

      <!-- Filter Category Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        <button class="filter-btn active px-5 py-2 rounded-xl text-xs font-tech font-semibold border border-cyan-500/30 text-slate-300 hover:border-cyan-400 transition-all" data-filter="all">
          Semua Proyek
        </button>
        <button class="filter-btn px-5 py-2 rounded-xl text-xs font-tech font-semibold border border-cyan-500/30 text-slate-300 hover:border-cyan-400 transition-all" data-filter="iot">
          IoT & Web Monitoring
        </button>
        <button class="filter-btn px-5 py-2 rounded-xl text-xs font-tech font-semibold border border-cyan-500/30 text-slate-300 hover:border-cyan-400 transition-all" data-filter="database">
          Database Logging
        </button>
        <button class="filter-btn px-5 py-2 rounded-xl text-xs font-tech font-semibold border border-cyan-500/30 text-slate-300 hover:border-cyan-400 transition-all" data-filter="automation">
          Otomasi & SCADA
        </button>
      </div>

      <!-- Projects Grid Container -->
      <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Rendered dynamically by main.js -->
      </div>
    </section>

    <!-- ==========================================================================
         TIMELINE & EXPERIENCE SECTION
         ========================================================================== -->
    <section id="experience" class="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <i class="fa-solid fa-timeline text-xs"></i>
          <span>RIWAYAT KARIER & STUDI</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-tech font-extrabold text-white mb-3 tracking-tight">
          Pengalaman & <span class="text-cyan-400">Pendidikan</span>
        </h2>
        <p class="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
          Perjalanan profesional dalam mendalami teknik elektro dan sistem komputasi data.
        </p>
      </div>

      <!-- Timeline Container -->
      <div id="timeline-container" class="space-y-4">
        <!-- Rendered dynamically by main.js -->
      </div>
    </section>

    <!-- ==========================================================================
         CONTACT SECTION
         ========================================================================== -->
    <section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="circuit-card rounded-3xl p-8 md:p-12 border border-cyan-500/30 bg-slate-900/80 shadow-2xl relative overflow-hidden">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Left Contact Info -->
          <div class="lg:col-span-5">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
              <i class="fa-solid fa-envelope-open-text text-xs"></i>
              <span>HUBUNGI SAYA</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-tech font-extrabold text-white mb-4 tracking-tight">
              Mulai Kolaborasi <span class="text-cyan-400">Proyek Anda</span>
            </h2>
            <p class="text-slate-300 text-sm leading-relaxed mb-8">
              Punya kebutuhan sistem monitoring energi listrik, integrasi sensor ke database, atau pembuatan dashboard IoT? Mari diskusikan kebutuhan teknis Anda bersama saya.
            </p>

            <div class="space-y-5">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block">Email Langsung</span>
                  <span id="contact-email" class="text-sm font-semibold text-white">engineer.listrik@example.com</span>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                  <i class="fa-brands fa-whatsapp"></i>
                </div>
                <div>
                  <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block">WhatsApp Cepat</span>
                  <span id="contact-whatsapp" class="text-sm font-semibold text-white">+62 812 3456 7890</span>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block">Lokasi</span>
                  <span class="text-sm font-semibold text-white">Indonesia (Tersedia Remote & On-Site)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Contact Form -->
          <div class="lg:col-span-7">
            <form id="contact-form" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <input type="text" id="form-name" required placeholder="Contoh: Budi Santoso" class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors">
                </div>
                <div>
                  <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">Alamat Email</label>
                  <input type="email" id="form-email" required placeholder="budi@example.com" class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors">
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">Kebutuhan Proyek</label>
                <select id="form-project-type" class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-sm transition-colors">
                  <option value="Sistem Monitoring Daya Listrik Web">Sistem Monitoring Daya Listrik Web</option>
                  <option value="Logging Data Sensor ke Database">Logging Data Sensor ke Database (MySQL/PostgreSQL)</option>
                  <option value="Industrial Web SCADA & Otomasi">Industrial Web SCADA & Otomasi</option>
                  <option value="Firmware Mikrokontroler (ESP32/PLC)">Firmware Mikrokontroler (ESP32/PLC)</option>
                  <option value="Konsultasi Teknis Lainnya">Konsultasi Teknis Lainnya</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">Pesan atau Rincian Proyek</label>
                <textarea id="form-message" rows="4" required placeholder="Tuliskan spesifikasi sistem atau kendala yang ingin Anda selesaikan..." class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors"></textarea>
              </div>

              <button type="submit" class="w-full py-3.5 rounded-xl btn-electric text-xs font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2 glow-box-cyan">
                <i class="fa-brands fa-whatsapp text-base"></i>
                <span>Kirim Pesan Langsung via WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>

  </main>

  <!-- ==========================================================================
       FOOTER
       ========================================================================== -->
  <footer class="relative z-10 border-t border-cyan-500/20 bg-slate-950/90 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
      
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg overflow-hidden border border-cyan-400/40 bg-slate-950 flex items-center justify-center p-0.5">
          <img src="assets/logo-dcc.jpg" alt="Logo DCC Sumbawa" class="w-full h-full object-cover rounded">
        </div>
        <div>
          <span class="text-sm font-tech font-bold text-white tracking-wider">DCC SUMBAWA — ELECTRICAL & WEB DB</span>
          <span class="block text-[11px] font-mono text-slate-400">Distribution Control Center & Industrial Telemetry System</span>
        </div>
      </div>

      <div class="text-xs font-mono text-slate-400 text-center sm:text-right">
        <span>© 2026 Portofolio Electrical Engineering. All Rights Reserved.</span>
        <div class="mt-1 text-emerald-400 flex items-center justify-center sm:justify-end gap-1.5 text-[11px]">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Sistem Telemetri: Beroperasi Normal</span>
        </div>
      </div>

    </div>
  </footer>

  <!-- ==========================================================================
       BACK TO TOP FLOATING BUTTON
       ========================================================================== -->
  <button id="back-to-top" class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg opacity-0 pointer-events-none hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300" title="Kembali ke Atas">
    <i class="fa-solid fa-chevron-up text-sm"></i>
  </button>

  <!-- ==========================================================================
       PROJECT DETAIL MODAL POPUP
       ========================================================================== -->
  <div id="project-modal" class="modal-overlay modal-hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
    <div class="modal-content w-full max-w-3xl max-h-[90vh] overflow-y-auto circuit-card rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 md:p-8 shadow-2xl relative">
      
      <!-- Close Button -->
      <button onclick="closeProjectModal()" class="absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>

      <!-- Modal Header -->
      <div class="mb-4 pr-12">
        <span id="modal-badge" class="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
          Kategori Proyek
        </span>
        <h3 id="modal-title" class="text-2xl sm:text-3xl font-tech font-extrabold text-white mt-3 mb-2">
          Judul Proyek
        </h3>
      </div>

      <!-- Modal Image -->
      <div class="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-cyan-500/20 bg-slate-900">
        <img id="modal-image" src="" alt="Project Preview" class="w-full h-full object-cover">
      </div>

      <!-- Description -->
      <div class="mb-6">
        <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Deskripsi & Solusi Sistem</h4>
        <p id="modal-desc" class="text-slate-300 text-sm leading-relaxed">
          Rincian deskripsi sistem...
        </p>
      </div>

      <!-- Architecture Pipeline Diagram -->
      <div class="mb-6 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30">
        <h4 class="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <i class="fa-solid fa-network-wired text-xs"></i>
          Alur Arsitektur Sistem (Hardware to DB)
        </h4>
        <p id="modal-architecture" class="text-xs font-mono text-slate-200">
          Sensor ➔ Microcontroller ➔ API ➔ Database ➔ Web UI
        </p>
      </div>

      <!-- Highlights -->
      <div class="mb-6">
        <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Keunggulan & Parameter Kunci</h4>
        <ul id="modal-highlights" class="space-y-2">
          <!-- Populated by main.js -->
        </ul>
      </div>

      <!-- Tech Stack Badges -->
      <div class="mb-8">
        <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Teknologi yang Digunakan</h4>
        <div id="modal-tech" class="flex flex-wrap gap-2">
          <!-- Populated by main.js -->
        </div>
      </div>

      <!-- Modal Footer Action -->
      <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
        <button onclick="closeProjectModal()" class="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-tech text-slate-300 hover:border-slate-500">
          Tutup
        </button>
        <a id="modal-code-btn" href="https://github.com" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs font-tech text-cyan-300 hover:bg-slate-800 flex items-center gap-2">
          <i class="fa-brands fa-github text-sm"></i>
          <span>Source Code</span>
        </a>
        <a id="modal-demo-btn" href="#live-simulator" onclick="closeProjectModal()" class="px-6 py-2.5 rounded-xl btn-electric text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-2">
          <i class="fa-solid fa-play text-xs"></i>
          <span>Coba di Simulator</span>
        </a>
      </div>

    </div>
  </div>

  <!-- ==========================================================================
       MODAL: SIMPAN / UPLOAD FILE BARU KE DATABASE
       ========================================================================== -->
  <div id="modal-add-file" class="modal-overlay modal-hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
    <div class="modal-content w-full max-w-lg circuit-card rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 sm:p-8 shadow-2xl relative">
      
      <!-- Close Button -->
      <button id="btn-close-add-file" class="absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>

      <!-- Modal Header -->
      <div class="mb-6 pr-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono mb-2">
          <i class="fa-solid fa-cloud-arrow-up"></i>
          <span>SIMPAN KE DATABASE</span>
        </div>
        <h3 class="text-xl font-tech font-bold text-white">Simpan Berkas Baru</h3>
        <p class="text-xs text-slate-400 mt-1">Tambahkan dokumen teknik, skema SLD, log sheet, atau script ke folder database.</p>
      </div>

      <!-- Add File Form -->
      <form id="form-add-file" class="space-y-4">
        
        <!-- Interactive File Dropzone & Real File Picker -->
        <div>
          <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">Pilih Berkas Komputer</label>
          <div id="dropzone-area" class="border-2 border-dashed border-cyan-500/40 rounded-2xl p-5 text-center bg-slate-900/50 hover:bg-slate-900/80 hover:border-cyan-400 transition-all cursor-pointer group relative">
            <input type="file" id="file-picker-input" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
            <div class="w-11 h-11 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl mb-2 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-cloud-arrow-up"></i>
            </div>
            <p class="text-xs font-tech font-bold text-white mb-0.5">
              Klik untuk Jelajahi Berkas atau Tarik File ke Sini
            </p>
            <p class="text-[11px] font-mono text-slate-400">
              Mendukung semua format: PDF, Word, Excel, DWG, SQL, Gambar, dsb.
            </p>
            <!-- Badge File Terpilih -->
            <div id="selected-file-badge" class="hidden mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/90 text-cyan-300 border border-cyan-500/60 text-xs font-mono">
              <i id="selected-file-icon" class="fa-solid fa-file text-cyan-400"></i>
              <span id="selected-file-name" class="font-bold">Nama_File.pdf</span>
              <span id="selected-file-size" class="text-slate-400 text-[10px]">(0 KB)</span>
            </div>
          </div>
        </div>

        <!-- Nama Berkas & Folder Tujuan -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">Folder Tujuan</label>
            <select id="add-file-folder" class="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs font-mono transition-colors">
              <option value="folder-sld">📁 SLD & Gambar Teknik</option>
              <option value="folder-sop">📁 SOP & Instruksi Kerja DCC</option>
              <option value="folder-log">📁 Log Sheet & Rekap Histori</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">Tipe Dokumen</label>
            <select id="add-file-type" class="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs font-mono transition-colors">
              <option value="pdf">PDF Document</option>
              <option value="dwg">AutoCAD DWG</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="word">Word Document</option>
              <option value="sql">SQL Database Dump</option>
              <option value="csv">CSV Telemetry Log</option>
              <option value="binary">Firmware Binary (.bin)</option>
              <option value="code">Python / Script (.py)</option>
              <option value="image">Gambar / Foto (JPG/PNG)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">Nama Berkas</label>
          <input type="text" id="add-file-name" required placeholder="Pilih berkas di atas atau ketik nama berkas..." class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono transition-colors">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">Versi / Edisi</label>
            <input type="text" id="add-file-version" placeholder="Contoh: v1.0 / Rev 2 / Final" class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono transition-colors">
          </div>
          <div>
            <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">Ukuran File</label>
            <input type="text" id="add-file-size" placeholder="Terisi otomatis saat memilih file" class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono transition-colors">
          </div>
        </div>

        <div>
          <label class="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">Keterangan Dokumen</label>
          <textarea id="add-file-desc" rows="2" placeholder="Catatan singkat mengenai isi dokumen ini..." class="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono transition-colors"></textarea>
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
          <button type="button" id="btn-cancel-add-file" class="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-tech text-slate-300 hover:border-slate-500">
            Batal
          </button>
          <button type="submit" class="px-5 py-2.5 rounded-xl btn-electric text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-2 glow-box-cyan">
            <i class="fa-solid fa-database"></i>
            <span>Simpan ke Database</span>
          </button>
        </div>
      </form>

    </div>
  </div>

  <!-- ==========================================================================
       MODAL: PREVIEW RINCIAN BERKAS DATABASE
       ========================================================================== -->
  <div id="modal-preview-file" class="modal-overlay modal-hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
    <div class="modal-content w-full max-w-md circuit-card rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 sm:p-8 shadow-2xl relative">
      <button id="btn-close-preview-file" class="absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>

      <div class="text-center mb-6">
        <div id="preview-file-icon-box" class="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-3xl mb-4 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
          <i id="preview-file-icon" class="fa-solid fa-file-pdf"></i>
        </div>
        <span id="preview-file-type" class="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
          PDF DOCUMENT
        </span>
        <h3 id="preview-file-title" class="text-lg font-tech font-bold text-white mt-3 mb-1 break-words">
          Nama_Berkas.pdf
        </h3>
        <p id="preview-file-folder-tag" class="text-xs font-mono text-slate-400">Folder: SLD & Gambar Teknik</p>
      </div>

      <div class="space-y-2.5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono mb-6">
        <div class="flex justify-between">
          <span class="text-slate-400">Status Penyimpanan:</span>
          <span class="text-emerald-400 font-bold flex items-center gap-1">
            <i class="fa-solid fa-check-circle text-[10px]"></i> Tersimpan di Database
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Ukuran Berkas:</span>
          <span id="preview-file-size" class="text-white">4.8 MB</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Tanggal Upload:</span>
          <span id="preview-file-date" class="text-white">12 Sep 2026</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Versi / Edisi:</span>
          <span id="preview-file-version" class="text-cyan-300 font-bold">v3.2</span>
        </div>
        <div class="pt-2 border-t border-slate-800">
          <span class="text-slate-400 block mb-1">Deskripsi:</span>
          <p id="preview-file-desc" class="text-slate-300 normal-case leading-relaxed font-sans">
            Deskripsi lengkap berkas...
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-3">
        <button id="btn-close-preview-alt" class="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-tech text-slate-300 hover:border-slate-500">
          Tutup
        </button>
        <button id="btn-download-preview-file" class="flex-1 py-2.5 rounded-xl btn-electric text-xs font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2">
          <i class="fa-solid fa-download"></i>
          <span>Unduh Berkas</span>
        </button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION POPUP -->
  <div id="db-toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900/95 border border-cyan-400/60 shadow-[0_0_25px_rgba(0,242,254,0.4)] backdrop-blur-xl text-xs font-tech text-white flex items-center gap-3 transition-all duration-300 opacity-0 pointer-events-none translate-y-4">
    <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
      <i class="fa-solid fa-check text-xs"></i>
    </div>
    <span id="db-toast-msg">Notifikasi</span>
  </div>

  <!-- APPLICATION SCRIPTS -->
  <!-- 1. Portfolio Data Source -->
  <script src="js/data.js"></script>
  <!-- 2. Circuit Canvas Background Animation -->
  <script src="js/canvas-bg.js"></script>
  <!-- 3. Main Interactivity & Simulator Logic -->
  <script src="js/main.js"></script>

</body>
</html>
