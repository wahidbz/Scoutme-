
// ============================================
// SCOUTME - SPORTS TALENT PLATFORM
// Pi Network Integration + Messaging System
// ============================================

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

// Firebase Configuration (REPLACE WITH YOUR CREDENTIALS)
const firebaseConfig = {
  apiKey: "AIzaSyDTA98HsQ_wlpbAAOJux4kynyg-EPQoOTM",
  authDomain: "scoutme-73fb8.firebaseapp.com",
  projectId: "scoutme-73fb8",
  storageBucket: "scoutme-73fb8.firebasestorage.app",
  messagingSenderId: "394693573994",
  appId: "1:394693573994:web:5e25829522860e9bf13913"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Pi Network Configuration
// PI_API_KEY will be automatically loaded from Netlify environment variables
// or from window._env_ object set in deployment
const PI_API_KEY = window._env_?.PI_API_KEY || process.env.PI_API_KEY || "YOUR_PI_API_KEY_HERE";
const PI_NETWORK_SANDBOX = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Constants
const BASE_IMG = 'image/';
const FIRST_MESSAGE_COST = 0.5; // π cost for first message
const ALL_SPORTS = [
  "كرة القدم", "كرة السلة", "التنس", "السباحة", "ألعاب القوى", 
  "الكرة الطائرة", "كرة اليد", "الجمباز", "الملاكمة", "المصارعة",
  "ركوب الدراجات", "الجودو", "الكاراتيه", "التايكوندو", "الهوكي",
  "الكريكيت", "الرجبي", "الغولف", "البيسبول", "كرة القدم الأمريكية"
];

// ============================================
// MULTILINGUAL SUPPORT
// ============================================

const translations = {
  ar: {
    hero_title: "اكتشف المواهب الرياضية حول العالم",
    hero_subtitle: "انضم لأكبر منصة لربط اللاعبين والمدربين والأكاديميات",
    get_started: "ابدأ الآن",
    spotlight_talents: "⭐ مواهب في دائرة الضوء",
    latest_news: "📰 آخر الأخبار",
    discover: "🔍 اكتشف",
    search_placeholder: "ابحث عن لاعبين، فرق، أكاديميات...",
    all_types: "جميع الأنواع",
    players: "لاعبون",
    teams: "فرق",
    academies: "أكاديميات",
    shops: "متاجر",
    all_sports: "جميع الرياضات",
    all_countries: "جميع الدول",
    all_cities: "جميع المدن",
    apply_filters: "تطبيق",
    reset_filters: "إعادة تعيين",
    talents: "⚽ المواهب",
    sort_by: "ترتيب حسب:",
    most_recent: "الأحدث",
    highest_rated: "الأعلى تقييماً",
    name_az: "الاسم (أ-ي)",
    sport: "الرياضة",
    add_team: "+ إضافة فريق",
    add_academy: "+ إضافة أكاديمية",
    admin_dashboard: "📊 لوحة التحكم الإدارية",
    total_players: "إجمالي اللاعبين",
    total_teams: "إجمالي الفرق",
    total_academies: "إجمالي الأكاديميات",
    total_shops: "إجمالي المتاجر",
    players_by_sport: "اللاعبون حسب الرياضة",
    entities_by_country: "الكيانات حسب الدولة",
    manage_players: "إدارة اللاعبين",
    manage_teams: "إدارة الفرق",
    marketplace: "🛒 السوق",
    pi_stores: "متاجر Pi",
    team_tokens: "رموز الفرق",
    nft_players: "لاعبو NFT",
    interactive_map: "🗺️ الخريطة التفاعلية",
    show_teams: "عرض الفرق",
    show_academies: "عرض الأكاديميات",
    show_shops: "عرض المتاجر",
    info: "المعلومات",
    highlights: "Highlights",
    messages: "الرسائل",
    wallet: "المحفظة",
    settings: "الإعدادات",
    edit_profile: "تعديل الملف",
    trust_score: "TrustScore",
    add_highlight: "+ إضافة Highlight",
    conversations: "المحادثات",
    select_conversation: "اختر محادثة لعرض الرسائل",
    type_message: "اكتب رسالتك...",
    pi_balance: "رصيد Pi",
    link_pi_wallet: "ربط محفظة Pi",
    recent_transactions: "المعاملات الأخيرة",
    account_settings: "إعدادات الحساب",
    dark_mode: "الوضع الليلي",
    notifications_enabled: "تفعيل الإشعارات",
    language: "اللغة",
    logout: "تسجيل الخروج",
    home: "الرئيسية",
    dashboard: "لوحة التحكم",
    map: "الخريطة",
    profile: "الملف",
    add_player: "إضافة لاعب",
    player_name: "اسم اللاعب",
    age: "العمر",
    select_sport: "اختر الرياضة",
    position: "المركز",
    select_team: "اختر الفريق (اختياري)",
    select_academy: "اختر الأكاديمية (اختياري)",
    city: "المدينة",
    country: "الدولة",
    bio: "نبذة عن اللاعب",
    save: "حفظ",
    team_name: "اسم الفريق",
    coach_name: "اسم المدرب",
    contact: "جهة الاتصال",
    description: "وصف",
    academy_name: "اسم الأكاديمية",
    director_name: "اسم المدير",
    latitude: "خط العرض",
    longitude: "خط الطول",
    shop_name: "اسم المتجر",
    select_category: "اختر الفئة",
    owner_name: "اسم المالك",
    highlight_title: "عنوان الـ Highlight",
    video_url: "رابط الفيديو (YouTube, Vimeo...)",
    first_message_payment: "دفع الرسالة الأولى",
    first_message_info: "لإرسال أول رسالة، يجب دفع 0.5π",
    confirm_payment: "تأكيد الدفع",
    rate_entity: "تقييم",
    rating_comment: "أضف تعليقك (اختياري)",
    submit_rating: "إرسال التقييم",
    notifications: "الإشعارات",
    send_message: "أرسل رسالة",
    view_profile: "عرض الملف",
    rate: "تقييم",
    edit: "تعديل",
    delete: "حذف",
    success: "نجاح",
    error: "خطأ",
    payment_successful: "تم الدفع بنجاح",
    payment_failed: "فشل الدفع",
    message_sent: "تم إرسال الرسالة",
    rating_submitted: "تم إرسال التقييم",
    data_saved: "تم حفظ البيانات",
    data_deleted: "تم حذف البيانات",
    pi_wallet_linked: "تم ربط محفظة Pi بنجاح",
    signed_in: "تم تسجيل الدخول",
    signed_out: "تم تسجيل الخروج"
  },
  en: {
    hero_title: "Discover Sports Talents Around the World",
    hero_subtitle: "Join the largest platform connecting players, coaches and academies",
    get_started: "Get Started",
    spotlight_talents: "⭐ Spotlight Talents",
    latest_news: "📰 Latest News",
    discover: "🔍 Discover",
    search_placeholder: "Search for players, teams, academies...",
    all_types: "All Types",
    players: "Players",
    teams: "Teams",
    academies: "Academies",
    shops: "Shops",
    all_sports: "All Sports",
    all_countries: "All Countries",
    all_cities: "All Cities",
    apply_filters: "Apply",
    reset_filters: "Reset",
    talents: "⚽ Talents",
    sort_by: "Sort by:",
    most_recent: "Most Recent",
    highest_rated: "Highest Rated",
    name_az: "Name (A-Z)",
    sport: "Sport",
    add_team: "+ Add Team",
    add_academy: "+ Add Academy",
    admin_dashboard: "📊 Admin Dashboard",
    total_players: "Total Players",
    total_teams: "Total Teams",
    total_academies: "Total Academies",
    total_shops: "Total Shops",
    players_by_sport: "Players by Sport",
    entities_by_country: "Entities by Country",
    manage_players: "Manage Players",
    manage_teams: "Manage Teams",
    marketplace: "🛒 Marketplace",
    pi_stores: "Pi Stores",
    team_tokens: "Team Tokens",
    nft_players: "NFT Players",
    interactive_map: "🗺️ Interactive Map",
    show_teams: "Show Teams",
    show_academies: "Show Academies",
    show_shops: "Show Shops",
    info: "Info",
    highlights: "Highlights",
    messages: "Messages",
    wallet: "Wallet",
    settings: "Settings",
    edit_profile: "Edit Profile",
    trust_score: "TrustScore",
    add_highlight: "+ Add Highlight",
    conversations: "Conversations",
    select_conversation: "Select a conversation to view messages",
    type_message: "Type your message...",
    pi_balance: "Pi Balance",
    link_pi_wallet: "Link Pi Wallet",
    recent_transactions: "Recent Transactions",
    account_settings: "Account Settings",
    dark_mode: "Dark Mode",
    notifications_enabled: "Enable Notifications",
    language: "Language",
    logout: "Logout",
    home: "Home",
    dashboard: "Dashboard",
    map: "Map",
    profile: "Profile",
    add_player: "Add Player",
    player_name: "Player Name",
    age: "Age",
    select_sport: "Select Sport",
    position: "Position",
    select_team: "Select Team (Optional)",
    select_academy: "Select Academy (Optional)",
    city: "City",
    country: "Country",
    bio: "Bio",
    save: "Save",
    team_name: "Team Name",
    coach_name: "Coach Name",
    contact: "Contact",
    description: "Description",
    academy_name: "Academy Name",
    director_name: "Director Name",
    latitude: "Latitude",
    longitude: "Longitude",
    shop_name: "Shop Name",
    select_category: "Select Category",
    owner_name: "Owner Name",
    highlight_title: "Highlight Title",
    video_url: "Video URL (YouTube, Vimeo...)",
    first_message_payment: "First Message Payment",
    first_message_info: "To send first message, you must pay 0.5π",
    confirm_payment: "Confirm Payment",
    rate_entity: "Rate",
    rating_comment: "Add your comment (optional)",
    submit_rating: "Submit Rating",
    notifications: "Notifications",
    send_message: "Send Message",
    view_profile: "View Profile",
    rate: "Rate",
    edit: "Edit",
    delete: "Delete",
    success: "Success",
    error: "Error",
    payment_successful: "Payment Successful",
    payment_failed: "Payment Failed",
    message_sent: "Message Sent",
    rating_submitted: "Rating Submitted",
    data_saved: "Data Saved",
    data_deleted: "Data Deleted",
    pi_wallet_linked: "Pi Wallet Linked Successfully",
    signed_in: "Signed In",
    signed_out: "Signed Out"
  },
  fr: {
    hero_title: "Découvrez les Talents Sportifs du Monde Entier",
    hero_subtitle: "Rejoignez la plus grande plateforme reliant joueurs, entraîneurs et académies",
    get_started: "Commencer",
    spotlight_talents: "⭐ Talents en Vedette",
    latest_news: "📰 Dernières Actualités",
    discover: "🔍 Découvrir",
    search_placeholder: "Rechercher des joueurs, équipes, académies...",
    all_types: "Tous les Types",
    players: "Joueurs",
    teams: "Équipes",
    academies: "Académies",
    shops: "Boutiques",
    all_sports: "Tous les Sports",
    all_countries: "Tous les Pays",
    all_cities: "Toutes les Villes",
    apply_filters: "Appliquer",
    reset_filters: "Réinitialiser",
    talents: "⚽ Talents",
    sort_by: "Trier par:",
    most_recent: "Plus Récent",
    highest_rated: "Mieux Noté",
    name_az: "Nom (A-Z)",
    sport: "Sport",
    add_team: "+ Ajouter Équipe",
    add_academy: "+ Ajouter Académie",
    admin_dashboard: "📊 Tableau de Bord Admin",
    total_players: "Total Joueurs",
    total_teams: "Total Équipes",
    total_academies: "Total Académies",
    total_shops: "Total Boutiques",
    players_by_sport: "Joueurs par Sport",
    entities_by_country: "Entités par Pays",
    manage_players: "Gérer Joueurs",
    manage_teams: "Gérer Équipes",
    marketplace: "🛒 Marché",
    pi_stores: "Boutiques Pi",
    team_tokens: "Jetons d'Équipe",
    nft_players: "Joueurs NFT",
    interactive_map: "🗺️ Carte Interactive",
    show_teams: "Afficher Équipes",
    show_academies: "Afficher Académies",
    show_shops: "Afficher Boutiques",
    info: "Infos",
    highlights: "Highlights",
    messages: "Messages",
    wallet: "Portefeuille",
    settings: "Paramètres",
    edit_profile: "Modifier Profil",
    trust_score: "TrustScore",
    add_highlight: "+ Ajouter Highlight",
    conversations: "Conversations",
    select_conversation: "Sélectionner une conversation pour voir les messages",
    type_message: "Tapez votre message...",
    pi_balance: "Solde Pi",
    link_pi_wallet: "Lier Portefeuille Pi",
    recent_transactions: "Transactions Récentes",
    account_settings: "Paramètres du Compte",
    dark_mode: "Mode Sombre",
    notifications_enabled: "Activer Notifications",
    language: "Langue",
    logout: "Déconnexion",
    home: "Accueil",
    dashboard: "Tableau de Bord",
    map: "Carte",
    profile: "Profil",
    send_message: "Envoyer Message",
    view_profile: "Voir Profil",
    rate: "Noter",
    edit: "Modifier",
    delete: "Supprimer",
    success: "Succès",
    error: "Erreur",
    payment_successful: "Paiement Réussi",
    payment_failed: "Paiement Échoué",
    message_sent: "Message Envoyé",
    rating_submitted: "Évaluation Soumise",
    data_saved: "Données Enregistrées",
    data_deleted: "Données Supprimées",
    pi_wallet_linked: "Portefeuille Pi Lié avec Succès",
    signed_in: "Connecté",
    signed_out: "Déconnecté"
  }
  // Add more languages as needed (es, de, it, pt, tr, ru, zh, ja, ko)
};

let currentLang = localStorage.getItem('scoutme_lang') || 'ar';

// ============================================
// GLOBAL STATE
// ============================================

let currentUser = null;
let piUser = null;
let currentPage = 'home';
let googleMap = null;
let mapMarkers = [];
let allPlayers = [];
let allTeams = [];
let allAcademies = [];
let allShops = [];
let allConversations = [];
let currentConversation = null;

// ============================================
// PI NETWORK INTEGRATION
// ============================================

/**
 * Initialize Pi Network SDK
 */
async function initPiSDK() {
  try {
    if (typeof Pi === 'undefined') {
      console.error('Pi SDK not loaded');
      showToast('Pi SDK not loaded', 'error');
      return false;
    }

    await Pi.init({
      version: "2.0",
      sandbox: PI_NETWORK_SANDBOX
    });

    console.log('Pi SDK initialized successfully');
    return true;
  } catch (error) {
    console.error('Pi SDK initialization error:', error);
    showToast('Pi SDK initialization failed', 'error');
    return false;
  }
}

/**
 * Sign in with Pi Network
 */
async function piSignIn() {
  try {
    showLoading(true);
    
    const scopes = ['username', 'payments', 'wallet_address'];
    const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);
    
    piUser = authResult.user;
    console.log('Pi user authenticated:', piUser);

    // Create or update user in Firebase
    const userRef = db.collection('users').doc(piUser.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // New user - create profile
      await userRef.set({
        uid: piUser.uid,
        username: piUser.username,
        piUsername: piUser.username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        role: 'player',
        trustScore: 50,
        piWalletLinked: false,
        notificationsEnabled: true
      });
      
      showToast(translations[currentLang].signed_in, 'success');
      await addNotification('welcome', `Welcome ${piUser.username}!`);
    } else {
      // Existing user
      await userRef.update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    // Sign in to Firebase with custom token (implement backend to generate token)
    // For now, use anonymous auth
    await auth.signInAnonymously();
    
    currentUser = {
      uid: piUser.uid,
      username: piUser.username,
      ...userDoc.data()
    };

    // Hide login overlay, show app
    document.getElementById('piLoginOverlay').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');

    // Load user data
    await loadUserProfile();
    await loadPiWallet();
    await loadNotifications();
    
    showLoading(false);
    
  } catch (error) {
    console.error('Pi sign in error:', error);
    showToast('Sign in failed: ' + error.message, 'error');
    showLoading(false);
  }
}

/**
 * Handle incomplete payments
 */
function onIncompletePaymentFound(payment) {
  console.log('Incomplete payment found:', payment);
  // Handle incomplete payment (e.g., show dialog to complete)
}

/**
 * Load Pi wallet balance
 */
async function loadPiWallet() {
  try {
    if (!piUser) return;

    // Get wallet balance from Pi Network
    // Note: Pi SDK doesn't directly expose balance, we track payments
    const walletRef = db.collection('wallets').doc(piUser.uid);
    const walletDoc = await walletRef.get();

    let balance = 0;
    if (walletDoc.exists) {
      balance = walletDoc.data().balance || 0;
    } else {
      // Initialize wallet
      await walletRef.set({
        uid: piUser.uid,
        balance: 0,
        transactions: []
      });
    }

    // Update UI
    document.getElementById('piWalletAmount').textContent = `${balance.toFixed(2)} π`;
    document.getElementById('walletBalance').textContent = `${balance.toFixed(2)} π`;

  } catch (error) {
    console.error('Load wallet error:', error);
  }
}

/**
 * Link Pi wallet address
 */
async function linkPiWallet() {
  try {
    showLoading(true);

    const scopes = ['wallet_address'];
    const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);

    if (authResult.user.wallet_address) {
      // Save wallet address
      await db.collection('users').doc(piUser.uid).update({
        piWalletAddress: authResult.user.wallet_address,
        piWalletLinked: true
      });

      showToast(translations[currentLang].pi_wallet_linked, 'success');
      await addNotification('wallet', 'Pi wallet linked successfully');
    }

    showLoading(false);

  } catch (error) {
    console.error('Link wallet error:', error);
    showToast('Failed to link wallet', 'error');
    showLoading(false);
  }
}

/**
 * Make payment with Pi
 */
async function payWithPi(amount, memo, recipientUid) {
  try {
    showLoading(true);

    const paymentData = {
      amount: amount,
      memo: memo,
      metadata: {
        recipientUid: recipientUid,
        type: 'message_unlock'
      }
    };

    const paymentId = await Pi.createPayment(paymentData, {
      onReadyForServerApproval: (paymentId) => {
        console.log('Payment ready for approval:', paymentId);
        // Call backend to approve payment
        approvePayment(paymentId);
      },
      onReadyForServerCompletion: (paymentId, txid) => {
        console.log('Payment ready for completion:', paymentId, txid);
        // Call backend to complete payment
        completePayment(paymentId, txid);
      },
      onCancel: (paymentId) => {
        console.log('Payment cancelled:', paymentId);
        showToast(translations[currentLang].payment_failed, 'error');
      },
      onError: (error, payment) => {
        console.error('Payment error:', error);
        showToast(translations[currentLang].payment_failed, 'error');
      }
    });

    showLoading(false);
    return paymentId;

  } catch (error) {
    console.error('Payment error:', error);
    showToast(translations[currentLang].payment_failed, 'error');
    showLoading(false);
    return null;
  }
}

/**
 * Backend functions to approve/complete payment (implement with Cloud Functions)
 */
async function approvePayment(paymentId) {
  // Call Firebase Cloud Function or backend API
  try {
    const response = await fetch('/api/payments/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId })
    });
    const result = await response.json();
    console.log('Payment approved:', result);
  } catch (error) {
    console.error('Approve payment error:', error);
  }
}

async function completePayment(paymentId, txid) {
  // Call Firebase Cloud Function or backend API
  try {
    const response = await fetch('/api/payments/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId, txid })
    });
    const result = await response.json();
    console.log('Payment completed:', result);
    
    // Update wallet balance in Firestore
    const walletRef = db.collection('wallets').doc(piUser.uid);
    await walletRef.update({
      transactions: firebase.firestore.FieldValue.arrayUnion({
        paymentId,
        txid,
        amount: result.amount,
        timestamp: new Date().toISOString()
      })
    });

    showToast(translations[currentLang].payment_successful, 'success');
    await loadPiWallet();

  } catch (error) {
    console.error('Complete payment error:', error);
  }
}

// ============================================
// MESSAGING SYSTEM
// ============================================

/**
 * Load conversations for current user
 */
async function loadConversations() {
  try {
    if (!currentUser) return;

    const conversationsSnapshot = await db.collection('conversations')
      .where('participants', 'array-contains', currentUser.uid)
      .orderBy('lastMessageAt', 'desc')
      .get();

    allConversations = [];
    conversationsSnapshot.forEach(doc => {
      allConversations.push({ id: doc.id, ...doc.data() });
    });

    renderConversations();

  } catch (error) {
    console.error('Load conversations error:', error);
  }
}

/**
 * Render conversations list
 */
function renderConversations() {
  const container = document.getElementById('conversationsList');
  if (!container) return;

  if (allConversations.length === 0) {
    container.innerHTML = '<p class="no-data">لا توجد محادثات</p>';
    return;
  }

  container.innerHTML = allConversations.map(conv => {
    const otherUserId = conv.participants.find(uid => uid !== currentUser.uid);
    const otherUserName = conv.participantNames?.[otherUserId] || 'مستخدم';
    const unreadClass = conv.unreadCount?.[currentUser.uid] > 0 ? 'unread' : '';

    return `
      <div class="conversation-item ${unreadClass}" data-conv-id="${conv.id}">
        <img src="${BASE_IMG}avatar-placeholder.png" alt="${otherUserName}" class="conversation-avatar">
        <div class="conversation-info">
          <h4>${otherUserName}</h4>
          <p class="last-message">${conv.lastMessage || ''}</p>
        </div>
        ${conv.unreadCount?.[currentUser.uid] > 0 ? `<span class="unread-badge">${conv.unreadCount[currentUser.uid]}</span>` : ''}
      </div>
    `;
  }).join('');

  // Add click listeners
  container.querySelectorAll('.conversation-item').forEach(item => {
    item.addEventListener('click', () => {
      const convId = item.dataset.convId;
      openConversation(convId);
    });
  });
}

/**
 * Open conversation
 */
async function openConversation(conversationId) {
  try {
    currentConversation = allConversations.find(c => c.id === conversationId);
    if (!currentConversation) return;

    // Show message UI
    document.getElementById('messageHeader').classList.remove('hidden');
    document.getElementById('messageInput').classList.remove('hidden');

    // Get other user info
    const otherUserId = currentConversation.participants.find(uid => uid !== currentUser.uid);
    const otherUserDoc = await db.collection('users').doc(otherUserId).get();
    const otherUser = otherUserDoc.data();

    document.getElementById('messageRecipientName').textContent = otherUser.username;

    // Load messages
    loadMessages(conversationId);

    // Mark as read
    await db.collection('conversations').doc(conversationId).update({
      [`unreadCount.${currentUser.uid}`]: 0
    });

  } catch (error) {
    console.error('Open conversation error:', error);
  }
}

/**
 * Load messages for conversation
 */
function loadMessages(conversationId) {
  const messageThread = document.getElementById('messageThread');
  messageThread.innerHTML = '<p class="loading-messages">جاري تحميل الرسائل...</p>';

  // Real-time listener
  db.collection('conversations').doc(conversationId).collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      messageThread.innerHTML = '';
      
      snapshot.forEach(doc => {
        const msg = doc.data();
        const isOwn = msg.senderId === currentUser.uid;
        const messageClass = isOwn ? 'message-own' : 'message-other';

        const messageEl = document.createElement('div');
        messageEl.className = `message-bubble ${messageClass}`;
        messageEl.innerHTML = `
          <p>${msg.text}</p>
          <span class="message-time">${formatTimestamp(msg.timestamp)}</span>
        `;
        messageThread.appendChild(messageEl);
      });

      // Scroll to bottom
      messageThread.scrollTop = messageThread.scrollHeight;
    });
}

/**
 * Send message
 */
async function sendMessage(recipientUid, text) {
  try {
    if (!text.trim()) return;

    // Check if conversation exists
    let conversation = allConversations.find(c => 
      c.participants.includes(recipientUid) && c.participants.includes(currentUser.uid)
    );

    if (!conversation) {
      // Check if first message (requires payment)
      const hasConversation = await checkExistingConversation(recipientUid);
      
      if (!hasConversation) {
        // Show payment modal
        showMessagePaymentModal(recipientUid, text);
        return;
      }
    }

    // Send message
    await sendMessageToConversation(conversation.id, text);

  } catch (error) {
    console.error('Send message error:', error);
    showToast('Failed to send message', 'error');
  }
}

/**
 * Check if conversation exists with recipient
 */
async function checkExistingConversation(recipientUid) {
  const conversationsSnapshot = await db.collection('conversations')
    .where('participants', 'array-contains', currentUser.uid)
    .get();

  for (let doc of conversationsSnapshot.docs) {
    const conv = doc.data();
    if (conv.participants.includes(recipientUid)) {
      return true;
    }
  }
  return false;
}

/**
 * Show payment modal for first message
 */
function showMessagePaymentModal(recipientUid, text) {
  const modal = document.getElementById('messagePaymentModal');
  modal.classList.add('active');

  // Store data for after payment
  modal.dataset.recipientUid = recipientUid;
  modal.dataset.messageText = text;

  document.getElementById('confirmPaymentBtn').onclick = async () => {
    // Make payment
    const paymentId = await payWithPi(FIRST_MESSAGE_COST, 'First message unlock', recipientUid);
    
    if (paymentId) {
      // Create conversation after payment
      await createConversationWithMessage(recipientUid, text);
      modal.classList.remove('active');
    }
  };
}

/**
 * Create new conversation with first message
 */
async function createConversationWithMessage(recipientUid, text) {
  try {
    // Get recipient info
    const recipientDoc = await db.collection('users').doc(recipientUid).get();
    const recipient = recipientDoc.data();

    // Create conversation
    const conversationRef = await db.collection('conversations').add({
      participants: [currentUser.uid, recipientUid],
      participantNames: {
        [currentUser.uid]: currentUser.username,
        [recipientUid]: recipient.username
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastMessage: text,
      unreadCount: {
        [currentUser.uid]: 0,
        [recipientUid]: 1
      }
    });

    // Add first message
    await conversationRef.collection('messages').add({
      senderId: currentUser.uid,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast(translations[currentLang].message_sent, 'success');
    
    // Reload conversations
    await loadConversations();

    // Open the new conversation
    await openConversation(conversationRef.id);

    // Notify recipient
    await addNotification('message', `New message from ${currentUser.username}`, recipientUid);

  } catch (error) {
    console.error('Create conversation error:', error);
    showToast('Failed to create conversation', 'error');
  }
}

/**
 * Send message to existing conversation
 */
async function sendMessageToConversation(conversationId, text) {
  try {
    const conversationRef = db.collection('conversations').doc(conversationId);
    const conversation = allConversations.find(c => c.id === conversationId);
    const recipientUid = conversation.participants.find(uid => uid !== currentUser.uid);

    // Add message
    await conversationRef.collection('messages').add({
      senderId: currentUser.uid,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Update conversation
    await conversationRef.update({
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastMessage: text,
      [`unreadCount.${recipientUid}`]: firebase.firestore.FieldValue.increment(1)
    });

    showToast(translations[currentLang].message_sent, 'success');

    // Clear input
    document.getElementById('messageText').value = '';

    // Notify recipient
    await addNotification('message', `New message from ${currentUser.username}`, recipientUid);

  } catch (error) {
    console.error('Send message to conversation error:', error);
    showToast('Failed to send message', 'error');
  }
}

// ============================================
// NOTIFICATIONS
// ============================================

/**
 * Add notification
 */
async function addNotification(type, message, recipientUid = null) {
  try {
    const targetUid = recipientUid || currentUser.uid;

    await db.collection('notifications').add({
      uid: targetUid,
      type: type,
      message: message,
      read: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    if (!recipientUid || recipientUid === currentUser.uid) {
      loadNotifications();
    }

  } catch (error) {
    console.error('Add notification error:', error);
  }
}

/**
 * Load notifications
 */
async function loadNotifications() {
  try {
    if (!currentUser) return;

    const notificationsSnapshot = await db.collection('notifications')
      .where('uid', '==', currentUser.uid)
      .orderBy('timestamp', 'desc')
      .limit(20)
      .get();

    const notifications = [];
    notificationsSnapshot.forEach(doc => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    // Update badge
    const unreadCount = notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notificationBadge');
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }

    // Render notifications
    renderNotifications(notifications);

  } catch (error) {
    console.error('Load notifications error:', error);
  }
}

/**
 * Render notifications
 */
function renderNotifications(notifications) {
  const container = document.getElementById('notificationList');
  if (!container) return;

  if (notifications.length === 0) {
    container.innerHTML = '<p class="no-data">لا توجد إشعارات</p>';
    return;
  }

  container.innerHTML = notifications.map(notif => {
    const readClass = notif.read ? 'read' : 'unread';
    const icon = getNotificationIcon(notif.type);

    return `
      <div class="notification-item ${readClass}" data-notif-id="${notif.id}">
        <span class="notification-icon">${icon}</span>
        <div class="notification-content">
          <p>${notif.message}</p>
          <span class="notification-time">${formatTimestamp(notif.timestamp)}</span>
        </div>
      </div>
    `;
  }).join('');

  // Add click listeners to mark as read
  container.querySelectorAll('.notification-item.unread').forEach(item => {
    item.addEventListener('click', async () => {
      const notifId = item.dataset.notifId;
      await db.collection('notifications').doc(notifId).update({ read: true });
      item.classList.remove('unread');
      item.classList.add('read');
      loadNotifications();
    });
  });
}

/**
 * Get notification icon
 */
function getNotificationIcon(type) {
  const icons = {
    welcome: '👋',
    message: '💬',
    rating: '⭐',
    highlight: '🎥',
    team: '🏅',
    academy: '🎓',
    wallet: '💰',
    payment: '💳',
    system: '🔔'
  };
  return icons[type] || '🔔';
}

// ============================================
// USER PROFILE
// ============================================

/**
 * Load user profile
 */
async function loadUserProfile() {
  try {
    if (!currentUser) return;

    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const userData = userDoc.data();

    // Update header
    document.getElementById('userName').textContent = userData.username;
    document.getElementById('userAvatar').src = userData.avatar || BASE_IMG + 'avatar-placeholder.png';

    // Update profile page
    document.getElementById('profileName').textContent = userData.username;
    document.getElementById('profileRole').textContent = userData.role || 'لاعب';
    document.getElementById('profileTrustScore').textContent = userData.trustScore || 50;
    document.getElementById('profileAvatar').src = userData.avatar || BASE_IMG + 'avatar-placeholder.png';

    // Load profile details
    const detailsContainer = document.getElementById('profileDetails');
    detailsContainer.innerHTML = `
      <div class="profile-field">
        <label>اسم المستخدم:</label>
        <span>${userData.username}</span>
      </div>
      <div class="profile-field">
        <label>الدور:</label>
        <span>${userData.role || 'لاعب'}</span>
      </div>
      <div class="profile-field">
        <label>Pi Username:</label>
        <span>${userData.piUsername}</span>
      </div>
      <div class="profile-field">
        <label>TrustScore:</label>
        <span>${userData.trustScore || 50}</span>
      </div>
      <div class="profile-field">
        <label>محفظة Pi مربوطة:</label>
        <span>${userData.piWalletLinked ? 'نعم ✅' : 'لا ❌'}</span>
      </div>
      <div class="profile-field">
        <label>تاريخ الانضمام:</label>
        <span>${formatTimestamp(userData.createdAt)}</span>
      </div>
    `;

    // Load highlights
    loadUserHighlights();

  } catch (error) {
    console.error('Load profile error:', error);
  }
}

/**
 * Load user highlights
 */
async function loadUserHighlights() {
  try {
    if (!currentUser) return;

    const highlightsSnapshot = await db.collection('highlights')
      .where('uid', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const highlights = [];
    highlightsSnapshot.forEach(doc => {
      highlights.push({ id: doc.id, ...doc.data() });
    });

    document.getElementById('profileHighlights').textContent = highlights.length;

    // Render highlights
    const container = document.getElementById('highlightsList');
    if (highlights.length === 0) {
      container.innerHTML = '<p class="no-data">لا توجد highlights</p>';
      return;
    }

    container.innerHTML = highlights.map(hl => `
      <div class="highlight-item">
        <h4>${hl.title}</h4>
        <a href="${hl.videoUrl}" target="_blank" class="highlight-link">مشاهدة الفيديو 🎥</a>
        <p>${hl.description || ''}</p>
        <button class="delete-btn" onclick="deleteHighlight('${hl.id}')">حذف</button>
      </div>
    `).join('');

  } catch (error) {
    console.error('Load highlights error:', error);
  }
}

/**
 * Delete highlight
 */
async function deleteHighlight(highlightId) {
  if (!confirm('هل أنت متأكد من حذف هذا الـ Highlight؟')) return;

  try {
    await db.collection('highlights').doc(highlightId).delete();
    showToast(translations[currentLang].data_deleted, 'success');
    loadUserHighlights();
  } catch (error) {
    console.error('Delete highlight error:', error);
    showToast('فشل الحذف', 'error');
  }
}

// ============================================
// DATA LOADING
// ============================================

/**
 * Load all data
 */
async function loadAllData() {
  await loadPlayers();
  await loadTeams();
  await loadAcademies();
  await loadShops();
}

/**
 * Load players
 */
async function loadPlayers() {
  try {
    const playersSnapshot = await db.collection('players').limit(100).get();
    allPlayers = [];
    playersSnapshot.forEach(doc => {
      allPlayers.push({ id: doc.id, ...doc.data() });
    });
    
    renderTalents(allPlayers);
    updateDashboardStats();
  } catch (error) {
    console.error('Load players error:', error);
  }
}

/**
 * Load teams
 */
async function loadTeams() {
  try {
    const teamsSnapshot = await db.collection('teams').limit(100).get();
    allTeams = [];
    teamsSnapshot.forEach(doc => {
      allTeams.push({ id: doc.id, ...doc.data() });
    });
    
    renderTeams(allTeams);
    updateDashboardStats();
  } catch (error) {
    console.error('Load teams error:', error);
  }
}

/**
 * Load academies
 */
async function loadAcademies() {
  try {
    const academiesSnapshot = await db.collection('academies').limit(100).get();
    allAcademies = [];
    academiesSnapshot.forEach(doc => {
      allAcademies.push({ id: doc.id, ...doc.data() });
    });
    
    renderAcademies(allAcademies);
    updateDashboardStats();
  } catch (error) {
    console.error('Load academies error:', error);
  }
}

/**
 * Load shops
 */
async function loadShops() {
  try {
    const shopsSnapshot = await db.collection('shops').limit(100).get();
    allShops = [];
    shopsSnapshot.forEach(doc => {
      allShops.push({ id: doc.id, ...doc.data() });
    });
    
    renderShops(allShops);
    updateDashboardStats();
  } catch (error) {
    console.error('Load shops error:', error);
  }
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

/**
 * Render talents
 */
function renderTalents(players) {
  const containers = [
    document.getElementById('talentsGrid'),
    document.getElementById('spotlightTalents')
  ];

  containers.forEach(container => {
    if (!container) return;

    if (players.length === 0) {
      container.innerHTML = '<p class="no-data">لا توجد مواهب</p>';
      return;
    }

    container.innerHTML = players.slice(0, 12).map(player => `
      <div class="player-card" data-id="${player.id}">
        <img src="${player.photo || BASE_IMG + 'players/placeholder.jpg'}" alt="${player.name}" class="player-photo">
        <div class="player-info">
          <h3>${player.name}</h3>
          <p class="player-sport">${player.sport}</p>
          <p class="player-position">${player.position || ''}</p>
          <p class="player-location">📍 ${player.city}, ${player.country}</p>
          <div class="player-rating">
            ${renderStars(player.rating || 0)}
            <span>(${player.ratingCount || 0})</span>
          </div>
          <div class="player-actions">
            <button class="action-btn" onclick="viewPlayerProfile('${player.id}')">
              ${translations[currentLang].view_profile}
            </button>
            <button class="action-btn" onclick="startConversationWith('${player.uid}')">
              ${translations[currentLang].send_message}
            </button>
            <button class="action-btn" onclick="rateEntity('player', '${player.id}')">
              ${translations[currentLang].rate}
            </button>
          </div>
        </div>
      </div>
    `).join('');
  });
}

/**
 * Render teams
 */
function renderTeams(teams) {
  const container = document.getElementById('teamsGrid');
  if (!container) return;

  if (teams.length === 0) {
    container.innerHTML = '<p class="no-data">لا توجد فرق</p>';
    return;
  }

  container.innerHTML = teams.map(team => `
    <div class="team-card" data-id="${team.id}">
      <img src="${team.logo || BASE_IMG + 'teams/placeholder.png'}" alt="${team.name}" class="team-logo">
      <h3>${team.name}</h3>
      <p class="team-sport">${team.sport}</p>
      <p class="team-location">📍 ${team.city}, ${team.country}</p>
      <div class="team-rating">
        ${renderStars(team.rating || 0)}
      </div>
      <div class="team-actions">
        <button class="action-btn" onclick="viewTeamProfile('${team.id}')">${translations[currentLang].view_profile}</button>
        <button class="action-btn" onclick="rateEntity('team', '${team.id}')">${translations[currentLang].rate}</button>
        ${currentUser && (currentUser.role === 'admin' || currentUser.role === 'coach') ? `
          <button class="action-btn edit-btn" onclick="editTeam('${team.id}')">${translations[currentLang].edit}</button>
          <button class="action-btn delete-btn" onclick="deleteTeam('${team.id}')">${translations[currentLang].delete}</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

/**
 * Render academies
 */
function renderAcademies(academies) {
  const container = document.getElementById('academiesGrid');
  if (!container) return;

  if (academies.length === 0) {
    container.innerHTML = '<p class="no-data">لا توجد أكاديميات</p>';
    return;
  }

  container.innerHTML = academies.map(academy => `
    <div class="academy-card" data-id="${academy.id}">
      <img src="${academy.logo || BASE_IMG + 'academies/placeholder.png'}" alt="${academy.name}" class="academy-logo">
      <h3>${academy.name}</h3>
      <p class="academy-sport">${academy.sport}</p>
      <p class="academy-location">📍 ${academy.city}, ${academy.country}</p>
      <div class="academy-rating">
        ${renderStars(academy.rating || 0)}
      </div>
      <div class="academy-actions">
        <button class="action-btn" onclick="viewAcademyProfile('${academy.id}')">${translations[currentLang].view_profile}</button>
        <button class="action-btn" onclick="rateEntity('academy', '${academy.id}')">${translations[currentLang].rate}</button>
        ${currentUser && (currentUser.role === 'admin' || currentUser.role === 'coach') ? `
          <button class="action-btn edit-btn" onclick="editAcademy('${academy.id}')">${translations[currentLang].edit}</button>
          <button class="action-btn delete-btn" onclick="deleteAcademy('${academy.id}')">${translations[currentLang].delete}</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

/**
 * Render shops
 */
function renderShops(shops) {
  const container = document.getElementById('piStoresGrid');
  if (!container) return;

  if (shops.length === 0) {
    container.innerHTML = '<p class="no-data">لا توجد متاجر</p>';
    return;
  }

  container.innerHTML = shops.map(shop => `
    <div class="shop-card" data-id="${shop.id}">
      <img src="${shop.logo || BASE_IMG + 'stores/placeholder.png'}" alt="${shop.name}" class="shop-logo">
      <h3>${shop.name}</h3>
      <p class="shop-category">${shop.category}</p>
      <p class="shop-location">📍 ${shop.city}, ${shop.country}</p>
      <div class="shop-rating">
        ${renderStars(shop.rating || 0)}
      </div>
      <div class="shop-actions">
        <button class="action-btn" onclick="viewShopProfile('${shop.id}')">${translations[currentLang].view_profile}</button>
        <button class="action-btn" onclick="rateEntity('shop', '${shop.id}')">${translations[currentLang].rate}</button>
      </div>
    </div>
  `).join('');
}

/**
 * Render stars for rating
 */
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = '';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '<span class="star filled">★</span>';
    } else if (i === fullStars && halfStar) {
      stars += '<span class="star half">★</span>';
    } else {
      stars += '<span class="star">☆</span>';
    }
  }

  return stars;
}

// ============================================
// GOOGLE MAPS
// ============================================

/**
 * Initialize Google Map
 */
function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  googleMap = new google.maps.Map(mapContainer, {
    center: { lat: 24.7136, lng: 46.6753 }, // Riyadh
    zoom: 6,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  });

  loadMapMarkers();
}

/**
 * Load map markers
 */
function loadMapMarkers() {
  if (!googleMap) return;

  // Clear existing markers
  mapMarkers.forEach(marker => marker.setMap(null));
  mapMarkers = [];

  // Add team markers
  if (document.getElementById('showTeams').checked) {
    allTeams.forEach(team => {
      if (team.lat && team.lng) {
        const marker = new google.maps.Marker({
          position: { lat: team.lat, lng: team.lng },
          map: googleMap,
          title: team.name,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="map-info-window">
              <h3>${team.name}</h3>
              <p>${team.sport}</p>
              <p>📍 ${team.city}</p>
              <button onclick="viewTeamProfile('${team.id}')">عرض التفاصيل</button>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMap, marker);
        });

        mapMarkers.push(marker);
      }
    });
  }

  // Add academy markers
  if (document.getElementById('showAcademies').checked) {
    allAcademies.forEach(academy => {
      if (academy.lat && academy.lng) {
        const marker = new google.maps.Marker({
          position: { lat: academy.lat, lng: academy.lng },
          map: googleMap,
          title: academy.name,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="map-info-window">
              <h3>${academy.name}</h3>
              <p>${academy.sport}</p>
              <p>📍 ${academy.city}</p>
              <button onclick="viewAcademyProfile('${academy.id}')">عرض التفاصيل</button>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMap, marker);
        });

        mapMarkers.push(marker);
      }
    });
  }

  // Add shop markers
  if (document.getElementById('showShops').checked) {
    allShops.forEach(shop => {
      if (shop.lat && shop.lng) {
        const marker = new google.maps.Marker({
          position: { lat: shop.lat, lng: shop.lng },
          map: googleMap,
          title: shop.name,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="map-info-window">
              <h3>${shop.name}</h3>
              <p>${shop.category}</p>
              <p>📍 ${shop.city}</p>
              <button onclick="viewShopProfile('${shop.id}')">عرض التفاصيل</button>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMap, marker);
        });

        mapMarkers.push(marker);
      }
    });
  }
}

// ============================================
// DASHBOARD & ANALYTICS
// ============================================

/**
 * Update dashboard stats
 */
function updateDashboardStats() {
  document.getElementById('totalPlayers').textContent = allPlayers.length;
  document.getElementById('totalTeams').textContent = allTeams.length;
  document.getElementById('totalAcademies').textContent = allAcademies.length;
  document.getElementById('totalShops').textContent = allShops.length;

  renderDashboardCharts();
  renderDashboardTables();
}

/**
 * Render dashboard charts
 */
function renderDashboardCharts() {
  // Players by Sport Chart
  const sportCounts = {};
  allPlayers.forEach(player => {
    sportCounts[player.sport] = (sportCounts[player.sport] || 0) + 1;
  });

  const sportChartCtx = document.getElementById('sportChart');
  if (sportChartCtx) {
    new Chart(sportChartCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(sportCounts),
        datasets: [{
          label: 'عدد اللاعبين',
          data: Object.values(sportCounts),
          backgroundColor: '#1F7A1F'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Entities by Country Chart
  const countryCounts = {};
  [...allPlayers, ...allTeams, ...allAcademies, ...allShops].forEach(entity => {
    countryCounts[entity.country] = (countryCounts[entity.country] || 0) + 1;
  });

  const countryChartCtx = document.getElementById('countryChart');
  if (countryChartCtx) {
    new Chart(countryChartCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(countryCounts),
        datasets: [{
          data: Object.values(countryCounts),
          backgroundColor: ['#1F7A1F', '#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}

/**
 * Render dashboard tables
 */
function renderDashboardTables() {
  // Players table
  const playersTable = document.getElementById('playersTable');
  if (playersTable && currentUser && (currentUser.role === 'admin' || currentUser.role === 'coach')) {
    playersTable.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الرياضة</th>
            <th>المدينة</th>
            <th>التقييم</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          ${allPlayers.slice(0, 10).map(player => `
            <tr>
              <td>${player.name}</td>
              <td>${player.sport}</td>
              <td>${player.city}</td>
              <td>${(player.rating || 0).toFixed(1)} ⭐</td>
              <td>
                <button class="table-action-btn" onclick="viewPlayerProfile('${player.id}')">عرض</button>
                <button class="table-action-btn edit-btn" onclick="editPlayer('${player.id}')">تعديل</button>
                <button class="table-action-btn delete-btn" onclick="deletePlayer('${player.id}')">حذف</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Teams table
  const teamsTable = document.getElementById('teamsTable');
  if (teamsTable && currentUser && (currentUser.role === 'admin' || currentUser.role === 'coach')) {
    teamsTable.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الرياضة</th>
            <th>المدينة</th>
            <th>التقييم</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          ${allTeams.slice(0, 10).map(team => `
            <tr>
              <td>${team.name}</td>
              <td>${team.sport}</td>
              <td>${team.city}</td>
              <td>${(team.rating || 0).toFixed(1)} ⭐</td>
              <td>
                <button class="table-action-btn" onclick="viewTeamProfile('${team.id}')">عرض</button>
                <button class="table-action-btn edit-btn" onclick="editTeam('${team.id}')">تعديل</button>
                <button class="table-action-btn delete-btn" onclick="deleteTeam('${team.id}')">حذف</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Show loading spinner
 */
function showLoading(show) {
  const spinner = document.getElementById('loadingSpinner');
  if (show) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast toast-${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Format timestamp
 */
function formatTimestamp(timestamp) {
  if (!timestamp) return '';
  
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  }

  return date.toLocaleDateString('ar-SA') + ' ' + date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Change language
 */
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('scoutme_lang', lang);
  
  // Update direction
  if (lang === 'ar' || lang === 'ur') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', lang);
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }

  // Update all translated elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

/**
 * Navigate to page
 */
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  
  // Show selected page
  const pageEl = document.getElementById(page + 'Page');
  if (pageEl) {
    pageEl.classList.add('active');
  }

  // Update bottom nav
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-btn[data-page="${page}"]`);
  if (navBtn) {
    navBtn.classList.add('active');
  }

  currentPage = page;

  // Load page-specific data
  if (page === 'map' && googleMap) {
    google.maps.event.trigger(googleMap, 'resize');
    loadMapMarkers();
  } else if (page === 'profile') {
    loadUserProfile();
    loadConversations();
  } else if (page === 'dashboard') {
    updateDashboardStats();
  }
}

/**
 * Start conversation with user
 */
async function startConversationWith(recipientUid) {
  navigateTo('profile');
  
  // Switch to messages tab
  document.querySelectorAll('.profile-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector('.profile-tab[data-tab="messages"]').classList.add('active');
  
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.getElementById('messagesTab').classList.add('active');

  // Check if conversation exists
  await loadConversations();
  const existingConv = allConversations.find(c => c.participants.includes(recipientUid));
  
  if (existingConv) {
    await openConversation(existingConv.id);
  } else {
    // Show message input with payment prompt
    document.getElementById('messageHeader').classList.remove('hidden');
    document.getElementById('messageInput').classList.remove('hidden');
    
    // Get recipient info
    const recipientDoc = await db.collection('users').doc(recipientUid).get();
    const recipient = recipientDoc.data();
    document.getElementById('messageRecipientName').textContent = recipient.username;

    document.getElementById('messageThread').innerHTML = `
      <p class="first-message-prompt">
        💬 هذه أول رسالة لك مع ${recipient.username}.<br>
        يجب دفع ${FIRST_MESSAGE_COST}π لفتح المحادثة.
      </p>
    `;

    // Handle send message
    document.getElementById('sendMessageBtn').onclick = async () => {
      const text = document.getElementById('messageText').value;
      if (!text.trim()) return;
      
      showMessagePaymentModal(recipientUid, text);
    };
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Pi SDK
  await initPiSDK();

  // Pi Sign In
  document.getElementById('piSignInBtn').addEventListener('click', piSignIn);

  // Language selector
  document.getElementById('languageSelector').addEventListener('change', (e) => {
    changeLanguage(e.target.value);
  });

  // Dark mode toggle
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });

  // Load dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Notification button
  document.getElementById('notificationBtn').addEventListener('click', () => {
    document.getElementById('notificationPanel').classList.toggle('hidden');
  });

  document.getElementById('closeNotificationPanel').addEventListener('click', () => {
    document.getElementById('notificationPanel').classList.add('hidden');
  });

  // Pi Wallet button
  document.getElementById('piWalletBtn').addEventListener('click', () => {
    navigateTo('profile');
    document.querySelectorAll('.profile-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector('.profile-tab[data-tab="wallet"]').classList.add('active');
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById('walletTab').classList.add('active');
  });

  // Link Pi Wallet
  document.getElementById('linkPiWalletBtn').addEventListener('click', linkPiWallet);

  // Bottom navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      navigateTo(page);
    });
  });

  // Profile tabs
  document.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      
      document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      document.getElementById(tabName + 'Tab').classList.add('active');

      if (tabName === 'messages') {
        loadConversations();
      }
    });
  });

  // Send message
  document.getElementById('sendMessageBtn').addEventListener('click', async () => {
    if (!currentConversation) return;
    
    const text = document.getElementById('messageText').value;
    await sendMessageToConversation(currentConversation.id, text);
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', async () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      await auth.signOut();
      currentUser = null;
      piUser = null;
      
      document.getElementById('appContainer').classList.add('hidden');
      document.getElementById('piLoginOverlay').classList.remove('hidden');
      
      showToast(translations[currentLang].signed_out, 'info');
    }
  });

  // Map filter
  ['showTeams', 'showAcademies', 'showShops'].forEach(id => {
    document.getElementById(id).addEventListener('change', loadMapMarkers);
  });

  // Close modals
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.remove('active');
    });
  });

  // Modal overlay click to close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Add entity buttons
  document.getElementById('addTeamBtn')?.addEventListener('click', () => {
    document.getElementById('teamFormModal').classList.add('active');
  });

  document.getElementById('addAcademyBtn')?.addEventListener('click', () => {
    document.getElementById('academyFormModal').classList.add('active');
  });

  document.getElementById('addHighlightBtn')?.addEventListener('click', () => {
    document.getElementById('highlightFormModal').classList.add('active');
  });

  // Form submissions
  document.getElementById('playerForm')?.addEventListener('submit', handlePlayerFormSubmit);
  document.getElementById('teamForm')?.addEventListener('submit', handleTeamFormSubmit);
  document.getElementById('academyForm')?.addEventListener('submit', handleAcademyFormSubmit);
  document.getElementById('shopForm')?.addEventListener('submit', handleShopFormSubmit);
  document.getElementById('highlightForm')?.addEventListener('submit', handleHighlightFormSubmit);

  // Rating modal
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      const value = star.dataset.value;
      document.querySelectorAll('.star').forEach((s, idx) => {
        if (idx < value) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
      star.closest('.star-rating').dataset.selectedRating = value;
    });
  });

  document.getElementById('submitRatingBtn')?.addEventListener('click', submitRating);

  // Initialize language
  changeLanguage(currentLang);
});

// Form submission handlers (placeholder functions - implement with Firebase)
async function handlePlayerFormSubmit(e) {
  e.preventDefault();
  // Implement player creation/update
  showToast(translations[currentLang].data_saved, 'success');
  document.getElementById('playerFormModal').classList.remove('active');
}

async function handleTeamFormSubmit(e) {
  e.preventDefault();
  // Implement team creation/update
  showToast(translations[currentLang].data_saved, 'success');
  document.getElementById('teamFormModal').classList.remove('active');
  loadTeams();
}

async function handleAcademyFormSubmit(e) {
  e.preventDefault();
  // Implement academy creation/update
  showToast(translations[currentLang].data_saved, 'success');
  document.getElementById('academyFormModal').classList.remove('active');
  loadAcademies();
}

async function handleShopFormSubmit(e) {
  e.preventDefault();
  // Implement shop creation/update
  showToast(translations[currentLang].data_saved, 'success');
  document.getElementById('shopFormModal').classList.remove('active');
  loadShops();
}

async function handleHighlightFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  try {
    await db.collection('highlights').add({
      uid: currentUser.uid,
      title: formData.get('title'),
      videoUrl: formData.get('videoUrl'),
      description: formData.get('description'),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    showToast(translations[currentLang].data_saved, 'success');
    document.getElementById('highlightFormModal').classList.remove('active');
    loadUserHighlights();
  } catch (error) {
    console.error('Add highlight error:', error);
    showToast('فشل إضافة الـ Highlight', 'error');
  }
}

// View profile functions (placeholder)
function viewPlayerProfile(id) {
  console.log('View player:', id);
  // Implement player profile view
}

function viewTeamProfile(id) {
  console.log('View team:', id);
  // Implement team profile view
}

function viewAcademyProfile(id) {
  console.log('View academy:', id);
  // Implement academy profile view
}

function viewShopProfile(id) {
  console.log('View shop:', id);
  // Implement shop profile view
}

// Edit/Delete functions (placeholder)
function editPlayer(id) {
  console.log('Edit player:', id);
}

function deletePlayer(id) {
  console.log('Delete player:', id);
}

function editTeam(id) {
  console.log('Edit team:', id);
}

function deleteTeam(id) {
  console.log('Delete team:', id);
}

function editAcademy(id) {
  console.log('Edit academy:', id);
}

function deleteAcademy(id) {
  console.log('Delete academy:', id);
}

// Rating function
let currentRatingEntity = null;

function rateEntity(type, id) {
  currentRatingEntity = { type, id };
  
  const modal = document.getElementById('ratingModal');
  modal.classList.add('active');
  
  // Get entity name
  let entityName = '';
  if (type === 'player') {
    const player = allPlayers.find(p => p.id === id);
    entityName = player?.name || '';
  } else if (type === 'team') {
    const team = allTeams.find(t => t.id === id);
    entityName = team?.name || '';
  } else if (type === 'academy') {
    const academy = allAcademies.find(a => a.id === id);
    entityName = academy?.name || '';
  } else if (type === 'shop') {
    const shop = allShops.find(s => s.id === id);
    entityName = shop?.name || '';
  }
  
  document.getElementById('ratingEntityName').textContent = `تقييم: ${entityName}`;
}

async function submitRating() {
  if (!currentRatingEntity || !currentUser) return;
  
  const ratingValue = parseInt(document.querySelector('.star-rating').dataset.selectedRating || 0);
  const comment = document.getElementById('ratingComment').value;
  
  if (ratingValue === 0) {
    showToast('الرجاء اختيار تقييم', 'error');
    return;
  }
  
  try {
    await db.collection('ratings').add({
      entityType: currentRatingEntity.type,
      entityId: currentRatingEntity.id,
      userId: currentUser.uid,
      username: currentUser.username,
      rating: ratingValue,
      comment: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    showToast(translations[currentLang].rating_submitted, 'success');
    document.getElementById('ratingModal').classList.remove('active');
    
    // Refresh data
    if (currentRatingEntity.type === 'player') await loadPlayers();
    else if (currentRatingEntity.type === 'team') await loadTeams();
    else if (currentRatingEntity.type === 'academy') await loadAcademies();
    else if (currentRatingEntity.type === 'shop') await loadShops();
    
  } catch (error) {
    console.error('Submit rating error:', error);
    showToast('فشل إرسال التقييم', 'error');
  }
}

// Export functions for onclick handlers
window.viewPlayerProfile = viewPlayerProfile;
window.viewTeamProfile = viewTeamProfile;
window.viewAcademyProfile = viewAcademyProfile;
window.viewShopProfile = viewShopProfile;
window.editPlayer = editPlayer;
window.deletePlayer = deletePlayer;
window.editTeam = editTeam;
window.deleteTeam = deleteTeam;
window.editAcademy = editAcademy;
window.deleteAcademy = deleteAcademy;
window.deleteHighlight = deleteHighlight;
window.rateEntity = rateEntity;
window.startConversationWith = startConversationWith;
window.initMap = initMap;