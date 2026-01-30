// ScoutMe - JavaScript Application with Pi Network Integration

// ===========================
// Constants & Configuration
// ===========================
const BASE_IMG = 'image';
const PI_API_KEY = localStorage.getItem('PI_API_KEY') || '';

const STORAGE = {
  ME: 'sm_me',
  PLAYERS: 'sm_players',
  CLUBS: 'sm_clubs',
  NFT_PLAYERS: 'sm_nft_players',
  TEAM_TOKENS: 'sm_team_tokens',
  STORES: 'sm_stores',
  USER_NFTS: 'sm_user_nfts',
  USER_TOKENS: 'sm_user_tokens'
};

// Helper function to generate unique IDs
function uid(prefix='id') {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ===========================
// Sports List (Extended)
// ===========================
const ALL_SPORTS = [
  'كرة قدم','كرة سلة','تنس','سباحة','رفع أثقال','هوكي','جمباز',
  'كرة طائرة','كرة يد','ملاكمة','جودو','كاراتيه','كونغ فو','تايكوندو',
  'ركض','دراجات','رماية','تزلج','غولف','فروسية','شطرنج',
  'كرة قاعدة','رجبي','تسلق جبال','تجديف','ترياتلون','سباق سيارات','سباق دراجات نارية',
  'مصارعة','باركور','ركوب أمواج','بلياردو','بولينغ','هوكي جليدي','هوكي ميداني',
  'سكواش','بادمنتون','تنس طاولة','سباقات السرعة','ماراثون','سباقات خيل','فن قتالي مختلط (MMA)',
  'رياضات إلكترونية','ألعاب استراتيجية','البادل','الكيك بوكسينغ','اليوغا','الزومبا',
  'سلاح الشيش','رمي القرص','رمي الرمح','القفز الطويل','القفز بالزانة','الجمباز الإيقاعي',
  'كرة الماء','التزلج على الجليد','التزلج على اللوح','الدرِفت','الراليات','سباقات القوارب',
  'الوثب الثلاثي','الوثب العالي','سباق الحواجز','الرماية بالقوس','التايبو','سباقات السرعة القصيرة'
];

// ===========================
// Multi-Language Support
// ===========================
const translations = {
  ar: {
    appName: 'ScoutMe',
    bannerTitle: 'اكتشف نجوم المستقبل',
    bannerSubtitle: 'منصة عالمية للمواهب الرياضية',
    spotlightTalents: 'مواهب مميزة',
    viewAll: 'عرض الكل',
    latestNews: 'آخر الأخبار',
    searchPlaceholder: 'البحث عن اللاعبين...',
    allSports: 'الكل',
    talentsTitle: 'المواهب الرياضية',
    sortByRating: 'الأعلى تقييماً',
    sortByAge: 'حسب العمر',
    sortByCountry: 'حسب الدولة',
    clubsTitle: 'الأندية والأكاديميات',
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
    visit: 'زيارة',
    welcome_to_scoutme: 'مرحبا بك في ScoutMe',
    pi_network_login_desc: 'سجل الدخول باستخدام Pi Network للوصول إلى المنصة',
    signin_with_pi: 'تسجيل الدخول عبر Pi Network',
    wallet_address: 'عنوان المحفظة',
    link_wallet: 'ربط محفظة Pi',
    payment_with_pi: 'الدفع بـ Pi',
    select_amount: 'اختر المبلغ',
    confirm_payment: 'تأكيد الدفع',
    app_commission: 'عمولة التطبيق (%)',
    save: 'حفظ',
    dev_note: 'ملاحظة: للدفع الحقيقي عبر Pi استعمل سيرفر/Function لحماية PI_API_KEY.',
    buy_token_confirm: 'شراء توكن {team} مقابل {price} Pi؟',
    purchased_simulated: 'تم الشراء (محاكاة)',
    not_found: 'غير موجود',
    buy_nft: 'شراء NFT',
    buy_nft_confirm: 'شراء NFT {name} مقابل {price} Pi؟',
    nft_purchased_simulated: 'تم شراء NFT (محاكاة)'
  },
  en: {
    appName: 'ScoutMe',
    bannerTitle: 'Discover Future Stars',
    bannerSubtitle: 'Global Platform for Sports Talents',
    spotlightTalents: 'Spotlight Talents',
    viewAll: 'View All',
    latestNews: 'Latest News',
    searchPlaceholder: 'Search for players...',
    allSports: 'All Sports',
    talentsTitle: 'Sports Talents',
    sortByRating: 'Highest Rated',
    sortByAge: 'By Age',
    sortByCountry: 'By Country',
    clubsTitle: 'Clubs & Academies',
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
    statsComingSoon: 'Detailed statistics coming soon...',
    nftsComingSoon: 'NFTs coming soon...',
    language: 'Language',
    notifications: 'Notifications',
    darkMode: 'Dark Mode',
    wallet: 'Wallet',
    currentBalance: 'Current Balance',
    send: 'Send',
    receive: 'Receive',
    transactionHistory: 'Transaction History',
    viewProfile: 'View Profile',
    message: 'Message',
    apply: 'Apply',
    join: 'Join',
    team_tokens: 'Team Tokens',
    price: 'Price',
    buy: 'Buy',
    nft_players: 'NFT Players',
    value: 'Value',
    marketplace_desc: 'Discover partner stores within Pi ecosystem',
    pi_stores: 'Pi Ecosystem Stores',
    visit: 'Visit',
    welcome_to_scoutme: 'Welcome to ScoutMe',
    pi_network_login_desc: 'Sign in with Pi Network to access the platform',
    signin_with_pi: 'Sign in with Pi Network',
    wallet_address: 'Wallet Address',
    link_wallet: 'Link Pi Wallet',
    payment_with_pi: 'Payment with Pi',
    select_amount: 'Select Amount',
    confirm_payment: 'Confirm Payment',
    app_commission: 'App Commission (%)',
    save: 'Save',
    dev_note: 'Note: For real Pi payment use server/Function to protect PI_API_KEY.',
    buy_token_confirm: 'Buy {team} token for {price} Pi?',
    purchased_simulated: 'Purchased (simulated)',
    not_found: 'Not found',
    buy_nft: 'Buy NFT',
    buy_nft_confirm: 'Buy NFT {name} for {price} Pi?',
    nft_purchased_simulated: 'NFT purchased (simulated)'
  },
  fr: {
    appName: 'ScoutMe',
    bannerTitle: 'Découvrez les Stars de Demain',
    bannerSubtitle: 'Plateforme Mondiale pour les Talents Sportifs',
    spotlightTalents: 'Talents en Vedette',
    viewAll: 'Voir Tout',
    latestNews: 'Dernières Nouvelles',
    searchPlaceholder: 'Rechercher des joueurs...',
    allSports: 'Tous les Sports',
    talentsTitle: 'Talents Sportifs',
    sortByRating: 'Mieux Notés',
    sortByAge: 'Par Âge',
    sortByCountry: 'Par Pays',
    clubsTitle: 'Clubs & Académies',
    home: 'Accueil',
    discover: 'Découvrir',
    talents: 'Talents',
    clubs: 'Clubs',
    marketplace: 'Marché',
    profile: 'Profil',
    userName: 'Utilisateur ScoutMe',
    overview: 'Aperçu',
    stats: 'Statistiques',
    nfts: 'NFTs',
    settings: 'Paramètres',
    goals: 'Buts',
    assists: 'Passes',
    awards: 'Récompenses',
    team_tokens: 'Jetons d\'Équipe',
    price: 'Prix',
    buy: 'Acheter',
    nft_players: 'Joueurs NFT',
    value: 'Valeur',
    pi_stores: 'Magasins Pi',
    visit: 'Visiter',
    wallet_address: 'Adresse du Portefeuille',
    link_wallet: 'Lier Portefeuille Pi',
    select_amount: 'Sélectionner Montant'
  }
};

// Add more languages (abbreviated for space)
translations.es = { ...translations.en, appName: 'ScoutMe' };
translations.de = { ...translations.en, appName: 'ScoutMe' };
translations.pt = { ...translations.en, appName: 'ScoutMe' };
translations.it = { ...translations.en, appName: 'ScoutMe' };
translations.ru = { ...translations.en, appName: 'ScoutMe' };
translations.zh = { ...translations.en, appName: 'ScoutMe' };
translations.ja = { ...translations.en, appName: 'ScoutMe' };
translations.ko = { ...translations.en, appName: 'ScoutMe' };
translations.tr = { ...translations.en, appName: 'ScoutMe' };
translations.hi = { ...translations.en, appName: 'ScoutMe' };
translations.bn = { ...translations.en, appName: 'ScoutMe' };
translations.ur = { ...translations.ar };

// ===========================
// Sample Data
// ===========================
function seedData() {
  if (!localStorage.getItem(STORAGE.PLAYERS)) {
    const samplePlayers = [
      { id: uid('player'), name: 'Mohamed Salah', position: 'Forward', age: 22, country: '🇪🇬', sport: 'كرة قدم', rating: 4.9, image: `${BASE_IMG}/players/player_mohamed_salah.png` },
      { id: uid('player'), name: 'Cristiano Ronaldo', position: 'Forward', age: 23, country: '🇵🇹', sport: 'كرة قدم', rating: 4.8, image: `${BASE_IMG}/players/player_cristiano_ronaldo.png` },
      { id: uid('player'), name: 'Lionel Messi', position: 'Forward', age: 24, country: '🇦🇷', sport: 'كرة قدم', rating: 4.9, image: `${BASE_IMG}/players/player_lionel_messi.png` },
      { id: uid('player'), name: 'Kylian Mbappé', position: 'Forward', age: 21, country: '🇫🇷', sport: 'كرة قدم', rating: 4.8, image: `${BASE_IMG}/players/player_kylian_mbappe.png` },
      { id: uid('player'), name: 'Achraf Hakimi', position: 'Defender', age: 22, country: '🇲🇦', sport: 'كرة قدم', rating: 4.7, image: `${BASE_IMG}/players/player_achraf_hakimi.png` },
      { id: uid('player'), name: 'Riyad Mahrez', position: 'Midfielder', age: 25, country: '🇩🇿', sport: 'كرة قدم', rating: 4.6, image: `${BASE_IMG}/players/player_riyad_mahrez.png` },
      { id: uid('player'), name: 'Yuki Tanaka', position: 'Guard', age: 23, country: '🇯🇵', sport: 'كرة سلة', rating: 4.5 },
      { id: uid('player'), name: 'Emma Wilson', position: 'Singles', age: 19, country: '🇺🇸', sport: 'تنس', rating: 4.9 },
      { id: uid('player'), name: 'Lars Schmidt', position: 'Freestyle', age: 20, country: '🇩🇪', sport: 'سباحة', rating: 4.7 }
    ];
    localStorage.setItem(STORAGE.PLAYERS, JSON.stringify(samplePlayers));
  }

  if (!localStorage.getItem(STORAGE.CLUBS)) {
    const sampleClubs = [
      { id: uid('club'), name: 'مستقبل القصرين', location: 'القصرين، تونس', level: 'محترف', rating: 4.6, image: `${BASE_IMG}/teams/team_mostakbal_kasserine.png` },
      { id: uid('club'), name: 'النجم الساحلي', location: 'سوسة، تونس', level: 'محترف', rating: 4.8, image: `${BASE_IMG}/teams/team_etoile_du_sahel.png` },
      { id: uid('club'), name: 'الترجي الرياضي التونسي', location: 'تونس العاصمة، تونس', level: 'محترف', rating: 4.9, image: `${BASE_IMG}/teams/team_esperance.png` },
      { id: uid('club'), name: 'النادي الإفريقي', location: 'تونس العاصمة، تونس', level: 'محترف', rating: 4.7, image: `${BASE_IMG}/teams/team_club_africain.png` },
      { id: uid('club'), name: 'النادي الرياضي الصفاقسي', location: 'صفاقس، تونس', level: 'محترف', rating: 4.6, image: `${BASE_IMG}/teams/team_cs_sfaxi.png` },
      { id: uid('club'), name: 'Al Ahly', location: 'Cairo, Egypt', level: 'Professional', rating: 4.9, image: `${BASE_IMG}/teams/team_al_ahly.png` },
      { id: uid('club'), name: 'Zamalek', location: 'Cairo, Egypt', level: 'Professional', rating: 4.8, image: `${BASE_IMG}/teams/team_zamalek.png` },
      { id: uid('club'), name: 'Wydad AC', location: 'Casablanca, Morocco', level: 'Professional', rating: 4.7, image: `${BASE_IMG}/teams/team_wydad.png` },
      { id: uid('club'), name: 'Raja CA', location: 'Casablanca, Morocco', level: 'Professional', rating: 4.7, image: `${BASE_IMG}/teams/team_rajac.png` },
      { id: uid('club'), name: 'Real Madrid', location: 'Madrid, Spain', level: 'Elite', rating: 5.0, image: `${BASE_IMG}/teams/team_real_madrid.png` },
      { id: uid('club'), name: 'FC Barcelona', location: 'Barcelona, Spain', level: 'Elite', rating: 4.9, image: `${BASE_IMG}/teams/team_fc_barcelona.png` },
      { id: uid('club'), name: 'Manchester City', location: 'Manchester, UK', level: 'Elite', rating: 4.8, image: `${BASE_IMG}/teams/team_manchester_city.png` },
      { id: uid('club'), name: 'Paris Saint-Germain', location: 'Paris, France', level: 'Elite', rating: 4.8, image: `${BASE_IMG}/teams/team_paris_saint_germain.png` }
    ];
    localStorage.setItem(STORAGE.CLUBS, JSON.stringify(sampleClubs));
  }
}

// Seed add-ons: NFT players, team tokens, stores
function seedAddOns() {
  const basePath = BASE_IMG;
  
  if (!localStorage.getItem(STORAGE.NFT_PLAYERS)) {
    const nftPlayers = [
      {id:'nft1', name:'Elyes Skiri', image:`${basePath}/players/player_elyes_skiri.png`, value:90},
      {id:'nft2', name:'Hannibal Mejbri', image:`${basePath}/players/player_hannibal.png`, value:95},
      {id:'nft3', name:'Achraf Hakimi', image:`${basePath}/players/player_achraf_hakimi.png`, value:110},
      {id:'nft4', name:'Ismail Bennacer', image:`${basePath}/players/player_ismail_bennacer.png`, value:105},
      {id:'nft5', name:'Riyad Mahrez', image:`${basePath}/players/player_riyad_mahrez.png`, value:108},
      {id:'nft6', name:'Brahim Diaz', image:`${basePath}/players/player_brahim_diaz.png`, value:100},
      {id:'nft7', name:'Cristiano Ronaldo', image:`${basePath}/players/player_cristiano_ronaldo.png`, value:100},
      {id:'nft8', name:'Lionel Messi', image:`${basePath}/players/player_lionel_messi.png`, value:110},
      {id:'nft9', name:'Kylian Mbappé', image:`${basePath}/players/player_kylian_mbappe.png`, value:120},
      {id:'nft10', name:'Mohamed Salah', image:`${basePath}/players/player_mohamed_salah.png`, value:105},
      {id:'nft11', name:'Neymar Jr', image:`${basePath}/players/player_neymar_jr.png`, value:115},
      {id:'nft12', name:'Karim Benzema', image:`${basePath}/players/player_karim_benzema.png`, value:108},
      {id:'nft13', name:'Sadio Mané', image:`${basePath}/players/player_sadio_mane.png`, value:107},
      {id:'nft14', name:'Erling Haaland', image:`${basePath}/players/player_erling_haaland.png`, value:118},
      {id:'nft15', name:'Robert Lewandowski', image:`${basePath}/players/player_robert_lewandowski.png`, value:112},
      {id:'nft16', name:'Kevin De Bruyne', image:`${basePath}/players/player_kevin_de_bruyne.png`, value:110}
    ];
    localStorage.setItem(STORAGE.NFT_PLAYERS, JSON.stringify(nftPlayers));
  }

  if (!localStorage.getItem(STORAGE.TEAM_TOKENS)) {
    const tokens = [
      {id:'tok1', team:'Mostakbal Kasserine', image:`${basePath}/teams/team_mostakbal_kasserine.png`, price:5},
      {id:'tok2', team:'Etoile du Sahel', image:`${basePath}/teams/team_etoile_du_sahel.png`, price:5},
      {id:'tok3', team:'CS Sfaxien', image:`${basePath}/teams/team_cs_sfaxi.png`, price:5},
      {id:'tok4', team:'Club Africain', image:`${basePath}/teams/team_club_africain.png`, price:6},
      {id:'tok5', team:'Union Monastir', image:`${basePath}/teams/team_union_monastir.png`, price:5},
      {id:'tok6', team:'Manchester City', image:`${basePath}/teams/team_manchester_city.png`, price:5},
      {id:'tok7', team:'Paris Saint-Germain', image:`${basePath}/teams/team_paris_saint_germain.png`, price:6},
      {id:'tok8', team:'FC Barcelona', image:`${basePath}/teams/team_fc_barcelona.png`, price:4},
      {id:'tok9', team:'Real Madrid', image:`${basePath}/teams/team_real_madrid.png`, price:5},
      {id:'tok10', team:'Esperance', image:`${basePath}/teams/team_esperance.png`, price:5},
      {id:'tok11', team:'Zamalek', image:`${basePath}/teams/team_zamalek.png`, price:5},
      {id:'tok12', team:'Al Ahly', image:`${basePath}/teams/team_al_ahly.png`, price:6},
      {id:'tok13', team:'Al Ittihad', image:`${basePath}/teams/team_al_ittihad.png`, price:6},
      {id:'tok14', team:'Al Hilal', image:`${basePath}/teams/team_al_hilal.png`, price:7},
      {id:'tok15', team:'Al Nassr', image:`${basePath}/teams/team_al_nassr.png`, price:7},
      {id:'tok16', team:'USM Alger', image:`${basePath}/teams/team_usm_alger.png`, price:5},
      {id:'tok17', team:'MC Alger', image:`${basePath}/teams/team_mca_alger.png`, price:5},
      {id:'tok18', team:'JS Kabylie', image:`${basePath}/teams/team_js_kabylie.png`, price:5},
      {id:'tok19', team:'CR Belouizdad', image:`${basePath}/teams/team_cr_belouizdad.png`, price:6},
      {id:'tok20', team:'Wydad AC', image:`${basePath}/teams/team_wydad.png`, price:6},
      {id:'tok21', team:'Raja CA', image:`${basePath}/teams/team_rajac.png`, price:6},
      {id:'tok22', team:'RS Berkane', image:`${basePath}/teams/team_berkane.png`, price:5},
      {id:'tok23', team:'AS FAR', image:`${basePath}/teams/team_as_far.png`, price:5},
      {id:'tok24', team:'Pyramids', image:`${basePath}/teams/team_pyramids.png`, price:5},
      {id:'tok25', team:'Ismaily', image:`${basePath}/teams/team_ismaily.png`, price:5},
      {id:'tok26', team:'Al Sadd', image:`${basePath}/teams/team_al_sadd.png`, price:5},
      {id:'tok27', team:'Al Duhail', image:`${basePath}/teams/team_al_duhail.png`, price:5},
      {id:'tok28', team:'Liverpool', image:`${basePath}/teams/team_liverpool.png`, price:5},
      {id:'tok29', team:'AC Milan', image:`${basePath}/teams/team_ac_milan.png`, price:5},
      {id:'tok30', team:'Bayern Munich', image:`${basePath}/teams/team_bayern_munich.png`, price:5},
      {id:'tok31', team:'Juventus', image:`${basePath}/teams/team_juventus.png`, price:5},
      {id:'tok32', team:'Inter Milan', image:`${basePath}/teams/team_inter_milan.png`, price:5},
      {id:'tok33', team:'Valencia', image:`${basePath}/teams/team_valencia.png`, price:5},
      {id:'tok34', team:'Arsenal', image:`${basePath}/teams/team_arsenal.png`, price:5},
      {id:'tok35', team:'Atletico Madrid', image:`${basePath}/teams/team_atletico_madrid.png`, price:5},
      {id:'tok36', team:'Borussia Dortmund', image:`${basePath}/teams/team_borussia_dortmund.png`, price:5},
      {id:'tok37', team:'RB Leipzig', image:`${basePath}/teams/team_rb_leipzig.png`, price:5},
      {id:'tok38', team:'Bayer Leverkusen', image:`${basePath}/teams/team_bayer_leverkusen.png`, price:5},
      {id:'tok39', team:'OM Marseille', image:`${basePath}/teams/team_om_marseille.png`, price:5},
      {id:'tok40', team:'AS Monaco', image:`${basePath}/teams/team_as_monaco.png`, price:5},
      {id:'tok41', team:'OL Lyon', image:`${basePath}/teams/team_ol_lyon.png`, price:5},
      {id:'tok42', team:'LOSC Lille', image:`${basePath}/teams/team_losc_lille.png`, price:5}
    ];
    localStorage.setItem(STORAGE.TEAM_TOKENS, JSON.stringify(tokens));
  }

  if (!localStorage.getItem(STORAGE.STORES)) {
    const stores = [
      {id:'store_1pi_mall', name:'1Pi Mall', image:`${basePath}/stores/store_1pi_mall.png`, short:'سوق إلكتروني في منظومة Pi لبيع وشراء السلع والخدمات بـ Pi', details:'يمكن ربطه كجزء من Marketplace: اللاعب أو النادي يمكنهم عرض منتجات رياضية أو تجهيزات، والمشجعون يشترونها بـ Pi عبر التطبيق.'},
      {id:'store_pitogo', name:'Pitogo', image:`${basePath}/stores/store_pitogo.png`, short:'منصة سفر/خدمات سياحية ضمن منظومة Pi', details:'ضمن Marketplace: يمكن للاعبين أو الأندية الترويج لــ "تجربة سفر" لمشجعين أو كشّافين، أو عرض باقات الرياضة + السفر.'},
      {id:'store_watugot', name:'Watugot', image:`${basePath}/stores/store_watugot.png`, short:'منصة تداول وخدمات محلية تستخدم Pi', details:'يمكن للاعب أو نادي أن يعرض خدمة "جلسة تدريب" أو "تدريب فردي" ويُدفع بـ Pi عبر Watugot داخل Marketplace.'},
      {id:'store_workforce', name:'Workforce', image:`${basePath}/stores/store_workforce.png`, short:'منصة فرص عمل ومشاريع Freelance', details:'في Marketplace: متجر "خدمات الكشّافين" أو "استشارات رياضية" — الكشاف يعرض خدمة، واللاعب أو النادي يدفع بـ Pi.'},
      {id:'store_map_of_pi', name:'Map of Pi', image:`${basePath}/stores/store_map_of_pi.png`, short:'دليل للأعمال التي تقبل Pi حول العالم', details:'يمكن تضمينه كقسم "الشركاء المحليين" — عرض أماكن ومحلات ومعسكرات تقبل Pi وتربطهم باللاعبين.'},
      {id:'store_app_link', name:'App Link', image:`${basePath}/stores/store_app_link.png`, short:'منصة لعرض تطبيقات ومشاريع Pi', details:'يمكن أن تكون "متجر التطبيقات الرياضية" عبر Pi — شراء/تحميل تطبيقات وأدوات مساعدة عن طريق Pi.'},
      {id:'store_daabia_mall', name:'Daabia Mall', image:`${basePath}/stores/store_daabia_mall.png`, short:'منصة تجارة إلكترونية Web3 ضمن منظومة Pi', details:'متجر لبيع المقتنيات الرياضية الأصلية، سلع موقعة من اللاعب، أو NFT خاصة بالبث المباشر.'},
      {id:'store_latinchain', name:'LatinChain', image:`${basePath}/stores/store_latinchain.png`, short:'منصة ألعاب وخدمات في أمريكا اللاتينية', details:'متجر "ألعاب وتدريب تفاعلي" — شراء دروس تفاعلية أو ألعاب تدريبية بـ Pi.'},
      {id:'store_pet_for_pi', name:'Pet for Pi', image:`${basePath}/stores/store_pet_for_pi.png`, short:'متجر/خدمات مجتمعية/رفاهية', details:'متجر رعاية اللياقة أو خدمات رفاهية للاعبين — يمكن تخصيصه لصحة الرياضي وخدمات الرفاهية.'}
    ];
    localStorage.setItem(STORAGE.STORES, JSON.stringify(stores));
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
    if (isPiSdkAvailable()) {
      if (!__piInitDone && typeof window.Pi.init === 'function') {
        __piInitDone = true;
        try { window.Pi.init({ version: "2.0", sandbox: false }); } catch(e) {}
      }
      
      const auth = await window.Pi.authenticate(["username","payments"], (payment) => {
        console.log('onIncompletePaymentFound', payment);
      });
      
      const accessToken = auth?.accessToken || auth?.access_token || '';
      const username = String(auth?.user?.username || auth?.username || auth?.user?.name || '').trim();
      
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
        wallet: '', 
        sports: [], 
        country: '' 
      };
      
      localStorage.setItem(STORAGE.ME, JSON.stringify(piUser));
      localStorage.setItem('sm_seen_overlay', 'true');
      
      const regOverlay = document.getElementById('reg-overlay');
      if (regOverlay) regOverlay.style.display = 'none';
      
      alert('تم تسجيل الدخول بنجاح: ' + username);
      window.location.reload();
      
    } else {
      alert('Pi SDK not available. Please open in Pi Browser.');
    }
  } catch(err) {
    console.error('Pi sign-in failed:', err);
    alert('فشل تسجيل الدخول عبر Pi: ' + (err && err.message ? err.message : 'Unknown error'));
  }
}

async function linkPiWallet() {
  try {
    if (!isPiSdkAvailable()) {
      alert('Pi SDK not available');
      return;
    }
    
    const auth = await window.Pi.authenticate(["username", "payments"], () => {});
    const username = auth?.user?.username || auth?.username || '';
    const walletAddress = username + '@pi.network'; // Simulated
    
    const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
    me.wallet = walletAddress;
    localStorage.setItem(STORAGE.ME, JSON.stringify(me));
    
    alert('تم ربط المحفظة: ' + walletAddress);
    loadProfile();
  } catch(err) {
    console.error(err);
    alert('فشل ربط المحفظة');
  }
}

async function payWithPi(amount) {
  try {
    if (!isPiSdkAvailable()) {
      alert('Pi SDK not available');
      return;
    }
    
    let accessToken = localStorage.getItem('PI_ACCESS_TOKEN') || '';
    try {
      const auth = await window.Pi.authenticate(["payments"], (payment) => {
        console.log('onIncompletePaymentFound', payment);
      });
      const newToken = auth?.accessToken || auth?.access_token || '';
      if (newToken) {
        accessToken = newToken;
        localStorage.setItem('PI_ACCESS_TOKEN', accessToken);
      }
    } catch(e) {
      alert('خاصك تعطي صلاحية payments باش نقدروا نديروا الدفع.');
      return;
    }

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
      memo: 'ScoutMe — Profile Payment',
      metadata: { source: 'profile', kind: 'tip', amount: selectedAmount }
    };

    const paymentCallbacks = {
      onReadyForServerApproval: async (paymentDTO) => {
        const paymentId =
          (typeof paymentDTO === 'string' ? paymentDTO : null) ||
          paymentDTO?.identifier ||
          paymentDTO?.paymentId ||
          paymentDTO?.id ||
          paymentDTO?.payment_id;
        const resp = await fetch('/.netlify/functions/pi-approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, accessToken, paymentDTO })
        });
        if (!resp.ok) {
          const text = await resp.text().catch(() => '');
          console.error('pi-approve failed', resp.status, text);
          throw new Error('pi-approve failed: ' + resp.status);
        }
      },
      onReadyForServerCompletion: async (paymentDTO, txid) => {
        const paymentId =
          (typeof paymentDTO === 'string' ? paymentDTO : null) ||
          paymentDTO?.identifier ||
          paymentDTO?.paymentId ||
          paymentDTO?.id ||
          paymentDTO?.payment_id;
        const resp = await fetch('/.netlify/functions/pi-complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid, accessToken, paymentDTO })
        });
        if (!resp.ok) {
          const text = await resp.text().catch(() => '');
          console.error('pi-complete failed', resp.status, text);
          throw new Error('pi-complete failed: ' + resp.status);
        }
        alert('✅ تم الدفع بنجاح');
      },
      onCancel: async (paymentDTO) => {
        try {
          const paymentId =
            (typeof paymentDTO === 'string' ? paymentDTO : null) ||
            paymentDTO?.identifier ||
            paymentDTO?.paymentId ||
            paymentDTO?.id ||
            paymentDTO?.payment_id;
          const resp = await fetch('/.netlify/functions/pi-cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, paymentDTO })
          });
          if (!resp.ok) {
            const text = await resp.text().catch(() => '');
            console.error('pi-cancel failed', resp.status, text);
          }
        } catch(e) {}
        alert('تم إلغاء العملية');
      },
      onError: (err) => {
        console.error('Payment error:', err);
        alert('❌ وقع خطأ فالدفع');
      },
      onIncompletePaymentFound: async (paymentDTO) => {
        try {
          const paymentId =
            (typeof paymentDTO === 'string' ? paymentDTO : null) ||
            paymentDTO?.identifier ||
            paymentDTO?.paymentId ||
            paymentDTO?.id ||
            paymentDTO?.payment_id;
          const txid = paymentDTO?.transaction?.txid;
          if (paymentId && txid) {
            const resp = await fetch('/.netlify/functions/pi-complete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId, txid, accessToken, paymentDTO })
            });
            if (!resp.ok) {
              const text = await resp.text().catch(() => '');
              console.error('pi-complete (incomplete) failed', resp.status, text);
            }
          }
        } catch(e) {}
      }
    };

    window.Pi.createPayment(paymentData, paymentCallbacks);
  } catch(err) {
    console.error(err);
    alert('❌ وقع خطأ غير متوقع');
  }
}

window.payWithPi = payWithPi;

// ===========================
// Language Functions
// ===========================
let currentLanguage = 'ar';

function changeLanguage(lang) {
  currentLanguage = lang;
  const direction = ['ar', 'ur'].includes(lang) ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', lang);
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  document.querySelectorAll('option[data-i18n]').forEach(option => {
    const key = option.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      option.textContent = translations[lang][key];
    }
  });
}

// ===========================
// Navigation
// ===========================
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPage = btn.getAttribute('data-page');
      navButtons.forEach(b => b.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(targetPage).classList.add('active');
    });
  });
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
  const modal = document.getElementById('walletModal');
  modal.style.display = 'none';
}

function updateWalletDisplay() {
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  const balance = me.balance || 1234; // Simulated
  const wallet = me.wallet || '--';
  
  document.getElementById('walletBalance').textContent = balance + ' Pi';
  document.getElementById('modalWalletBalance').textContent = balance + ' Pi';
  document.getElementById('modalWalletAddress').textContent = wallet;
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  modal.style.display = 'none';
}

function confirmPayment() {
  const amount = document.getElementById('piPayAmount').value;
  closePaymentModal();
  payWithPi(Number(amount));
}

// ===========================
// Content Generation
// ===========================
function generatePlayerCard(player) {
  const stars = '⭐'.repeat(Math.floor(player.rating));
  const img = player.image || '';
  return `
    <div class="player-card">
      <img src="${img}" class="player-image" onerror="this.style.display='none'">
      <div class="player-name">${player.name}</div>
      <div class="player-position">${player.country} ${player.position}</div>
      <div class="trust-score">
        <span class="stars">${stars}</span>
        <span class="score">${player.rating}</span>
      </div>
    </div>
  `;
}

function loadSpotlightTalents() {
  const players = JSON.parse(localStorage.getItem(STORAGE.PLAYERS) || '[]');
  const container = document.getElementById('spotlightContainer');
  container.innerHTML = players.slice(0, 5).map(p => generatePlayerCard(p)).join('');
}

function loadNews() {
  const sampleNews = [
    { title: 'Champions League Qualification Success', date: '2 hours ago' },
    { title: 'New Training Academy Opens in Dubai', date: '5 hours ago' },
    { title: 'Top Scouts Meeting in Barcelona', date: '1 day ago' }
  ];
  const container = document.getElementById('newsContainer');
  container.innerHTML = sampleNews.map(news => `
    <div class="news-item">
      <div class="news-image"></div>
      <div class="news-content">
        <div class="news-title">${news.title}</div>
        <div class="news-date">${news.date}</div>
      </div>
    </div>
  `).join('');
}

function loadSportsFilters() {
  const container = document.getElementById('sportsFilters');
  const t = translations[currentLanguage];
  let html = `<button class="filter-btn active" data-sport="all">${t.allSports}</button>`;
  ALL_SPORTS.slice(0, 10).forEach(sport => {
    html += `<button class="filter-btn" data-sport="${sport}">${sport}</button>`;
  });
  container.innerHTML = html;
  
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sport = btn.getAttribute('data-sport');
      filterPlayers(document.getElementById('searchInput').value, sport);
    });
  });
}

function filterPlayers(searchTerm, sport) {
  let players = JSON.parse(localStorage.getItem(STORAGE.PLAYERS) || '[]');
  
  if (sport !== 'all') {
    players = players.filter(p => p.sport === sport);
  }
  
  if (searchTerm) {
    players = players.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  const container = document.getElementById('discoverGrid');
  container.innerHTML = players.map(p => generatePlayerCard(p)).join('');
}

function loadDiscoverGrid() {
  filterPlayers('', 'all');
}

function loadTalentsList() {
  const players = JSON.parse(localStorage.getItem(STORAGE.PLAYERS) || '[]');
  const container = document.getElementById('talentsList');
  const t = translations[currentLanguage];
  
  container.innerHTML = players.map(player => {
    const stars = '⭐'.repeat(Math.floor(player.rating));
    const img = player.image || '';
    return `
      <div class="talent-card">
        <img src="${img}" class="talent-image" onerror="this.style.display='none'">
        <div class="talent-info">
          <div class="player-name">${player.name}</div>
          <div class="player-position">${player.country} ${player.position} • Age ${player.age}</div>
          <div class="trust-score">
            <span class="stars">${stars}</span>
            <span class="score">${player.rating}</span>
          </div>
          <div class="talent-actions">
            <button class="btn-primary">${t.viewProfile}</button>
            <button class="btn-primary">${t.message}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function loadClubsList() {
  const clubs = JSON.parse(localStorage.getItem(STORAGE.CLUBS) || '[]');
  const container = document.getElementById('clubsList');
  const t = translations[currentLanguage];
  
  container.innerHTML = clubs.map(club => {
    const stars = '⭐'.repeat(Math.floor(club.rating));
    const img = club.image || '';
    return `
      <div class="club-card">
        <div class="club-logo">
          <img src="${img}" alt="${club.name}" onerror="this.parentElement.innerHTML='🏆'">
        </div>
        <div class="club-name">${club.name}</div>
        <div class="club-location">${club.location}</div>
        <div class="trust-score">
          <span class="stars">${stars}</span>
          <span class="score">${club.rating}</span>
        </div>
        <button class="btn-primary">${t.apply}</button>
      </div>
    `;
  }).join('');
}

function loadMarketplace() {
  loadTeamTokens();
  loadNFTPlayers();
  loadStores();
}

function loadTeamTokens() {
  const tokens = JSON.parse(localStorage.getItem(STORAGE.TEAM_TOKENS) || '[]');
  const container = document.getElementById('teamTokensContainer');
  const t = translations[currentLanguage];
  
  container.innerHTML = tokens.map(token => `
    <div class="token-card">
      <img src="${token.image}" class="token-image" onerror="this.style.display='none'">
      <div class="token-team">${token.team}</div>
      <div class="token-price">${token.price} Pi</div>
      <button class="btn-buy-token" onclick="buyToken('${token.id}')">${t.buy}</button>
    </div>
  `).join('');
}

function loadNFTPlayers() {
  const nfts = JSON.parse(localStorage.getItem(STORAGE.NFT_PLAYERS) || '[]');
  const container = document.getElementById('nftPlayersContainer');
  const t = translations[currentLanguage];
  
  container.innerHTML = nfts.map(nft => `
    <div class="nft-card">
      <img src="${nft.image}" class="nft-image" onerror="this.style.display='none'">
      <div class="nft-name">${nft.name}</div>
      <div class="nft-value">${nft.value} Pi</div>
      <button class="btn-buy-token" onclick="buyNFT('${nft.id}')">${t.buy_nft}</button>
    </div>
  `).join('');
}

function loadStores() {
  const stores = JSON.parse(localStorage.getItem(STORAGE.STORES) || '[]');
  const container = document.getElementById('storesContainer');
  const t = translations[currentLanguage];
  
  container.innerHTML = stores.map(store => `
    <div class="store-card">
      <img src="${store.image}" class="store-image" onerror="this.style.display='none'">
      <div class="store-name">${store.name}</div>
      <div class="store-short">${store.short}</div>
      <button class="btn-visit-store">${t.visit}</button>
    </div>
  `).join('');
}

function buyToken(tokenId) {
  const tokens = JSON.parse(localStorage.getItem(STORAGE.TEAM_TOKENS) || '[]');
  const token = tokens.find(t => t.id === tokenId);
  if (!token) {
    alert(translations[currentLanguage].not_found);
    return;
  }
  
  const msg = translations[currentLanguage].buy_token_confirm
    .replace('{team}', token.team)
    .replace('{price}', token.price);
  
  if (confirm(msg)) {
    alert(translations[currentLanguage].purchased_simulated);
    // Real implementation would call payWithPi(token.price)
  }
}

function buyNFT(nftId) {
  const nfts = JSON.parse(localStorage.getItem(STORAGE.NFT_PLAYERS) || '[]');
  const nft = nfts.find(n => n.id === nftId);
  if (!nft) {
    alert(translations[currentLanguage].not_found);
    return;
  }
  
  const msg = translations[currentLanguage].buy_nft_confirm
    .replace('{name}', nft.name)
    .replace('{price}', nft.value);
  
  if (confirm(msg)) {
    // Add to user NFTs
    let userNFTs = JSON.parse(localStorage.getItem(STORAGE.USER_NFTS) || '[]');
    userNFTs.push(nft);
    localStorage.setItem(STORAGE.USER_NFTS, JSON.stringify(userNFTs));
    
    alert(translations[currentLanguage].nft_purchased_simulated);
    loadUserNFTs();
    // Real implementation would call payWithPi(nft.value)
  }
}

function loadProfile() {
  const me = JSON.parse(localStorage.getItem(STORAGE.ME) || '{}');
  const name = me.name || translations[currentLanguage].userName;
  const wallet = me.wallet || '--';
  
  document.getElementById('profileName').textContent = name;
  document.getElementById('profileWalletAddress').textContent = wallet;
  
  loadUserNFTs();
}

function loadUserNFTs() {
  const userNFTs = JSON.parse(localStorage.getItem(STORAGE.USER_NFTS) || '[]');
  const container = document.getElementById('userNftsContainer');
  
  if (userNFTs.length === 0) {
    container.innerHTML = `<p>${translations[currentLanguage].nftsComingSoon}</p>`;
  } else {
    container.innerHTML = userNFTs.map(nft => `
      <div class="nft-card">
        <img src="${nft.image}" class="nft-image" onerror="this.style.display='none'">
        <div class="nft-name">${nft.name}</div>
        <div class="nft-value">${nft.value} Pi</div>
      </div>
    `).join('');
  }
}

// ===========================
// Search Setup
// ===========================
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const sport = document.querySelector('.filter-btn.active')?.getAttribute('data-sport') || 'all';
    filterPlayers(e.target.value.toLowerCase(), sport);
  });
}

// ===========================
// Check Authentication
// ===========================
function checkAuth() {
  const seenOverlay = localStorage.getItem('sm_seen_overlay');
  const me = localStorage.getItem(STORAGE.ME);
  
  if (!seenOverlay || !me) {
    document.getElementById('reg-overlay').style.display = 'flex';
  } else {
    document.getElementById('reg-overlay').style.display = 'none';
  }
}

// ===========================
// Initialization
// ===========================
function init() {
  seedData();
  seedAddOns();
  checkAuth();
  
  const languageSelect = document.getElementById('languageSelect');
  languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
    loadAllContent();
  });

  loadAllContent();
  setupNavigation();
  setupProfileTabs();
  setupSearch();
  
  updateWalletDisplay();
}

function loadAllContent() {
  loadSpotlightTalents();
  loadNews();
  loadSportsFilters();
  loadDiscoverGrid();
  loadTalentsList();
  loadClubsList();
  loadMarketplace();
  loadProfile();
}

// Make functions global
window.piSignIn = piSignIn;
window.linkPiWallet = linkPiWallet;
window.openWalletModal = openWalletModal;
window.closeWalletModal = closeWalletModal;
window.closePaymentModal = closePaymentModal;
window.confirmPayment = confirmPayment;
window.buyToken = buyToken;
window.buyNFT = buyNFT;

// Start the application
document.addEventListener('DOMContentLoaded', init);
