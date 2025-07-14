# Basava Parishath Bengaluru Website ([Link](https://basava-parishath-bengaluru-website.vercel.app/))

  **Official website for Basava Parishath Bengaluru - Recognizing talent and celebrating achievers in our community**
  
  [![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-brightgreen.svg)](https://mongodb.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---
### DEMO Video

![Demo GIF](./demo.gif)


## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

Basava Parishath Bengaluru is a community organization dedicated to recognizing talent and celebrating achievers. This website serves as a digital platform to:

- Showcase community achievements and success stories
- Provide news and updates about organizational activities
- Offer resources for media skill development
- Connect community members and stakeholders
- Facilitate event management and registrations

---

## ✨ Features

### 🎨 User Experience
- **Responsive Design** - Seamless experience across all devices
- **Modern UI/UX** - Clean, intuitive interface with amber/brown theme
- **Multilingual Support** - Google Translate integration
- **Accessibility** - WCAG compliant design
- **Fast Loading** - Optimized performance

### 📱 Core Functionality
- **Event Management** - Create, view, and manage events
- **Team Showcase** - Display team members and leadership
- **Contact System** - Contact forms and inquiries
- **Donation Portal** - Razorpay integration for donations
- **Registration System** - Member registration with document upload
- **Gallery** - Photo galleries of past events
- **News & Updates** - Blog-style content management

### 🔐 Admin Features
- **Admin Dashboard** - Comprehensive content management
- **User Management** - Admin user creation and authentication
- **Content Moderation** - Approve and manage submissions
- **Analytics** - Track user engagement and donations

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Cloudinary** - Image and file storage
- **Razorpay** - Payment processing

### DevOps & Deployment
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **MongoDB Atlas** - Cloud database
- **Git** - Version control

---

## 📁 Project Structure

```
Basava-Parishath-Website/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Images and media
│   │   └── data/          # Static data
│   ├── package.json
│   └── vite.config.js
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB** database (local or Atlas)
- **Git** version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShamanthHiremath/Basava-Parishath-Bengaluru-Website.git
   cd Basava-Parishath-Website
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

---

## 🔧 Environment Variables

### Frontend (.env files in `/client`)

```env
# Development
REACT_APP_API_URL=http://localhost:5000

# Production
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env file in `/server`)

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/basava-parishath

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary (File Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Razorpay (Payments)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Server
PORT=5000
NODE_ENV=development
```

---

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start the frontend (in another terminal)**
   ```bash
   cd client
   npm run dev
   # Client runs on http://localhost:5173
   ```

3. **Create admin user (optional)**
   ```bash
   cd server
   node createAdmin.js
   ```

### Production Build

```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
NODE_ENV=production npm start
```

---

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard

### Backend (Render)
1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set root directory: `./server`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables

---

## 📚 API Documentation

### Authentication Endpoints
- `POST /users/login` - Admin login
- `POST /users/signup` - Create admin user
- `GET /users/verify-token` - Verify JWT token

### Content Management
- `GET /events` - Get all events
- `POST /events` - Create new event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

### User Interactions
- `POST /contact` - Send contact message
- `POST /api/registrations` - Submit registration
- `POST /create-order` - Create payment order
- `POST /save-donation` - Save donation details

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

### Code Style
- Use ESLint and Prettier for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Basava Parishath Bengaluru**
- 🌐 Website: [https://basava-parishath-bengaluru.vercel.app](https://basava-parishath-bengaluru.vercel.app)


**Developers**
- GitHub: [@ShamanthHiremath](https://github.com/ShamanthHiremath)
- Email: shamstheironman@gmail.com

- GitHub: [@Sanchit Vijay](https://github.com/SanchiitVijay)
- Email: sanchiitvijay@gmail.com


---

## 🙏 Acknowledgments

- **Basava Parishath Community** - For their support and guidance
- **Open Source Contributors** - For the amazing tools and libraries
- **Design Inspiration** - Modern web design principles
- **Testing Team** - For thorough testing and feedback

---

<div align="center">
  <p>Made with ❤️ for the Basava Parishath Community</p>
  <p>© 2025 Basava Parishath Bengaluru. All rights reserved.</p>
</div>
