// updateQuizToMongoDB.js
// Script untuk menambahkan quiz ke MongoDB secara otomatis
// Pastikan sudah install: npm install mongodb

const { MongoClient } = require('mongodb');

// ============================================
// KONFIGURASI DATABASE
// ============================================
const uri = 'mongodb+srv://javasrabnii_db_user:R0H5dqcgmWKOtFRD@sch-learning-app.drzqj19.mongodb.net/?appName=sch-learning-app';
const dbName = 'test'; // Sesuaikan dengan nama database Anda
const collectionName = 'materials'; // Sesuaikan dengan nama collection Anda

// ============================================
// DATA QUIZ TAMBAHAN KELAS 7
// ============================================
const kelas7QuizTambahan = {
  "Pengertian Bilangan Bulat": [
    {
      question: "Urutan bilangan bulat dari terkecil ke terbesar yang benar adalah...",
      options: ["-3, -1, 0, 2, 4", "4, 2, 0, -1, -3", "-1, -3, 0, 2, 4", "0, -1, -3, 2, 4"],
      correctAnswer: "-3, -1, 0, 2, 4",
      explanation: "Pada garis bilangan, semakin ke kiri semakin kecil nilainya. Urutan: -3 < -1 < 0 < 2 < 4"
    },
    {
      question: "Bilangan bulat yang terletak di antara -4 dan 2 adalah...",
      options: ["-3, -2, -1, 0, 1", "-4, -3, -2, -1, 0, 1, 2", "-5, -4, -3", "0, 1, 2, 3"],
      correctAnswer: "-3, -2, -1, 0, 1",
      explanation: "Bilangan bulat antara -4 dan 2 (tidak termasuk -4 dan 2) adalah: -3, -2, -1, 0, 1"
    }
  ],
  "Bilangan Prima dan Komposit": [
    {
      question: "Berapa banyak bilangan prima antara 1 sampai 20?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
      explanation: "Bilangan prima 1-20: 2, 3, 5, 7, 11, 13, 17, 19 = ada 8 bilangan"
    },
    {
      question: "Bilangan 1 tidak termasuk bilangan prima karena...",
      options: ["Terlalu kecil", "Hanya memiliki 1 faktor", "Bukan bilangan bulat", "Bilangan ganjil"],
      correctAnswer: "Hanya memiliki 1 faktor",
      explanation: "Bilangan prima harus memiliki tepat 2 faktor (1 dan dirinya sendiri). Angka 1 hanya punya 1 faktor."
    }
  ],
  "Operasi Hitung Bilangan Bulat": [
    {
      question: "Hasil dari -10 + 15 - 8 adalah...",
      options: ["-3", "-13", "13", "3"],
      correctAnswer: "-3",
      explanation: "-10 + 15 = 5, kemudian 5 - 8 = -3"
    },
    {
      question: "Hasil dari (-3) × 4 ÷ (-2) adalah...",
      options: ["-6", "6", "-24", "24"],
      correctAnswer: "6",
      explanation: "(-3) × 4 = -12, kemudian -12 ÷ (-2) = 6 (negatif ÷ negatif = positif)"
    }
  ],
  "Pengertian Pecahan": [
    {
      question: "Pecahan 5/4 jika diubah ke pecahan campuran menjadi...",
      options: ["1 1/4", "1 1/2", "2 1/4", "4/5"],
      correctAnswer: "1 1/4",
      explanation: "5 ÷ 4 = 1 sisa 1, jadi 5/4 = 1 1/4"
    },
    {
      question: "Bentuk desimal dari 3/4 adalah...",
      options: ["0,25", "0,5", "0,75", "1,25"],
      correctAnswer: "0,75",
      explanation: "3 ÷ 4 = 0,75"
    }
  ],
  "Penjumlahan dan Pengurangan Pecahan": [
    {
      question: "Hasil dari 2/3 + 1/6 adalah...",
      options: ["3/6", "3/9", "5/6", "1/2"],
      correctAnswer: "5/6",
      explanation: "2/3 = 4/6, jadi 4/6 + 1/6 = 5/6"
    },
    {
      question: "Hasil dari 5/6 - 1/3 adalah...",
      options: ["1/2", "1/3", "2/3", "4/6"],
      correctAnswer: "1/2",
      explanation: "5/6 - 2/6 = 3/6 = 1/2"
    }
  ],
  "Perkalian dan Pembagian Pecahan": [
    {
      question: "Hasil dari 1/3 × 3/5 adalah...",
      options: ["1/5", "3/15", "4/8", "3/5"],
      correctAnswer: "1/5",
      explanation: "1/3 × 3/5 = 3/15 = 1/5"
    },
    {
      question: "Hasil dari 2/3 ÷ 4/5 adalah...",
      options: ["5/6", "8/15", "10/12", "6/5"],
      correctAnswer: "5/6",
      explanation: "2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6"
    }
  ],
  "Pengertian Himpunan": [
    {
      question: "Himpunan kosong dilambangkan dengan...",
      options: ["∅ atau {}", "{ }", "0", "Semua benar"],
      correctAnswer: "∅ atau {}",
      explanation: "Himpunan kosong dilambangkan dengan ∅ atau {}, bukan { } (ini berisi spasi)"
    },
    {
      question: "Jika S = {1,2,3,4,5,6,7,8,9,10} dan A = {2,4,6,8,10}, maka n(A) = ...",
      options: ["5", "6", "10", "15"],
      correctAnswer: "5",
      explanation: "n(A) = banyaknya anggota himpunan A = 5 anggota"
    }
  ],
  "Operasi Himpunan": [
    {
      question: "Jika A = {a,b,c,d} dan B = {c,d,e,f}, maka A ∪ B = ...",
      options: ["{a,b,c,d,e,f}", "{c,d}", "{a,b,e,f}", "{}"],
      correctAnswer: "{a,b,c,d,e,f}",
      explanation: "Gabungan (union) adalah semua anggota dari A dan B"
    },
    {
      question: "Jika n(A) = 10, n(B) = 8, dan n(A ∩ B) = 3, maka n(A ∪ B) = ...",
      options: ["15", "18", "21", "11"],
      correctAnswer: "15",
      explanation: "n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 10 + 8 - 3 = 15"
    }
  ],
  "Pengertian Bentuk Aljabar": [
    {
      question: "Banyaknya suku pada bentuk aljabar 2x² - 3x + 5y - 7 adalah...",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
      explanation: "Suku-sukunya: 2x², -3x, 5y, -7 = ada 4 suku"
    },
    {
      question: "Variabel pada bentuk aljabar 5a + 3b - 2c adalah...",
      options: ["5, 3, 2", "a, b, c", "5a, 3b, 2c", "abc"],
      correctAnswer: "a, b, c",
      explanation: "Variabel adalah huruf yang mewakili bilangan: a, b, c"
    }
  ],
  "Operasi Bentuk Aljabar": [
    {
      question: "Hasil dari (2x + 3)(x - 1) adalah...",
      options: ["2x² + x - 3", "2x² - 2x + 3x - 3", "2x² + x - 3", "2x² - x - 3"],
      correctAnswer: "2x² + x - 3",
      explanation: "(2x+3)(x-1) = 2x² - 2x + 3x - 3 = 2x² + x - 3"
    }
  ],
  "Pengertian PLSV": [
    {
      question: "Nilai x dari persamaan 5x - 10 = 15 adalah...",
      options: ["1", "3", "5", "7"],
      correctAnswer: "5",
      explanation: "5x = 15 + 10 = 25, maka x = 25 ÷ 5 = 5"
    }
  ],
  "Pertidaksamaan Linear": [
    {
      question: "Penyelesaian dari 3x - 6 ≤ 9 adalah...",
      options: ["x ≤ 5", "x ≥ 5", "x ≤ 15", "x ≥ 15"],
      correctAnswer: "x ≤ 5",
      explanation: "3x ≤ 9 + 6 = 15, maka x ≤ 5"
    },
    {
      question: "Penyelesaian dari -2x < 8 adalah...",
      options: ["x < -4", "x > -4", "x < 4", "x > 4"],
      correctAnswer: "x > -4",
      explanation: "Dibagi -2, tanda berubah: x > 8 ÷ (-2), maka x > -4"
    }
  ],
  "Pengertian Perbandingan": [
    {
      question: "Jika perbandingan uang Adi dan Budi adalah 3:5 dan uang Adi Rp 30.000, maka uang Budi adalah...",
      options: ["Rp 40.000", "Rp 45.000", "Rp 50.000", "Rp 60.000"],
      correctAnswer: "Rp 50.000",
      explanation: "3/5 = 30.000/x, maka x = (5 × 30.000) ÷ 3 = Rp 50.000"
    },
    {
      question: "Bentuk paling sederhana dari perbandingan 15:25 adalah...",
      options: ["3:5", "5:3", "15:25", "1:2"],
      correctAnswer: "3:5",
      explanation: "FPB dari 15 dan 25 adalah 5, jadi 15:25 = 3:5"
    }
  ],
  "Perbandingan Senilai": [
    {
      question: "Jika 4 kg gula harganya Rp 60.000, maka harga 7 kg gula adalah...",
      options: ["Rp 90.000", "Rp 100.000", "Rp 105.000", "Rp 120.000"],
      correctAnswer: "Rp 105.000",
      explanation: "4/7 = 60.000/x, maka x = (7 × 60.000) ÷ 4 = Rp 105.000"
    },
    {
      question: "Mobil menempuh 120 km dalam 2 jam. Dengan kecepatan sama, jarak yang ditempuh dalam 5 jam adalah...",
      options: ["240 km", "280 km", "300 km", "360 km"],
      correctAnswer: "300 km",
      explanation: "2/5 = 120/x, maka x = (5 × 120) ÷ 2 = 300 km"
    }
  ],
  "Perbandingan Berbalik Nilai": [
    {
      question: "Jika 5 orang menyelesaikan pekerjaan dalam 12 hari, maka 10 orang menyelesaikan dalam...",
      options: ["4 hari", "6 hari", "8 hari", "24 hari"],
      correctAnswer: "6 hari",
      explanation: "5 × 12 = 10 × x, maka x = 60 ÷ 10 = 6 hari"
    },
    {
      question: "Dengan kecepatan 80 km/jam, waktu tempuh 3 jam. Jika kecepatan 60 km/jam, waktu tempuh menjadi...",
      options: ["2 jam", "3 jam", "4 jam", "5 jam"],
      correctAnswer: "4 jam",
      explanation: "80 × 3 = 60 × x, maka x = 240 ÷ 60 = 4 jam"
    }
  ]
};

// ============================================
// DATA QUIZ TAMBAHAN KELAS 8
// ============================================
const kelas8QuizTambahan = {
  "Kubus dan Balok": [
    {
      question: "Jika volume kubus 216 cm³, maka panjang rusuknya adalah...",
      options: ["4 cm", "5 cm", "6 cm", "7 cm"],
      correctAnswer: "6 cm",
      explanation: "V = s³, maka 216 = s³, sehingga s = ³√216 = 6 cm"
    }
  ],
  "Prisma": [
    {
      question: "Luas permukaan prisma segitiga dengan luas alas 12 cm², keliling alas 18 cm, dan tinggi prisma 10 cm adalah...",
      options: ["184 cm²", "204 cm²", "224 cm²", "244 cm²"],
      correctAnswer: "204 cm²",
      explanation: "LP = 2(12) + 18(10) = 24 + 180 = 204 cm²"
    },
    {
      question: "Jika volume prisma 240 cm³ dan tinggi prisma 8 cm, maka luas alasnya adalah...",
      options: ["20 cm²", "25 cm²", "30 cm²", "32 cm²"],
      correctAnswer: "30 cm²",
      explanation: "V = La × t, maka 240 = La × 8, sehingga La = 30 cm²"
    }
  ],
  "Limas": [
    {
      question: "Limas segi empat dengan alas 6×6 cm dan tinggi 12 cm memiliki volume...",
      options: ["72 cm³", "108 cm³", "144 cm³", "216 cm³"],
      correctAnswer: "144 cm³",
      explanation: "V = 1/3 × (6×6) × 12 = 1/3 × 36 × 12 = 144 cm³"
    }
  ],
  "Pengertian Bilangan Berpangkat": [
    {
      question: "Hasil dari 10³ adalah...",
      options: ["30", "100", "1000", "10000"],
      correctAnswer: "1000",
      explanation: "10³ = 10 × 10 × 10 = 1000"
    }
  ],
  "Sifat-Sifat Bilangan Berpangkat": [
    {
      question: "Hasil dari (3²)³ ÷ 3⁴ adalah...",
      options: ["3", "3²", "3³", "3⁴"],
      correctAnswer: "3²",
      explanation: "(3²)³ = 3⁶, kemudian 3⁶ ÷ 3⁴ = 3⁶⁻⁴ = 3²"
    }
  ],
  "Notasi Ilmiah": [
    {
      question: "Bentuk baku dari 0,00056 adalah...",
      options: ["5,6 × 10⁻⁴", "5,6 × 10⁻³", "56 × 10⁻⁵", "0,56 × 10⁻³"],
      correctAnswer: "5,6 × 10⁻⁴",
      explanation: "0,00056 = 5,6 × 0,0001 = 5,6 × 10⁻⁴"
    },
    {
      question: "(4 × 10⁵) ÷ (2 × 10²) = ...",
      options: ["2 × 10³", "2 × 10⁷", "8 × 10³", "8 × 10⁷"],
      correctAnswer: "2 × 10³",
      explanation: "(4÷2) × 10⁵⁻² = 2 × 10³"
    }
  ],
  "Pengertian Bentuk Akar": [
    {
      question: "Hasil dari √81 adalah...",
      options: ["7", "8", "9", "10"],
      correctAnswer: "9",
      explanation: "√81 = 9 karena 9² = 81"
    }
  ],
  "Menyederhanakan Bentuk Akar": [
    {
      question: "Bentuk sederhana dari √27 adalah...",
      options: ["3√3", "√27", "9√3", "3√9"],
      correctAnswer: "3√3",
      explanation: "√27 = √(9×3) = √9 × √3 = 3√3"
    },
    {
      question: "Bentuk sederhana dari √48 adalah...",
      options: ["4√3", "3√4", "2√12", "6√2"],
      correctAnswer: "4√3",
      explanation: "√48 = √(16×3) = 4√3"
    }
  ],
  "Operasi Bentuk Akar": [
    {
      question: "Hasil dari 5√2 - 2√2 + √2 adalah...",
      options: ["3√2", "4√2", "5√2", "6√2"],
      correctAnswer: "4√2",
      explanation: "Suku sejenis: (5-2+1)√2 = 4√2"
    },
    {
      question: "Hasil dari √2 × √8 adalah...",
      options: ["2", "4", "√10", "√16"],
      correctAnswer: "4",
      explanation: "√2 × √8 = √16 = 4"
    }
  ],
  "Pengertian Relasi dan Fungsi": [
    {
      question: "Jika f(x) = x² - 2x + 1, maka f(3) = ...",
      options: ["2", "4", "6", "8"],
      correctAnswer: "4",
      explanation: "f(3) = 3² - 2(3) + 1 = 9 - 6 + 1 = 4"
    },
    {
      question: "Range dari fungsi f: {1,2,3} → {2,4,6} dengan f(x) = 2x adalah...",
      options: ["{1,2,3}", "{2,4,6}", "{2,4}", "{0,2,4,6}"],
      correctAnswer: "{2,4,6}",
      explanation: "f(1)=2, f(2)=4, f(3)=6, jadi Range = {2,4,6}"
    }
  ],
  "Bentuk Fungsi Linear": [
    {
      question: "Persamaan garis yang melalui titik (0,5) dan bergradien 2 adalah...",
      options: ["y = 2x + 5", "y = 5x + 2", "y = 2x - 5", "y = -2x + 5"],
      correctAnswer: "y = 2x + 5",
      explanation: "y = mx + c, dengan m=2 dan c=5, maka y = 2x + 5"
    },
    {
      question: "Titik potong sumbu x dari garis y = 3x - 6 adalah...",
      options: ["(2, 0)", "(0, -6)", "(-2, 0)", "(6, 0)"],
      correctAnswer: "(2, 0)",
      explanation: "Titik potong x: y=0, maka 0 = 3x - 6, x = 2"
    }
  ],
  "Teorema Pythagoras": [
    {
      question: "Triple Pythagoras yang benar adalah...",
      options: ["2, 3, 4", "4, 5, 6", "6, 8, 10", "7, 8, 9"],
      correctAnswer: "6, 8, 10",
      explanation: "6, 8, 10 adalah kelipatan dari 3, 4, 5 (triple Pythagoras dasar)"
    },
    {
      question: "Jika segitiga memiliki sisi 7, 24, 25, maka segitiga tersebut adalah...",
      options: ["Lancip", "Tumpul", "Siku-siku", "Sama sisi"],
      correctAnswer: "Siku-siku",
      explanation: "25² = 625 dan 7² + 24² = 49 + 576 = 625, jadi siku-siku"
    }
  ],
  "Penerapan Teorema Pythagoras": [
    {
      question: "Diagonal ruang balok dengan ukuran 3×4×12 cm adalah...",
      options: ["13 cm", "15 cm", "17 cm", "19 cm"],
      correctAnswer: "13 cm",
      explanation: "d = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13 cm"
    },
    {
      question: "Jarak antara titik (1,2) dan (4,6) adalah...",
      options: ["3", "4", "5", "7"],
      correctAnswer: "5",
      explanation: "d = √[(4-1)² + (6-2)²] = √(9 + 16) = √25 = 5"
    }
  ],
  "Unsur-Unsur Lingkaran": [
    {
      question: "Tali busur terpanjang pada lingkaran adalah...",
      options: ["Jari-jari", "Diameter", "Busur", "Apotema"],
      correctAnswer: "Diameter",
      explanation: "Diameter adalah tali busur yang melalui pusat lingkaran, sehingga yang terpanjang"
    },
    {
      question: "Jika diameter lingkaran 28 cm, maka jari-jarinya adalah...",
      options: ["7 cm", "14 cm", "21 cm", "56 cm"],
      correctAnswer: "14 cm",
      explanation: "r = d/2 = 28/2 = 14 cm"
    }
  ],
  "Keliling dan Luas Lingkaran": [
    {
      question: "Luas lingkaran dengan diameter 14 cm adalah... (π = 22/7)",
      options: ["44 cm²", "88 cm²", "154 cm²", "308 cm²"],
      correctAnswer: "154 cm²",
      explanation: "r = 7 cm, L = πr² = 22/7 × 49 = 154 cm²"
    },
    {
      question: "Jika keliling lingkaran 44 cm (π = 22/7), maka jari-jarinya adalah...",
      options: ["5 cm", "7 cm", "9 cm", "11 cm"],
      correctAnswer: "7 cm",
      explanation: "K = 2πr, maka 44 = 2 × 22/7 × r, sehingga r = 7 cm"
    }
  ]
};

// ============================================
// DATA QUIZ TAMBAHAN KELAS 9
// ============================================
const kelas9QuizTambahan = {
  "Barisan Aritmetika": [
    {
      question: "Jika suku ke-5 dari barisan aritmetika adalah 17 dan suku ke-9 adalah 29, maka suku ke-15 adalah...",
      options: ["41", "44", "47", "50"],
      correctAnswer: "47",
      explanation: "U9 - U5 = 4b → 29 - 17 = 4b → b = 3. Dari U5 = a + 4b → 17 = a + 12 → a = 5. U15 = 5 + (15-1)×3 = 5 + 42 = 47."
    },
    {
      question: "Tiga bilangan membentuk barisan aritmetika. Jika jumlahnya 15 dan hasil kalinya 105, maka bilangan terbesarnya adalah...",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
      explanation: "Misalkan bilangan: a-b, a, a+b. Jumlah: 3a = 15 → a = 5. Hasil kali: (5-b)×5×(5+b) = 105 → 5(25-b²) = 105 → 25-b² = 21 → b² = 4 → b = 2. Bilangan: 3, 5, 7. Terbesar = 7."
    }
  ],
  "Deret Aritmetika": [
    {
      question: "Jumlah 10 suku pertama dari deret 100 + 95 + 90 + 85 + ... adalah...",
      options: ["725", "750", "775", "800"],
      correctAnswer: "775",
      explanation: "a = 100, b = -5, n = 10. S10 = 10/2 × (2×100 + 9×(-5)) = 5 × (200 - 45) = 5 × 155 = 775."
    },
    {
      question: "Jumlah semua bilangan ganjil antara 1 dan 100 adalah...",
      options: ["2.450", "2.500", "2.550", "2.600"],
      correctAnswer: "2.500",
      explanation: "Barisan: 1, 3, 5, ..., 99. a = 1, b = 2, Un = 99. Cari n: 99 = 1+(n-1)2 → n = 50. S50 = 50/2×(1+99) = 25×100 = 2.500."
    }
  ],
  "Barisan Geometri": [
    {
      question: "Jika U2 = 6 dan U5 = 48 dari barisan geometri, maka suku pertamanya adalah...",
      options: ["2", "3", "4", "6"],
      correctAnswer: "3",
      explanation: "U5/U2 = r³ → 48/6 = r³ → r³ = 8 → r = 2. Dari U2 = ar → 6 = a×2 → a = 3."
    },
    {
      question: "Jika tiga bilangan 2, x, 8 membentuk barisan geometri, maka nilai x adalah...",
      options: ["4", "±4", "5", "±5"],
      correctAnswer: "±4",
      explanation: "Suku tengah: x² = 2×8 = 16 → x = ±4."
    }
  ],
  "Deret Geometri": [
    {
      question: "Jumlah 8 suku pertama dari deret 1 + 3 + 9 + 27 + ... adalah...",
      options: ["3.280", "6.560", "9.840", "13.120"],
      correctAnswer: "3.280",
      explanation: "a = 1, r = 3, n = 8. S8 = 1(3⁸ - 1)/(3-1) = (6.561 - 1)/2 = 6.560/2 = 3.280."
    },
    {
      question: "Jumlah tak hingga dari deret 6 + 3 + 1,5 + 0,75 + ... adalah...",
      options: ["9", "10", "12", "15"],
      correctAnswer: "12",
      explanation: "a = 6, r = 1/2. S∞ = 6/(1 - 1/2) = 6/(1/2) = 12."
    }
  ],
  "Pola Bilangan Khusus": [
    {
      question: "Suku ke-20 dari pola bilangan segitiga adalah...",
      options: ["190", "200", "210", "220"],
      correctAnswer: "210",
      explanation: "Un = n(n+1)/2. U20 = 20×21/2 = 210."
    },
    {
      question: "Suku ke-9 dari barisan Fibonacci 1, 1, 2, 3, 5, 8, 13, 21 adalah...",
      options: ["21", "34", "55", "89"],
      correctAnswer: "34",
      explanation: "Barisan: 1, 1, 2, 3, 5, 8, 13, 21, 34. Suku ke-9 = 34."
    }
  ],
  "Pengertian Persamaan Kuadrat": [
    {
      question: "Persamaan kuadrat yang memiliki dua akar real kembar adalah yang memiliki diskriminan...",
      options: ["D > 0", "D = 0", "D < 0", "D ≠ 0"],
      correctAnswer: "D = 0",
      explanation: "Jika D = b² - 4ac = 0, maka persamaan memiliki dua akar real yang sama (kembar)."
    },
    {
      question: "Jika x² - 4x + k = 0 memiliki akar kembar, maka nilai k adalah...",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
      explanation: "Akar kembar: D = 0 → b² - 4ac = 0 → 16 - 4(1)(k) = 0 → 16 = 4k → k = 4."
    }
  ],
  "Menyelesaikan dengan Pemfaktoran": [
    {
      question: "Akar-akar dari x² + x - 12 = 0 adalah...",
      options: ["3 dan -4", "-3 dan 4", "2 dan -6", "-2 dan 6"],
      correctAnswer: "3 dan -4",
      explanation: "(x-3)(x+4) = 0 → x = 3 atau x = -4."
    },
    {
      question: "Penyelesaian dari 4x² - 9 = 0 adalah...",
      options: ["3/2 dan -3/2", "2/3 dan -2/3", "3 dan -3", "4 dan -4"],
      correctAnswer: "3/2 dan -3/2",
      explanation: "4x² - 9 = (2x+3)(2x-3) = 0 → x = -3/2 atau x = 3/2."
    }
  ],
  "Rumus ABC (Kuadratik)": [
    {
      question: "Akar-akar dari 2x² - 7x + 3 = 0 adalah...",
      options: ["1/2 dan 3", "1/2 dan -3", "-1/2 dan 3", "-1/2 dan -3"],
      correctAnswer: "1/2 dan 3",
      explanation: "D = 49 - 24 = 25. x = (7 ± 5)/4. x₁ = 12/4 = 3, x₂ = 2/4 = 1/2."
    },
    {
      question: "Nilai x dari x² + 6x + 8 = 0 menggunakan rumus ABC adalah...",
      options: ["-2 dan -4", "2 dan 4", "-2 dan 4", "2 dan -4"],
      correctAnswer: "-2 dan -4",
      explanation: "D = 36 - 32 = 4. x = (-6 ± 2)/2. x₁ = -4/2 = -2, x₂ = -8/2 = -4."
    }
  ],
  "Melengkapkan Kuadrat Sempurna": [
    {
      question: "Bentuk (x - 3)² - 4 = 0 dapat diselesaikan menjadi x = ...",
      options: ["1 dan 5", "-1 dan -5", "1 dan -5", "-1 dan 5"],
      correctAnswer: "1 dan 5",
      explanation: "(x-3)² = 4 → x-3 = ±2 → x = 3±2 → x = 5 atau x = 1."
    },
    {
      question: "Untuk melengkapkan kuadrat sempurna dari x² + 10x, bilangan yang ditambahkan adalah...",
      options: ["5", "10", "25", "100"],
      correctAnswer: "25",
      explanation: "Tambahkan (b/2)² = (10/2)² = 5² = 25. Sehingga x² + 10x + 25 = (x+5)²."
    },
    {
      question: "Akar-akar dari x² - 4x - 5 = 0 dengan melengkapkan kuadrat adalah...",
      options: ["5 dan -1", "-5 dan 1", "5 dan 1", "-5 dan -1"],
      correctAnswer: "5 dan -1",
      explanation: "x² - 4x = 5 → x² - 4x + 4 = 9 → (x-2)² = 9 → x-2 = ±3 → x = 5 atau x = -1."
    }
  ],
  "Hubungan Akar dan Koefisien": [
    {
      question: "Jika akar-akar dari 2x² - 8x + 5 = 0 adalah x₁ dan x₂, maka x₁ + x₂ = ...",
      options: ["2", "4", "5", "8"],
      correctAnswer: "4",
      explanation: "x₁ + x₂ = -b/a = -(-8)/2 = 8/2 = 4."
    },
    {
      question: "Jika x₁ + x₂ = 6 dan x₁×x₂ = 5, maka persamaan kuadratnya adalah...",
      options: ["x² - 6x + 5 = 0", "x² + 6x + 5 = 0", "x² - 6x - 5 = 0", "x² + 6x - 5 = 0"],
      correctAnswer: "x² - 6x + 5 = 0",
      explanation: "x² - (x₁+x₂)x + (x₁×x₂) = 0 → x² - 6x + 5 = 0."
    }
  ],
  "Aplikasi Persamaan Kuadrat": [
    {
      question: "Keliling persegi panjang 30 cm dan luasnya 50 cm². Panjang sisi terbesarnya adalah...",
      options: ["10 cm", "12 cm", "15 cm", "20 cm"],
      correctAnswer: "10 cm",
      explanation: "p + l = 15 dan p×l = 50. x(15-x) = 50 → x² - 15x + 50 = 0 → (x-10)(x-5) = 0 → x = 10 atau 5. Terbesar = 10 cm."
    },
    {
      question: "Sebuah benda dilempar ke atas dengan tinggi h = -5t² + 20t meter. Tinggi maksimum yang dicapai adalah...",
      options: ["10 m", "15 m", "20 m", "25 m"],
      correctAnswer: "20 m",
      explanation: "t maksimum = -b/2a = -20/(2×(-5)) = 2. h = -5(2)² + 20(2) = -20 + 40 = 20 m."
    }
  ],
  "Translasi (Pergeseran)": [
    {
      question: "Jika titik C(-3, 7) ditranslasi T(4, -2) dilanjutkan T(1, 3), hasil akhirnya adalah...",
      options: ["(2, 8)", "(2, 5)", "(-2, 8)", "(8, 2)"],
      correctAnswer: "(2, 8)",
      explanation: "T total = T(4+1, -2+3) = T(5, 1). C'(-3+5, 7+1) = (2, 8)."
    },
    {
      question: "Lingkaran x² + y² = 9 ditranslasi T(2, -3). Persamaan bayangannya adalah...",
      options: ["(x-2)² + (y+3)² = 9", "(x+2)² + (y-3)² = 9", "(x-2)² + (y-3)² = 9", "(x+2)² + (y+3)² = 9"],
      correctAnswer: "(x-2)² + (y+3)² = 9",
      explanation: "x = x'-2, y = y'+3. Substitusi: (x'-2)² + (y'+3)² = 9."
    }
  ],
  "Refleksi (Pencerminan)": [
    {
      question: "Bayangan titik Q(5, -3) oleh refleksi terhadap garis y = -x adalah...",
      options: ["(3, -5)", "(-3, 5)", "(5, 3)", "(-5, 3)"],
      correctAnswer: "(3, -5)",
      explanation: "Refleksi terhadap y = -x: (x, y) → (-y, -x). Jadi (5, -3) → (3, -5)."
    },
    {
      question: "Titik R(4, 6) dicerminkan terhadap garis x = 3. Bayangannya adalah...",
      options: ["(2, 6)", "(4, 0)", "(6, 6)", "(4, 6)"],
      correctAnswer: "(2, 6)",
      explanation: "Refleksi terhadap x = a: (x, y) → (2a-x, y). Jadi (4, 6) → (2×3-4, 6) = (2, 6)."
    }
  ],
  "Rotasi (Perputaran)": [
    {
      question: "Bayangan titik S(5, 0) oleh rotasi 270° dengan pusat O adalah...",
      options: ["(0, 5)", "(0, -5)", "(-5, 0)", "(5, 0)"],
      correctAnswer: "(0, -5)",
      explanation: "Rotasi 270°: (x, y) → (y, -x). Jadi (5, 0) → (0, -5)."
    },
    {
      question: "Titik T(-2, 5) dirotasi 180° dengan pusat P(1, 2). Hasilnya adalah...",
      options: ["(4, -1)", "(-5, 8)", "(3, 1)", "(-4, 1)"],
      correctAnswer: "(4, -1)",
      explanation: "1) Translasi ke O: (-3, 3). 2) Rotasi 180°: (3, -3). 3) Translasi kembali: (4, -1)."
    }
  ],
  "Dilatasi (Perkalian)": [
    {
      question: "Bayangan titik U(-4, 8) oleh dilatasi [O, -1/2] adalah...",
      options: ["(2, -4)", "(-2, 4)", "(2, 4)", "(-2, -4)"],
      correctAnswer: "(2, -4)",
      explanation: "D[O, -1/2]: (x, y) → (-1/2×x, -1/2×y). Jadi (-4, 8) → (2, -4)."
    },
    {
      question: "Jika volume kubus 27 cm³ didilatasi dengan k = 2, maka volume bayangannya adalah...",
      options: ["54 cm³", "108 cm³", "162 cm³", "216 cm³"],
      correctAnswer: "216 cm³",
      explanation: "Perbandingan volume = k³. Volume' = 27 × 2³ = 27 × 8 = 216 cm³."
    }
  ],
  "Komposisi Transformasi": [
    {
      question: "Hasil dari D[O, 2] ∘ D[O, 3] adalah...",
      options: ["D[O, 5]", "D[O, 6]", "D[O, 9]", "D[O, 1]"],
      correctAnswer: "D[O, 6]",
      explanation: "D[P, k₂] ∘ D[P, k₁] = D[P, k₁×k₂] = D[O, 3×2] = D[O, 6]."
    },
    {
      question: "Titik V(2, 5) ditransformasi oleh Mx ∘ T(3, -1). Hasilnya adalah...",
      options: ["(5, -4)", "(5, 4)", "(-1, -4)", "(-1, 4)"],
      correctAnswer: "(5, -4)",
      explanation: "T(3, -1): (2, 5) → (5, 4). Mx: (5, 4) → (5, -4)."
    }
  ]
};

// ============================================
// FUNGSI UPDATE QUIZ
// ============================================
async function updateQuizToMongoDB() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!\n');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    let totalUpdated = 0;
    let totalFailed = 0;
    
    // ========== UPDATE KELAS 7 ==========
    console.log('📚 UPDATING KELAS 7 QUIZ...');
    console.log('═'.repeat(50));
    
    for (const [subTopicTitle, quizArray] of Object.entries(kelas7QuizTambahan)) {
      try {
        // Cari semua dokumen kelas 7 yang memiliki subTopics dengan title yang cocok
        const documents = await collection.find({ 
          class: 7,
          "subTopics.title": subTopicTitle
        }).toArray();
        
        if (documents.length === 0) {
          console.log(`⚠️  ${subTopicTitle}: Not found in database`);
          totalFailed++;
          continue;
        }
        
        // Update setiap dokumen yang ditemukan
        for (const doc of documents) {
          const result = await collection.updateOne(
            { 
              _id: doc._id,
              "subTopics.title": subTopicTitle
            },
            {
              $push: {
                "subTopics.$.quiz": { $each: quizArray }
              }
            }
          );
          
          if (result.modifiedCount > 0) {
            console.log(`✅ ${subTopicTitle} (${doc.title}): Added ${quizArray.length} quiz`);
            totalUpdated++;
          }
        }
      } catch (error) {
        console.error(`❌ ${subTopicTitle}: Error - ${error.message}`);
        totalFailed++;
      }
    }
    
    // ========== UPDATE KELAS 8 ==========
    console.log('\n📚 UPDATING KELAS 8 QUIZ...');
    console.log('═'.repeat(50));
    
    for (const [subTopicTitle, quizArray] of Object.entries(kelas8QuizTambahan)) {
      try {
        const documents = await collection.find({ 
          class: 8,
          "subTopics.title": subTopicTitle
        }).toArray();
        
        if (documents.length === 0) {
          console.log(`⚠️  ${subTopicTitle}: Not found in database`);
          totalFailed++;
          continue;
        }
        
        for (const doc of documents) {
          const result = await collection.updateOne(
            { 
              _id: doc._id,
              "subTopics.title": subTopicTitle
            },
            {
              $push: {
                "subTopics.$.quiz": { $each: quizArray }
              }
            }
          );
          
          if (result.modifiedCount > 0) {
            console.log(`✅ ${subTopicTitle} (${doc.title}): Added ${quizArray.length} quiz`);
            totalUpdated++;
          }
        }
      } catch (error) {
        console.error(`❌ ${subTopicTitle}: Error - ${error.message}`);
        totalFailed++;
      }
    }
    
    // ========== UPDATE KELAS 9 ==========
    console.log('\n📚 UPDATING KELAS 9 QUIZ...');
    console.log('═'.repeat(50));
    
    for (const [subTopicTitle, quizArray] of Object.entries(kelas9QuizTambahan)) {
      try {
        const documents = await collection.find({ 
          class: 9,
          "subTopics.title": subTopicTitle
        }).toArray();
        
        if (documents.length === 0) {
          console.log(`⚠️  ${subTopicTitle}: Not found in database`);
          totalFailed++;
          continue;
        }
        
        for (const doc of documents) {
          const result = await collection.updateOne(
            { 
              _id: doc._id,
              "subTopics.title": subTopicTitle
            },
            {
              $push: {
                "subTopics.$.quiz": { $each: quizArray }
              }
            }
          );
          
          if (result.modifiedCount > 0) {
            console.log(`✅ ${subTopicTitle} (${doc.title}): Added ${quizArray.length} quiz`);
            totalUpdated++;
          }
        }
      } catch (error) {
        console.error(`❌ ${subTopicTitle}: Error - ${error.message}`);
        totalFailed++;
      }
    }
    
    // ========== SUMMARY ==========
    console.log('\n' + '═'.repeat(50));
    console.log('📊 UPDATE SUMMARY');
    console.log('═'.repeat(50));
    console.log(`✅ Successfully updated: ${totalUpdated} subTopics`);
    console.log(`❌ Failed/Not found: ${totalFailed} subTopics`);
    console.log('═'.repeat(50));
    
    if (totalUpdated > 0) {
      console.log('\n🎉 Quiz update completed successfully!');
    } else {
      console.log('\n⚠️  No quiz were updated. Please check your database structure.');
    }
    
  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    console.error('Stack trace:', error.stack);
  } finally {
    await client.close();
    console.log('\n🔒 Connection closed');
  }
}

// ============================================
// JALANKAN SCRIPT
// ============================================
console.log('🚀 MongoDB Quiz Updater');
console.log('═'.repeat(50));
console.log(`📍 Database: ${dbName}`);
console.log(`📍 Collection: ${collectionName}`);
console.log('═'.repeat(50));
console.log('\nStarting update process...\n');

updateQuizToMongoDB()
  .then(() => {
    console.log('\n✨ Script execution completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });