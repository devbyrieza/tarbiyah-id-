const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/components/Tujuan.tsx',
    replaces: [
      { from: /sholat wajib dan dasar hukumnya dengan benar\./g, to: 'ajaran Islam dan dasar hukumnya dengan benar.' },
      { from: /sholat secara berurutan tanpa tertukar\./g, to: 'ajaran Islam dalam kehidupan sehari-hari.' },
      { from: /sholat dengan tuma'ninah dan khusyuk\./g, to: 'ibadah dengan baik, benar, dan penuh kesadaran.' }
    ]
  },
  {
    file: 'src/components/Evaluasi.tsx',
    replaces: [
      { from: /Apa syarat wajib sholat yang paling utama\?/g, to: 'Apa rukun Islam yang pertama?' },
      { from: /\['Baligh dan Berakal', 'Punya uang', 'Sedang bepergian', 'Sudah menikah'\], correct: 0/g, to: "['Membaca Syahadat', 'Mendirikan Sholat', 'Membayar Zakat', 'Puasa Ramadhan'], correct: 0" },
      { from: /Gerakan apa yang mengakhiri ibadah sholat\?/g, to: 'Kitab suci yang diturunkan kepada Nabi Muhammad SAW adalah...' },
      { from: /\['Takbir', 'Ruku\\'', 'Salam', 'Sujud'\], correct: 2/g, to: "['Taurat', 'Zabur', 'Al-Quran', 'Injil'], correct: 2" },
      { from: /Berikut ini adalah hal yang membatalkan sholat, kecuali\.\.\./g, to: 'Malaikat yang bertugas menyampaikan wahyu adalah...' },
      { from: /\['Makan dan minum', 'Tertawa terbahak-bahak', 'Menangis karena takut kepada Allah', 'Terbuka aurat sengaja'\], correct: 2/g, to: "['Malaikat Mikail', 'Malaikat Jibril', 'Malaikat Israfil', 'Malaikat Izrail'], correct: 1" },
      { from: /Membaca surat Al-Fatihah dalam sholat hukumnya\.\.\./g, to: 'Puasa wajib bagi umat Islam dilaksanakan pada bulan...' },
      { from: /\['Sunnah Ab\\'adl', 'Rukun', 'Sunnah Hai\\'at', 'Mubah'\], correct: 1/g, to: "['Syawal', 'Rajab', 'Ramadhan', 'Muharram'], correct: 2" },
      { from: /Apa tujuan utama dari ibadah sholat menurut Surat Al-Ankabut: 45\?/g, to: 'Nabi yang mendapat gelar Khatamul Anbiya (Penutup Para Nabi) adalah...' },
      { from: /\['Mendapat rezeki', 'Mencegah perbuatan keji dan mungkar', 'Dihargai orang lain', 'Menjadi sehat'\], correct: 1/g, to: "['Nabi Musa AS', 'Nabi Isa AS', 'Nabi Ibrahim AS', 'Nabi Muhammad SAW'], correct: 3" }
    ]
  },
  {
    file: 'src/app/layout.tsx',
    replaces: [
      { from: /'sholat'/g, to: "'aqidah'" }
    ]
  }
];

replacements.forEach(({ file, replaces }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replaces.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
