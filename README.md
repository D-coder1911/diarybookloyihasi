# DiaryBook 📔

**DiaryBook** — bu foydalanuvchilarga maqolalar yozish, ularni o‘qish, tahrirlash va ularga izohlar qoldirish orqali o‘z fikrlarini erkin ifodalash imkonini beruvchi platforma.

---

## 🎯 Loyihaning maqsadi

Foydalanuvchilarni maqola va izohlar orqali bog‘lovchi, ularga shaxsiy fikr va tajribalari bilan bo‘lishish imkonini beruvchi raqamli kundalik platformasini yaratish. Platforma orqali foydalanuvchilar bilim almashadi, bahs yuritadilar va o‘zaro fikr almashadilar.

---

## ✅ Funksional talablar

- Foydalanuvchilar ro'yxatdan o'tishi, tizimga kirishi, profilini tahrirlashi va parolini tiklashi mumkin.
- Har bir foydalanuvchi maqola yozishi, tahrirlashi, o‘chirish va o‘qishi mumkin.
- Maqolalar kategoriyalar va taglar asosida tartiblanadi.
- Maqolalarni qidirish, saralash funksiyalari mavjud.
- Har bir maqola ostiga izoh qoldirish, tahrirlash va o‘chirish imkoniyati mavjud.
- Izohlarga javob yozish mumkin.
- Admin panel orqali adminlar maqola va izohlarni moderatsiya qiladi, foydalanuvchilarni boshqaradi yoki bloklaydi.

---

## 📦 Nofunksional talablar

- **Xavfsizlik**: JWT asosida autentifikatsiya.
- **Tezkorlik**: Ilova iloji boricha minimal javob vaqtida ishlashi kerak.
- **Kengayuvchanlik**: Yangi funksiyalar qo‘shishga tayyor tizim arxitekturasi.

---

## 🧩 Ma'lumotlar bazasi modellari

1. **User**
   - id
   - name
   - email
   - password
   - role (user/admin)
   - avatarUrl
   - createdAt
   - updatedAt

2. **Article**
   - id
   - title
   - content
   - categoryId (FK)
   - tags (array)
   - authorId (FK - User)
   - createdAt
   - updatedAt

3. **Comment**
   - id
   - content
   - articleId (FK)
   - userId (FK)
   - parentCommentId (FK, nullable)
   - createdAt
   - updatedAt

4. **Category**
   - id
   - name
   - createdAt
   - updatedAt

5. **Tag**
   - id
   - name
   - createdAt

---

## 🛠️ Texnologiyalar

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript (yoki React/Vue agar ishlatilsa)
- **Database**: MySQL / PostgreSQL yoki MongoDB
- **Authentication**: JWT (JSON Web Token)# diarybookloyihasi
