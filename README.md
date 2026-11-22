# THE DARK SIDE OF CORRUPTION — Remotion

Dokumenter sinematik tentang korupsi di Indonesia. 1920×1080, 30 FPS, 120 detik, 7 scene.
Satu proyek, **empat gaya visual** (empat composition):

| Composition        | Gaya                | Ciri utama                                                         |
|--------------------|---------------------|--------------------------------------------------------------------|
| `Investigasi`      | Gelap, misterius    | Mesin tik, kotak bukti, scanline, kedip lampu, grain tebal         |
| `Edukasi`          | Infografis & data   | Kartu penjelasan, alur 3 langkah, grafik skor CPI 2020–2025        |
| `Sinematik`        | Dramatis            | Letterbox 2.39:1, tipografi serif, cahaya merah, zoom kamera lambat |
| `MinimalisPremium` | Bersih & elegan     | Tipografi tipis, banyak ruang kosong, garis halus                  |

## Mulai

```bash
npm install
npm run dev                 # Remotion Studio (pratinjau + edit props)
npm run render:investigasi  # -> out/korupsi-investigasi.mp4
npm run render:all          # keempatnya
npm run typecheck
```

Render pertama butuh internet (unduh Chrome headless Remotion dan font Google).

## Struktur

```
src/
  index.ts  Root.tsx  Composition.tsx
  config/    timeline.ts (durasi scene)  content.ts (semua teks & data)
  styles/    themes.ts (4 tema)  VideoContext.tsx
  scenes/    Scene01Opening ... Scene07Final
  components/ KineticText, Illustration, MediaSlot, VisualCard, BarChart,
              SceneFrame, Overlays (grain/vignette/letterbox), Particles
public/audio/ambient.wav   musik sintesis (scripts/make_audio.py)
public/images/             foto opsional
```

## Konfigurasi per scene

Semua lewat props (Studio, atau `--props`):

```bash
npx remotion render Sinematik out/a.mp4 --props='{"sceneSeconds":{"causes":12,"solution":20}}'
```

- `sceneSeconds` — durasi tiap scene (detik); total durasi video mengikuti otomatis.
  Waktu animasi di dalam scene memakai detik absolut, jadi memperpendek scene
  terlalu banyak bisa memotong teks.
- `content` — semua teks, daftar penyebab, data CPI (lihat `src/config/content.ts`).
- `audioFile` — `""` untuk tanpa musik. `musicVolume` 0–1.
- `useImages` + `images` — pakai foto asli, mis.
  `{"useImages":true,"images":{"building":"images/gedung.jpg","road":"images/jalan.jpg"}}`.
  Kunci: building, ruin, documents, money, road, facility, school, community,
  scale, imbalance, shield, brokenShield, eye, blind, reject, decline.
  Foto otomatis di-grade gelap dengan efek Ken Burns.

## Catatan

- Tanpa foto, visual adalah ilustrasi garis prosedural (SVG) yang tergambar
  bertahap. Untuk kesan "realistis", isi `public/images/` dengan foto berlisensi
  atau milik sendiri.
- Data CPI di scene 05 (gaya Edukasi): skor 37, 38, 34, 34, 37, 34 untuk 2020–2025 dan
  peringkat 102, 96, 110, 115, 99, 109, dari Transparency International. Cek ulang ke
  sumber resmi sebelum dipublikasikan.
- Musik latar disintesis, bukan komposisi profesional. Ganti dengan musik
  berlisensi bila perlu.
- Semua animasi memakai `useCurrentFrame`, `interpolate`, `spring`: deterministik
  dan frame-accurate.
