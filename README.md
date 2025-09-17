# Neo Verse - College Management System

A comprehensive React-based College Management System for "Trident Academy of Technology" with separate dashboards for Admin, Student, and Faculty.

## 🎯 Features

### 🏠 Homepage
- Modern, responsive design with college branding
- Access portal with three login options (Admin, Student, Faculty)
- Professional layout with navigation and footer

### 🔐 Authentication System
- Separate login pages for Admin, Student, and Faculty
- Secure authentication with context management
- Password visibility toggle
- Form validation and error handling
- "Forgot Password" functionality (placeholder)

### 👨‍💼 Admin Dashboard
- **Overview**: Statistics and quick insights
- **Students**: Complete student management with CRUD operations
- **Faculty**: Faculty member management
- **Departments**: Department administration
- **Courses**: Course management system
- **Attendance**: Attendance tracking (placeholder)
- **Reports**: Analytics and reporting (placeholder)
- **Settings**: System configuration (placeholder)

### 👨‍🎓 Student Dashboard
- **Overview**: Student statistics and information
- **Profile**: Personal information management
- **My Courses**: Enrolled courses view
- **Attendance**: Personal attendance records
- **Results**: Academic performance tracking

### 👨‍🏫 Faculty Dashboard
- **Overview**: Faculty statistics and information
- **Profile**: Personal information management
- **My Courses**: Assigned courses
- **My Students**: Student list management
- **Attendance**: Attendance management for assigned courses
- **Results**: Grade management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FrontEnd-Copy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Default Login Credentials

### Admin Login
- **Username**: `admin`
- **Password**: `admin123`
- **URL**: `/admin-login`

### Student Login
- **Username**: `student`
- **Password**: `student123`
- **URL**: `/student-login`

### Faculty Login
- **Username**: `faculty`
- **Password**: `faculty123`
- **URL**: `/faculty-login`

## 📁 Project Structure

```
src/
├── components/
│   └── auth/           # Authentication components
├── contexts/
│   └── AuthContext.js  # Authentication context
├── pages/
│   ├── HomePage.js     # Landing page
│   ├── AdminLogin.js   # Admin login
│   ├── StudentLogin.js # Student login
│   ├── FacultyLogin.js # Faculty login
│   └── dashboards/
│       ├── AdminDashboard.js
│       ├── StudentDashboard.js
│       └── FacultyDashboard.js
├── App.js              # Main application component
├── App.css             # Global styles
└── index.js            # Application entry point
```

## 🎨 Design System

### Color Scheme
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Success**: Green gradient (#48bb78 to #38a169)
- **Warning**: Orange gradient (#ed8936 to #dd6b20)
- **Error**: Red (#c53030)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Font Weights**: 400 (normal), 600 (semibold), 700 (bold)

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean, modern input fields with focus states
- **Tables**: Responsive data tables with action buttons

## 🔧 Backend Integration

The system is designed to integrate with the Spring Boot backend. The following DTOs are used:

### StudentDto Fields
- `studentName` (String)
- `studentRoll` (Integer)
- `studentReg` (Long)
- `studentEmail` (String)
- `studentMobile` (Long)
- `studentDepartment` (Integer - departmentId)
- `studentSection` (String)
- `studentSemester` (Integer)
- `studentAdd` (String)
- `studentDob` (Date)
- `isActive` (Boolean)
- `isCr` (Boolean)
- `password` (String)

### FacultyDto Fields
- `facultyName` (String)
- `facultyCode` (Integer)
- `facultyEmail` (String)
- `facultyMobile` (Long)
- `facultyAdd` (String)
- `departmentId` (Integer)
- `isActive` (Boolean)
- `password` (String)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🛠️ Technologies Used

- **React 18.2.0**: Frontend framework
- **React Router DOM 6.8.0**: Client-side routing
- **React Icons 4.8.0**: Icon library
- **CSS3**: Styling with modern features
- **JavaScript ES6+**: Modern JavaScript features

## 🔒 Security Features

- Authentication state management
- Protected routes
- Session persistence
- Form validation
- Error handling

## 🚧 Future Enhancements

- [ ] Real-time notifications
- [ ] File upload functionality
- [ ] Advanced reporting and analytics
- [ ] Email integration
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Advanced search and filtering
- [ ] Export functionality (PDF, Excel)
- [ ] Bulk operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support and questions:
- Email: support@tridentacademy.edu
- Phone: +91-1234567890
- Address: 123 Tech Street, Innovation City

---

**Developed for Trident Academy of Technology** 🎓
