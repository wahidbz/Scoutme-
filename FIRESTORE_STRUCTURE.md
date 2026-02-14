# 🔥 ScoutMe - Firestore Collections Structure

## Collections Overview

### 1. users
```javascript
{
  id: "user_xxx",
  name: "Ahmed Ali",
  email: "ahmed@example.com",
  wallet: "ahmedali@pi.network",
  trustScore: 5.0,
  createdAt: Timestamp,
  photoURL: "https://...",
  country: "TN",
  city: "Tunis"
}
```

### 2. players
```javascript
{
  id: "player_xxx",
  name: "Mohamed Ben Ali",
  age: 22,
  sport: "كرة قدم",
  position: "مهاجم",
  country: "TN",
  city: "Tunis",
  team: "team_xxx",
  academy: "academy_xxx",
  description: "...",
  trustScore: 4.5,
  rating: 4.5,
  image: "https://...",
  highlights: "https://youtube.com/...",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 3. teams
```javascript
{
  id: "team_xxx",
  name: "Club Africain",
  sport: "كرة قدم",
  level: "محترف",
  country: "TN",
  city: "Tunis",
  coach: "Mohamed Coach",
  players: ["player_1", "player_2"],
  logo: "https://...",
  coordinates: "36.8065,10.1815",
  trustScore: 5.0,
  createdAt: Timestamp
}
```

### 4. academies
```javascript
{
  id: "academy_xxx",
  name: "Aspire Academy",
  sport: "كرة قدم",
  director: "Director Name",
  country: "TN",
  city: "Tunis",
  address: "123 Street",
  phone: "+216 12345678",
  email: "info@academy.com",
  website: "https://academy.com",
  description: "...",
  coordinates: "36.8065,10.1815",
  trustScore: 5.0,
  createdAt: Timestamp
}
```

### 5. shops
```javascript
{
  id: "shop_xxx",
  name: "Sports Shop",
  category: "معدات رياضية",
  owner: "Shop Owner",
  country: "TN",
  city: "Tunis",
  address: "456 Avenue",
  phone: "+216 87654321",
  email: "shop@example.com",
  products: "كرات، ملابس رياضية",
  coordinates: "36.8065,10.1815",
  trustScore: 5.0,
  createdAt: Timestamp
}
```

### 6. messages (NEW! 💬)
```javascript
{
  id: "msg_xxx",
  userId: "user_xxx",          // المستلم
  fromUser: "user_yyy",         // المرسل
  from: "Ahmed Ali",            // اسم المرسل
  message: "Hello there!",      // محتوى الرسالة
  read: false,                  // هل تمت القراءة؟
  timestamp: Timestamp,
  type: "text"                  // نوع الرسالة
}
```

### 7. notifications
```javascript
{
  id: "notif_xxx",
  userId: "user_xxx",
  title: "New Message",
  message: "You have a new message",
  icon: "🔔",
  read: false,
  timestamp: Timestamp,
  type: "message" | "system" | "alert"
}
```

## Indexes Required

### For messages:
```
Collection: messages
Fields: userId (Ascending), timestamp (Descending)
Query Scope: Collection
```

### For notifications:
```
Collection: notifications
Fields: userId (Ascending), timestamp (Descending)
Query Scope: Collection
```

### For players:
```
Collection: players
Fields: createdAt (Descending)
Query Scope: Collection
```

### For teams:
```
Collection: teams
Fields: createdAt (Descending)
Query Scope: Collection
```

## Creating Indexes

### Method 1: Auto-create (Recommended)
When you run the app and get an error about missing indexes, Firestore will provide a link. Click it to auto-create the index.

### Method 2: Firebase Console
1. Go to Firebase Console
2. Firestore Database > Indexes
3. Click "Add Index"
4. Add the fields as shown above

## Sample Data for Testing

### Create test player:
```javascript
db.collection('players').add({
  name: "Test Player",
  age: 20,
  sport: "كرة قدم",
  position: "مدافع",
  country: "TN",
  city: "Tunis",
  description: "This is a test player",
  trustScore: 5.0,
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
});
```

### Create test message:
```javascript
db.collection('messages').add({
  userId: "current_user_id",
  fromUser: "system",
  from: "System",
  message: "Welcome to ScoutMe!",
  read: false,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
});
```

## Real-time Listeners

### Messages listener (already implemented):
```javascript
db.collection('messages')
  .where('userId', '==', currentUserId)
  .orderBy('timestamp', 'desc')
  .limit(50)
  .onSnapshot(snapshot => {
    // Handle updates
  });
```

### Notifications listener:
```javascript
db.collection('notifications')
  .where('userId', '==', currentUserId)
  .orderBy('timestamp', 'desc')
  .limit(20)
  .onSnapshot(snapshot => {
    // Handle updates
  });
```

---

**Note:** All timestamps use `firebase.firestore.FieldValue.serverTimestamp()`
