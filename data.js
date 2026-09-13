/**
 * PORTFOLIO DATA CONFIGURATION
 * Anda dapat mengubah semua isi teks, nama, proyek, keahlian, dan kontak
 * di dalam file ini dengan sangat mudah.
 */

const portfolioData = {
  // Informasi Profil Utama
  personal: {
    name: "Engineering Listrik & Web Developer",
    fullName: "Electrical Engineer & Web-Database Specialist",
    shortRole: "Electrical Engineer",
    roles: [
      "Electrical Engineer — DCC Sumbawa",
      "IoT & Web Telemetry Developer",
      "Sensor-to-Database Specialist",
      "SCADA & Smart Power Monitoring",
      "Industrial Automation Programmer"
    ],
    status: "🟢 Tersedia untuk Proyek & Kolaborasi",
    bio: "Saya adalah seorang **Electrical Engineer di DCC Sumbawa** yang berfokus pada jembatan antara **perangkat keras kelistrikan (hardware/sensor/PLC)** dan **sistem perangkat lunak (web & database)**. Berpengalaman merancang sistem akuisisi data otomatis, mencatat log data sensor ke database secara real-time, serta membangun dashboard web monitoring yang responsif dan interaktif untuk analisis performa sistem kelistrikan.",
    location: "Sumbawa, Indonesia",
    email: "engineer.listrik@example.com",
    whatsapp: "6281234567890", // Ganti dengan nomor WhatsApp aktif (awali dengan 62)
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    resumeLink: "#contact", // Tautan ke CV/Resume PDF Anda
    stats: [
      { label: "Proyek Kelistrikan & IoT", value: "30+", icon: "fa-solid fa-bolt" },
      { label: "Data Sensor Tersimpan", value: "5M+", icon: "fa-solid fa-database" },
      { label: "Uptime Sistem Web", value: "99.9%", icon: "fa-solid fa-server" },
      { label: "Tahun Pengalaman", value: "4+", icon: "fa-solid fa-microchip" }
    ]
  },

  // Layanan / Solusi yang Ditawarkan
  services: [
    {
      icon: "fa-solid fa-chart-line",
      title: "Smart Power & Energy Monitoring",
      description: "Membangun dashboard web untuk memantau konsumsi energi listrik, tegangan, arus, daya, dan power factor secara real-time dengan grafik interaktif dan notifikasi alarm."
    },
    {
      icon: "fa-solid fa-database",
      title: "Sensor-to-Database Logging",
      description: "Integrasi sistem pembacaan sensor listrik (PZEM, CT, Modbus, PLC) melalui ESP32/microcontroller dan pengiriman otomatis ke database (MySQL, PostgreSQL, InfluxDB) via REST API atau WebSocket."
    },
    {
      icon: "fa-solid fa-industry",
      title: "Industrial Automation & Web SCADA",
      description: "Pengembangan antarmuka web untuk sistem kendali otomatis, pemantauan mesin industri, pencatatan downtime, dan visualisasi status operasional perangkat kelistrikan."
    },
    {
      icon: "fa-solid fa-microchip",
      title: "Firmware & Hardware Prototyping",
      description: "Pemrograman mikrokontroler (ESP32, STM32, Arduino, Raspberry Pi) dengan protokol komunikasi industri seperti Modbus RTU/TCP, MQTT, HTTP, dan I2C/SPI."
    }
  ],

  // Database Berkas & Dokumen Penting DCC Sumbawa
  databaseVault: {
    title: "Database Berkas & Dokumen Penting",
    subtitle: "Pusat arsip digital terstruktur untuk dokumen teknis, Single Line Diagram (SLD), SOP operasional DCC, dan data logger sistem tenaga kelistrikan.",
    totalStorage: "2 GB",
    usedStorage: "148.5 MB",
    folders: [
      {
        id: "folder-sld",
        name: "SLD & Gambar Teknik",
        icon: "fa-solid fa-diagram-project",
        color: "text-amber-400",
        badge: "Skema Jaringan",
        description: "Dokumen Single Line Diagram gardu induk, skema proteksi, dan wiring diagram panel kontrol.",
        files: [
          {
            id: "f-101",
            name: "SLD_Gardu_Induk_Sumbawa_150kV_20kV_Rev3.pdf",
            type: "pdf",
            size: "4.8 MB",
            date: "12 Sep 2026",
            version: "v3.2",
            desc: "Single Line Diagram lengkap Gardu Induk Sumbawa beserta penyulang 20kV.",
            tags: ["SLD", "150kV", "20kV"]
          },
          {
            id: "f-102",
            name: "Wiring_Diagram_RTU_Telemetri_DCC_Sumbawa.dwg",
            type: "dwg",
            size: "12.4 MB",
            date: "28 Aug 2026",
            version: "Final",
            desc: "Gambar pengawatan terminal RTU telemetri ke panel kontrol proteksi.",
            tags: ["Wiring", "RTU", "AutoCAD"]
          },
          {
            id: "f-103",
            name: "Peta_Geografis_Penyulang_20kV_Sumbawa_Besar.pdf",
            type: "pdf",
            size: "8.2 MB",
            date: "15 Jul 2026",
            version: "v2.0",
            desc: "Peta rute jalur kabel tanah & saluran udara tegangan menengah (SUTM).",
            tags: ["GIS", "Penyulang", "Peta"]
          },
          {
            id: "f-104",
            name: "Setting_Relay_Proteksi_Overcurrent_GI_Sumbawa.pdf",
            type: "pdf",
            size: "2.1 MB",
            date: "04 Jun 2026",
            version: "Approved",
            desc: "Daftar setting waktu & kurva trip relay arus lebih (OCR/GFR) penyulang.",
            tags: ["Proteksi", "Relay", "Setting"]
          }
        ]
      },
      {
        id: "folder-sop",
        name: "SOP & Instruksi Kerja DCC",
        icon: "fa-solid fa-book-bookmark",
        color: "text-cyan-400",
        badge: "Standar Operasi",
        description: "Standar Operasional Prosedur manuver beban, isolasi gangguan, dan keselamatan kerja (K3).",
        files: [
          {
            id: "f-201",
            name: "SOP_Manuver_Beban_Penyulang_20kV_DCC_Sumbawa.pdf",
            type: "pdf",
            size: "3.5 MB",
            date: "01 Sep 2026",
            version: "2026 Ed.",
            desc: "Prosedur baku pengalihan beban antar penyulang saat pekerjaan pemeliharaan.",
            tags: ["SOP", "Manuver", "20kV"]
          },
          {
            id: "f-202",
            name: "Instruksi_Kerja_Penanganan_Blackout_Sistem_Sumbawa.pdf",
            type: "pdf",
            size: "2.8 MB",
            date: "18 Aug 2026",
            version: "Vital",
            desc: "Panduan black-start dan tahapan pemulihan bertahap saat terjadi blackout kelistrikan.",
            tags: ["Emergency", "Blackout", "Blackstart"]
          },
          {
            id: "f-203",
            name: "Pedoman_K3_Keselamatan_Kerja_Operator_DCC.pdf",
            type: "pdf",
            size: "5.1 MB",
            date: "10 Mei 2026",
            version: "K3-2026",
            desc: "Standar K3 kelistrikan, APD, dan SOP izin kerja (Working Permit) bertegangan tinggi.",
            tags: ["K3", "Keselamatan", "Regulasi"]
          },
          {
            id: "f-204",
            name: "Manual_Book_SCADA_Survalent_DCC_Sumbawa.pdf",
            type: "pdf",
            size: "15.6 MB",
            date: "20 Apr 2026",
            version: "Manual",
            desc: "Panduan pengoperasian human-machine interface (HMI) SCADA untuk dispatcher.",
            tags: ["SCADA", "HMI", "Dispatcher"]
          }
        ]
      },
      {
        id: "folder-log",
        name: "Log Sheet & Rekap Histori Beban",
        icon: "fa-solid fa-table-list",
        color: "text-emerald-400",
        badge: "Data Telemetri",
        description: "Rekapitulasi data beban puncak harian, ekspor kWh produksi pembangkit, dan database trip.",
        files: [
          {
            id: "f-301",
            name: "Rekap_Beban_Puncak_Harian_Sumbawa_2026.xlsx",
            type: "excel",
            size: "1.8 MB",
            date: "13 Sep 2026",
            version: "Live",
            desc: "Lembar kerja harian beban sistem Sumbawa (MW, MVAR, Tegangan Busbar).",
            tags: ["Excel", "Beban Puncak", "Harian"]
          },
          {
            id: "f-302",
            name: "Database_Trip_Gangguan_Penyulang_2026.sql",
            type: "sql",
            size: "6.4 MB",
            date: "10 Sep 2026",
            version: "Dump",
            desc: "Tabel SQL histori gangguan penyulang, durasi padam, dan estimasi ENS (kWh hilang).",
            tags: ["SQL", "Gangguan", "Relational DB"]
          },
          {
            id: "f-303",
            name: "Data_Kwh_Produksi_PLTD_PLTS_Sumbawa.csv",
            type: "csv",
            size: "940 KB",
            date: "05 Sep 2026",
            version: "Telemetry",
            desc: "Data logging kWh produksi harian pembangkit diesel dan tenaga surya (PLTS).",
            tags: ["CSV", "Produksi", "Pembangkit"]
          },
          {
            id: "f-304",
            name: "Laporan_Evaluasi_SAIDI_SAIFI_Triwulan_2.pdf",
            type: "pdf",
            size: "4.2 MB",
            date: "01 Jul 2026",
            version: "Q2",
            desc: "Analisis indeks keandalan penyaluran listrik wilayah Sumbawa.",
            tags: ["SAIDI", "SAIFI", "Kinerja"]
          }
        ]
      }
    ]
  },

  // Portofolio Proyek
  projects: [
    {
      id: "proj-1",
      title: "Smart 3-Phase Energy Monitoring & Cloud Database",
      category: "iot",
      categoryLabel: "IoT & Web Monitoring",
      badge: "Featured System",
      shortDesc: "Sistem monitoring daya listrik 3-fasa real-time berbasis ESP32 dan PZEM-004T yang mencatat data tegangan, arus, dan kWh ke database terpusat dengan dashboard web interaktif.",
      fullDesc: "Proyek ini dirancang untuk mengatasi kesulitan pencatatan manual konsumsi energi pada panel distribusi utama. Menggunakan mikrokontroler ESP32 yang terhubung ke 3 sensor PZEM-004T. Setiap 2 detik, data dikirimkan via REST API / MQTT ke server database MySQL. Website dashboard menampilkan grafik konsumsi beban, deteksi ketidakseimbangan beban antar fasa, dan kalkulasi estimasi tagihan listrik bulanan.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      tech: ["ESP32", "PZEM-004T", "MySQL", "REST API", "Chart.js", "Tailwind CSS"],
      highlights: [
        "Pencatatan data 3-fasa (R, S, T) setiap 2 detik",
        "Algoritma deteksi overload otomatis dengan alarm email/WhatsApp",
        "Penyimpanan jutaan log data historis dengan pengelompokan harian/bulanan",
        "Akurasi pembacaan energi mencapai 99.2%"
      ],
      architecture: "Sensor Arus & Tegangan ➔ ESP32 Microcontroller ➔ REST API Server ➔ MySQL Database ➔ Web Telemetry Dashboard",
      demoLink: "#live-simulator",
      codeLink: "https://github.com"
    },
    {
      id: "proj-2",
      title: "Automated Industrial Power Logging & Machine OEE Dashboard",
      category: "database",
      categoryLabel: "Database Logging",
      badge: "Industrial IoT",
      shortDesc: "Integrasi PLC dan power meter Modbus RTU ke database PostgreSQL untuk mencatat histori daya mesin produksi serta mengukur efisiensi kerja mesin.",
      fullDesc: "Sistem pengumpulan data terpusat dari 8 mesin pabrik yang memanfaatkan gateway Modbus-to-Ethernet. Data arus beban mesin digunakan untuk menentukan status mesin (Idle, Running, Breakdown). Log data disimpan ke PostgreSQL dengan partisi waktu, dan antarmuka web menyajikan histori tren energi serta laporan OEE (Overall Equipment Effectiveness) harian.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      tech: ["Modbus RTU/TCP", "PostgreSQL", "Python Backend", "Docker", "WebSocket", "Web UI"],
      highlights: [
        "Integrasi 8 unit power meter Schneider via RS485 Modbus",
        "Database logging otomatis setiap 1 detik tanpa latency",
        "Fitur ekspor laporan otomatis format Excel dan PDF",
        "Web visualisasi live status mesin (Run / Stop / Fault)"
      ],
      architecture: "Modbus RS485 Multi-drop ➔ Industrial Gateway ➔ Python Collector ➔ PostgreSQL ➔ Realtime Web UI",
      demoLink: "#live-simulator",
      codeLink: "https://github.com"
    },
    {
      id: "proj-3",
      title: "Solar PV Farm Telemetry & Battery Health Monitor",
      category: "iot",
      categoryLabel: "IoT & Web Monitoring",
      badge: "Green Energy",
      shortDesc: "Sistem monitoring stasiun tenaga surya (PV) dengan pencatatan efisiensi panel, arus charging MPPT, dan kesehatan baterai lithium ke InfluxDB time-series database.",
      fullDesc: "Memantau performa PLTS off-grid berkapasitas 10 kWp. Mengakuisisi data irradiasi matahari, suhu panel, tegangan string PV, dan State of Charge (SoC) baterai. Data dikirimkan melalui transmisi nirkabel LoRa / 4G ke database InfluxDB. Web dashboard memfasilitasi analisis tren penurunan kapasitas baterai dan prediksi kebutuhan maintenance panel.",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      tech: ["MPPT Controller", "InfluxDB", "LoRa Gateway", "Node.js", "Chart.js", "Grafana Web"],
      highlights: [
        "Penyimpanan time-series data frekuensi tinggi dengan InfluxDB",
        "Monitoring efisiensi konversi daya panel surya secara real-time",
        "Kalkulasi estimasi usia pakai (SOH) baterai Lithium",
        "Dashboard responsif dapat diakses via smartphone"
      ],
      architecture: "Solar MPPT & Shunt ➔ ESP32 LoRa Transmitter ➔ Gateway ➔ InfluxDB ➔ Telemetry Web",
      demoLink: "#live-simulator",
      codeLink: "https://github.com"
    },
    {
      id: "proj-4",
      title: "Transformer Substation Temperature & Load Logger",
      category: "automation",
      categoryLabel: "Otomasi & SCADA",
      badge: "High Voltage Tech",
      shortDesc: "Sistem monitoring suhu belitan trafo distribusi 20kV dan arus beban dengan peringatan dini (early warning) dan logging kontinu ke database MySQL.",
      fullDesc: "Trafo distribusi rentan mengalami kerusakan jika beroperasi pada suhu berlebih. Sistem ini menggunakan sensor suhu PT100 RTD dan CT sensor untuk mencatat suhu dan beban fasa secara kontinu. Data disimpan ke database MySQL lokal dan direplikasi ke server pusat, dilengkapi antarmuka web SCADA mini untuk operator teknis.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
      tech: ["PT100 RTD", "Current Transformer", "STM32", "MySQL", "PHP / JS", "Web SCADA"],
      highlights: [
        "Deteksi kenaikan suhu trafo dengan alarm multi-level",
        "Data logging 24/7 dengan auto-backup database",
        "Peta interaktif status trafo di beberapa titik gardu",
        "Laporan profil beban harian (load curve)"
      ],
      architecture: "PT100 Transducer & CT ➔ ADC STM32 ➔ Ethernet Module ➔ MySQL Server ➔ SCADA Web Client",
      demoLink: "#live-simulator",
      codeLink: "https://github.com"
    },
    {
      id: "proj-5",
      title: "Web-Based Circuit Breaker Trip Logger & Event Recorder",
      category: "database",
      categoryLabel: "Database Logging",
      badge: "System Protection",
      shortDesc: "Sistem pencatatan event trip pengaman listrik berkecepatan tinggi ke database dengan timestamp milidetik dan visualisasi gelombang arus gangguan.",
      fullDesc: "Merekam kejadian trip (overcurrent, ground fault, short circuit) dengan presisi waktu tinggi (millisecond timestamp). Ketika trip terjadi, mikrokontroler membekukan snapshot gelombang arus sebelum dan sesudah trip, lalu mengirimkannya ke database untuk divisualisasikan pada website sebagai osiloskop virtual untuk analisis penyebab gangguan kelistrikan.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      tech: ["High-speed ADC", "ESP32", "PostgreSQL", "WebSocket", "Canvas Waveform", "JavaScript"],
      highlights: [
        "Pencatatan event gangguan listrik dengan akurasi 1 milidetik",
        "Visualisasi osiloskop gelombang arus trip pada web",
        "Arsip digital penyebab gangguan untuk tim investigasi proteksi",
        "Notifikasi instan saat saklar pemutus (CB) berubah status"
      ],
      architecture: "Protection Relay Signal ➔ ESP32 High-speed Interrupt ➔ WebSocket Stream ➔ PostgreSQL ➔ Fault Analyzer Web",
      demoLink: "#live-simulator",
      codeLink: "https://github.com"
    },
    {
      id: "proj-6",
      title: "Smart Building Power Quality & Harmonics Monitoring Web",
      category: "automation",
      categoryLabel: "Otomasi & SCADA",
      badge: "Power Quality",
      shortDesc: "Aplikasi web untuk monitoring kualitas daya listrik (Total Harmonic Distortion - THD, voltage sag/swell) dan database log deviasi kualitas daya.",
      fullDesc: "Menganalisis kualitas daya listrik gedung komersial untuk mencegah kerusakan peralatan elektronik sensitif. Menghitung persentase THD tegangan dan arus, merekam kejadian tegangan anjlok (sag) dan lonjakan (swell), serta menyimpannya ke database untuk sertifikasi efisiensi energi bangunan hijau.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      tech: ["FFT Algorithm", "ESP32", "MySQL", "REST API", "ApexCharts", "Bootstrap/Tailwind"],
      highlights: [
        "Analisis spektrum harmonisa listrik hingga orde ke-15",
        "Database log deviasi kualitas daya sesuai standar IEEE 519",
        "Visualisasi diagram fasor dan bentuk gelombang sinusoidal",
        "Fitur kalkulasi penghematan biaya filter harmonisa"
      ],
      architecture: "Power Quality Analyzer ➔ Microcontroller FFT ➔ API Gateway ➔ MySQL Database ➔ Quality Analytics Web",
      demoLink: "#live-simulator",
      codeLink: "https://github.com"
    }
  ],

  // Riwayat Pengalaman & Edukasi
  timeline: [
    {
      period: "2023 - Sekarang",
      role: "Lead Electrical & IoT Web Systems Engineer",
      institution: "Energy & Industrial Automation Projects",
      description: "Memimpin perancangan dan implementasi sistem monitoring daya listrik berbasis web. Menghubungkan ribuan sensor kelistrikan ke database terpusat dan mengembangkan dashboard analitik energi."
    },
    {
      period: "2021 - 2023",
      role: "Electrical Automation & Telemetry Developer",
      institution: "Industrial Technology Solutions",
      description: "Mengembangkan protokol akuisisi data Modbus RTU/TCP, merancang hardware data logger berbasis ESP32/STM32, serta membangun REST API untuk pengiriman log data ke MySQL/PostgreSQL."
    },
    {
      period: "2019 - 2021",
      role: "Electrical & Instrumentation Technician",
      institution: "Power Distribution & Maintenance Co.",
      description: "Melakukan instalasi panel listrik, kalibrasi sensor daya (CT/PT), perakitan sistem proteksi trafo, dan pengujian keandalan perangkat kendali otomatis."
    },
    {
      period: "Pendidikan",
      role: "Sarjana Teknik (S.T.) - Teknik Elektro",
      institution: "Universitas / Institut Teknologi",
      description: "Fokus studi pada Sistem Tenaga Listrik, Sistem Kendali Otomasi, Instrumentasi, dan Pemrograman Mikrokontroler & Sistem Basis Data Terapan."
    }
  ]
};
