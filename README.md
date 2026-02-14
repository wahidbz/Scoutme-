# 🏆 ScoutMe - منصة عالمية للمواهب الرياضية

## ✨ التحديثات الجديدة (2026)

### ✅ التعديلات المنفذة:

1. **🔐 تسجيل الدخول فقط عبر Pi Network**
   - ✅ تم إزالة Firebase Authentication
   - ✅ استخدام Pi Network SDK حصرياً
   - ✅ ربط حقيقي بمحفظة Pi Network

2. **💬 نظام الرسائل الفوري**
   - ✅ إرسال واستقبال الرسائل في الوقت الفعلي
   - ✅ إشعارات للرسائل الجديدة
   - ✅ واجهة محادثة سهلة الاستخدام
   - ✅ تخزين الرسائل في Firestore

3. **🗺️ خريطة تفاعلية مجانية (Leaflet.js)**
   - ✅ استبدال Google Maps بـ Leaflet + OpenStreetMap
   - ✅ مجاني 100% بدون API Key
   - ✅ إضافة مواقع الفرق والأكاديميات على الخريطة
   - ✅ نوافذ معلومات تفاعلية (Popups)

4. **🔑 إدارة PI_API_KEY**
   - ✅ استخدام متغيرات البيئة (Environment Variables)
   - ✅ أمان محسّن للمفتاح الخاص

## 📋 متطلبات التشغيل

### 1. Firebase Setup

#### أ. إنشاء مشروع Firebase
```bash
1. اذهب إلى: https://console.firebase.google.com/
2. أنشئ مشروع جديد "ScoutMe"
3. فعّل Firestore Database
4. فعّل Storage
```

#### ب. الحصول على إعدادات Firebase
```javascript
// في ملف script.js (السطر 7-14)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",           // من Firebase Console
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

#### ج. قواعد Firestore
```javascript
// في Firebase Console > Firestore > Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /players/{playerId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /teams/{teamId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /academies/{academyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /shops/{shopId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /notifications/{notificationId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

#### د. قواعد Storage
```javascript
// في Firebase Console > Storage > Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 2. Pi Network Configuration

#### أ. تسجيل التطبيق
```
1. اذهب إلى: https://developers.minepi.com/
2. سجل تطبيقك الجديد
3. احصل على PI_API_KEY
```

#### ب. إعداد PI_API_KEY

**الطريقة الآمنة (للإنتاج):**

إنشاء ملف `.env` في المجلد الرئيسي:
```bash
PI_API_KEY=your_actual_pi_api_key_here
```

**الطريقة البديلة (للتطوير):**
```javascript
// في script.js (السطر 5)
const PI_API_KEY = 'your_pi_api_key_here';
```

⚠️ **ملاحظة مهمة:** 
- لا ترفع `.env` على GitHub
- أضف `.env` إلى `.gitignore`
- استخدم خادم Backend للمدفوعات في الإنتاج

### 3. هيكل المجلدات

```
scoutme_updated/
├── index.html          # الواجهة الرئيسية
├── script.js           # منطق التطبيق
├── style.css           # التنسيقات
├── .env               # متغيرات البيئة (لا ترفعه!)
├── .gitignore         # قائمة الملفات المستبعدة
├── README.md          # هذا الملف
└── image/             # مجلد الصور
    ├── logo.png
    ├── players/
    ├── teams/
    └── stores/
```

### 4. ملف .gitignore

أنشئ ملف `.gitignore`:
```
.env
node_modules/
.DS_Store
*.log
```

## 🚀 طرق الرفع والنشر

### الطريقة 1: Firebase Hosting (موصى بها)

```bash
# 1. تثبيت Firebase CLI
npm install -g firebase-tools

# 2. تسجيل الدخول
firebase login

# 3. تهيئة المشروع
firebase init hosting

# 4. اختر المجلد الحالي كـ public directory
# اكتب: .

# 5. هل single-page app؟
# اختر: No

# 6. رفع التطبيق
firebase deploy

# 7. ستحصل على رابط مثل:
# https://your-project.web.app
```

### الطريقة 2: Netlify

```bash
# 1. اذهب إلى https://app.netlify.com/
# 2. اسحب المجلد بالكامل إلى Netlify
# 3. أضف متغيرات البيئة:
#    - Site settings > Environment variables
#    - أضف: PI_API_KEY = your_key

# 4. Deploy!
```

### الطريقة 3: Vercel

```bash
# 1. تثبيت Vercel CLI
npm i -g vercel

# 2. في مجلد المشروع
vercel

# 3. اتبع التعليمات

# 4. أضف Environment Variable:
vercel env add PI_API_KEY
```

### الطريقة 4: رفع على استضافة عادية

```bash
# 1. رفع جميع الملفات إلى cPanel/FTP
# 2. تأكد من:
#    - index.html في الجذر
#    - جميع الملفات موجودة
#    - مجلد image/ موجود

# 3. للـ PI_API_KEY:
#    - استخدم ملف .htaccess لإعداد المتغيرات
#    - أو استخدم PHP لإدارة المفتاح
```

## 🔧 اختبار التطبيق محلياً

### باستخدام Python:
```bash
cd scoutme_updated
python3 -m http.server 8000
# افتح: http://localhost:8000
```

### باستخدام Node.js:
```bash
npx http-server .
# افتح: http://localhost:8080
```

### باستخدام Live Server (VS Code):
```
1. افتح المجلد في VS Code
2. انقر بزر الماوس الأيمن على index.html
3. اختر "Open with Live Server"
```

## 📝 ملاحظات مهمة

### ✅ تم إصلاحه:
- ✅ تسجيل الدخول يعمل فقط عبر Pi Network
- ✅ نظام الرسائل يعمل بشكل فوري
- ✅ الخريطة التفاعلية مجانية (Leaflet)
- ✅ PI_API_KEY آمن في متغيرات البيئة

### ⚠️ يحتاج إعداد:
- ⚠️ أضف بيانات Firebase الخاصة بك
- ⚠️ أضف PI_API_KEY في ملف .env
- ⚠️ أنشئ مجلد image/ وأضف الصور

### 🎯 للتطوير المستقبلي:
- إضافة Backend API للمدفوعات
- تحسين نظام الإشعارات Push
- إضافة مكالمات فيديو
- تطبيق Mobile (React Native)

## 🔐 الأمان في الإنتاج

### للمدفوعات الحقيقية عبر Pi:

```javascript
// ⚠️ لا تستخدم PI_API_KEY في Frontend!
// استخدم Backend API:

// Backend (Node.js/Express)
const express = require('express');
const axios = require('axios');
const app = express();

app.post('/api/approve-payment', async (req, res) => {
  const { paymentId } = req.body;
  
  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          'Authorization': `Key ${process.env.PI_API_KEY}`
        }
      }
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));
```

## 📱 ميزات التطبيق

### 1. الصفحة الرئيسية
- عرض إحصائيات سريعة
- مواهب مميزة
- خريطة تفاعلية
- آخر الأخبار

### 2. صفحة الاستكشاف
- بحث متقدم
- فلترة حسب الرياضة/الدولة/المدينة
- عرض شبكي للنتائج

### 3. صفحة المواهب
- قائمة بجميع اللاعبين
- إضافة لاعب جديد
- تفاصيل كل لاعب

### 4. لوحة التحكم
- إحصائيات تفصيلية
- إدارة المحتوى
- تحليلات البيانات

### 5. نظام الرسائل
- محادثات فورية
- إشعارات الرسائل الجديدة
- سجل المحادثات

### 6. الملف الشخصي
- معلومات المستخدم
- محفظة Pi Network
- الإعدادات

## 🌍 اللغات المدعومة

- العربية 🇸🇦
- English 🇬🇧
- Français 🇫🇷
- Español 🇪🇸
- Deutsch 🇩🇪
- وغيرها...

## 📞 الدعم

لأي استفسار:
- **GitHub Issues**: [افتح issue جديد]
- **Email**: support@scoutme.app

## 📄 الترخيص

MIT License - استخدم بحرية

---

**تم التطوير بواسطة فريق ScoutMe 2026** 🏆⚽

تم بناؤه بـ ❤️ باستخدام:
- Pi Network SDK
- Firebase
- Leaflet.js (OpenStreetMap)
- Vanilla JavaScript

✅ **جاهز للرفع 100%**
