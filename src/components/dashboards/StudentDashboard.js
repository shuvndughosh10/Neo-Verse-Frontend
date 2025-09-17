import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBook, FaCalendarAlt, FaChartBar, FaUser, 
  FaSignOutAlt, FaBell, FaSearch, FaFilter,
  FaGraduationCap, FaClock, FaCheckCircle
} from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Mock data
  const stats = {
    attendance: 85,
    assignments: 12,
    completed: 8,
    pending: 4,
    gpa: 3.8
  };

  const recentActivities = [
    { id: 1, type: 'assignment', title: 'Data Structures Assignment', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'exam', title: 'Database Management Quiz', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'assignment', title: 'Web Development Project', date: '2024-01-13', status: 'pending' },
    { id: 4, type: 'attendance', title: 'Present in Algorithms Class', date: '2024-01-12', status: 'completed' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Software Engineering Exam', date: '2024-01-20', time: '10:00 AM', type: 'exam' },
    { id: 2, title: 'Project Submission Deadline', date: '2024-01-25', time: '11:59 PM', type: 'assignment' },
    { id: 3, title: 'Career Fair', date: '2024-01-30', time: '2:00 PM', type: 'event' }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'courses', label: 'My Courses', icon: FaBook },
    { id: 'assignments', label: 'Assignments', icon: FaBook },
    { id: 'attendance', label: 'Attendance', icon: FaCalendarAlt },
    { id: 'grades', label: 'Grades', icon: FaGraduationCap },
    { id: 'schedule', label: 'Schedule', icon: FaClock },
    { id: 'notifications', label: 'Notifications', icon: FaBell }
  ];

  const renderOverview = () => (
    <div className="overview-section">
      <h2>Student Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon attendance">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <h3>{stats.attendance}%</h3>
            <p>Attendance</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon assignments">
            <FaBook />
          </div>
          <div className="stat-content">
            <h3>{stats.assignments}</h3>
            <p>Total Assignments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon gpa">
            <FaGraduationCap />
          </div>
          <div className="stat-content">
            <h3>{stats.gpa}</h3>
            <p>Current GPA</p>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <FaBook />
                </div>
                <div className="activity-content">
                  <h4>{activity.title}</h4>
                  <p>{activity.date}</p>
                </div>
                <div className="activity-status">
                  <span className={`status ${activity.status}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          <div className="event-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-date">
                  <span className="date">{event.date}</span>
                  <span className="time">{event.time}</span>
                </div>
                <div className="event-content">
                  <h4>{event.title}</h4>
                  <p className="event-type">{event.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="courses-section">
      <h2>My Courses</h2>
      <div className="courses-grid">
        <div className="course-card">
          <h3>Data Structures & Algorithms</h3>
          <p>CS201</p>
          <div className="course-stats">
            <span>Attendance: 90%</span>
            <span>Assignments: 5/6</span>
          </div>
        </div>
        <div className="course-card">
          <h3>Database Management Systems</h3>
          <p>CS202</p>
          <div className="course-stats">
            <span>Attendance: 85%</span>
            <span>Assignments: 4/5</span>
          </div>
        </div>
        <div className="course-card">
          <h3>Web Development</h3>
          <p>CS203</p>
          <div className="course-stats">
            <span>Attendance: 95%</span>
            <span>Assignments: 6/6</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="assignments-section">
      <h2>Assignments</h2>
      <div className="assignments-list">
        <div className="assignment-item completed">
          <h3>Data Structures Assignment 1</h3>
          <p>Due: 2024-01-15</p>
          <span className="status completed">Completed</span>
        </div>
        <div className="assignment-item pending">
          <h3>Web Development Project</h3>
          <p>Due: 2024-01-25</p>
          <span className="status pending">Pending</span>
        </div>
        <div className="assignment-item completed">
          <h3>Database Quiz</h3>
          <p>Due: 2024-01-14</p>
          <span className="status completed">Completed</span>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-section">
      <h2>Attendance Record</h2>
      <div className="attendance-stats">
        <div className="stat-card">
          <h3>Overall Attendance</h3>
          <p>85%</p>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <p>90%</p>
        </div>
        <div className="stat-card">
          <h3>This Week</h3>
          <p>100%</p>
        </div>
      </div>
    </div>
  );

  const renderGrades = () => (
    <div className="grades-section">
      <h2>Academic Performance</h2>
      <div className="grades-overview">
        <div className="gpa-card">
          <h3>Current GPA</h3>
          <p className="gpa">3.8</p>
        </div>
        <div className="grade-breakdown">
          <h3>Grade Breakdown</h3>
          <div className="grade-item">
            <span>A+</span>
            <span>3 courses</span>
          </div>
          <div className="grade-item">
            <span>A</span>
            <span>2 courses</span>
          </div>
          <div className="grade-item">
            <span>B+</span>
            <span>1 course</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="schedule-section">
      <h2>Class Schedule</h2>
      <div className="schedule-grid">
        <div className="schedule-day">
          <h3>Monday</h3>
          <div className="class-item">
            <span className="time">9:00 AM</span>
            <span className="subject">Data Structures</span>
          </div>
          <div className="class-item">
            <span className="time">11:00 AM</span>
            <span className="subject">Database Management</span>
          </div>
        </div>
        <div className="schedule-day">
          <h3>Tuesday</h3>
          <div className="class-item">
            <span className="time">10:00 AM</span>
            <span className="subject">Web Development</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-section">
      <h2>Notifications</h2>
      <div className="notifications-list">
        <div className="notification-item">
          <div className="notification-icon">
            <FaBell />
          </div>
          <div className="notification-content">
            <h4>New Assignment Posted</h4>
            <p>Data Structures Assignment 2 has been posted</p>
            <span className="time">2 hours ago</span>
          </div>
        </div>
        <div className="notification-item">
          <div className="notification-icon">
            <FaBell />
          </div>
          <div className="notification-content">
            <h4>Exam Schedule Updated</h4>
            <p>Database Management exam rescheduled to next week</p>
            <span className="time">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'courses':
        return renderCourses();
      case 'assignments':
        return renderAssignments();
      case 'attendance':
        return renderAttendance();
      case 'grades':
        return renderGrades();
      case 'schedule':
        return renderSchedule();
      case 'notifications':
        return renderNotifications();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span>TAT</span>
          </div>
          <h2>Student Panel</h2>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>{navigationItems.find(item => item.id === activeSection)?.label}</h1>
            <div className="user-info">
              <span>Welcome, Student</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
