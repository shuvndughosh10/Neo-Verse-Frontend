import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Outlet } from 'react-router-dom';
import { FaGraduationCap, FaLaptop, FaSun, FaUser, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaWeibo, FaWpbeginner, FaGlobe } from 'react-icons/fa';
import './App.css';

// Pages
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import FacultyLogin from './pages/FacultyLogin';
import AdmissionLogin from './pages/AdmissionLogin';
import FeeLogin from './pages/FeeLogin';
import LibraryLogin from './pages/LibraryLogin';

// Dashboards
import AdminDashboard from './components/dashboards/AdminDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import FacultyDashboard from './components/dashboards/FacultyDashboard';

// Site Pages
import About from './components/About';
import Contact from './components/Contact';
import Programs from './components/Programs';
import Developer from './components/Developer';

// Layout with persistent header/footer
const SiteLayout = () => {
  return (
    <div className="homepage">
      <Header />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Header
const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <span>TAT</span>
          </div>
          <div className="college-info">
            <h1>Trident Academy of Technology</h1>
            <p>Excellence in Education, Innovation in Technology</p>
          </div>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/developer">Developer</Link>
        </nav>
      </div>
    </div>
  </header>
);

// Footer
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Info</h3>
          <div className="contact-item">
              F-2, Chandakaa Industrial Estate,<br />
              Infocity, Chandrasekharpur,<br />
              Bhubaneswar, Odisha - 751024
          </div>
          <div>
            <div>Phone: 0674-3530517, 9861191195<br />
              Email: info@trident.ac.in
            </div>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/admission-login">Admissions</a>
          <a href="/fee-login">Fees</a>
          <a href="/library-login">Library</a>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/tat.trident" target="_blank"><FaFacebook /></a>
            <a href="https://tat.ac.in/" target="_blank"><FaGlobe /></a>
            <a href="https://www.linkedin.com/school/trident-academy-of-technology-tat-bhubaneswar/" target="_blank"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="copyright-footer">
        <p>&copy; 2025 Trident Academy of Technology || Project - Neo Verse || Developed by Shuvendu Ghosh</p>
      </div>
    </div>
  </footer>
);

// Home content (main area only)
const HomeMain = () => {
  const navigate = useNavigate();

  const handleLoginClick = (type) => {
    switch (type) {
      case 'admin':
        navigate('/admin-login');
        break;
      case 'student':
        navigate('/student-login');
        break;
      case 'faculty':
        navigate('/faculty-login');
        break;
      default:
        break;
    }
  };

  return (
          <div className="content-grid">
            {/* Left Section - Welcome Message */}
            <div className="welcome-section">
              <div className="card welcome-card">
                <h2>Welcome to Trident Academy of Technology</h2>
                <p>
                  Empowering students with cutting-edge technology education and fostering
                  innovation for a brighter future. Join us in shaping the next generation
                  of tech leaders through comprehensive learning experiences and advanced technological resources.
                </p>

                <div className="features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaGraduationCap />
                    </div>
                    <span>World-class Education</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaLaptop />
                    </div>
                    <span>Modern Technology</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaSun />
                    </div>
                    <span>Expert Faculty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Access Portal */}
            <div className="portal-section">
              <div className="card portal-card">
                <h2>Access Portal</h2>
                <p>Choose your login type</p>

                <div className="login-options">
                  <button
                    className="login-btn admin-btn"
                    onClick={() => handleLoginClick('admin')}
                  >
                    <FaUser />
                    <span>Admin Login</span>
                  </button>

                  <button
                    className="login-btn student-btn"
                    onClick={() => handleLoginClick('student')}
                  >
                    <FaUser />
                    <span>Student Login</span>
                  </button>

                  <button
                    className="login-btn faculty-btn"
                    onClick={() => handleLoginClick('faculty')}
                  >
                    <FaUser />
                    <span>Faculty Login</span>
                  </button>
                </div>

                
              </div>
            </div>
          </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomeMain />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/developer" element={<Developer />} />
          </Route>

          {/* Auth flows outside or could be inside; leaving separate */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/admission-login" element={<AdmissionLogin />} />
          <Route path="/fee-login" element={<FeeLogin />} />
          <Route path="/library-login" element={<LibraryLogin />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
