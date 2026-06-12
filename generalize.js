const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/components/Evaluasi.tsx',
    replaces: [
      { from: /materi tata cara sholat/g, to: 'materi Pendidikan Agama Islam' }
    ]
  },
  {
    file: 'src/components/Footer.tsx',
    replaces: [
      { from: /tata cara sholat dengan benar, mudah, dan menyenangkan/g, to: 'Pendidikan Agama Islam secara komprehensif, mudah, dan menyenangkan' },
      { from: /Materi Sholat/g, to: 'Materi Pembelajaran' }
    ]
  },
  {
    file: 'src/components/Interaktif.tsx',
    replaces: [
      { from: /\{box.id\} Sholat/g, to: '{box.id} PAI' }
    ]
  },
  {
    file: 'src/components/Materi.tsx',
    replaces: [
      { from: /Pengertian Sholat/g, to: 'Aqidah Islam' },
      { from: /Secara bahasa, sholat berarti doa. Secara istilah, sholat adalah serangkaian ucapan dan gerakan tertentu yang diawali dengan takbiratul ihram dan diakhiri dengan salam./g, to: 'Aqidah secara bahasa berarti ikatan. Secara istilah, aqidah adalah keyakinan yang kuat dan teguh di dalam hati terhadap rukun iman yang enam.' },
      { from: /Syarat Sah Sholat/g, to: 'Akhlak Terpuji' },
      { from: /1\. Suci dari hadats kecil dan besar\\n2\. Suci badan, pakaian, dan tempat dari najis\\n3\. Menutup aurat\\n4\. Telah masuk waktu sholat\\n5\. Menghadap kiblat/g, to: '1. Jujur dalam perkataan dan perbuatan\\n2. Amanah dan dapat dipercaya\\n3. Hormat kepada orang tua dan guru\\n4. Kasih sayang terhadap sesama\\n5. Sabar dan syukur' },
      { from: /Rukun Sholat/g, to: 'Fiqih Ibadah' },
      { from: /Materi Dasar Tata Cara Sholat/g, to: 'Materi Dasar Pendidikan Agama Islam' },
      { from: /dasar-dasar ibadah sholat/g, to: 'dasar-dasar ajaran Islam' }
    ]
  },
  {
    file: 'src/components/NilaiIslam.tsx',
    replaces: [
      { from: /Makna Spiritual Sholat/g, to: 'Nilai-Nilai Ajaran Islam' },
      { from: /Sholat bukan sekadar kewajiban, melainkan kebutuhan spiritual untuk mendekatkan diri kepada Allah./g, to: 'Pendidikan Agama Islam bukan sekadar hafalan, melainkan pedoman hidup untuk meraih kebahagiaan di dunia dan akhirat.' },
      { from: /Sholat yang khusyuk akan menjadi perisai dari perbuatan buruk dalam kehidupan sehari-hari./g, to: 'Pemahaman agama yang baik akan menjadi perisai dari perbuatan buruk dalam kehidupan sehari-hari.' }
    ]
  },
  {
    file: 'src/components/Petunjuk.tsx',
    replaces: [
      { from: /tata cara sholat/g, to: 'materi PAI' },
      { from: /gerakan sholat/g, to: 'konsep dasar Islam' }
    ]
  },
  {
    file: 'src/components/Tujuan.tsx',
    replaces: [
      { from: /pengertian sholat wajib dan dasar hukumnya/g, to: 'konsep dasar ajaran Islam beserta dalilnya' },
      { from: /syarat dan rukun sholat secara berurutan tanpa tertukar/g, to: 'nilai-nilai keislaman dan menerapkannya dalam kehidupan' },
      { from: /mempraktikkan gerakan dan bacaan sholat dengan tuma'ninah dan khusyuk/g, to: 'menjalankan kewajiban agama dengan baik, benar, dan penuh kesadaran' }
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
