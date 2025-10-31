# XpenseMate

XpenseMate is a comprehensive personal finance management application designed to help users track expenses, set budget goals, manage payments, and gain insights into their financial habits. Built with modern web technologies, it offers a seamless experience across devices with a focus on security, usability, and data visualization.

## Features

### Core Financial Management
- **Expense Tracking**: Record and categorize daily expenses with detailed information
- **Budget Goals**: Set and monitor financial targets with progress tracking
- **Payment Management**: Track incoming and outgoing payments
- **Audit Logging**: Maintain a complete history of financial activities
- **Financial Analytics**: Visualize spending patterns with interactive charts and graphs

### User Management
- **User Authentication**: Secure login and registration system
- **Profile Management**: Customize user profile with personal information
- **Settings Configuration**: Adjust preferences, currency, and notification settings
- **Email Verification**: Secure account verification process

### Support System
- **Support Tickets**: In-app support request system
- **Contact Options**: Multiple channels for customer support

### Additional Features
- **Multi-Currency Support**: Handle transactions in different currencies
- **Data Export**: Export financial data for external use
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **Internationalization**: Multi-language support

## Tech Stack

### Frontend
- **React.js**: Component-based UI library for building interactive user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router**: Declarative routing for navigation between views
- **Axios**: Promise-based HTTP client for API communication
- **Recharts**: Declarative charting library for data visualization
- **React Context API**: State management solution for sharing data across components
- **i18next**: Internationalization framework for multi-language support
- **Lucide React**: Beautiful SVG icons as React components

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Minimalist web framework for RESTful API development
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **Passport.js**: Authentication middleware for secure user management
- **JWT**: JSON Web Tokens for stateless authentication
- **Cloudinary**: Cloud-based image and video management service
- **Nodemailer**: Module for sending emails
- **Multer**: Middleware for handling multipart/form-data

### Development & Build Tools
- Visual Studio Code (IDE)
- Git (version controlling system)
- Github (host project files)
- Browser
- Postman(For Api Testing)

## Installation Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB instance (local or cloud)
- Cloudinary account for image storage
- Email service credentials (e.g., Gmail, SendGrid)

### Environment Variables
Create `.env` files in both `frontend` and `backend` directories with the following variables:

**Backend (.env)**
```env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Server Configuration
PORT=5001
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```env
# API Configuration
REACT_APP_BACKEND_URL=http://localhost:5001/api/v1
REACT_APP_FRONTEND_URL=http://localhost:3000

# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

# Contact Information
REACT_APP_INFO_EMAIL=info@xpensemate.com
REACT_APP_SUPPORT_EMAIL=support@xpensemate.com
REACT_APP_LEGAL_EMAIL=legal@xpensemate.com
REACT_APP_PHONE=+1 5589 55488 55
```

### Automated Installation
Run the provided installation script:
```bash
./install.sh
```

### Manual Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

## Production Build

### Backend
The backend is ready to run in production with no additional build steps required.

### Frontend
To create a production build of the frontend:

```bash
cd frontend
npm run build
```

This will create an optimized build in the `build/` directory.

## Application Starting

### Development Mode

1. **Start Backend Server**
```bash
cd backend
npm run dev
```

2. **Start Frontend Development Server**
```bash
cd frontend
npm start
```

### Production Mode

1. **Start Backend Server**
```bash
cd backend
npm start
```

2. **Serve Frontend Build**
Use a static server to serve the frontend build files:
```bash
cd frontend
npx serve -s build
```

## Test Cases

### Authentication Tests

#### Login Functionality
1. **Valid User Login**
   - Input: Correct email and password
   - Expected: Successful login, redirect to dashboard, JWT tokens stored

2. **Invalid Credentials**
   - Input: Incorrect email or password
   - Expected: Error message displayed, login form remains visible

3. **Empty Fields**
   - Input: Submit form with empty email or password fields
   - Expected: Validation errors for required fields

4. **Google OAuth Login**
   - Action: Click Google login button
   - Expected: Redirect to Google authentication, successful login upon return

#### Signup Functionality
1. **New User Registration**
   - Input: Valid user information with unique email
   - Expected: Account created, verification email sent, redirect to verification page

2. **Duplicate Email Registration**
   - Input: Email already registered
   - Expected: Error message indicating email is already in use

3. **Password Validation**
   - Input: Password not meeting requirements (less than 6 characters, no special character)
   - Expected: Validation error messages displayed

4. **Password Confirmation**
   - Input: Password and confirmation not matching
   - Expected: Error message indicating passwords do not match

#### Password Recovery
1. **Forgot Password Request**
   - Input: Valid registered email
   - Expected: Success message, password reset email sent

2. **Invalid Email Request**
   - Input: Non-registered email
   - Expected: Generic success message (for security) but no email sent

3. **Password Reset**
   - Input: Valid reset token and new password
   - Expected: Password updated, redirect to login page

### Application Usage Tests

#### Expense Management
1. **Add New Expense**
   - Action: Fill expense form with valid data and submit
   - Expected: Expense added to database, appears in expense list, dashboard updated

2. **Edit Existing Expense**
   - Action: Modify details of existing expense
   - Expected: Expense updated in database, changes reflected in UI

3. **Delete Expense**
   - Action: Delete an expense from the list
   - Expected: Expense removed from database, no longer visible in UI

#### Budget Goals
1. **Create Budget Goal**
   - Action: Set a new budget goal with target amount and date
   - Expected: Goal created, progress tracking initialized, appears in goals list

2. **Track Budget Progress**
   - Action: Add expenses related to a budget category
   - Expected: Budget progress updates in real-time, visual indicators change

3. **Achieve Budget Goal**
   - Action: Meet or exceed target amount before deadline
   - Expected: Goal marked as achieved, celebration UI displayed

#### Payment Management
1. **Record Incoming Payment**
   - Action: Add a payment received
   - Expected: Payment recorded, balance updated, payment appears in list

2. **Record Outgoing Payment**
   - Action: Add a payment made
   - Expected: Payment recorded, balance updated, payment appears in list

#### User Profile
1. **Update Profile Information**
   - Action: Modify personal details in settings
   - Expected: Changes saved, profile updated, UI reflects new information

2. **Upload Profile Photo**
   - Action: Select and upload a profile image
   - Expected: Image uploaded to Cloudinary, profile displays new image

3. **Change Password**
   - Action: Update password through settings
   - Expected: Password changed, user logged out, required to login with new password

#### Analytics & Reporting
1. **View Expense Analytics**
   - Action: Navigate to analytics dashboard
   - Expected: Charts and graphs display spending patterns, data updates with new expenses

2. **Weekly Financial Overview**
   - Action: View weekly stats dashboard
   - Expected: Weekly spending summary, highest/lowest spending days, budget comparison

## Project Structure

### Frontend
```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── contexts/           # React context providers
│   ├── services/           # API service layer
│   ├── locales/            # Internationalization files
│   ├── App.js              # Main application component
│   └── index.js            # Entry point
├── .env                    # Environment variables
└── package.json            # Frontend dependencies
```

### Backend
```
backend/
├── src/
│   ├── controllers/        # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API route definitions
│   ├── middleware/        # Custom middleware
│   ├── services/          # Business logic
│   ├── utils/             # Helper functions
│   ├── configs/           # Configuration files
│   └── index.js           # Server entry point
├── .env                   # Environment variables
└── package.json           # Backend dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@xpensemate.com or open an issue in the repository.