import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChalkboardTeacher, FaUsers, FaBook, FaCalendarAlt, 
  FaChartBar, FaSignOutAlt, FaBell, FaPlus, FaEdit,
  FaGraduationCap, FaClock, FaCheckCircle
} from 'react-icons/fa';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Mock data
  const stats = {
    students: 45,
    courses: 3,
    assignments: 8,
    attendance: 92
  };

  const recentActivities = [
    { id: 1, type: 'assignment', title: 'Graded Data Structures Assignment', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'attendance', title: 'Marked attendance for Database Class', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'assignment', title: 'Posted Web Development Project', date: '2024-01-13', status: 'completed' },
    { id: 4, type: 'exam', title: 'Conducted Algorithms Quiz', date: '2024-01-12', status: 'completed' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Database Management Exam', date: '2024-01-20', time: '10:00 AM', type: 'exam' },
    { id: 2, title: 'Project Evaluation Deadline', date: '2024-01-25', time: '11:59 PM', type: 'evaluation' },
    { id: 3, title: 'Faculty Meeting', date: '2024-01-30', time: '2:00 PM', type: 'meeting' }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'courses', label: 'My Courses', icon: FaBook },
    { id: 'students', label: 'Students', icon: FaUsers },
    { id: 'attendance', label: 'Attendance', icon: FaCalendarAlt },
    { id: 'assignments', label: 'Assignments', icon: FaBook },
    { id: 'grades', label: 'Grades', icon: FaGraduationCap },
    { id: 'schedule', label: 'Schedule', icon: FaClock },
    { id: 'notifications', label: 'Notifications', icon: FaBell }
  ];

  const renderOverview = () => (
    <div className="overview-section">
      <h2>Faculty Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon students">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.students}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon courses">
            <FaBook />
          </div>
          <div className="stat-content">
            <h3>{stats.courses}</h3>
            <p>Active Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon assignments">
            <FaBook />
          </div>
          <div className="stat-content">
            <h3>{stats.assignments}</h3>
            <p>Assignments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon attendance">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <h3>{stats.attendance}%</h3>
            <p>Avg Attendance</p>
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
          <p>CS201 - 45 Students</p>
          <div className="course-stats">
            <span>Attendance: 92%</span>
            <span>Assignments: 6</span>
          </div>
          <button className="course-action-btn">
            <FaEdit />
            Manage Course
          </button>
        </div>
        <div className="course-card">
          <h3>Database Management Systems</h3>
          <p>CS202 - 38 Students</p>
          <div className="course-stats">
            <span>Attendance: 88%</span>
            <span>Assignments: 5</span>
          </div>
          <button className="course-action-btn">
            <FaEdit />
            Manage Course
          </button>
        </div>
        <div className="course-card">
          <h3>Web Development</h3>
          <p>CS203 - 42 Students</p>
          <div className="course-stats">
            <span>Attendance: 95%</span>
            <span>Assignments: 4</span>
          </div>
          <button className="course-action-btn">
            <FaEdit />
            Manage Course
          </button>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="students-section">
      <h2>My Students</h2>
      <div className="students-grid">
        <div className="student-card">
          <h3>Data Structures Class</h3>
          <p>45 Students</p>
          <div className="student-stats">
            <span>Present Today: 42</span>
            <span>Assignments Due: 3</span>
          </div>
          <button className="student-action-btn">
            <FaUsers />
            View Students
          </button>
        </div>
        <div className="student-card">
          <h3>Database Class</h3>
          <p>38 Students</p>
          <div className="student-stats">
            <span>Present Today: 35</span>
            <span>Assignments Due: 2</span>
          </div>
          <button className="student-action-btn">
            <FaUsers />
            View Students
          </button>
        </div>
        <div className="student-card">
          <h3>Web Development Class</h3>
          <p>42 Students</p>
          <div className="student-stats">
            <span>Present Today: 40</span>
            <span>Assignments Due: 1</span>
          </div>
          <button className="student-action-btn">
            <FaUsers />
            View Students
          </button>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-section">
      <h2>Attendance Management</h2>
      <div className="attendance-stats">
        <div className="stat-card">
          <h3>Today's Attendance</h3>
          <p>92%</p>
        </div>
        <div className="stat-card">
          <h3>This Week</h3>
          <p>89%</p>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <p>91%</p>
        </div>
      </div>
      <div className="attendance-actions">
        <button className="action-btn">
          <FaPlus />
          Mark Attendance
        </button>
        <button className="action-btn">
          <FaChartBar />
          View Reports
        </button>
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="assignments-section">
      <h2>Assignment Management</h2>
      <div className="assignments-list">
        <div className="assignment-item active">
          <h3>Data Structures Assignment 2</h3>
          <p>Due: 2024-01-20</p>
          <span className="status active">Active</span>
          <button className="assignment-action-btn">
            <FaEdit />
            Manage
          </button>
        </div>
        <div className="assignment-item completed">
          <h3>Database Quiz 1</h3>
          <p>Due: 2024-01-15</p>
          <span className="status completed">Completed</span>
          <button className="assignment-action-btn">
            <FaChartBar />
            View Results
          </button>
        </div>
        <div className="assignment-item pending">
          <h3>Web Development Project</h3>
          <p>Due: 2024-01-25</p>
          <span className="status pending">Pending</span>
          <button className="assignment-action-btn">
            <FaPlus />
            Create
          </button>
        </div>
      </div>
    </div>
  );

  const renderGrades = () => (
    <div className="grades-section">
      <h2>Grade Management</h2>
      <div className="grades-overview">
        <div className="grade-stats">
          <h3>Grade Statistics</h3>
          <div className="grade-breakdown">
            <div className="grade-item">
              <span>A+</span>
              <span>15 students</span>
            </div>
            <div className="grade-item">
              <span>A</span>
              <span>20 students</span>
            </div>
            <div className="grade-item">
              <span>B+</span>
              <span>8 students</span>
            </div>
          </div>
        </div>
        <div className="grade-actions">
          <button className="action-btn">
            <FaPlus />
            Add Grades
          </button>
          <button className="action-btn">
            <FaChartBar />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="schedule-section">
      <h2>Teaching Schedule</h2>
      <div className="schedule-grid">
        <div className="schedule-day">
          <h3>Monday</h3>
          <div className="class-item">
            <span className="time">9:00 AM</span>
            <span className="subject">Data Structures (Room 101)</span>
          </div>
          <div className="class-item">
            <span className="time">11:00 AM</span>
            <span className="subject">Database Management (Lab 2)</span>
          </div>
        </div>
        <div className="schedule-day">
          <h3>Tuesday</h3>
          <div className="class-item">
            <span className="time">10:00 AM</span>
            <span className="subject">Web Development (Room 103)</span>
          </div>
        </div>
        <div className="schedule-day">
          <h3>Wednesday</h3>
          <div className="class-item">
            <span className="time">2:00 PM</span>
            <span className="subject">Office Hours (Room 201)</span>
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
            <h4>New Student Registration</h4>
            <p>John Doe has been added to your Data Structures class</p>
            <span className="time">1 hour ago</span>
          </div>
        </div>
        <div className="notification-item">
          <div className="notification-icon">
            <FaBell />
          </div>
          <div className="notification-content">
            <h4>Assignment Submission</h4>
            <p>5 new assignments submitted for Database Management</p>
            <span className="time">3 hours ago</span>
          </div>
        </div>
        <div className="notification-item">
          <div className="notification-icon">
            <FaBell />
          </div>
          <div className="notification-content">
            <h4>Faculty Meeting Reminder</h4>
            <p>Faculty meeting scheduled for tomorrow at 2:00 PM</p>
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
      case 'students':
        return renderStudents();
      case 'attendance':
        return renderAttendance();
      case 'assignments':
        return renderAssignments();
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
    <div className="faculty-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span>TAT</span>
          </div>
          <h2>Faculty Panel</h2>
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
              <span>Welcome, Faculty Member</span>
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

export default FacultyDashboard;
