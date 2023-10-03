# Dicoding Bookshelf API

Dikerjakan untuk memenuhi tugas submission program Bangkit Academy pada course [Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud](https://www.dicoding.com/academies/342) dari [Dicoding](https://www.dicoding.com)

## Author

- [Dimas Adnan Yusuf Widyanto](https://www.dicoding.com/users/dimas2801/academies) a.k.a [@day280130](https://github.com/day280130)

## Packages Used

### Prod

- [hapi](https://hapi.dev/)
- [dotenv-safe](https://github.com/rolodato/dotenv-safe#readme)
- [zod](https://zod.dev/)

### Dev

- [typescript](https://www.typescriptlang.org/)
- [prettier](https://prettier.io/)
- [eslint](https://eslint.org/)
- [tsx](https://github.com/esbuild-kit/tsx)
- [ttypescript](https://github.com/cevek/ttypescript#readme)
- [typescript-transform-paths](https://github.com/LeDDGroup/typescript-transform-paths#readme)
- [rimraf](https://github.com/isaacs/rimraf#readme)

## Tech Stack

- Node.js
- Typescript
- Hapi Framework

## Usage

### 1. Install Package

Masuk ke folder project, lalu masukkan perintah berikut ke _command prompt/shell_:
`npm install` atau `npm i`
Silahkan sesuaikan dengan package manager yang digunakan.

### 2. Buat File .env

Cukup copy file .env.example yang telah disediakan dengan perintah berikut:
`cp .env .env.example`
Kemudian sesuaikan konfigurasi environment variable dengan kebutuhan.

### 3. Jalankan server

Jalankan server dengan perintah berikut:
`npm start`
Typescript akan otomatis dicompile dan file js yang dihasilkan akan dijalankan oleh node. Terdapat script yang mengecek apakah project sudah dibuild atau belum, jadi tidak perlu khawatir akan terbuild ulang setiap menjalankan server. Namun, **pastikan gunakan perintah:**
`npm run clean`
**Setiap melakukan perubahan pada project.**
