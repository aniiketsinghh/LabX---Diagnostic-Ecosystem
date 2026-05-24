# 🏥 Lab Booking Backend — MVP

Healthcare Diagnostic Lab Booking Platform built with Node.js, Express.js, and MongoDB Atlas.

---

## 📁 Project Structure

```
server/
├── config/
│   ├── db.js               # MongoDB Atlas connection
│   └── cloudinary.js       # Cloudinary config
├── controllers/
│   ├── authController.js   # Register, Login, Profile
│   ├── testController.js   # CRUD for lab tests
│   ├── orderController.js  # Booking management
│   └── reportController.js # PDF report upload/fetch
├── middleware/
│   ├── auth.js             # protect + admin middleware
│   ├── errorHandler.js     # Centralized error handling
│   ├── upload.js           # Multer + Cloudinary PDF upload
│   └── validate.js         # express-validator result checker
├── models/
│   ├── User.js
│   ├── Test.js
│   ├── Order.js
│   └── Report.js
├── routes/
│   ├── authRoutes.js
│   ├── testRoutes.js
│   ├── orderRoutes.js
│   └── reportRoutes.js
├── utils/
│   ├── asyncHandler.js     # Async wrapper to avoid try/catch
│   └── response.js         # Consistent API response helpers
├── uploads/                # Local fallback (not used in production)
├── app.js                  # Express app + middleware setup
├── server.js               # Entry point
├── .env.example
└── package.json
```

---

## ⚙️ Setup

### 1. Install dependencies
```bash
cd server
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```

Fill in your `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/lab-booking
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run the server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

---

## 🔐 Auth APIs

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and get token |
| GET | `/api/auth/profile` | Private | Get logged-in user |

### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "phone": "9876543210",
  "address": "123 Main St, Delhi"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

**All protected routes require:**
```
Authorization: Bearer <token>
```

---

## 🧪 Test APIs

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/tests` | Public | Get all tests (filter: `?category=Blood`) |
| GET | `/api/tests/:id` | Public | Get single test |
| POST | `/api/tests` | Admin | Create a test |
| PUT | `/api/tests/:id` | Admin | Update a test |
| DELETE | `/api/tests/:id` | Admin | Delete a test |

### Create Test (Admin)
```json
POST /api/tests
{
  "title": "Complete Blood Count",
  "category": "Blood",
  "description": "Full blood panel analysis",
  "price": 499,
  "fastingRequired": false,
  "reportTime": "24 hours",
  "image": "https://cloudinary.com/..."
}
```

---

## 📦 Order APIs

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/orders` | Private | Create a booking |
| GET | `/api/orders/my` | Private | Get my orders |
| GET | `/api/orders` | Admin | Get all orders |
| PATCH | `/api/orders/:id` | Admin | Update order/payment status |

### Create Order
```json
POST /api/orders
{
  "tests": ["64f1a...", "64f1b..."],
  "bookingDate": "2024-12-25",
  "bookingSlot": "09:00 AM - 10:00 AM",
  "address": "123 Main St, Delhi"
}
```

### Update Order Status (Admin)
```json
PATCH /api/orders/:id
{
  "orderStatus": "Sample Collected",
  "paymentStatus": "Paid"
}
```

**Order Status Flow:**
```
Pending → Sample Collected → Testing → Report Uploaded → Completed
```

---

## 📄 Report APIs

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/reports/upload` | Admin | Upload PDF for a user/order |
| GET | `/api/reports/my` | Private | Get my reports |

### Upload Report (Admin)
```
POST /api/reports/upload
Content-Type: multipart/form-data

Fields:
  - report (file, PDF only, max 10MB)
  - userId (string)
  - orderId (string)
```

- Automatically updates order status to `"Report Uploaded"`.
- PDF is stored on Cloudinary under `/lab-reports/`.

---

## 📋 API Response Format

All responses follow this structure:

```json
{
  "success": true,
  "message": "Order created successfully.",
  "data": { ... }
}
```

Error response:
```json
{
  "success": false,
  "message": "Invalid email or password.",
  "data": {}
}
```

---

## 👥 User Roles

| Role | Capabilities |
|------|-------------|
| `user` | Register, Login, View/Book tests, View own orders & reports |
| `admin` | All user capabilities + Manage tests, View all orders, Upload reports, Update statuses |

---

## 🔒 Security

- Passwords hashed with **bcryptjs** (10 salt rounds)
- JWT tokens expire in **7 days**
- Route-level protection via `protect` and `admin` middleware
- All sensitive config in `.env`
- PDF upload restricted to `application/pdf` MIME type only

---

## 🧩 Expanding This MVP

Ready-to-add features:
- Payment gateway (Razorpay/Stripe)
- Email notifications (Nodemailer)
- Admin dashboard stats endpoint
- Sample collection slot management
- Technician role & assignment
