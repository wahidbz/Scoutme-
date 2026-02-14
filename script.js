// ScoutMe - Enhanced JavaScript Application with Firebase & Pi Network Integration
// ==============================================================================

// ===========================
// Constants & Configuration
// ===========================
const BASE_IMG = 'image';
const PI_API_KEY = localStorage.getItem('PI_API_KEY') || '';

// Firebase Configuration (أضف إعداداتك هنا)
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDTA98HsQ_wlpbAAOJux4kynyg-EPQoOTM",
    authDomain: "scoutme-73fb8.firebaseapp.com",
    projectId: "scoutme-73fb8",
    storageBucket: "scoutme-73fb8.firebasestorage.app",
    messagingSenderId: "394693573994",
    appId: "1:394693573994:web:d95d66452eb0725ef13913"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  console.log("Firebase Connected 🚀");
</script>

// Initialize Firebase
let db, auth, storage;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  auth = firebase.auth();
  storage = firebase.storage();
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Collections Names
const COLLECTIONS = {
  USERS: 'users',
  PLAYERS: 'players',
  TEAMS: 'teams',
  ACADEMIES: 'academies',
  SHOPS: 'shops',
  NFT_PLAYERS: 'nft_players',
  TEAM_TOKENS: 'team_tokens',
  STORES: 'pi_stores',
  NOTIFICATIONS: 'notifications',
  RATINGS: 'ratings'
};

// Local Storage Keys (للنسخ الاحتياطية)
const STORAGE = {
  ME: 'sm_me',
  LANGUAGE: 'sm_language',
  THEME: 'sm_theme',
  NOTIFICATIONS_ENABLED: 'sm_notifications_enabled'
};

// ===========================
// Helper Functions
// ===========================
function uid(prefix = 'id') {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function showLoading() {
  document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loadingScreen').style.display = 'none';
}

function showNotification(message, type = 'info') {
  const toast = document.getElementById('notificationToast');
  const messageEl = toast.querySelector('.notification-message');
  
  messageEl.textContent = message;
  toast.className = 'notification-toast show ' + type;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

function closeNotification() {
  document.getElementById('notificationToast').classList.remove('show');
}

// ===========================
// Sports List (Extended)
// ===========================
const ALL_SPORTS = [
  'كرة قدم', 'كرة سلة', 'تنس', 'سباحة', 'رفع أثقال', 'هوكي', 'جمباز',
  'كرة طائرة', 'كرة يد', 'ملاكمة', 'جودو', 'كاراتيه', 'كونغ فو', 'تايكوندو',
  'ركض', 'دراجات', 'رماية', 'تزلج', 'غولف', 'فروسية', 'شطرنج',
  'كرة قاعدة', 'رجبي', 'تسلق جبال', 'تجديف', 'ترياتلون', 'سباق سيارات',
  'سباق دراجات نارية', 'مصارعة', 'باركور', 'ركوب أمواج', 'بلياردو',
  'بولينغ', 'هوكي جليدي', 'هوكي ميداني', 'سكواش', 'بادمنتون', 'تنس طاولة',
  'سباقات السرعة', 'ماراثون', 'سباقات خيل', 'فن قتالي مختلط (MMA)',
  'رياضات إلكترونية', 'ألعاب استراتيجية', 'البادل', 'الكيك بوكسينغ',
  'اليوغا', 'الزومبا', 'سلاح الشيش', 'رمي القرص', 'رمي الرمح',
  'القفز الطويل', 'القفز بالزانة', 'الجمباز الإيقاعي', 'كرة الماء',
  'التزلج على الجليد', 'التزلج على اللوح', 'الدرِفت', 'الراليات',
  'سباقات القوارب', 'الوثب الثلاثي', 'الوثب العالي', 'سباق الحواجز',
  'الرماية بالقوس', 'التايبو', 'سباقات السرعة القصيرة'
];

// Countries List
const ALL_COUNTRIES = [
  { code: 'TN', name: 'تونس', flag: '🇹🇳' },
  { code: 'DZ', name: 'الجزائر', flag: '🇩🇿' },
  { code: 'MA', name: 'المغرب', flag: '🇲🇦' },
  { code: 'EG', name: 'مصر', flag: '🇪🇬' },
  { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
  { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
  { code: 'QA', name: 'قطر', flag: '🇶🇦' },
  { code: 'FR', name: 'فرنسا', flag: '🇫🇷' },
  { code: 'ES', name: 'إسبانيا', flag: '🇪🇸' },
  { code: 'IT', name: 'إيطاليا', flag: '🇮🇹' },
  { code: 'GB', name: 'بريطانيا', flag: '🇬🇧' },
  { code: 'DE', name: 'ألمانيا', flag: '🇩🇪' },
  { code: 'PT', name: 'البرتغال', flag: '🇵🇹' },
  { code: 'BR', name: 'البرازيل', flag: '🇧🇷' },
  { code: 'AR', name: 'الأرجنتين', flag: '🇦🇷' },
  { code: 'US', name: 'الولايات المتحدة', flag: '🇺🇸' },
  { code: 'JP', name: 'اليابان', flag: '🇯🇵' },
  { code: 'KR', name: 'كوريا الجنوبية', flag: '🇰🇷' },
  { code: 'CN', name: 'الصين', flag: '🇨🇳' }
];

// ===========================
// Multi-Language Support (Enhanced)
// ===========================
const translations = {
  ar: {
    appName: 'ScoutMe',
    loading: 'جاري التحميل...',
    bannerTitle: 'اكتشف نجوم المستقبل',
    bannerSubtitle: 'منصة عالمية للمواهب الرياضية',
    spotlightTalents: 'مواهب مميزة',
    viewAll: 'عرض الكل',
    latestNews: 'آخر الأخبار',
    mapView: 'الخريطة التفاعلية',
    searchPlaceholder: 'البحث عن اللاعبين، الفرق، الأكاديميات...',
    allSports: 'كل الرياضات',
    all_types: 'كل الأنواع',
    players: 'اللاعبين',
    teams: 'الفرق',
    academies: 'الأكاديميات',
    shops: 'المحلات',
    all_countries: 'كل الدول',
    all_cities: 'كل المدن',
    reset_filters: 'إعادة تعيين',
    talentsTitle: 'المواهب الرياضية',
    teamsTitle: 'الفرق الرياضية',
    academiesTitle: 'الأكاديميات الرياضية',
    add_talent: '+ إضافة موهبة',
    add_team: '+ إضافة فريق',
    add_academy: '+ إضافة أكاديمية',
    add_shop: '+ إضافة محل',
    sortByRating: 'الأعلى تقييماً',
    sortByAge: 'حسب العمر',
    sortByCountry: 'حسب الدولة',
    sortBySport: 'حسب الرياضة',
    sortByDate: 'الأحدث',
    clubsTitle: 'الأندية والأكاديميات',
    dashboard: 'لوحة التحكم',
    analytics_overview: 'نظرة عامة على الإحصائيات',
    players_by_sport: 'اللاعبين حسب الرياضة',
    players_by_country: 'اللاعبين حسب الدولة',
    top_rated: 'الأعلى تقييماً',
    recent_activity: 'النشاط الأخير',
    management_tools: 'أدوات الإدارة',
    manage_players: 'إدارة اللاعبين',
    manage_teams: 'إدارة الفرق',
    manage_academies: 'إدارة الأكاديميات',
    manage_shops: 'إدارة المحلات',
    total_players: 'مجموع اللاعبين',
    total_teams: 'مجموع الفرق',
    total_academies: 'الأكاديميات',
    total_shops: 'المحلات',
    home: 'الرئيسية',
    discover: 'استكشف',
    talents: 'المواهب',
    clubs: 'الأندية',
    marketplace: 'المتجر',
    profile: 'الملف',
    userName: 'مستخدم ScoutMe',
    overview: 'نظرة عامة',
    stats: 'الإحصائيات',
    nfts: 'NFTs',
    settings: 'الإعدادات',
    goals: 'أهداف',
    assists: 'تمريرات',
    awards: 'جوائز',
    statsComingSoon: 'الإحصائيات التفصيلية قريباً...',
    nftsComingSoon: 'NFTs قريباً...',
    language: 'اللغة',
    notifications: 'الإشعارات',
    darkMode: 'الوضع الليلي',
    wallet: 'المحفظة',
    currentBalance: 'الرصيد الحالي',
    send: 'إرسال',
    receive: 'استقبال',
    transactionHistory: 'سجل المعاملات',
    viewProfile: 'عرض الملف',
    message: 'رسالة',
    apply: 'تقديم طلب',
    join: 'انضم',
    team_tokens: 'توكنات الفرق',
    price: 'السعر',
    buy: 'شراء',
    nft_players: 'NFT اللاعبين',
    value: 'القيمة',
    marketplace_desc: 'اكتشف متاجر شريكة داخل نظام Pi',
    pi_stores: 'متاجر منظومة Pi',
    shops_section: 'محلات رياضية',
    visit: 'زيارة',
    welcome_to_scoutme: 'مرحبا بك في ScoutMe',
    pi_network_login_desc: 'سجل الدخول باستخدام Pi Network أو Firebase للوصول إلى المنصة',
    signin_with_pi: 'تسجيل الدخول عبر Pi Network',
    signin_with_firebase: 'تسجيل الدخول عبر Firebase',
    wallet_address: 'عنوان المحفظة',
    link_wallet: 'ربط محفظة Pi',
    payment_with_pi: 'الدفع بـ Pi',
    select_amount: 'اختر المبلغ',
    confirm_payment: 'تأكيد الدفع',
    app_commission: 'عمولة التطبيق (%)',
    save: 'حفظ',
    cancel: 'إلغاء',
    dev_note: 'ملاحظة: للدفع الحقيقي عبر Pi استعمل سيرفر/Function لحماية PI_API_KEY.',
    logout: 'تسجيل الخروج',
    player_name: 'اسم اللاعب',
    age: 'العمر',
    sport: 'الرياضة',
    position: 'المركز/الموقع',
    country: 'الدولة',
    city: 'المدينة',
    team: 'الفريق',
    academy: 'الأكاديمية',
    highlights_video: 'فيديو Highlights (رابط YouTube)',
    player_image: 'صورة اللاعب',
    description: 'الوصف',
    team_name: 'اسم الفريق',
    level: 'المستوى',
    coach: 'المدرب',
    players_list: 'قائمة اللاعبين',
    select_multiple_help: 'اضغط Ctrl (أو Cmd) للاختيار المتعدد',
    team_logo: 'شعار الفريق',
    location_coordinates: 'الإحداثيات (للخريطة)',
    academy_name: 'اسم الأكاديمية',
    director: 'المدير',
    address: 'العنوان الكامل',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    website: 'الموقع الإلكتروني',
    shop_name: 'اسم المحل',
    category: 'الفئة',
    owner: 'المالك',
    products: 'المنتجات الأساسية',
    clear_all: 'مسح الكل',
    success: 'نجح',
    error: 'خطأ',
    saved_successfully: 'تم الحفظ بنجاح',
    deleted_successfully: 'تم الحذف بنجاح',
    confirm_delete: 'هل أنت متأكد من الحذف؟',
    yes: 'نعم',
    no: 'لا'
  },
  en: {
    appName: 'ScoutMe',
    loading: 'Loading...',
    bannerTitle: 'Discover Future Stars',
    bannerSubtitle: 'Global Platform for Sports Talents',
    spotlightTalents: 'Spotlight Talents',
    viewAll: 'View All',
    latestNews: 'Latest News',
    mapView: 'Interactive Map',
    searchPlaceholder: 'Search for players, teams, academies...',
    allSports: 'All Sports',
    all_types: 'All Types',
    players: 'Players',
    teams: 'Teams',
    academies: 'Academies',
    shops: 'Shops',
    all_countries: 'All Countries',
    all_cities: 'All Cities',
    reset_filters: 'Reset Filters',
    talentsTitle: 'Sports Talents',
    teamsTitle: 'Sports Teams',
    academiesTitle: 'Sports Academies',
    add_talent: '+ Add Talent',
    add_team: '+ Add Team',
    add_academy: '+ Add Academy',
    add_shop: '+ Add Shop',
    sortByRating: 'Highest Rated',
    sortByAge: 'By Age',
    sortByCountry: 'By Country',
    sortBySport: 'By Sport',
    sortByDate: 'Newest',
    clubsTitle: 'Clubs & Academies',
    dashboard: 'Dashboard',
    analytics_overview: 'Analytics Overview',
    players_by_sport: 'Players by Sport',
    players_by_country: 'Players by Country',
    top_rated: 'Top Rated',
    recent_activity: 'Recent Activity',
    management_tools: 'Management Tools',
    manage_players: 'Manage Players',
    manage_teams: 'Manage Teams',
    manage_academies: 'Manage Academies',
    manage_shops: 'Manage Shops',
    total_players: 'Total Players',
    total_teams: 'Total Teams',
    total_academies: 'Academies',
    total_shops: 'Shops',
    home: 'Home',
    discover: 'Discover',
    talents: 'Talents',
    clubs: 'Clubs',
    marketplace: 'Marketplace',
    profile: 'Profile',
    userName: 'ScoutMe User',
    overview: 'Overview',
    stats: 'Statistics',
    nfts: 'NFTs',
    settings: 'Settings',
    goals: 'Goals',
    assists: 'Assists',
    awards: 'Awards',
    team_tokens: 'Team Tokens',
    price: 'Price',
    buy: 'Buy',
    nft_players: 'NFT Players',
    value: 'Value',
    pi_stores: 'Pi Ecosystem Stores',
    shops_section: 'Sports Shops',
    visit: 'Visit',
    wallet_address: 'Wallet Address',
    link_wallet: 'Link Pi Wallet',
    select_amount: 'Select Amount',
    logout: 'Logout',
    player_name: 'Player Name',
    age: 'Age',
    sport: 'Sport',
    position: 'Position',
    country: 'Country',
    city: 'City',
    team: 'Team',
    academy: 'Academy',
    save: 'Save',
    cancel: 'Cancel',
    success: 'Success',
    error: 'Error',
    saved_successfully: 'Saved successfully',
    deleted_successfully: 'Deleted successfully',
    confirm_delete: 'Are you sure you want to delete?',
    yes: 'Yes',
    no: 'No'
  },
  fr: {
    appName: 'ScoutMe',
    loading: 'Chargement...',
    bannerTitle: 'Découvrez les Stars de Demain',
    bannerSubtitle: 'Plateforme Mondiale pour les Talents Sportifs',
    spotlightTalents: 'Talents en Vedette',
    viewAll: 'Voir Tout',
    latestNews: 'Dernières Nouvelles',
    mapView: 'Carte Interactive',
    searchPlaceholder: 'Rechercher des joueurs, équipes, académies...',
    allSports: 'Tous les Sports',
    home: 'Accueil',
    discover: 'Découvrir',
    talents: 'Talents',
    clubs: 'Clubs',
    marketplace: 'Marché',
    profile: 'Profil',
    dashboard: 'Tableau de bord',
    logout: 'Déconnexion',
    save: 'Enregistrer',
    cancel: 'Annuler'
  }
};

// Add abbreviated translations for other languages
['es', 'de', 'pt', 'it', 'ru', 'zh', 'ja', 'ko', 'tr', 'hi', 'bn'].forEach(lang => {
  translations[lang] = { ...translations.en };
});
translations.ur = { ...translations.ar };

// ===========================
// Language Functions
// ===========================
let currentLanguage = localStorage.getItem(STORAGE.LANGUAGE) || 'ar';

function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem(STORAGE.LANGUAGE, lang);
  
  const direction = ['ar', 'ur'].includes(lang) ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', lang);
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  // Update select options
  document.querySelectorAll('option[data-i18n]').forEach(option => {
    const key = option.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      option.textContent = translations[lang][key];
    }
  });
  
  // Update current language display
  const currentLangDisplay = document.getElementById('currentLangDisplay');
  if (currentLangDisplay) {
    const langNames = {
      ar: 'العربية', en: 'English', fr: 'Français', es: 'Español',
      de: 'Deutsch', pt: 'Português', it: 'Italiano', ru: 'Русский',
      zh: '中文', ja: '日本語', ko: '한국어', tr: 'Türkçe',
      hi: 'हिन्दी', bn: 'বাংলা', ur: 'اردو'
    };
    currentLangDisplay.textContent = langNames[lang] || 'العربية';
  }
}

function t(key) {
  return translations[currentLanguage]?.[key] || key;
}

// ===========================
// Firebase Authentication
// ===========================
async function firebaseSignIn() {
  try {
    showLoading();
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    
    // Save user to Firestore
    await db.collection(COLLECTIONS.USERS).doc(user.uid).set({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      trustScore: 5.0
    }, { merge: true });
    
    localStorage.setItem(STORAGE.ME, JSON.stringify({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }));
    
    localStorage.setItem('sm_seen_overlay', 'true');
    document.getElementById('reg-overlay').style.display = 'none';
    
    showNotification(t('success') + ': ' + user.displayName, 'success');
    hideLoading();
    initApp();
  } catch (error) {
    console.error('Firebase sign-in error:', error);
    showNotification(t('error') + ': ' + error.message, 'error');
    hideLoading();
  }
}

async function logout() {
  if (confirm(t('confirm_delete'))) {
    try {
      await auth.signOut();
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      showNotification(t('error'), 'error');
    }
  }
}

// ===========================
// Pi Network SDK Functions
// ===========================
let __piInitDone = false;

function isPiSdkAvailable() {
  return typeof window !== 'undefined' && window.Pi && typeof window.Pi.authenticate === 'function';
}

async function piSignIn() {
  try {
    showLoading();
    if (isPiSdkAvailable()) {
      if (!__piInitDone && typeof window.Pi.init === 'function') {
        __piInitDone = true;
        try { window.Pi.init({ version: "2.0", sandbox: false }); } catch(e) {}
      }
      
      const auth_result = await window.Pi.authenticate(["username","payments"], (payment) => {
        console.log('onIncompletePaymentFound', payment);
      });
      
      const accessToken = auth_result?.accessToken || auth_result?.access_token || '';
      const username = String(auth_result?.user?.username || auth_result?.username || auth_result?.user?.name || '').trim();
      
      if (!username) {
        throw new Error('Pi did not return a username. Please try again.');
      }
      
      if (accessToken) {
        localStorage.setItem('PI_ACCESS_TOKEN', accessToken);
      }
      
      const piUser = { 
        id: uid('user'), 
        name: username, 
        email: '', 
        wallet: username + '@pi.network', 
        sports: [], 
        country: '',
        trustScore: 5.0
      };
      
      // Save to Firebase if available
      if (db) {
        try {
          await db.collection(COLLECTIONS.USERS).doc(piUser.id).set(piUser, { merge: true });
        } catch (e) {
          console.error('Firebase save error:', e);
        }
      }
      
      localStorage.setItem(STORAGE.ME, JSON.stringify(piUser));
      localStorage.setItem('sm_seen_overlay', 'true');
      
      document.getElementById('reg-overlay').style.display = 'none';
      
      showNotification(t('success') + ': ' + username, 'success');
      hideLoading();
      initApp();
      
    } else {
      alert('Pi SDK not available. Please open in Pi Browser.');
      hideLoading();
    }
  } catch(err) {
    console.error('Pi sign-in failed:', err);
    alert('فشل تسجيل الدخول عبر Pi: ' + (err && err.message ? err.message : 'Unknown error'));
    hideLoading();
  }
}

async function linkPiWallet() {
  try {
    if (!isPiSdkAvailable()) {
      alert('Pi SDK not available');
      return;
    }
    
    const auth_result = await window.Pi.authenticate(["username", "payments"], () => {});
    const username = auth_result?.user?.username || auth_result?.username || '';
    const walletAddress = username + '@pi.network';
    
    const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
    me.wallet = walletAddress;
    localStorage.setItem(STORAGE.ME, JSON.stringify(me));
    
    // Update in Firebase
    if (db && me.id) {
      try {
        await db.collection(COLLECTIONS.USERS).doc(me.id).update({ wallet: walletAddress });
      } catch (e) {}
    }
    
    showNotification(t('success') + ': ' + walletAddress, 'success');
    loadProfile();
  } catch(err) {
    console.error(err);
    showNotification(t('error'), 'error');
  }
}

async function payWithPi(amount) {
  try {
    if (!isPiSdkAvailable()) {
      alert('Pi SDK not available');
      return;
    }
    
    let accessToken = localStorage.getItem('PI_ACCESS_TOKEN') || '';
    
    const allowedAmounts = [0.5, 1, 2];
    const rawAmount = (typeof amount !== 'undefined' && amount !== null)
      ? amount
      : (document.getElementById('piPayAmount') ? document.getElementById('piPayAmount').value : 1);
    const selectedAmount = Number(rawAmount);
    
    if (!Number.isFinite(selectedAmount) || !allowedAmounts.includes(selectedAmount)) {
      alert('المرجو اختيار مبلغ صحيح (0.5 / 1 / 2 Pi).');
      return;
    }

    const paymentData = {
      amount: selectedAmount,
      memo: 'ScoutMe Payment',
      metadata: { source: 'scoutme', amount: selectedAmount }
    };

    const paymentCallbacks = {
      onReadyForServerApproval: async (paymentDTO) => {
        console.log('Payment approved:', paymentDTO);
        // Implement server approval logic
      },
      onReadyForServerCompletion: async (paymentDTO, txid) => {
        console.log('Payment completed:', paymentDTO, txid);
        showNotification('✅ ' + t('success'), 'success');
      },
      onCancel: async (paymentDTO) => {
        showNotification(t('cancel'), 'info');
      },
      onError: (err) => {
        console.error('Payment error:', err);
        showNotification('❌ ' + t('error'), 'error');
      }
    };

    window.Pi.createPayment(paymentData, paymentCallbacks);
  } catch(err) {
    console.error(err);
    showNotification('❌ ' + t('error'), 'error');
  }
}

window.payWithPi = payWithPi;

// ===========================
// Navigation
// ===========================
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPage = btn.getAttribute('data-page');
      navigateToPage(targetPage);
    });
  });
}

function navigateToPage(pageId) {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');
  
  navButtons.forEach(b => b.classList.remove('active'));
  pages.forEach(p => p.classList.remove('active'));
  
  const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  
  const activePage = document.getElementById(pageId);
  if (activePage) activePage.classList.add('active');
  
  // Load page-specific content
  if (pageId === 'homePage') loadHomePage();
  else if (pageId === 'discoverPage') loadDiscoverPage();
  else if (pageId === 'talentsPage') loadTalentsPage();
  else if (pageId === 'teamsPage') loadTeamsPage();
  else if (pageId === 'academiesPage') loadAcademiesPage();
  else if (pageId === 'marketplacePage') loadMarketplacePage();
  else if (pageId === 'dashboardPage') loadDashboardPage();
  else if (pageId === 'profilePage') loadProfile();
}

// ===========================
// Profile Tabs
// ===========================
function setupProfileTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(targetTab + 'Tab').classList.add('active');
    });
  });
}

// ===========================
// Wallet Modal
// ===========================
function openWalletModal() {
  const modal = document.getElementById('walletModal');
  modal.style.display = 'block';
  updateWalletDisplay();
}

function closeWalletModal() {
  document.getElementById('walletModal').style.display = 'none';
}

function updateWalletDisplay() {
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  const balance = me.balance || 1234;
  const wallet = me.wallet || '--';
  
  document.getElementById('walletBalance').textContent = balance + ' Pi';
  document.getElementById('modalWalletBalance').textContent = balance + ' Pi';
  document.getElementById('modalWalletAddress').textContent = wallet;
}

function closePaymentModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

function confirmPayment() {
  const amount = document.getElementById('piPayAmount').value;
  closePaymentModal();
  payWithPi(Number(amount));
}

// ===========================
// Notifications System
// ===========================
let notifications = [];

function toggleNotifications() {
  const panel = document.getElementById('notificationsPanel');
  panel.classList.toggle('show');
  loadNotifications();
}

async function loadNotifications() {
  const container = document.getElementById('notificationsList');
  
  if (db) {
    try {
      const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
      const snapshot = await db.collection(COLLECTIONS.NOTIFICATIONS)
        .where('userId', '==', me.id)
        .orderBy('timestamp', 'desc')
        .limit(20)
        .get();
      
      notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error('Load notifications error:', e);
    }
  }
  
  container.innerHTML = notifications.length === 0
    ? `<div class="empty-state">${t('no_notifications')}</div>`
    : notifications.map(notif => `
      <div class="notification-item ${notif.read ? '' : 'unread'}">
        <div class="notification-icon">${notif.icon || '🔔'}</div>
        <div class="notification-text">
          <strong>${notif.title}</strong>
          <p>${notif.message}</p>
          <small>${new Date(notif.timestamp?.toDate()).toLocaleString()}</small>
        </div>
      </div>
    `).join('');
  
  // Update badge
  const unreadCount = notifications.filter(n => !n.read).length;
  document.getElementById('notificationBadge').textContent = unreadCount;
  document.getElementById('notificationBadge').style.display = unreadCount > 0 ? 'block' : 'none';
}

function clearAllNotifications() {
  if (confirm(t('confirm_delete'))) {
    notifications = [];
    document.getElementById('notificationsList').innerHTML = `<div class="empty-state">${t('no_notifications')}</div>`;
    document.getElementById('notificationBadge').style.display = 'none';
  }
}

async function addNotification(userId, title, message, icon = '🔔') {
  if (db) {
    try {
      await db.collection(COLLECTIONS.NOTIFICATIONS).add({
        userId,
        title,
        message,
        icon,
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.error('Add notification error:', e);
    }
  }
}

function toggleNotificationsSettings() {
  const enabled = document.getElementById('notificationsToggle').checked;
  localStorage.setItem(STORAGE.NOTIFICATIONS_ENABLED, enabled ? '1' : '0');
  showNotification(t('saved_successfully'), 'success');
}

// ===========================
// Dark Mode
// ===========================
function toggleDarkMode() {
  const enabled = document.getElementById('darkModeToggle').checked;
  document.body.classList.toggle('dark-mode', enabled);
  localStorage.setItem(STORAGE.THEME, enabled ? 'dark' : 'light');
  showNotification(t('saved_successfully'), 'success');
}

function loadTheme() {
  const theme = localStorage.getItem(STORAGE.THEME);
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) toggle.checked = true;
  }
}

// ===========================
// Content Generation
// ===========================
function generatePlayerCard(player) {
  const stars = '⭐'.repeat(Math.floor(player.rating || player.trustScore || 5));
  const img = player.image || player.photoURL || '';
  const country = ALL_COUNTRIES.find(c => c.code === player.country)?.flag || player.country || '';
  
  return `
    <div class="player-card" onclick="viewPlayerDetail('${player.id}')">
      ${img ? `<img src="${img}" class="player-image" onerror="this.style.display='none'">` : ''}
      <div class="player-name">${player.name}</div>
      <div class="player-position">${country} ${player.position || ''}</div>
      <div class="trust-score">
        <span class="stars">${stars}</span>
        <span class="score">${(player.rating || player.trustScore || 5).toFixed(1)}</span>
      </div>
    </div>
  `;
}

// ===========================
// Firebase Data Loading
// ===========================
async function loadPlayers() {
  if (!db) return [];
  
  try {
    const snapshot = await db.collection(COLLECTIONS.PLAYERS)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Load players error:', e);
    return [];
  }
}

async function loadTeams() {
  if (!db) return [];
  
  try {
    const snapshot = await db.collection(COLLECTIONS.TEAMS)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Load teams error:', e);
    return [];
  }
}

async function loadAcademies() {
  if (!db) return [];
  
  try {
    const snapshot = await db.collection(COLLECTIONS.ACADEMIES)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Load academies error:', e);
    return [];
  }
}

async function loadShops() {
  if (!db) return [];
  
  try {
    const snapshot = await db.collection(COLLECTIONS.SHOPS)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Load shops error:', e);
    return [];
  }
}

// ===========================
// Home Page
// ===========================
async function loadHomePage() {
  showLoading();
  
  // Load analytics data
  const players = await loadPlayers();
  const teams = await loadTeams();
  const academies = await loadAcademies();
  const shops = await loadShops();
  
  document.getElementById('totalPlayers').textContent = players.length;
  document.getElementById('totalTeams').textContent = teams.length;
  document.getElementById('totalAcademies').textContent = academies.length;
  document.getElementById('totalShops').textContent = shops.length;
  
  // Load spotlight talents
  const spotlight = players.slice(0, 10);
  document.getElementById('spotlightContainer').innerHTML = spotlight.map(generatePlayerCard).join('');
  
  // Load news (sample)
  loadNews();
  
  // Initialize map
  initMap();
  
  hideLoading();
}

function loadNews() {
  const news = [
    { title: 'بطولة جديدة للشباب', date: '2026-02-14', image: '' },
    { title: 'فريق ScoutMe يحقق إنجازاً', date: '2026-02-13', image: '' },
    { title: 'تعاون مع أكاديميات عالمية', date: '2026-02-12', image: '' }
  ];
  
  const container = document.getElementById('newsContainer');
  container.innerHTML = news.map(item => `
    <div class="news-item">
      <div class="news-image"></div>
      <div class="news-content">
        <div class="news-title">${item.title}</div>
        <div class="news-date">${item.date}</div>
      </div>
    </div>
  `).join('');
}

// ===========================
// Google Maps Integration
// ===========================
let map;
let markers = [];

function initMap() {
  const mapContainer = document.getElementById('mapContainer');
  if (!mapContainer || !google) return;
  
  map = new google.maps.Map(mapContainer, {
    center: { lat: 36.8065, lng: 10.1815 }, // Tunisia
    zoom: 6
  });
  
  loadMapMarkers();
}

async function loadMapMarkers() {
  if (!map) return;
  
  // Clear existing markers
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  
  const teams = await loadTeams();
  const academies = await loadAcademies();
  const shops = await loadShops();
  
  const items = [...teams, ...academies, ...shops];
  
  items.forEach(item => {
    if (item.coordinates) {
      const [lat, lng] = item.coordinates.split(',').map(Number);
      if (lat && lng) {
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: item.name,
          icon: item.type === 'team' ? '🏆' : item.type === 'academy' ? '🎓' : '🛍️'
        });
        
        const infoWindow = new google.maps.InfoWindow({
          content: `<strong>${item.name}</strong><br>${item.city}, ${item.country}`
        });
        
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        markers.push(marker);
      }
    }
  });
}

// ===========================
// Discover Page
// ===========================
async function loadDiscoverPage() {
  showLoading();
  
  const players = await loadPlayers();
  const teams = await loadTeams();
  const academies = await loadAcademies();
  
  const allItems = [
    ...players.map(p => ({ ...p, type: 'player' })),
    ...teams.map(t => ({ ...t, type: 'team' })),
    ...academies.map(a => ({ ...a, type: 'academy' }))
  ];
  
  displayDiscoverItems(allItems);
  populateFilterSelects();
  setupSearchAndFilters();
  
  hideLoading();
}

function displayDiscoverItems(items) {
  const container = document.getElementById('discoverGrid');
  container.innerHTML = items.map(item => {
    if (item.type === 'player') return generatePlayerCard(item);
    // Add team and academy cards similarly
    return '';
  }).join('');
}

function populateFilterSelects() {
  // Populate sports filter
  const sportSelect = document.getElementById('filterSport');
  if (sportSelect) {
    sportSelect.innerHTML = `<option value="all" data-i18n="allSports">${t('allSports')}</option>` +
      ALL_SPORTS.map(sport => `<option value="${sport}">${sport}</option>`).join('');
  }
  
  // Populate country filter
  const countrySelect = document.getElementById('filterCountry');
  if (countrySelect) {
    countrySelect.innerHTML = `<option value="all" data-i18n="all_countries">${t('all_countries')}</option>` +
      ALL_COUNTRIES.map(c => `<option value="${c.code}">${c.flag} ${c.name}</option>`).join('');
  }
}

function setupSearchAndFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', performSearch);
  }
  
  ['filterType', 'filterSport', 'filterCountry', 'filterCity'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', performSearch);
  });
}

async function performSearch() {
  const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const type = document.getElementById('filterType')?.value || 'all';
  const sport = document.getElementById('filterSport')?.value || 'all';
  const country = document.getElementById('filterCountry')?.value || 'all';
  
  showLoading();
  
  const players = await loadPlayers();
  const teams = await loadTeams();
  const academies = await loadAcademies();
  
  let allItems = [];
  
  if (type === 'all' || type === 'players') {
    allItems.push(...players.map(p => ({ ...p, type: 'player' })));
  }
  if (type === 'all' || type === 'teams') {
    allItems.push(...teams.map(t => ({ ...t, type: 'team' })));
  }
  if (type === 'all' || type === 'academies') {
    allItems.push(...academies.map(a => ({ ...a, type: 'academy' })));
  }
  
  // Apply filters
  allItems = allItems.filter(item => {
    const matchQuery = !query || item.name?.toLowerCase().includes(query);
    const matchSport = sport === 'all' || item.sport === sport;
    const matchCountry = country === 'all' || item.country === country;
    return matchQuery && matchSport && matchCountry;
  });
  
  displayDiscoverItems(allItems);
  hideLoading();
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('filterType').value = 'all';
  document.getElementById('filterSport').value = 'all';
  document.getElementById('filterCountry').value = 'all';
  document.getElementById('filterCity').value = 'all';
  performSearch();
}

// ===========================
// Talents Page
// ===========================
async function loadTalentsPage() {
  showLoading();
  const players = await loadPlayers();
  displayTalentsList(players);
  hideLoading();
}

function displayTalentsList(players) {
  const container = document.getElementById('talentsList');
  container.innerHTML = players.map(player => `
    <div class="talent-card">
      <img src="${player.image || ''}" class="talent-image" onerror="this.style.display='none'">
      <div class="talent-info">
        <h3>${player.name}</h3>
        <p>${player.position || ''} - ${player.age} ${t('years')}</p>
        <p>${player.country} ${player.city}</p>
        <p>${t('sport')}: ${player.sport}</p>
        <div class="trust-score">
          <span class="stars">${'⭐'.repeat(Math.floor(player.trustScore || 5))}</span>
          <span class="score">${(player.trustScore || 5).toFixed(1)}</span>
        </div>
        <div class="talent-actions">
          <button class="btn-primary" onclick="viewPlayerDetail('${player.id}')">${t('viewProfile')}</button>
          <button class="btn-secondary" onclick="editPlayer('${player.id}')">${t('edit')}</button>
          <button class="btn-danger" onclick="deletePlayer('${player.id}')">${t('delete')}</button>
        </div>
      </div>
    </div>
  `).join('');
}

function sortTalents() {
  const sortBy = document.getElementById('sortSelect').value;
  // Implement sorting logic
  loadTalentsPage();
}

// ===========================
// Add Talent Modal
// ===========================
function openAddTalentModal() {
  const modal = document.getElementById('addTalentModal');
  modal.style.display = 'block';
  
  // Populate sport select
  const sportSelect = document.getElementById('talentSportSelect');
  sportSelect.innerHTML = ALL_SPORTS.map(sport => `<option value="${sport}">${sport}</option>`).join('');
  
  // Populate country select
  const countrySelect = document.getElementById('talentCountrySelect');
  countrySelect.innerHTML = ALL_COUNTRIES.map(c => `<option value="${c.code}">${c.flag} ${c.name}</option>`).join('');
  
  // Load teams and academies
  loadTeamsForSelect();
  loadAcademiesForSelect();
  
  // Setup form submit
  const form = document.getElementById('addTalentForm');
  form.onsubmit = handleAddTalent;
}

function closeAddTalentModal() {
  document.getElementById('addTalentModal').style.display = 'none';
  document.getElementById('addTalentForm').reset();
}

async function loadTeamsForSelect() {
  const teams = await loadTeams();
  const select = document.getElementById('talentTeamSelect');
  if (select) {
    select.innerHTML = '<option value="">-- ' + t('select') + ' --</option>' +
      teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  }
}

async function loadAcademiesForSelect() {
  const academies = await loadAcademies();
  const select = document.getElementById('talentAcademySelect');
  if (select) {
    select.innerHTML = '<option value="">-- ' + t('select') + ' --</option>' +
      academies.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
  }
}

async function handleAddTalent(e) {
  e.preventDefault();
  
  showLoading();
  
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    age: Number(formData.get('age')),
    sport: formData.get('sport'),
    position: formData.get('position'),
    country: formData.get('country'),
    city: formData.get('city'),
    team: formData.get('team'),
    academy: formData.get('academy'),
    highlights: formData.get('highlights'),
    description: formData.get('description'),
    trustScore: 5.0,
    rating: 5.0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  
  // Handle image upload
  const imageFile = formData.get('image');
  if (imageFile && imageFile.size > 0) {
    try {
      const imageRef = storage.ref(`players/${uid('img')}_${imageFile.name}`);
      await imageRef.put(imageFile);
      data.image = await imageRef.getDownloadURL();
    } catch (e) {
      console.error('Image upload error:', e);
    }
  }
  
  try {
    await db.collection(COLLECTIONS.PLAYERS).add(data);
    showNotification(t('saved_successfully'), 'success');
    closeAddTalentModal();
    loadTalentsPage();
  } catch (e) {
    console.error('Add talent error:', e);
    showNotification(t('error'), 'error');
  }
  
  hideLoading();
}

async function deletePlayer(id) {
  if (confirm(t('confirm_delete'))) {
    try {
      await db.collection(COLLECTIONS.PLAYERS).doc(id).delete();
      showNotification(t('deleted_successfully'), 'success');
      loadTalentsPage();
    } catch (e) {
      console.error('Delete error:', e);
      showNotification(t('error'), 'error');
    }
  }
}

function editPlayer(id) {
  // Implement edit functionality
  showNotification('Edit functionality coming soon', 'info');
}

// ===========================
// Similar functions for Teams, Academies, Shops
// ===========================
function openAddTeamModal() {
  const modal = document.getElementById('addTeamModal');
  modal.style.display = 'block';
  // Similar to openAddTalentModal
}

function closeAddTeamModal() {
  document.getElementById('addTeamModal').style.display = 'none';
}

function openAddAcademyModal() {
  const modal = document.getElementById('addAcademyModal');
  modal.style.display = 'block';
}

function closeAddAcademyModal() {
  document.getElementById('addAcademyModal').style.display = 'none';
}

function openAddShopModal() {
  const modal = document.getElementById('addShopModal');
  modal.style.display = 'block';
}

function closeAddShopModal() {
  document.getElementById('addShopModal').style.display = 'none';
}

// ===========================
// Dashboard Page
// ===========================
async function loadDashboardPage() {
  showLoading();
  
  const players = await loadPlayers();
  const teams = await loadTeams();
  const academies = await loadAcademies();
  
  // Generate analytics charts (placeholder)
  generateAnalyticsCharts(players);
  
  hideLoading();
}

function generateAnalyticsCharts(players) {
  // Implement chart generation using Chart.js or similar library
  // This is a placeholder
  console.log('Analytics:', players.length, 'players');
}

// ===========================
// Marketplace Page
// ===========================
async function loadMarketplacePage() {
  loadTeamTokens();
  loadNFTPlayers();
  loadPiStores();
  loadShopsMarketplace();
}

function loadTeamTokens() {
  // Load team tokens (sample data for now)
  const container = document.getElementById('teamTokensContainer');
  // Implementation
}

function loadNFTPlayers() {
  // Load NFT players
  const container = document.getElementById('nftPlayersContainer');
  // Implementation
}

function loadPiStores() {
  // Load Pi ecosystem stores
  const container = document.getElementById('storesContainer');
  // Implementation
}

async function loadShopsMarketplace() {
  const shops = await loadShops();
  const container = document.getElementById('shopsContainer');
  
  container.innerHTML = shops.map(shop => `
    <div class="store-card">
      <img src="${shop.image || ''}" class="store-image" onerror="this.style.display='none'">
      <div class="store-name">${shop.name}</div>
      <div class="store-short">${shop.category} - ${shop.city}</div>
      <button class="btn-visit-store" onclick="viewShopDetail('${shop.id}')">${t('visit')}</button>
    </div>
  `).join('');
}

// ===========================
// Profile Page
// ===========================
async function loadProfile() {
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  
  document.getElementById('profileName').textContent = me.name || t('userName');
  document.getElementById('profileWalletAddress').textContent = me.wallet || '--';
  
  const trustScore = me.trustScore || 5.0;
  const stars = Math.floor(trustScore);
  document.getElementById('profileStars').textContent = '⭐'.repeat(stars);
  document.getElementById('profileScore').textContent = trustScore.toFixed(1);
  
  if (me.photoURL) {
    document.getElementById('profileAvatar').src = me.photoURL;
  }
}

// ===========================
// Detail Views
// ===========================
function viewPlayerDetail(id) {
  showNotification('Player detail view coming soon', 'info');
}

function viewShopDetail(id) {
  showNotification('Shop detail view coming soon', 'info');
}

function closeDetailModal() {
  document.getElementById('detailModal').style.display = 'none';
}

// ===========================
// Management Functions
// ===========================
function openManagePlayers() {
  navigateToPage('talentsPage');
}

function openManageTeams() {
  navigateToPage('teamsPage');
}

function openManageAcademies() {
  navigateToPage('academiesPage');
}

function openManageShops() {
  navigateToPage('marketplacePage');
}

// ===========================
// Initialization
// ===========================
function initApp() {
  // Apply saved language
  const savedLang = localStorage.getItem(STORAGE.LANGUAGE) || 'ar';
  document.getElementById('languageSelect').value = savedLang;
  changeLanguage(savedLang);
  
  // Apply saved theme
  loadTheme();
  
  // Setup navigation
  setupNavigation();
  setupProfileTabs();
  
  // Load home page
  loadHomePage();
  
  // Setup auth state listener
  if (auth) {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User logged in:', user.email);
      }
    });
  }
  
  // Load notifications
  loadNotifications();
}

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
  const seen = localStorage.getItem('sm_seen_overlay');
  
  if (seen === 'true') {
    document.getElementById('reg-overlay').style.display = 'none';
    initApp();
  } else {
    hideLoading();
  }
});
