# 💰 XpenseMate

XpenseMate is a personal finance management web app that helps users track expenses, set budget goals, manage payments, and analyze their spending.
This project is built for IU's "Project: Java and Web Development (DLBCSPJWD01)" course. It is a simple web application that helps users manage their finances by tracking daily expenses and setting budget goals.

![App Screenshot](./frontend/src/images/Screenshot_29-10-2025_03929_localhost%20-%20Copy.jpeg)

## ✨ Features

- ✅ User authentication
- ✅ Expense tracking with categories and details
- ✅ Budget goal creation and progress tracking
- ✅ Payment management (incoming & outgoing)
- ✅ Financial analytics with charts and graphs
- ✅ Profile and settings management
- ✅ Multi-currency support
- ✅ Upload profile and cover photos
- ✅ Responsive, mobile-friendly UI

## 🧩 Tech Stack

### Front-end
- React.js
- Tailwind CSS
- React Router
- Axios
- Recharts
- i18next
- Lucide React

### Back-end
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- JWT
- Cloudinary
- Nodemailer
- Multer

### Database
- MongoDB (local or Atlas)

### Styling
- Tailwind CSS

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- Node.js v14+
- npm v6+
- Git
- MongoDB (local or cloud instance)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/xpensemate
cd xpensemate
```

### 2. Install dependencies

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

### 3. Configure environment variables

Create `.env` files in both `backend` and `frontend` directories.

#### Backend .env

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
PORT=5001
FRONTEND_URL=http://localhost:3000
```

#### Frontend .env

```env
REACT_APP_BACKEND_URL=http://localhost:5001/api/v1
REACT_APP_FRONTEND_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Start the application

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm start
```

App will be available at 👉 http://localhost:3000

## 🧪 Test Cases

### 1. Authentication

**Test case 1: Login with valid credentials**
- Enter correct email and password
- Expected: User redirected to dashboard

**Test case 2: Invalid credentials**
- Enter wrong email or password
- Expected: Error message displayed

**Test case 3: Signup with valid info**
- Fill registration form with unique email
- Expected: Verification email sent

**Test case 4: Forgot password**
- Submit registered email
- Expected: Password reset email sent

### 2. Expense & Budget Management

**Test case 1: Add a new expense**
- Fill out expense form and submit
- Expected: Expense added and visible in dashboard

**Test case 2: Edit an expense**
- Modify an existing expense
- Expected: Updated successfully in list

**Test case 3: Create a budget goal**
- Add target amount and date
- Expected: Goal created and progress shown

**Test case 4: Track budget progress**
- Add expenses related to the goal
- Expected: Progress updates automatically

**Test case 5: Record Incoming Payment** 
- Action: Add a payment received 
- Expected: Payment recorded, balance updated, payment appears in list

### 3. Profile & Settings

**Test case 1: Update profile information**
- Change user details in settings
- Expected: Data saved successfully

**Test case 2: Upload profile photo**
- Select and upload a new image
- Expected: Cloudinary URL returned, photo displayed

### 4. Analytics

**Test case 1: View analytics dashboard**
- Navigate to analytics tab
- Expected: Spending charts and category breakdowns displayed

**Test case 2: Weekly overview**
- View weekly stats section
- Expected: Weekly spending summary and insights shown