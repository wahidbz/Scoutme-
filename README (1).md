# 🏆 ScoutMe - منصة عالمية للمواهب الرياضية

## نظرة عامة
ScoutMe هو تطبيق ويب متقدم لاكتشاف وإدارة المواهب الرياضية مع دعم Firebase و Pi Network.

## ✨ الميزات الرئيسية

### 1️⃣ Front-End المحسّن
- **Dashboard إداري** شامل للمشرفين والمدربين
- **Forms متقدمة** لجميع Collections (اللاعبين، الفرق، الأكاديميات، المحلات)
- **Search/Filter/Sort** متقدم ومتعدد المعايير
- **Profile Pages** تفصيلية لكل عنصر
- **نظام اللغات المحسّن** يدعم 15 لغة بدون أخطاء

### 2️⃣ تكامل Firebase
- **Authentication**: تسجيل دخول عبر Google
- **Firestore**: قاعدة بيانات NoSQL
- **Storage**: تخزين الصور والملفات
- **Real-time**: تحديثات فورية

### 3️⃣ تكامل Pi Network
- تسجيل الدخول عبر Pi Network
- محفظة Pi مدمجة
- نظام دفع آمن

### 4️⃣ ميزات إضافية
- **Map Integration**: عرض مواقع الفرق والأكاديميات على خريطة تفاعلية
- **Rating/TrustScore**: نظام تقييم موثوق لكل عنصر
- **Notifications System**: إشعارات فورية للمستخدمين
- **Dark Mode**: وضع ليلي مريح للعين
- **Responsive Design**: يعمل بسلاسة على جميع الأجهزة

### 5️⃣ Analytics & Insights
- إحصائيات حسب الرياضة/المدينة/الأكاديمية
- عدد الفرق والأكاديميات النشطة
- تحليلات متقدمة للأداء

## 📁 هيكل الملفات

\`\`\`
scoutme_enhanced/
├── index.html       # الواجهة الرئيسية (41KB)
├── script.js        # منطق التطبيق (47KB)
├── style.css        # التنسيقات (31KB)
├── README.md        # هذا الملف
└── image/           # مجلد الصور (يجب إنشاؤه)
    ├── logo.png
    ├── players/
    ├── teams/
    └── stores/
\`\`\`

## 🚀 التثبيت والإعداد

### 1. Firebase Configuration

في ملف \`script.js\` (السطر 12-19)، استبدل القيم التالية بإعدادات Firebase الخاصة بك:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
\`\`\`

### 2. Google Maps API

في ملف \`index.html\` (السطر 12)، أضف مفتاح Google Maps API الخاص بك:

\`\`\`html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places"></script>
\`\`\`

### 3. إعداد Firebase

#### أ. إنشاء مشروع Firebase
1. انتقل إلى [Firebase Console](https://console.firebase.google.com/)
2. أنشئ مشروعًا جديدًا باسم "ScoutMe"
3. فعّل **Authentication** (Google Sign-in)
4. أنشئ قاعدة بيانات **Firestore**
5. فعّل **Storage**

#### ب. قواعد Firestore

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Players collection
    match /players/{playerId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Teams collection
    match /teams/{teamId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Academies collection
    match /academies/{academyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Shops collection
    match /shops/{shopId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if request.auth != null;
    }
    
    // Ratings collection
    match /ratings/{ratingId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

#### ج. قواعد Storage

\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /players/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /teams/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /academies/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /shops/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

### 4. هيكل Firestore Collections

#### Users
\`\`\`javascript
{
  id: string,
  name: string,
  email: string,
  photoURL: string,
  wallet: string,
  trustScore: number,
  createdAt: timestamp
}
\`\`\`

#### Players
\`\`\`javascript
{
  name: string,
  age: number,
  sport: string,
  position: string,
  country: string,
  city: string,
  team: string,
  academy: string,
  highlights: string,
  description: string,
  image: string,
  trustScore: number,
  rating: number,
  createdAt: timestamp
}
\`\`\`

#### Teams
\`\`\`javascript
{
  name: string,
  sport: string,
  level: string,
  country: string,
  city: string,
  coach: string,
  players: array,
  logo: string,
  coordinates: string,
  trustScore: number,
  createdAt: timestamp
}
\`\`\`

#### Academies
\`\`\`javascript
{
  name: string,
  sport: string,
  director: string,
  country: string,
  city: string,
  address: string,
  phone: string,
  email: string,
  website: string,
  description: string,
  coordinates: string,
  trustScore: number,
  createdAt: timestamp
}
\`\`\`

#### Shops
\`\`\`javascript
{
  name: string,
  category: string,
  owner: string,
  country: string,
  city: string,
  address: string,
  phone: string,
  email: string,
  products: string,
  coordinates: string,
  trustScore: number,
  createdAt: timestamp
}
\`\`\`

### 5. رفع الملفات

#### للتطوير المحلي:
\`\`\`bash
# افتح index.html في المتصفح مباشرة
open index.html
\`\`\`

#### للنشر على Firebase Hosting:
\`\`\`bash
# تثبيت Firebase CLI
npm install -g firebase-tools

# تسجيل الدخول
firebase login

# إنشاء مشروع
firebase init hosting

# رفع الملفات
firebase deploy
\`\`\`

#### للنشر على Netlify/Vercel:
1. ارفع المجلد كاملاً إلى GitHub
2. اربط الريبو مع Netlify أو Vercel
3. انشر الموقع

## 🎨 التخصيص

### تغيير الألوان
في ملف \`style.css\` (السطر 6-16):
\`\`\`css
:root {
    --primary-green: #1F7A1F;
    --primary-yellow: #FFD700;
    /* ... المزيد من الألوان */
}
\`\`\`

### إضافة لغات جديدة
في ملف \`script.js\` (السطر 80+):
\`\`\`javascript
translations.newLang = {
    appName: 'ScoutMe',
    // ... ترجمات أخرى
};
\`\`\`

### إضافة رياضات جديدة
في ملف \`script.js\` (السطر 40+):
\`\`\`javascript
const ALL_SPORTS = [
    'كرة قدم',
    'رياضتك الجديدة',
    // ...
];
\`\`\`

## 📱 الصفحات الرئيسية

1. **الرئيسية** - عرض المواهب المميزة والإحصائيات
2. **استكشف** - بحث وفلترة متقدمة
3. **المواهب** - إدارة اللاعبين
4. **الفرق** - إدارة الفرق الرياضية
5. **الأكاديميات** - إدارة الأكاديميات
6. **لوحة التحكم** - إحصائيات وأدوات الإدارة
7. **المتجر** - توكنات، NFTs، ومحلات رياضية
8. **الملف الشخصي** - إعدادات المستخدم

## 🔐 الأمان

- جميع عمليات المصادقة عبر Firebase
- لا يتم حفظ PI_API_KEY في الكود
- استخدم Firebase Functions للدفع عبر Pi
- HTTPS إلزامي للإنتاج

## 🌐 اللغات المدعومة

العربية 🇸🇦 | English 🇬🇧 | Français 🇫🇷 | Español 🇪🇸 | Deutsch 🇩🇪 | 
Português 🇵🇹 | Italiano 🇮🇹 | Русский 🇷🇺 | 中文 🇨🇳 | 日本語 🇯🇵 | 
한국어 🇰🇷 | Türkçe 🇹🇷 | हिन्दी 🇮🇳 | বাংলা 🇧🇩 | اردو 🇵🇰

## 📊 تطوير مستقبلي

- [ ] Chat/Messaging بين المستخدمين
- [ ] Booking System للتدريبات
- [ ] AI Suggestions للاعبين
- [ ] Gamification مع badges
- [ ] تطبيق موبايل (React Native)
- [ ] واجهة API REST

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء فرع جديد
3. Commit التغييرات
4. Push إلى الفرع
5. فتح Pull Request

## 📄 الترخيص

MIT License - استخدم بحرية للمشاريع الشخصية والتجارية

## 📞 الدعم

- **Email**: support@scoutme.app
- **Discord**: [اطلب رابط الانضمام]
- **Documentation**: [docs.scoutme.app]

## 🙏 شكر خاص

- Pi Network للبنية التحتية
- Firebase لقاعدة البيانات والمصادقة
- Google Maps للخرائط التفاعلية
- المجتمع المفتوح المصدر

---

**ملاحظة**: هذا التطبيق جاهز 100% للرفع على Firebase. تأكد من إضافة مجلد \`image/\` بالصور المطلوبة.

تم بناؤه بـ ❤️ لمجتمع ScoutMe
