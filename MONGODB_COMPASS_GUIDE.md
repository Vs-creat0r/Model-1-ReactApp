# MongoDB Compass - View Your Data

## 📊 What is MongoDB Compass?

MongoDB Compass is a free GUI tool from MongoDB that allows you to visually explore and interact with your MongoDB database. It's much easier than using the command line!

---

## 📥 Installation

### Step 1: Download
Go to: https://www.mongodb.com/products/tools/compass

Choose your operating system:
- **Windows**: Download .exe installer
- **Mac**: Download .dmg installer  
- **Linux**: Download .deb or .rpm

### Step 2: Install
Run the installer and follow the setup wizard.

### Step 3: Launch
Open MongoDB Compass from your applications.

---

## 🔗 Connect to Your Database

### Connection Settings

1. **Open Compass**
2. Click **"New Connection"** or **"Create New"**
3. Enter connection details:

```
Connection String: mongodb://localhost:27017
```

**Or manually enter:**
- Host: `localhost`
- Port: `27017`
- Database: Leave empty (browse all databases)

### Visual Setup
```
┌─────────────────────────────────────────┐
│  MongoDB Compass - New Connection       │
├─────────────────────────────────────────┤
│                                         │
│  Connection String:                     │
│  [mongodb://localhost:27017]            │
│                                         │
│  [Save & Connect]  [Cancel]             │
└─────────────────────────────────────────┘
```

---

## 🗂️ Navigate to Your Data

### After Connecting:

1. **Left Sidebar** → See all databases
2. Look for: **`react-app-db`** database
3. Click to expand it
4. Look for: **`users`** collection
5. Click to view all user records

### Full Path:
```
Compass
└── Databases
    └── react-app-db
        └── Collections
            └── users
                └── User Documents (your data!)
```

---

## 👁️ View User Data

### Documents View

When you click on the `users` collection, you'll see:

```json
{
  "_id": ObjectId("6a1e87f3b0b8a19550cabbed"),
  "name": "Test User",
  "email": "test_1780385779@example.com",
  "password": "$2a$10$hashed_password_here...",
  "createdAt": 2026-06-02T07:36:19.000Z,
  "updatedAt": 2026-06-02T07:36:19.000Z,
  "__v": 0
}
```

### What You'll See:

| Field | Example | Note |
|-------|---------|------|
| `_id` | ObjectId(...) | Auto-generated ID |
| `name` | "John Doe" | User's name |
| `email` | "john@example.com" | User's email |
| `password` | "$2a$10$..." | Hashed password |
| `createdAt` | 2026-06-02... | Account creation time |
| `updatedAt` | 2026-06-02... | Last update time |

---

## 🔍 Features in Compass

### 1. View Documents
- **List View**: See all records in a list format
- **JSON View**: See raw JSON data
- **Table View**: Tabular display

To change view:
1. Click the view button (top right of collection)
2. Choose your preferred format

### 2. Filter Data
```
Filter: {"email": "john@example.com"}
```

1. Click **"Filter"** button
2. Enter filter query
3. Press Enter
4. Only matching documents shown

### 3. Search Users
Click **"Search"** and type:
- Email address
- Name
- Any field value

### 4. Create New Document
1. Click **"Insert Document"**
2. Add fields manually (for testing)
3. MongoDB auto-generates `_id`

### 5. Edit User Data
1. Click on a document
2. Click **Edit** (pencil icon)
3. Modify fields
4. Click **Update**

### 6. Delete User
1. Click on a document
2. Click **Delete** (trash icon)
3. Confirm deletion

---

## 📈 View Statistics

### Collection Stats
When viewing a collection, Compass shows:
- **Document Count**: Total users
- **Average Document Size**: Data size
- **Total Data Size**: Storage used
- **Indexes**: Database indexes

### Example Stats:
```
Collection: users
├── Documents: 3
├── Avg Size: 450 bytes
├── Total Size: 1.35 KB
└── Indexes: 2
    ├── _id (primary)
    └── email (unique)
```

---

## 🎨 Compass Views Explained

### List View (Recommended for Beginners)
Shows all documents in an easy-to-read list format.

```
Document 1: {_id: ..., name: "John", email: "john@..."}
Document 2: {_id: ..., name: "Jane", email: "jane@..."}
Document 3: {_id: ..., name: "Bob", email: "bob@..."}
```

### Table View
Shows data in rows and columns (like Excel).

```
| _id  | name | email | password |
|------|------|-------|----------|
| ... | John | john@...| $2a... |
| ... | Jane | jane@... | $2a... |
```

### JSON View
Shows raw MongoDB JSON format.

```javascript
[
  {
    "_id": ObjectId("..."),
    "name": "John",
    "email": "john@..."
  },
  ...
]
```

---

## 🔧 Useful Compass Features

### Aggregation Pipeline
Create complex queries:

```javascript
[
  {$match: {"email": {$regex: "gmail"}}},
  {$count: "gmailUsers"}
]
```

### Schema Tab
See the structure of your data:
- Field names
- Data types
- Sample values
- Field frequencies

### Query History
Compass remembers your recent searches and filters.

### Performance Tab
Monitor query performance and resource usage.

---

## 📝 Example Workflows

### Workflow 1: View All Users
1. Connect to MongoDB
2. Select `react-app-db` database
3. Click `users` collection
4. View all documents
5. See user details in list

### Workflow 2: Find Specific User
1. Click **Filter** button
2. Enter: `{"email": "john@example.com"}`
3. Press Enter
4. See matching user
5. Click to view details

### Workflow 3: Check Data After SignUp
1. Open Compass
2. Navigate to users collection
3. Click **Refresh** (F5)
4. New user document appears
5. See new document in list

### Workflow 4: Verify Password Hashing
1. View a user document
2. Check `password` field
3. Should start with `$2a$10$`
4. Verify it's NOT plain text
5. Good security! ✅

---

## 🐛 Troubleshooting

### Can't Connect
**Problem**: "Connection refused"

**Solution:**
1. Check MongoDB is running: `docker ps | grep mongodb`
2. Verify port 27017 is open
3. Restart MongoDB: `docker start mongodb`

### No Databases Showing
**Problem**: Empty database list

**Solution:**
1. Create some data first (SignUp in the app)
2. Database appears after first write
3. Refresh Compass (F5)

### Can't See Users Collection
**Problem**: No "users" collection visible

**Solution:**
1. You need to create users first
2. Go to app and SignUp
3. Refresh Compass
4. Collection appears automatically

### Data Not Updating
**Problem**: New signups don't appear

**Solution:**
1. Click **Refresh** button (F5)
2. Or click collection name again
3. Compass caches data

---

## 💡 Pro Tips

### 1. Export Data
```
Right-click collection → Export → Choose format (JSON/CSV)
```

### 2. Bulk Operations
Select multiple documents and:
- Delete multiple
- Export selected
- Run updates on multiple

### 3. Keyboard Shortcuts
- `F5`: Refresh
- `Ctrl+L`: Clear filter
- `Ctrl+K`: Command palette

### 4. Performance
- Use filters for large collections
- Don't load all documents if you have thousands
- Use pagination

### 5. Backup Data
```
Export data regularly:
Right-click collection → Export
Save to JSON or CSV
```

---

## 🔐 Security Note

⚠️ **Important**: In MongoDB Compass you can see:
- ✅ Passwords ARE hashed (`$2a$10$...`)
- ✅ NOT plain text
- ✅ Secure and protected

DO NOT:
- ❌ Share database connection details
- ❌ Export data in production
- ❌ Share MongoDB credentials

---

## 📚 Next Steps

1. **Install MongoDB Compass**
2. **Connect to localhost:27017**
3. **View your user data**
4. **Create test accounts**
5. **Monitor data growth**

---

## 🆘 Need Help?

### Common Questions

**Q: Where do I download Compass?**
A: https://www.mongodb.com/products/tools/compass

**Q: Is Compass free?**
A: Yes! Community version is free.

**Q: Can I edit data in Compass?**
A: Yes! You can create, read, update, and delete documents.

**Q: What's the password hash format?**
A: bcryptjs format: `$2a$10$...` (can't be reversed, that's good!)

**Q: How do I see password as plain text?**
A: You can't (on purpose!). Passwords are one-way hashed.

---

## 📊 Your Data Structure

```
Database: react-app-db
│
└── Collections:
    │
    └── users
        │
        └── Documents:
            ├── User 1 (from SignUp)
            ├── User 2 (from SignUp)
            ├── User 3 (from SignUp)
            └── ...
```

---

## ✅ Verification Checklist

After connecting in Compass:

- [ ] Can see `react-app-db` database
- [ ] Can see `users` collection
- [ ] Can see user documents
- [ ] Can see hashed passwords
- [ ] Can see email addresses
- [ ] Can see creation timestamps
- [ ] Data updates when you SignUp

---

**You're all set to explore your MongoDB data with MongoDB Compass! 🎉**

Now go SignUp in your React app and watch the data appear in Compass in real-time!
