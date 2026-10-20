(function () {
  const FAQ = [
    {
      k: ["layanan", "surat", "domisili", "pengantar", "usaha", "tidak mampu", "ajukan", "pengajuan"],
      a: "Buka menu Pelayanan Warga, pilih jenis layanan (Surat Pengantar, Surat Keterangan Domisili, Surat Keterangan Usaha, Surat Keterangan Tidak Mampu, atau Lainnya), isi keperluannya, lalu klik Kirim Pengajuan.",
      link: ["Buka Pelayanan", "pelayanan.html"]
    },
    {
      k: ["aduan", "keluhan", "aspirasi", "lapor", "foto"],
      a: "Buka menu Pengaduan, tulis judul dan isi keluhanmu, lalu kirim. Foto bersifat opsional, ukurannya 20 KB sampai 10 MB.",
      link: ["Buka Pengaduan", "pengaduan.html"]
    },
    {
      k: ["status", "menunggu", "diproses", "selesai", "proses"],
      a: "Menunggu berarti baru dikirim dan belum ditinjau. Diproses berarti sedang ditindaklanjuti. Selesai berarti sudah tuntas. Statusnya bisa kamu pantau di riwayat pada halaman Pelayanan dan Pengaduan."
    },
    {
      k: ["pengumuman", "kegiatan", "berita", "informasi"],
      a: "Pengumuman terbaru dari RT ada di menu Pengumuman. Tiga yang terbaru juga tampil di dashboard.",
      link: ["Buka Pengumuman", "pengumuman.html"]
    },
    {
      k: ["kontak", "telepon", "telpon", "nomor", "hubungi", "pengurus", "bu rt", "whatsapp", "nunung"],
      kontak: true
    },
    {
      k: ["login", "masuk", "password", "sandi", "akun", "daftar"],
      a: "Login lewat halaman Login memakai email dan password akunmu. Kalau lupa password atau belum punya akun, hubungi Bu RT."
    },
    {
      k: ["profil", "data diri"],
      a: "Data dirimu bisa dilihat di menu Profil Saya.",
      link: ["Buka Profil", "profil.html"]
    }
  ];

  const SAPAAN = ["halo", "hai", "hi", "hello", "pagi", "siang", "sore", "malam"];
  const SAPA_JAWAB = "Halo! Aku asisten Warga RT 02. Ada yang bisa kubantu? Pilih pertanyaan di bawah atau ketik sendiri.";
  const TIDAK_TAHU = "Maaf, aku belum paham pertanyaan itu. Coba pakai kata lain, atau hubungi Bu RT langsung.";
  const CEPAT = [
    "Cara mengajukan layanan",
    "Cara membuat pengaduan",
    "Arti status laporan",
    "Di mana lihat pengumuman",
    "Kontak Bu RT"
  ];

  let KONTAK = { nama: "Bu Nunung", noWa: "6281299404279", rt: "02" };

  function jawabKontak() {
    return {
      a: "Kamu bisa menghubungi Bu RT " + KONTAK.rt + " (" + KONTAK.nama +
         ") lewat WhatsApp di nomor 0" + KONTAK.noWa.slice(2) + ".",
      link: ["Chat WhatsApp " + KONTAK.nama, "https://wa.me/" + KONTAK.noWa]
    };
  }

  async function muatKontak() {
    try {
      const fb = await import("./firebase.js");
      const au = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
      const fs = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

      const user = await new Promise(function (resolve) {
        const berhenti = au.onAuthStateChanged(fb.auth, function (u) {
          berhenti();
          resolve(u);
        });
      });

      if (!user) return;

      const snap = await fs.getDoc(fs.doc(fb.db, "pengaturan", "kontak"));

      if (snap.exists()) {
        const d = snap.data();

        if (d.namaPengurus && /^62[0-9]{8,13}$/.test(d.noWa || "")) {
          KONTAK = { nama: d.namaPengurus, noWa: d.noWa, rt: d.rt || KONTAK.rt };
        }
      }
    } catch (e) {
      console.error("Kontak RT memakai data cadangan:", e);
    }
  }

  muatKontak();

  const css = `
    #cb-btn{position:fixed;right:18px;bottom:18px;width:56px;height:56px;border-radius:50%;border:none;background:#16845b;color:#fff;font-size:25px;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.22);z-index:9999;display:grid;place-items:center;transition:transform .2s,background .2s}
    #cb-btn:hover{background:#106b49;transform:scale(1.06)}
    #cb-badge{position:absolute;top:-2px;right:-2px;width:16px;height:16px;border-radius:50%;background:#c74646;border:2px solid #f6f9f7}
    #cb-box{position:fixed;right:18px;bottom:86px;width:min(350px,92vw);height:min(480px,72vh);background:#fff;border:1px solid #e7eee9;border-radius:18px;box-shadow:0 12px 34px rgba(0,0,0,.2);display:none;flex-direction:column;overflow:hidden;z-index:9999;font-family:'Plus Jakarta Sans',sans-serif}
    #cb-box.buka{display:flex;animation:cbMuncul .18s ease-out}
    @keyframes cbMuncul{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    #cb-head{background:#16845b;color:#fff;padding:13px 15px;display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:700}
    #cb-tutup{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1;padding:0 2px}
    #cb-msgs{flex:1;overflow-y:auto;padding:13px;display:flex;flex-direction:column;gap:9px;background:#f6f9f7}
    .cb-m{max-width:85%;padding:9px 12px;border-radius:13px;font-size:12px;line-height:1.75;overflow-wrap:anywhere}
    .cb-bot{background:#fff;border:1px solid #e7eee9;color:#24352c;align-self:flex-start;border-top-left-radius:4px}
    .cb-user{background:#16845b;color:#fff;align-self:flex-end;border-top-right-radius:4px}
    .cb-link{display:inline-block;margin-top:7px;padding:6px 11px;border-radius:8px;background:#e9f7ef;color:#16845b;font-weight:700;text-decoration:none}
    .cb-ketik{display:flex;gap:4px;padding:12px 14px}
    .cb-ketik i{width:6px;height:6px;border-radius:50%;background:#7c8b81;animation:cbKedip 1s infinite}
    .cb-ketik i:nth-child(2){animation-delay:.15s}
    .cb-ketik i:nth-child(3){animation-delay:.3s}
    @keyframes cbKedip{0%,80%,100%{opacity:.25}40%{opacity:1}}
    #cb-quick{display:flex;flex-wrap:wrap;gap:6px;padding:9px 13px;background:#fff;border-top:1px solid #e7eee9}
    #cb-quick button{background:#fff;border:1px solid #16845b;color:#16845b;border-radius:16px;padding:6px 10px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit}
    #cb-quick button:hover{background:#e9f7ef}
    #cb-form{display:flex;border-top:1px solid #e7eee9}
    #cb-input{flex:1;border:none;padding:12px;font-size:12px;font-family:inherit;outline:none}
    #cb-send{border:none;background:#16845b;color:#fff;padding:0 16px;font-weight:700;cursor:pointer;font-family:inherit}
    #cb-btn:focus-visible,#cb-tutup:focus-visible,#cb-send:focus-visible,#cb-quick button:focus-visible{outline:2px solid #106b49;outline-offset:2px}
    @media (prefers-reduced-motion:reduce){#cb-box.buka{animation:none}.cb-ketik i{animation:none}}
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.id = "cb-btn";
  btn.setAttribute("aria-label", "Buka asisten warga");
  btn.innerHTML = '💬<span id="cb-badge"></span>';

  const box = document.createElement("div");
  box.id = "cb-box";
  box.innerHTML =
    '<div id="cb-head"><span>Asisten Warga RT 02</span>' +
    '<button id="cb-tutup" type="button" aria-label="Tutup">×</button></div>' +
    '<div id="cb-msgs" aria-live="polite"></div>' +
    '<div id="cb-quick"></div>' +
    '<form id="cb-form"><input id="cb-input" placeholder="Ketik pertanyaan..." autocomplete="off" maxlength="200">' +
    '<button id="cb-send" type="submit">Kirim</button></form>';

  document.body.append(btn, box);

  const msgs = box.querySelector("#cb-msgs");
  const quick = box.querySelector("#cb-quick");
  const form = box.querySelector("#cb-form");
  const input = box.querySelector("#cb-input");
  const badge = btn.querySelector("#cb-badge");

  let sudahSapa = false;

  function tambah(teks, dari, link) {
    const el = document.createElement("div");
    el.className = "cb-m " + (dari === "user" ? "cb-user" : "cb-bot");
    el.textContent = teks;

    if (link) {
      el.appendChild(document.createElement("br"));

      const a = document.createElement("a");
      a.className = "cb-link";
      a.href = link[1];
      a.textContent = link[0];

      if (link[1].indexOf("http") === 0) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      el.appendChild(a);
    }

    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function balas(teks, link) {
    const ketik = document.createElement("div");
    ketik.className = "cb-m cb-bot cb-ketik";
    ketik.innerHTML = "<i></i><i></i><i></i>";
    msgs.appendChild(ketik);
    msgs.scrollTop = msgs.scrollHeight;

    setTimeout(function () {
      ketik.remove();
      tambah(teks, "bot", link);
    }, 600);
  }

  function cariJawaban(teks) {
    const t = teks.toLowerCase();
    const kata = t.split(/[^a-z]+/);

    let terbaik = null;
    let skorTerbaik = 0;

    FAQ.forEach(function (f) {
      const skor = f.k.filter(function (k) { return t.indexOf(k) !== -1; }).length;
      if (skor > skorTerbaik) {
        skorTerbaik = skor;
        terbaik = f;
      }
    });

    if (terbaik) return terbaik.kontak ? jawabKontak() : terbaik;
    if (kata.some(function (w) { return SAPAAN.indexOf(w) !== -1; })) return { a: SAPA_JAWAB };

    return {
      a: TIDAK_TAHU,
      link: ["Chat WhatsApp " + KONTAK.nama, "https://wa.me/" + KONTAK.noWa]
    };
  }

  function kirim(teks) {
    const bersih = teks.trim();
    if (!bersih) return;

    tambah(bersih, "user");
    const j = cariJawaban(bersih);
    balas(j.a, j.link);
  }

  CEPAT.forEach(function (q) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = q;
    b.addEventListener("click", function () { kirim(q); });
    quick.appendChild(b);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    kirim(input.value);
    input.value = "";
  });

  function buka() {
    box.classList.add("buka");
    badge.style.display = "none";

    if (!sudahSapa) {
      sudahSapa = true;
      balas(SAPA_JAWAB);
    }

    input.focus();
  }

  function tutup() {
    box.classList.remove("buka");
    btn.focus();
  }

  btn.addEventListener("click", function () {
    if (box.classList.contains("buka")) tutup();
    else buka();
  });

  box.querySelector("#cb-tutup").addEventListener("click", tutup);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && box.classList.contains("buka")) tutup();
  });
})();
