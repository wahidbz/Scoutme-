// ScoutMe - Enhanced JavaScript with Pi Network & Messaging
// ==========================================================

// ===========================
// Configuration
// ===========================
const PI_API_KEY = process.env.PI_API_KEY || localStorage.getItem('PI_API_KEY') || '';

// Firebase Configuration
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
  console.log('✅ Firebase initialized');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

// Collections
const COLLECTIONS = {
  USERS: 'users',
  PLAYERS: 'players',
  TEAMS: 'teams',
  ACADEMIES: 'academies',
  SHOPS: 'shops',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications'
};

// Local Storage Keys
const STORAGE = {
  ME: 'sm_me',
  LANGUAGE: 'sm_language',
  THEME: 'sm_theme'
};

// Sports List
const ALL_SPORTS = [
  'كرة قدم', 'كرة سلة', 'تنس', 'سباحة', 'رفع أثقال', 'هوكي', 'جمباز',
  'كرة طائرة', 'كرة يد', 'ملاكمة', 'جودو', 'كاراتيه', 'تايكوندو',
  'ركض', 'دراجات', 'رماية', 'غولف', 'رجبي'
];

// Countries List
const ALL_COUNTRIES = [
  { code: 'TN', name: 'تونس', flag: '🇹🇳' },
  { code: 'DZ', name: 'الجزائر', flag: '🇩🇿' },
  { code: 'MA', name: 'المغرب', flag: '🇲🇦' },
  { code: 'EG', name: 'مصر', flag: '🇪🇬' },
  { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
  { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
  { code: 'FR', name: 'فرنسا', flag: '🇫🇷' },
  { code: 'ES', name: 'إسبانيا', flag: '🇪🇸' },
  { code: 'IT', name: 'إيطاليا', flag: '🇮🇹' },
  { code: 'GB', name: 'بريطانيا', flag: '🇬🇧' }
];

// ===========================
// Translations
// ===========================
const translations = {
  ar: {
    appName: 'ScoutMe',
    loading: 'جاري التحميل...',
    bannerTitle: 'اكتشف نجوم المستقبل',
    bannerSubtitle: 'منصة عالمية للمواهب الرياضية',
    home: 'الرئيسية',
    discover: 'استكشف',
    talents: 'المواهب',
    dashboard: 'لوحة التحكم',
    marketplace: 'المتجر',
    profile: 'الملف',
    messages: 'الرسائل',
    type_message: 'اكتب رسالة...',
    send: 'إرسال',
    logout: 'تسجيل الخروج'
  },
  en: {
    appName: 'ScoutMe',
    loading: 'Loading...',
    bannerTitle: 'Discover Future Stars',
    bannerSubtitle: 'Global Platform for Sports Talents',
    home: 'Home',
    discover: 'Discover',
    talents: 'Talents',
    dashboard: 'Dashboard',
    marketplace: 'Marketplace',
    profile: 'Profile',
    messages: 'Messages',
    type_message: 'Type a message...',
    send: 'Send',
    logout: 'Logout'
  }
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
// Language Functions
// ===========================
let currentLanguage = localStorage.getItem(STORAGE.LANGUAGE) || 'ar';

function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem(STORAGE.LANGUAGE, lang);
  
  const direction = ['ar', 'ur'].includes(lang) ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', lang);
  
  // Update all elements with data-i18n
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
  
  const langNames = {
    ar: 'العربية', en: 'English', fr: 'Français', es: 'Español',
    de: 'Deutsch', pt: 'Português', it: 'Italiano'
  };
  
  const currentLangDisplay = document.getElementById('currentLangDisplay');
  if (currentLangDisplay) {
    currentLangDisplay.textContent = langNames[lang] || 'العربية';
  }
}

function t(key) {
  return translations[currentLanguage]?.[key] || key;
}

// ===========================
// Pi Network Authentication
// ===========================
let __piInitDone = false;

function isPiSdkAvailable() {
  return typeof window !== 'undefined' && window.Pi && typeof window.Pi.authenticate === 'function';
}

async function piSignIn() {
  try {
    showLoading();
    
    if (!isPiSdkAvailable()) {
      alert('Pi SDK غير متاح. يرجى فتح التطبيق في متصفح Pi Browser.');
      hideLoading();
      return;
    }
    
    if (!__piInitDone && typeof window.Pi.init === 'function') {
      __piInitDone = true;
      try { 
        window.Pi.init({ version: "2.0", sandbox: false }); 
      } catch(e) {
        console.warn('Pi init warning:', e);
      }
    }
    
    const auth_result = await window.Pi.authenticate(
      ["username", "payments"],
      (payment) => {
        console.log('onIncompletePaymentFound:', payment);
      }
    );
    
    const accessToken = auth_result?.accessToken || auth_result?.access_token || '';
    const username = String(auth_result?.user?.username || auth_result?.username || '').trim();
    
    if (!username) {
      throw new Error('لم تُرجع Pi اسم مستخدم. يرجى المحاولة مرة أخرى.');
    }
    
    if (accessToken) {
      localStorage.setItem('PI_ACCESS_TOKEN', accessToken);
    }
    
    const piUser = {
      id: uid('user'),
      name: username,
      email: '',
      wallet: username + '@pi.network',
      trustScore: 5.0,
      createdAt: new Date().toISOString()
    };
    
    // Save to Firestore
    if (db) {
      try {
        await db.collection(COLLECTIONS.USERS).doc(piUser.id).set(piUser, { merge: true });
        console.log('✅ User saved to Firestore');
      } catch (e) {
        console.error('❌ Firestore save error:', e);
      }
    }
    
    localStorage.setItem(STORAGE.ME, JSON.stringify(piUser));
    localStorage.setItem('sm_seen_overlay', 'true');
    
    document.getElementById('reg-overlay').style.display = 'none';
    
    showNotification('✅ مرحباً ' + username, 'success');
    hideLoading();
    initApp();
    
  } catch(err) {
    console.error('❌ Pi sign-in failed:', err);
    alert('فشل تسجيل الدخول عبر Pi: ' + (err?.message || 'خطأ غير معروف'));
    hideLoading();
  }
}

async function linkPiWallet() {
  try {
    if (!isPiSdkAvailable()) {
      alert('Pi SDK غير متاح');
      return;
    }
    
    const auth_result = await window.Pi.authenticate(["username", "payments"], () => {});
    const username = auth_result?.user?.username || auth_result?.username || '';
    const walletAddress = username + '@pi.network';
    
    const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
    me.wallet = walletAddress;
    localStorage.setItem(STORAGE.ME, JSON.stringify(me));
    
    if (db && me.id) {
      try {
        await db.collection(COLLECTIONS.USERS).doc(me.id).update({ wallet: walletAddress });
      } catch (e) {
        console.error('Update wallet error:', e);
      }
    }
    
    showNotification('✅ تم ربط المحفظة: ' + walletAddress, 'success');
    loadProfile();
  } catch(err) {
    console.error(err);
    showNotification('❌ خطأ في ربط المحفظة', 'error');
  }
}

async function payWithPi(amount) {
  try {
    if (!isPiSdkAvailable()) {
      alert('Pi SDK غير متاح');
      return;
    }
    
    const allowedAmounts = [0.5, 1, 2];
    const selectedAmount = Number(amount || document.getElementById('piPayAmount')?.value || 1);
    
    if (!allowedAmounts.includes(selectedAmount)) {
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
        showNotification('✅ تمت الموافقة على الدفع', 'success');
      },
      onReadyForServerCompletion: async (paymentDTO, txid) => {
        console.log('Payment completed:', paymentDTO, txid);
        showNotification('✅ تم إكمال الدفع بنجاح', 'success');
      },
      onCancel: async (paymentDTO) => {
        showNotification('تم إلغاء الدفع', 'info');
      },
      onError: (err) => {
        console.error('Payment error:', err);
        showNotification('❌ خطأ في الدفع', 'error');
      }
    };

    window.Pi.createPayment(paymentData, paymentCallbacks);
  } catch(err) {
    console.error(err);
    showNotification('❌ خطأ', 'error');
  }
}

function logout() {
  if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
    localStorage.clear();
    window.location.reload();
  }
}

// ===========================
// Navigation
// ===========================
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navigateToPage(btn.getAttribute('data-page'));
    });
  });
}

function navigateToPage(pageId) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  
  const activePage = document.getElementById(pageId);
  if (activePage) activePage.classList.add('active');
  
  // Load page-specific content
  if (pageId === 'homePage') loadHomePage();
  else if (pageId === 'discoverPage') loadDiscoverPage();
  else if (pageId === 'talentsPage') loadTalentsPage();
  else if (pageId === 'profilePage') loadProfile();
}

function setupProfileTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(targetTab + 'Tab').classList.add('active');
    });
  });
}

// ===========================
// Messaging System
// ===========================
let currentChat = null;
let messagesListener = null;

function openMessagesPanel() {
  const panel = document.getElementById('messagesPanel');
  panel.classList.toggle('show');
  if (panel.classList.contains('show')) {
    loadMessages();
  }
}

function closeMessagesPanel() {
  document.getElementById('messagesPanel').classList.remove('show');
  if (messagesListener) {
    messagesListener();
    messagesListener = null;
  }
}

async function loadMessages() {
  if (!db) return;
  
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  if (!me.id) return;
  
  const messagesList = document.getElementById('messagesList');
  
  try {
    // Real-time listener
    if (messagesListener) messagesListener();
    
    messagesListener = db.collection(COLLECTIONS.MESSAGES)
      .where('userId', '==', me.id)
      .orderBy('timestamp', 'desc')
      .limit(50)
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (messages.length === 0) {
          messagesList.innerHTML = '<div class="empty-state">لا توجد رسائل</div>';
          return;
        }
        
        messagesList.innerHTML = messages.map(msg => `
          <div class="notification-item ${msg.read ? '' : 'unread'}">
            <div class="notification-icon">${msg.fromUser === me.id ? '📤' : '📨'}</div>
            <div class="notification-text">
              <strong>${msg.from || 'مستخدم'}</strong>
              <p>${msg.message}</p>
              <small>${new Date(msg.timestamp?.toDate()).toLocaleString()}</small>
            </div>
          </div>
        `).join('');
        
        // Update badge
        const unreadCount = messages.filter(m => !m.read && m.fromUser !== me.id).length;
        document.getElementById('messagesBadge').textContent = unreadCount;
        document.getElementById('messagesBadge').style.display = unreadCount > 0 ? 'block' : 'none';
      }, error => {
        console.error('Messages listener error:', error);
      });
      
  } catch (e) {
    console.error('Load messages error:', e);
    messagesList.innerHTML = '<div class="empty-state">خطأ في تحميل الرسائل</div>';
  }
}

async function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  if (!me.id) return;
  
  try {
    await db.collection(COLLECTIONS.MESSAGES).add({
      userId: me.id,
      fromUser: me.id,
      from: me.name,
      message: message,
      read: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    input.value = '';
    showNotification('✅ تم إرسال الرسالة', 'success');
  } catch (e) {
    console.error('Send message error:', e);
    showNotification('❌ خطأ في إرسال الرسالة', 'error');
  }
}

// ===========================
// Notifications
// ===========================
function toggleNotifications() {
  const panel = document.getElementById('notificationsPanel');
  panel.classList.toggle('show');
  if (panel.classList.contains('show')) {
    loadNotifications();
  }
}

async function loadNotifications() {
  if (!db) return;
  
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  const container = document.getElementById('notificationsList');
  
  try {
    const snapshot = await db.collection(COLLECTIONS.NOTIFICATIONS)
      .where('userId', '==', me.id)
      .orderBy('timestamp', 'desc')
      .limit(20)
      .get();
    
    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (notifications.length === 0) {
      container.innerHTML = '<div class="empty-state">لا توجد إشعارات</div>';
      return;
    }
    
    container.innerHTML = notifications.map(notif => `
      <div class="notification-item ${notif.read ? '' : 'unread'}">
        <div class="notification-icon">${notif.icon || '🔔'}</div>
        <div class="notification-text">
          <strong>${notif.title}</strong>
          <p>${notif.message}</p>
          <small>${new Date(notif.timestamp?.toDate()).toLocaleString()}</small>
        </div>
      </div>
    `).join('');
    
    const unreadCount = notifications.filter(n => !n.read).length;
    document.getElementById('notificationBadge').textContent = unreadCount;
    document.getElementById('notificationBadge').style.display = unreadCount > 0 ? 'block' : 'none';
  } catch (e) {
    console.error('Load notifications error:', e);
  }
}

function clearAllNotifications() {
  if (confirm('هل أنت متأكد من حذف جميع الإشعارات؟')) {
    document.getElementById('notificationsList').innerHTML = '<div class="empty-state">لا توجد إشعارات</div>';
    document.getElementById('notificationBadge').style.display = 'none';
  }
}

// ===========================
// Leaflet Map Integration
// ===========================
let map;
let markers = [];

function initLeafletMap() {
  const mapContainer = document.getElementById('mapContainer');
  if (!mapContainer || typeof L === 'undefined') return;
  
  try {
    // Initialize map centered on Tunisia
    map = L.map('mapContainer').setView([36.8065, 10.1815], 6);
    
    // Add OpenStreetMap tiles (FREE!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
    
    console.log('✅ Leaflet map initialized');
    loadMapMarkers();
  } catch (e) {
    console.error('❌ Leaflet map error:', e);
  }
}

async function loadMapMarkers() {
  if (!map) return;
  
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];
  
  try {
    const teams = await loadTeams();
    const academies = await loadAcademies();
    
    [...teams, ...academies].forEach(item => {
      if (item.coordinates) {
        const [lat, lng] = item.coordinates.split(',').map(Number);
        if (lat && lng) {
          const marker = L.marker([lat, lng]).addTo(map);
          marker.bindPopup(`<strong>${item.name}</strong><br>${item.city}, ${item.country}`);
          markers.push(marker);
        }
      }
    });
  } catch (e) {
    console.error('Load map markers error:', e);
  }
}

// ===========================
// Data Loading Functions
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
// Page Loaders
// ===========================
async function loadHomePage() {
  showLoading();
  
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
  
  // Initialize map
  initLeafletMap();
  
  hideLoading();
}

async function loadDiscoverPage() {
  showLoading();
  const players = await loadPlayers();
  displayDiscoverItems(players.map(p => ({ ...p, type: 'player' })));
  populateFilterSelects();
  hideLoading();
}

async function loadTalentsPage() {
  showLoading();
  const players = await loadPlayers();
  displayTalentsList(players);
  hideLoading();
}

function loadProfile() {
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  document.getElementById('profileName').textContent = me.name || 'مستخدم';
  document.getElementById('profileWalletAddress').textContent = me.wallet || '--';
}

// ===========================
// UI Generators
// ===========================
function generatePlayerCard(player) {
  const stars = '⭐'.repeat(Math.floor(player.trustScore || 5));
  return `
    <div class="player-card" onclick="viewPlayerDetail('${player.id}')">
      <div class="player-image"></div>
      <div class="player-name">${player.name}</div>
      <div class="player-position">${player.position || ''}</div>
      <div class="trust-score">
        <span class="stars">${stars}</span>
        <span class="score">${(player.trustScore || 5).toFixed(1)}</span>
      </div>
    </div>
  `;
}

function displayDiscoverItems(items) {
  const container = document.getElementById('discoverGrid');
  container.innerHTML = items.map(item => {
    if (item.type === 'player') return generatePlayerCard(item);
    return '';
  }).join('');
}

function displayTalentsList(players) {
  const container = document.getElementById('talentsList');
  container.innerHTML = players.map(player => `
    <div class="talent-card">
      <div class="talent-image"></div>
      <div class="talent-info">
        <h3>${player.name}</h3>
        <p>🏅 ${player.sport}</p>
        <p>📍 ${player.city}, ${player.country}</p>
      </div>
    </div>
  `).join('');
}

function populateFilterSelects() {
  const sportSelect = document.getElementById('filterSport');
  if (sportSelect) {
    sportSelect.innerHTML = `<option value="all">كل الرياضات</option>` +
      ALL_SPORTS.map(sport => `<option value="${sport}">${sport}</option>`).join('');
  }
  
  const countrySelect = document.getElementById('filterCountry');
  if (countrySelect) {
    countrySelect.innerHTML = `<option value="all">كل الدول</option>` +
      ALL_COUNTRIES.map(c => `<option value="${c.code}">${c.flag} ${c.name}</option>`).join('');
  }
}

// ===========================
// Modal Functions
// ===========================
function openWalletModal() {
  document.getElementById('walletModal').style.display = 'block';
  updateWalletDisplay();
}

function closeWalletModal() {
  document.getElementById('walletModal').style.display = 'none';
}

function updateWalletDisplay() {
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  document.getElementById('modalWalletBalance').textContent = '1234 Pi';
  document.getElementById('modalWalletAddress').textContent = me.wallet || '--';
}

function closePaymentModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

function confirmPayment() {
  const amount = document.getElementById('piPayAmount').value;
  closePaymentModal();
  payWithPi(Number(amount));
}

function openAddTalentModal() {
  document.getElementById('addTalentModal').style.display = 'block';
  populateFormSelects();
}

function closeAddTalentModal() {
  document.getElementById('addTalentModal').style.display = 'none';
}

function populateFormSelects() {
  const sportSelect = document.getElementById('talentSportSelect');
  if (sportSelect) {
    sportSelect.innerHTML = ALL_SPORTS.map(sport => `<option value="${sport}">${sport}</option>`).join('');
  }
  
  const countrySelect = document.getElementById('talentCountrySelect');
  if (countrySelect) {
    countrySelect.innerHTML = ALL_COUNTRIES.map(c => `<option value="${c.code}">${c.name}</option>`).join('');
  }
}

async function saveTalent(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const player = {
    name: formData.get('name'),
    age: Number(formData.get('age')),
    sport: formData.get('sport'),
    position: formData.get('position'),
    country: formData.get('country'),
    city: formData.get('city'),
    description: formData.get('description'),
    trustScore: 5.0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  
  try {
    await db.collection(COLLECTIONS.PLAYERS).add(player);
    showNotification('✅ تم إضافة اللاعب بنجاح', 'success');
    closeAddTalentModal();
    form.reset();
    loadTalentsPage();
  } catch (e) {
    console.error('Save player error:', e);
    showNotification('❌ خطأ في حفظ البيانات', 'error');
  }
}

// ===========================
// Dark Mode
// ===========================
function toggleDarkMode() {
  const enabled = document.getElementById('darkModeToggle').checked;
  document.body.classList.toggle('dark-mode', enabled);
  localStorage.setItem(STORAGE.THEME, enabled ? 'dark' : 'light');
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
// App Initialization
// ===========================
function initApp() {
  console.log('🚀 Initializing ScoutMe...');
  
  // Setup navigation
  setupNavigation();
  setupProfileTabs();
  
  // Load initial page
  loadHomePage();
  
  // Apply language
  changeLanguage(currentLanguage);
  
  // Load theme
  loadTheme();
  
  // Update language selector
  const langSelect = document.getElementById('languageSelect');
  if (langSelect) {
    langSelect.value = currentLanguage;
  }
  
  console.log('✅ ScoutMe initialized successfully');
}

// ===========================
// On Load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const hasSeenOverlay = localStorage.getItem('sm_seen_overlay');
  
  if (!hasSeenOverlay) {
    document.getElementById('reg-overlay').style.display = 'flex';
  } else {
    document.getElementById('reg-overlay').style.display = 'none';
    initApp();
  }
});

// Make functions global
window.piSignIn = piSignIn;
window.linkPiWallet = linkPiWallet;
window.payWithPi = payWithPi;
window.logout = logout;
window.changeLanguage = changeLanguage;
window.navigateToPage = navigateToPage;
window.openMessagesPanel = openMessagesPanel;
window.closeMessagesPanel = closeMessagesPanel;
window.sendMessage = sendMessage;
window.toggleNotifications = toggleNotifications;
window.clearAllNotifications = clearAllNotifications;
window.openWalletModal = openWalletModal;
window.closeWalletModal = closeWalletModal;
window.closePaymentModal = closePaymentModal;
window.confirmPayment = confirmPayment;
window.openAddTalentModal = openAddTalentModal;
window.closeAddTalentModal = closeAddTalentModal;
window.saveTalent = saveTalent;
window.toggleDarkMode = toggleDarkMode;
window.closeNotification = closeNotification;

console.log('📜 ScoutMe script loaded');
