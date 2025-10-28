# 🚀 Modern Task Manager

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"/>
</div>

<div align="center">
  <h3>🌟 A Modern Full-Stack Task Management Application 🌟</h3>
  <p>Seamlessly manage your tasks with a beautiful, responsive interface and robust backend</p>
</div>

## ✨ Features

### 🔐 Authentication & Security
- Secure JWT-based authentication
- Protected routes and API endpoints
- Password encryption with bcrypt
- Persistent login with token refresh

### 📱 Modern UI/UX
- Responsive design that works on all devices
- Dark/Light theme support
- Smooth transitions and animations
- Toast notifications for user feedback
- Loading states and error handling

### 📋 Task Management
- Create, read, update, and delete tasks
- Task categorization and priority levels
- Real-time updates with React Query
- Drag and drop task reordering
- Task filtering and search

### 🎯 Key Features
- ⚡ Blazing fast performance
- 🔄 Real-time state management
- 📊 Intuitive task organization
- 🌙 Dark mode support
- 🔍 Advanced search capabilities
- 📱 Fully responsive design

## 🛠️ Technology Stack

### Frontend
```javascript
{
  "main": [
    "React 18",
    "Redux Toolkit",
    "React Query",
    "React Router v6"
  ],
  "styling": [
    "Tailwind CSS",
    "CSS Modules"
  ],
  "quality": [
    "Jest",
    "React Testing Library"
  ]
}
```

### Backend
```javascript
{
  "main": [
    "Node.js",
    "Express.js",
    "MongoDB"
  ],
  "security": [
    "JWT",
    "bcrypt",
    "cors"
  ],
  "quality": [
    "Jest",
    "Supertest"
  ]
}
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd reactapp
   npm install

   # Install backend dependencies
   cd ../nodeapp
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In nodeapp/.env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000

   # In reactapp/.env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd nodeapp
   npm start

   # Start frontend development server
   cd ../reactapp
   npm start
   ```

## 📱 Application Structure

```
📦 task-manager
 ┣ 📂 reactapp           # Frontend application
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components    # React components
 ┃ ┃ ┣ 📂 store        # Redux store configuration
 ┃ ┃ ┣ 📂 hooks        # Custom hooks
 ┃ ┃ ┗ 📂 tests        # Frontend tests
 ┃
 ┗ 📂 nodeapp           # Backend application
   ┣ 📂 controllers     # Route controllers
   ┣ 📂 models         # Database models
   ┣ 📂 routes         # API routes
   ┗ 📂 middleware     # Custom middleware

```

## 🧪 Testing

```bash
# Run frontend tests
cd reactapp
npm test

# Run backend tests
cd nodeapp
npm test
```

## 🎨 UI Components

| Component | Description | Features |
|-----------|-------------|----------|
| 🔐 Login  | User authentication | JWT, Remember me |
| 📝 TaskForm | Task creation/editing | Validation, Auto-save |
| 📋 TaskList | Task management | Filtering, Sorting |
| 🎯 Dashboard | Overview page | Statistics, Charts |

## 📈 Performance Optimizations

- ⚡ Lazy loading of components
- 🔄 Efficient state updates with Redux Toolkit
- 📦 Code splitting and bundling
- 🚀 Optimized API calls with React Query
- 🖼️ Image optimization and lazy loading

## 🛡️ Security Features

- 🔒 JWT Authentication
- 🔐 Password Hashing
- 🚫 XSS Protection
- 🛡️ CORS Configuration
- 🔍 Input Validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by 3lade</p>
  <p>
    <a href="https://github.com/3lade">
      <img src="https://img.shields.io/github/followers/3lade?label=Follow&style=social"/>
    </a>
  </p>
</div>
 
 
 
