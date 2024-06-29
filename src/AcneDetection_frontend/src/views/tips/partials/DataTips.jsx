import acnecare from '../../../../assets/image/acnecare.webp';
import skincare from '../../../../assets/image/skincare.webp';
import foodcare from '../../../../assets/image/makanan.webp';
import sunscreen from '../../../../assets/image/suncreen.webp'
import nightcare from '../../../../assets/image/nightcare.webp'
import hydration from '../../../../assets/image/hydration.webp';


const DataTips = [

    {
        id: 1,
        title: 'Panduan Perawatan untuk Kulit Berjerawat',
        image: acnecare,
        description: 'Tips dan trik perawatan untuk kulit yang rentan berjerawat',
        content: `
            <h2>Langkah-langkah Perawatan Kulit Berjerawat</h2>
            <p>1. Cuci muka dua kali sehari dengan pembersih yang lembut.</p>
            <p>2. Gunakan toner yang mengandung asam salisilat.</p>
            <p>3. Aplikasikan krim anti jerawat yang mengandung benzoyl peroxide.</p>
            <p>4. Gunakan pelembap yang ringan dan bebas minyak.</p>
        `,
        source: 'halodoc.com'
    },
    {
        id: 2,
        title: 'Makanan yang Baik untuk Kulit Wajah',
        image: foodcare,
        description: 'Daftar makanan yang dapat membantu memperbaiki kesehatan kulit wajah Anda dari dalam.',
        content: `
            <h2>Makanan Sehat untuk Kulit</h2>
            <p>1. Buah-buahan berwarna cerah seperti jeruk dan stroberi.</p>
            <p>2. Sayuran hijau seperti bayam dan brokoli.</p>
            <p>3. Kacang-kacangan dan biji-bijian.</p>
            <p>4. Ikan berlemak seperti salmon dan mackerel.</p>
        `,
        source: '',
    },
    {
        id: 3,
        title: 'Rutinitas Skincare Pagi Hari',
        image: skincare,
        description: 'Panduan langkah-langkah perawatan kulit di pagi hari untuk menjaga kulit tetap sehat dan bersinar sepanjang hari.',
        content: `
            <h2>Rutinitas Skincare Pagi Hari</h2>
            <p>1. Cuci muka dengan pembersih yang lembut.</p>
            <p>2. Aplikasikan toner untuk menyegarkan kulit.</p>
            <p>3. Gunakan serum yang mengandung antioksidan.</p>
            <p>4. Aplikasikan pelembap yang ringan.</p>
            <p>5. Jangan lupa untuk memakai tabir surya dengan SPF minimal 30.</p>
        `,
        source: '',
    },
    {
        id: 4,
        title: 'Tips Mengatasi Kulit Kering',
        image: hydration,
        description: 'Cara-cara efektif untuk mengatasi kulit kering dan menjaga kelembapan kulit Anda sepanjang hari.',
        content: `
            <h2>Cara Mengatasi Kulit Kering</h2>
            <p>1. Hindari mandi dengan air panas.</p>
            <p>2. Gunakan sabun yang lembut dan bebas pewangi.</p>
            <p>3. Oleskan pelembap segera setelah mandi.</p>
            <p>4. Minum cukup air setiap hari.</p>
        `,
        source: '',
    },
    {
        id: 5,
        title: 'Perawatan Kulit di Malam Hari',
        image: nightcare,
        description: 'Langkah-langkah perawatan kulit yang dianjurkan di malam hari untuk memperbaiki dan meregenerasi kulit Anda selama tidur.',
        content: `
            <h2>Rutinitas Skincare Malam Hari</h2>
            <p>1. Bersihkan wajah dari makeup dan kotoran.</p>
            <p>2. Gunakan toner untuk membersihkan pori-pori.</p>
            <p>3. Aplikasikan serum yang kaya akan nutrisi.</p>
            <p>4. Gunakan krim malam yang melembapkan.</p>
        `,
        source: '',
    },
    {
        id: 6,
        title: 'Pentingnya Menggunakan Sunscreen',
        image: sunscreen,
        description: 'Mengapa sunscreen sangat penting dalam rutinitas perawatan kulit Anda?',
        content: `
            <h2>Pentingnya Menggunakan Sunscreen</h2>
            <p>1. Melindungi kulit dari sinar UV yang berbahaya.</p>
            <p>2. Mencegah penuaan dini seperti keriput dan garis halus.</p>
            <p>3. Mengurangi risiko kanker kulit.</p>
            <p>4. Mencegah hiperpigmentasi dan bintik hitam.</p>
        `,
        source: '',
    }
];

export default DataTips;
