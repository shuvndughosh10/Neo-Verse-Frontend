import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaChalkboardTeacher, FaBuilding, FaBook, 
  FaClipboardCheck, FaChartBar, FaCog, FaSignOutAlt,
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter,
  FaBell, FaUserCircle, FaChevronDown, FaDownload,
  FaCalendarAlt, FaGraduationCap, FaAward, FaClock
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:9090/api/neo/verse';
  const [activeSection, setActiveSection] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [adminName, setAdminName] = useState('Administrator');
  const [studentPage, setStudentPage] = useState(0);
  const [studentTotalPages, setStudentTotalPages] = useState(0);
  const [facultyPage, setFacultyPage] = useState(0);
  const [facultyTotalPages, setFacultyTotalPages] = useState(0);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [selectedFacultyIds, setSelectedFacultyIds] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailContext, setEmailContext] = useState({ target: 'students' });
  const [emailForm, setEmailForm] = useState({ scope: 'all', subject: '', body: '' });
  const [toast, setToast] = useState({ type: '', message: '' });
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentModalType, setStudentModalType] = useState('add'); // 'add', 'view', 'edit'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    studentName: '',
    studentEmail: '',
    studentPassword: '',
    studentReg: '',
    studentMobile: '',
    studentAdd: '',
    studentDob: '',
    studentGender: '',
    studentSection: '',
    studentSemester: 1,
    studentDepartment: 1,
    studentRoll: '',
    isActive: true,
    isCr: false
  });
  const [departments, setDepartments] = useState([]);

  // Department mapping based on the image data
  const departmentMap = {
    1: 'CSE',
    2: 'CST', 
    3: 'CSIT',
    4: 'CSAIML',
    5: 'CSDS',
    6: 'Core'
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddClick = (type) => {
    if (type === 'student') {
      setStudentModalType('add');
      setStudentForm({
        studentName: '',
        studentEmail: '',
        studentPassword: '',
        studentReg: '',
        studentMobile: '',
        studentAdd: '',
        studentDob: '',
        studentGender: '',
        studentSection: '',
        studentSemester: 1,
        studentDepartment: 1,
        studentRoll: '',
        isActive: true,
        isCr: false
      });
      setShowStudentModal(true);
    } else {
      setModalType(type);
      setShowAddModal(true);
    }
  };

  const handleStudentAction = (action, student = null) => {
    if (action === 'view') {
      setStudentModalType('view');
      setSelectedStudent(student);
      setShowStudentModal(true);
    } else if (action === 'edit') {
      setStudentModalType('edit');
      setSelectedStudent(student);
      setStudentForm({
        studentName: student.name || '',
        studentEmail: student.email || '',
        studentPassword: '',
        studentReg: student.regNo || '',
        studentMobile: student.phone || '',
        studentAdd: student.address || '',
        studentDob: student.dob || '',
        studentGender: student.gender || '',
        studentSection: student.section || '',
        studentSemester: student.semester || 1,
        studentDepartment: student.departmentId || 1,
        studentRoll: student.rollNo || '',
        isActive: student.isActive ?? true,
        isCr: student.isCr ?? false
      });
      setShowStudentModal(true);
    } else if (action === 'delete') {
      handleDeleteStudent(student.id);
    }
  };

  const closeStudentModal = () => {
    setShowStudentModal(false);
    setStudentModalType('add');
    setSelectedStudent(null);
  };

  const openEmailModal = (target) => {
    setEmailContext({ target });
    setEmailForm({ scope: 'all', subject: '', body: '' });
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setModalType('');
  };

  const navigationItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: FaChartBar, 
      description: 'Dashboard analytics and key metrics',
      color: '#667eea'
    },
    { 
      id: 'students', 
      label: 'Students', 
      icon: FaUsers, 
      description: 'Manage student records and enrollment',
      color: '#48bb78'
    },
    { 
      id: 'faculty', 
      label: 'Faculty', 
      icon: FaChalkboardTeacher, 
      description: 'Faculty profiles and assignments',
      color: '#ed8936'
    },
    { 
      id: 'departments', 
      label: 'Departments', 
      icon: FaBuilding, 
      description: 'Department structure and management',
      color: '#9f7aea'
    },
    { 
      id: 'courses', 
      label: 'Courses', 
      icon: FaBook, 
      description: 'Course catalog and curriculum',
      color: '#f56565'
    },
    { 
      id: 'attendance', 
      label: 'Attendance', 
      icon: FaClipboardCheck, 
      description: 'Attendance tracking and reports',
      color: '#38b2ac'
    },
    { 
      id: 'notices', 
      label: 'Notices', 
      icon: FaBell, 
      description: 'Manage notices and announcements',
      color: '#f6ad55'
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FaChartBar, 
      description: 'Analytics and insights',
      color: '#4299e1'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: FaCog, 
      description: 'System configuration',
      color: '#718096'
    }
  ];

  const activeMeta = useMemo(() => navigationItems.find(n => n.id === activeSection) || navigationItems[0], [activeSection]);

  // Fetch admin name on component mount
  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const adminCode = localStorage.getItem('adminCode');
        if (adminCode) {
          const response = await fetch(`${API_BASE_URL}/admin/getAdminName`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              adminCode: parseInt(adminCode)
            })
          });

          const data = await response.json();
          if (data.status === 1 && data.data && data.data.adminName) {
            setAdminName(data.data.adminName);
          }
        }
      } catch (error) {
        console.error('Error fetching admin name:', error);
        // Keep default name if API fails
      }
    };

    fetchAdminName();
  }, []);

  // Initialize empty data
  useEffect(() => {
    setLoading(false);
  }, []);

  // Fetch students list
  const fetchStudents = useCallback(async (page = 0) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/listingStudent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, size: 10 })
      });
      const data = await response.json();
      if (data.status === 1 && data.data) {
        const items = Array.isArray(data.data.students) ? data.data.students : [];
        setStudents(items.map((s, idx) => ({
          id: s.id ?? s.studentId ?? s.studentRoll ?? idx + 1,
          name: s.studentName ?? s.name ?? 'Unknown',
          email: s.studentEmail ?? s.email ?? 'N/A',
          department: departmentMap[s.studentDepartment] ?? departmentMap[s.departmentId] ?? s.department ?? s.departmentName ?? 'N/A',
          departmentId: s.studentDepartment ?? s.departmentId ?? 1,
          semester: s.studentSemester ?? s.semester ?? s.year ?? 1,
          regNo: s.studentReg ?? s.regNo ?? s.studentRegNo ?? 'N/A',
          section: s.studentSection ?? s.section ?? 'N/A',
          phone: s.studentMobile ?? s.phone ?? s.studentPhone ?? 'N/A',
          address: s.studentAdd ?? s.address ?? s.studentAddress ?? 'N/A',
          dob: s.studentDob ?? s.dob ?? 'N/A',
          rollNo: s.studentRoll ?? s.rollNo ?? s.id ?? idx + 1,
          isActive: s.isActive ?? true,
          isCr: s.isCr ?? false,
          status: (s.isActive === false || s.status === 'INACTIVE') ? 'inactive' : 'active'
        })));
        setStudentTotalPages(data.data.totalPages ?? 0);
        setStudentPage(data.data.currentPage ?? page);
        setSelectedStudentIds([]);
      }
    } catch (e) {
      console.error('Failed to fetch students', e);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Fetch faculty list
  const fetchFaculty = useCallback(async (page = 0) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/listingFaculty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, size: 10 })
      });
      const data = await response.json();
      if (data.status === 1 && data.data) {
        const items = Array.isArray(data.data.faculty) ? data.data.faculty : [];
        setFaculty(items.map((f, idx) => ({
          id: f.id ?? f.facultyId ?? idx + 1,
          name: f.name ?? f.facultyName ?? 'Unknown',
          email: f.email ?? f.facultyEmail ?? 'N/A',
          department: f.department ?? f.departmentName ?? 'N/A',
          position: f.position ?? f.designation ?? 'N/A',
          experience: f.experience ?? f.yearsOfExperience ?? '—',
          status: (f.active === false || f.status === 'INACTIVE') ? 'inactive' : 'active'
        })));
        setFacultyTotalPages(data.data.totalPages ?? 0);
        setFacultyPage(data.data.currentPage ?? page);
        setSelectedFacultyIds([]);
      }
    } catch (e) {
      console.error('Failed to fetch faculty', e);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Fetch departments
  const fetchDepartments = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/department/getAllDepartments`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.status === 1 && data.data) {
        setDepartments(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch departments', e);
    }
  }, [API_BASE_URL]);

  // Add student
  const handleAddStudent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/student/addStudent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentForm)
      });
      const data = await response.json();
      if (data.status === 1) {
        setToast({ type: 'success', message: 'Student added successfully' });
        closeStudentModal();
        fetchStudents(studentPage);
      } else {
        setToast({ type: 'error', message: data.message || 'Failed to add student' });
      }
    } catch (e) {
      console.error('Failed to add student', e);
      setToast({ type: 'error', message: 'Failed to add student' });
    } finally {
      setLoading(false);
    }
  };

  // Update student
  const handleUpdateStudent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/student/updateStudent`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...studentForm, studentId: selectedStudent.id })
      });
      const data = await response.json();
      if (data.status === 1) {
        setToast({ type: 'success', message: 'Student updated successfully' });
        closeStudentModal();
        fetchStudents(studentPage);
      } else {
        setToast({ type: 'error', message: data.message || 'Failed to update student' });
      }
    } catch (e) {
      console.error('Failed to update student', e);
      setToast({ type: 'error', message: 'Failed to update student' });
    } finally {
      setLoading(false);
    }
  };

  // Delete student (soft delete)
  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/student/softDeleteStudent`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId })
      });
      const data = await response.json();
      if (data.status === 1) {
        setToast({ type: 'success', message: 'Student deleted successfully' });
        fetchStudents(studentPage);
      } else {
        setToast({ type: 'error', message: data.message || 'Failed to delete student' });
      }
    } catch (e) {
      console.error('Failed to delete student', e);
      setToast({ type: 'error', message: 'Failed to delete student' });
    } finally {
      setLoading(false);
    }
  };

  // Load listings when switching sections
  useEffect(() => {
    if (activeSection === 'students') {
      fetchStudents(studentPage);
      fetchDepartments();
    } else if (activeSection === 'faculty') {
      fetchFaculty(facultyPage);
    }
  }, [activeSection, studentPage, facultyPage, fetchStudents, fetchFaculty, fetchDepartments]);

  const filteredStudents = useMemo(() => {
    if (!query) return students;
    const q = query.toLowerCase();
    return students.filter(s => (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q) ||
      String(s.id).includes(q)
    ));
  }, [students, query]);

  const filteredFaculty = useMemo(() => {
    if (!query) return faculty;
    const q = query.toLowerCase();
    return faculty.filter(f => (
      f.name.toLowerCase().includes(q) ||
      f.email.toLowerCase().includes(q) ||
      f.department.toLowerCase().includes(q) ||
      f.position.toLowerCase().includes(q)
    ));
  }, [faculty, query]);

  const PageHeader = () => (
    <div className="page-header">
      <div className="page-header-left">
        <div className="page-title">
          <div className="title-icon" style={{ backgroundColor: activeMeta.color }}>
            <activeMeta.icon />
          </div>
          <div className="title-content">
            <h1>{activeMeta.label}</h1>
            <p>{activeMeta.description}</p>
          </div>
        </div>
        {activeSection === 'overview' && (
          <div className="quick-actions">
            <button className="quick-btn" onClick={() => handleAddClick('student')}><FaUsers /> Add Student</button>
            <button className="quick-btn" onClick={() => handleAddClick('faculty')}><FaChalkboardTeacher /> Add Faculty</button>
            <button className="quick-btn" onClick={() => handleAddClick('department')}><FaBuilding /> Add Department</button>
            <button className="quick-btn" onClick={() => handleAddClick('course')}><FaBook /> Add Course</button>
            <button className="quick-btn" onClick={() => openEmailModal('students')}><FaUsers /> Send Mail - Students</button>
            <button className="quick-btn" onClick={() => openEmailModal('faculty')}><FaChalkboardTeacher /> Send Mail - Faculty</button>
            <button className="quick-btn" onClick={() => handleAddClick('notice')}><FaBell /> Send Notice</button>
          </div>
        )}
      </div>
      <div className="page-header-right">
        <div className="header-actions">
          {activeSection !== 'overview' && (activeSection === 'students' || activeSection === 'faculty' || activeSection === 'departments' || activeSection === 'courses' || activeSection === 'notices') && (
            <button className="primary-btn" onClick={() => handleAddClick(activeSection.slice(0, -1))}>
              <FaPlus />
              Add {activeMeta.label.slice(0, -1)}
            </button>
          )}
          {(activeSection === 'students' || activeSection === 'faculty') && (
            <button className="secondary-btn" onClick={() => openEmailModal(activeSection)}>
              <FaDownload />
              Send Email
            </button>
          )}
          {activeSection === 'reports' && (
            <button className="secondary-btn">
              <FaDownload />
              Export
            </button>
          )}
        </div>
      </div>
    </div>
  );


  const EmptyState = ({ title, subtitle, icon: Icon }) => (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );

  const LoadingState = () => (
    <div className="loading-state">
      <div className="spinner" />
      <p>Loading {activeMeta.label.toLowerCase()}...</p>
    </div>
  );

  const SearchBar = ({ placeholder }) => (
    <div className="search-bar">
      <FaSearch />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      {query && (
        <button className="clear-search" onClick={() => setQuery('')}>
          ×
        </button>
      )}
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon" style={{ backgroundColor: color }}>
          <Icon />
        </div>
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="overview-section">
      <div className="stats-grid">
        <StatCard 
          title="Total Students" 
          value={students.length} 
          icon={FaUsers} 
          color="#48bb78" 
          // subtitle="Active enrollments"
        />
        <StatCard 
          title="Faculty Members" 
          value={faculty.length} 
          icon={FaChalkboardTeacher} 
          color="#ed8936" 
          // subtitle="Teaching staff"
        />
        <StatCard 
          title="Departments" 
          value={departments.length} 
          icon={FaBuilding} 
          color="#9f7aea" 
          // subtitle="Academic units"
        />
        <StatCard 
          title="Active Courses" 
          value={courses.length} 
          icon={FaBook} 
          color="#f56565" 
          // subtitle="This semester"
        />
      </div>

      <div className="overview-content">
        <div className="overview-left">
          <div className="content-card">
            <div className="card-header">
              <h3>Recent Activities</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="activity-list">
              <EmptyState title="No recent activities" subtitle="Activities will appear here as they occur" icon={FaClock} />
            </div>
          </div>
        </div>

        <div className="overview-right">
          <div className="content-card">
            <div className="card-header">
              <h3>Notifications</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="notification-list">
              <EmptyState title="No notifications" subtitle="Notifications will appear here" icon={FaBell} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="section">
      <div className="section-toolbar">
        <SearchBar placeholder="Search students by name, email, department or ID" />
        <div className="toolbar-actions">
          <button className="filter-btn">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th><input type="checkbox" aria-label="Select all" checked={selectedStudentIds.length>0 && selectedStudentIds.length===filteredStudents.length && filteredStudents.length>0} onChange={(e)=>{
                if(e.target.checked){ setSelectedStudentIds(filteredStudents.map(s=>s.id)); } else { setSelectedStudentIds([]); }
              }}/></th>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Section</th>
              <th>Reg No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9"><LoadingState /></td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="9"><EmptyState title="No students found" subtitle="Try adjusting your search criteria" icon={FaUsers} /></td></tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <input type="checkbox" checked={selectedStudentIds.includes(student.id)} onChange={(e)=>{
                      if(e.target.checked){ setSelectedStudentIds(prev=>[...new Set([...prev, student.id])]); } else { setSelectedStudentIds(prev=>prev.filter(id=>id!==student.id)); }
                    }} />
                  </td>
                  <td>
                    <span className="roll-badge">{student.rollNo}</span>
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{student.name}</span>
                    </div>
                  </td>
                  <td>{student.email}</td>
                  <td>
                    <span className="mobile-badge">{student.phone}</span>
                  </td>
                  <td>
                    <span className="department-badge">{student.department}</span>
                  </td>
                  <td>
                    <span className="section-badge">{student.section}</span>
                  </td>
                  <td>
                    <span className="reg-badge">{student.regNo}</span>
                  </td>
                  <td className="actions">
                    <button className="action-btn view" title="View Details" onClick={() => handleStudentAction('view', student)}>
                      <FaEye />
                    </button>
                    <button className="action-btn edit" title="Edit Student" onClick={() => handleStudentAction('edit', student)}>
                      <FaEdit />
                    </button>
                    <button className="action-btn delete" title="Delete Student" onClick={() => handleStudentAction('delete', student)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={studentPage<=0} onClick={()=>{ const p = Math.max(0, studentPage-1); setStudentPage(p); fetchStudents(p); }}>Prev</button>
        <span>Page {studentPage+1} of {Math.max(1, studentTotalPages)}</span>
        <button disabled={studentPage+1>=studentTotalPages} onClick={()=>{ const p = Math.min(studentTotalPages-1, studentPage+1); setStudentPage(p); fetchStudents(p); }}>Next</button>
      </div>
    </div>
  );

  const renderFaculty = () => (
    <div className="section">
      <div className="section-toolbar">
        <SearchBar placeholder="Search faculty by name, email, department or position" />
        <div className="toolbar-actions">
          <button className="filter-btn">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th><input type="checkbox" aria-label="Select all" checked={selectedFacultyIds.length>0 && selectedFacultyIds.length===filteredFaculty.length && filteredFaculty.length>0} onChange={(e)=>{
                if(e.target.checked){ setSelectedFacultyIds(filteredFaculty.map(f=>f.id)); } else { setSelectedFacultyIds([]); }
              }}/></th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8"><LoadingState /></td></tr>
            ) : filteredFaculty.length === 0 ? (
              <tr><td colSpan="8"><EmptyState title="No faculty found" subtitle="Try adjusting your search criteria" icon={FaChalkboardTeacher} /></td></tr>
            ) : (
              filteredFaculty.map((member) => (
                <tr key={member.id}>
                  <td>
                    <input type="checkbox" checked={selectedFacultyIds.includes(member.id)} onChange={(e)=>{
                      if(e.target.checked){ setSelectedFacultyIds(prev=>[...new Set([...prev, member.id])]); } else { setSelectedFacultyIds(prev=>prev.filter(id=>id!==member.id)); }
                    }} />
                  </td>
                  <td>{member.id}</td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td>{member.email}</td>
                  <td>
                    <span className="department-badge">{member.department}</span>
                  </td>
                  <td>{member.position}</td>
                  <td>{member.experience}</td>
                  <td className="actions">
                    <button className="action-btn view" title="View Details">
                      <FaEye />
                    </button>
                    <button className="action-btn edit" title="Edit Faculty">
                      <FaEdit />
                    </button>
                    <button className="action-btn delete" title="Delete Faculty">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={facultyPage<=0} onClick={()=>{ const p = Math.max(0, facultyPage-1); setFacultyPage(p); fetchFaculty(p); }}>Prev</button>
        <span>Page {facultyPage+1} of {Math.max(1, facultyTotalPages)}</span>
        <button disabled={facultyPage+1>=facultyTotalPages} onClick={()=>{ const p = Math.min(facultyTotalPages-1, facultyPage+1); setFacultyPage(p); fetchFaculty(p); }}>Next</button>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="section">
      <div className="departments-grid">
        {loading ? (
          <LoadingState />
        ) : departments.length === 0 ? (
          <EmptyState title="No departments" subtitle="Click Add Department to create one" icon={FaBuilding} />
        ) : (
          departments.map((dept) => (
            <div key={dept.id} className="department-card">
              <div className="department-header">
                <div className="department-icon">
                  <FaBuilding />
                </div>
                <div className="department-info">
                  <h3>{dept.name}</h3>
                  <p>Est. {dept.established}</p>
                </div>
              </div>
              <div className="department-stats">
                <div className="stat">
                  <span className="stat-value">{dept.students}</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{dept.faculty}</span>
                  <span className="stat-label">Faculty</span>
                </div>
              </div>
              <div className="department-footer">
                <p><strong>Head:</strong> {dept.head}</p>
                <div className="department-actions">
                  <button className="action-btn view" title="View Details">
                    <FaEye />
                  </button>
                  <button className="action-btn edit" title="Edit Department">
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="section">
      <div className="courses-grid">
        {loading ? (
          <LoadingState />
        ) : courses.length === 0 ? (
          <EmptyState title="No courses" subtitle="Click Add Course to create one" icon={FaBook} />
        ) : (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <div className="course-code">{course.id}</div>
                <div className="course-credits">{course.credits} Credits</div>
              </div>
              <div className="course-content">
                <h3>{course.name}</h3>
                <p className="course-department">{course.department}</p>
                <p className="course-instructor">
                  <FaChalkboardTeacher />
                  {course.instructor}
                </p>
                <div className="course-stats">
                  <span className="enrolled-students">
                    <FaUsers />
                    {course.students} students
                  </span>
                </div>
              </div>
              <div className="course-actions">
                <button className="action-btn view" title="View Details">
                  <FaEye />
                </button>
                <button className="action-btn edit" title="Edit Course">
                  <FaEdit />
                </button>
                <button className="action-btn delete" title="Delete Course">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-section">
      <div className="attendance-stats">
        <StatCard 
          title="Today's Attendance" 
          value="0%" 
          icon={FaClock} 
          color="#38b2ac" 
          subtitle="Overall average"
        />
        <StatCard 
          title="This Week" 
          value="0%" 
          icon={FaCalendarAlt} 
          color="#4299e1" 
          subtitle="Weekly average"
        />
        <StatCard 
          title="This Month" 
          value="0%" 
          icon={FaChartBar} 
          color="#9f7aea" 
          subtitle="Monthly average"
        />
      </div>
      <div className="attendance-content">
        <div className="content-card">
          <div className="card-header">
            <h3>Attendance Trends</h3>
            <button className="view-all-btn">View Details</button>
          </div>
          <div className="attendance-chart">
            <EmptyState title="No attendance data" subtitle="Attendance data will appear here" icon={FaClipboardCheck} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotices = () => (
    <div className="section">
      <div className="section-toolbar">
        <SearchBar placeholder="Search notices by title or content" />
        <div className="toolbar-actions">
          <button className="primary-btn" onClick={() => handleAddClick('notice')}>
            <FaPlus />
            Add Notice
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6"><LoadingState /></td></tr>
            ) : notices.length === 0 ? (
              <tr><td colSpan="6"><EmptyState title="No notices found" subtitle="Click Add Notice to create one" icon={FaBell} /></td></tr>
            ) : (
              notices.map((notice) => (
                <tr key={notice.id}>
                  <td>{notice.id}</td>
                  <td>
                    <div className="notice-title">
                      <strong>{notice.title}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="notice-content">
                      {notice.content.length > 50 ? `${notice.content.substring(0, 50)}...` : notice.content}
                    </div>
                  </td>
                  <td>{notice.date}</td>
                  <td>
                    <span className={`status-badge ${notice.status}`}>
                      {notice.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="action-btn view" title="View Notice">
                      <FaEye />
                    </button>
                    <button className="action-btn edit" title="Edit Notice">
                      <FaEdit />
                    </button>
                    <button className="action-btn delete" title="Delete Notice">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="reports-section">
      <div className="reports-grid">
        <div className="report-card">
          <div className="report-icon">
            <FaUsers />
          </div>
          <h3>Student Performance</h3>
          <p>Comprehensive analysis of student academic performance across all departments</p>
          <button className="report-btn">Generate Report</button>
        </div>
        <div className="report-card">
          <div className="report-icon">
            <FaClipboardCheck />
          </div>
          <h3>Attendance Reports</h3>
          <p>Detailed attendance tracking and analysis for all courses and students</p>
          <button className="report-btn">Generate Report</button>
        </div>
        <div className="report-card">
          <div className="report-icon">
            <FaChartBar />
          </div>
          <h3>Financial Reports</h3>
          <p>Financial summaries, fee collection, and budget analysis reports</p>
          <button className="report-btn">Generate Report</button>
        </div>
        <div className="report-card">
          <div className="report-icon">
            <FaGraduationCap />
          </div>
          <h3>Academic Reports</h3>
          <p>Course completion rates, grade distributions, and academic insights</p>
          <button className="report-btn">Generate Report</button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="settings-grid">
        <div className="setting-card">
          <div className="setting-icon">
            <FaCog />
          </div>
          <h3>General Settings</h3>
          <p>Configure system preferences, themes, and general application settings</p>
          <button className="setting-btn">Configure</button>
        </div>
        <div className="setting-card">
          <div className="setting-icon">
            <FaUsers />
          </div>
          <h3>User Management</h3>
          <p>Manage user accounts, roles, permissions, and access controls</p>
          <button className="setting-btn">Manage Users</button>
        </div>
        <div className="setting-card">
          <div className="setting-icon">
            <FaDownload />
          </div>
          <h3>Backup & Restore</h3>
          <p>System backup, data export, and restore functionality</p>
          <button className="setting-btn">Backup Now</button>
        </div>
        <div className="setting-card">
          <div className="setting-icon">
            <FaBell />
          </div>
          <h3>Notifications</h3>
          <p>Configure notification preferences and alert settings</p>
          <button className="setting-btn">Configure</button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'students':
        return renderStudents();
      case 'faculty':
        return renderFaculty();
      case 'departments':
        return renderDepartments();
      case 'courses':
        return renderCourses();
      case 'attendance':
        return renderAttendance();
      case 'notices':
        return renderNotices();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span>TAT</span>
            </div>
            <h1>Admin Panel</h1>
          </div>
          <div className="header-right">
            <div className="profile-section">
              <div className="profile-avatar">
                <FaUserCircle />
              </div>
              <div className="profile-info">
                <span className="profile-name">{adminName}</span>
                <span className="profile-designation">Admin</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Horizontal Navigation */}
      <nav className="horizontal-nav">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
            style={{ '--nav-color': item.color }}
          >
            <item.icon />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-content">
          <PageHeader />
          {renderContent()}
        </div>
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add {modalType}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p>Form for adding {modalType} will be implemented here...</p>
            </div>
          </div>
        </div>
      )}

      {/* Send Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Send Email - {emailContext.target === 'students' ? 'Students' : 'Faculty'}</h2>
              <button className="close-btn" onClick={closeEmailModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Recipients</label>
                <div className="radio-group">
                  <label><input type="radio" name="scope" value="all" checked={emailForm.scope==='all'} onChange={(e)=>setEmailForm(prev=>({...prev, scope: e.target.value}))}/> All</label>
                  <label><input type="radio" name="scope" value="selected" checked={emailForm.scope==='selected'} onChange={(e)=>setEmailForm(prev=>({...prev, scope: e.target.value}))}/> Selected</label>
                </div>
                {emailForm.scope==='selected' && (
                  <p className="helper-text">{emailContext.target==='students' ? selectedStudentIds.length : selectedFacultyIds.length} selected</p>
                )}
              </div>
              <div className="form-field">
                <label>Subject</label>
                <input type="text" value={emailForm.subject} onChange={(e)=>setEmailForm(prev=>({...prev, subject: e.target.value}))} placeholder="Enter subject" />
              </div>
              <div className="form-field">
                <label>Body</label>
                <textarea rows="6" value={emailForm.body} onChange={(e)=>setEmailForm(prev=>({...prev, body: e.target.value}))} placeholder="Write your message" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-btn" onClick={closeEmailModal}>Cancel</button>
              <button className="primary-btn" onClick={async ()=>{
                try{
                  if(!emailForm.subject || !emailForm.body){ setToast({type:'error', message:'Subject and body are required'}); return; }
                  if(emailForm.scope==='selected'){
                    const count = emailContext.target==='students' ? selectedStudentIds.length : selectedFacultyIds.length;
                    if(count===0){ setToast({type:'error', message:'Select at least one recipient'}); return; }
                    // Backend doesn't expose selected-recipient endpoint yet
                    setToast({type:'error', message:'Selected recipients API is not available in backend. Please use All.'});
                    return;
                  }
                  const url = emailContext.target==='students' ? `${API_BASE_URL}/email/students/all` : `${API_BASE_URL}/email/faculties/all`;
                  const body = new URLSearchParams();
                  body.append('subject', emailForm.subject);
                  body.append('body', emailForm.body);
                  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
                  if(res.ok){ setToast({type:'success', message:'Email sent successfully'}); closeEmailModal(); } else { setToast({type:'error', message:'Failed to send email'}); }
                }catch(err){ console.error(err); setToast({type:'error', message:'Failed to send email'}); }
              }}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {showStudentModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content student-modal">
            <div className="modal-header">
              <h2>
                {studentModalType === 'add' && 'Add Student'}
                {studentModalType === 'view' && 'Student Details'}
                {studentModalType === 'edit' && 'Edit Student'}
              </h2>
              <button className="close-btn" onClick={closeStudentModal}>×</button>
            </div>
            <div className="modal-body">
              {studentModalType === 'view' ? (
                <div className="student-details">
                  <div className="detail-row">
                    <label>Student ID:</label>
                    <span>{selectedStudent?.id}</span>
                  </div>
                  <div className="detail-row">
                    <label>Roll Number:</label>
                    <span>{selectedStudent?.rollNo}</span>
                  </div>
                  <div className="detail-row">
                    <label>Name:</label>
                    <span>{selectedStudent?.name}</span>
                  </div>
                  <div className="detail-row">
                    <label>Email:</label>
                    <span>{selectedStudent?.email}</span>
                  </div>
                  <div className="detail-row">
                    <label>Registration Number:</label>
                    <span>{selectedStudent?.regNo}</span>
                  </div>
                  <div className="detail-row">
                    <label>Mobile:</label>
                    <span>{selectedStudent?.phone}</span>
                  </div>
                  <div className="detail-row">
                    <label>Address:</label>
                    <span>{selectedStudent?.address}</span>
                  </div>
                  <div className="detail-row">
                    <label>Date of Birth:</label>
                    <span>{selectedStudent?.dob ? new Date(selectedStudent.dob).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <label>Gender:</label>
                    <span>{selectedStudent?.gender || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <label>Department:</label>
                    <span>{selectedStudent?.department}</span>
                  </div>
                  <div className="detail-row">
                    <label>Section:</label>
                    <span>{selectedStudent?.section}</span>
                  </div>
                  <div className="detail-row">
                    <label>Semester:</label>
                    <span>{selectedStudent?.semester}</span>
                  </div>
                  <div className="detail-row">
                    <label>Class Representative:</label>
                    <span className={`status-badge ${selectedStudent?.isCr ? 'active' : 'inactive'}`}>
                      {selectedStudent?.isCr ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <label>Status:</label>
                    <span className={`status-badge ${selectedStudent?.status}`}>
                      {selectedStudent?.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="student-form">
                  <div className="form-row">
                    <div className="form-field">
                      <label>Student Name *</label>
                      <input 
                        type="text" 
                        value={studentForm.studentName} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentName: e.target.value}))}
                        placeholder="Enter student name"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Email *</label>
                      <input 
                        type="email" 
                        value={studentForm.studentEmail} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentEmail: e.target.value}))}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Roll Number *</label>
                      <input 
                        type="number" 
                        value={studentForm.studentRoll} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentRoll: parseInt(e.target.value)}))}
                        placeholder="Enter roll number"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Registration Number *</label>
                      <input 
                        type="number" 
                        value={studentForm.studentReg} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentReg: parseInt(e.target.value)}))}
                        placeholder="Enter registration number"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Mobile *</label>
                      <input 
                        type="tel" 
                        value={studentForm.studentMobile} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentMobile: e.target.value}))}
                        placeholder="Enter mobile number"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Date of Birth</label>
                      <input 
                        type="date" 
                        value={studentForm.studentDob} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentDob: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Gender</label>
                      <select 
                        value={studentForm.studentGender} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentGender: e.target.value}))}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Department *</label>
                      <select 
                        value={studentForm.studentDepartment} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentDepartment: parseInt(e.target.value)}))}
                        required
                      >
                        {Object.entries(departmentMap).map(([id, name]) => (
                          <option key={id} value={id}>{name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Section *</label>
                      <input 
                        type="text" 
                        value={studentForm.studentSection} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentSection: e.target.value}))}
                        placeholder="Enter section"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Semester *</label>
                      <select 
                        value={studentForm.studentSemester} 
                        onChange={(e) => setStudentForm(prev => ({...prev, studentSemester: parseInt(e.target.value)}))}
                        required
                      >
                        {[1,2,3,4,5,6,7,8].map(sem => (
                          <option key={sem} value={sem}>Semester {sem}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Class Representative</label>
                      <select 
                        value={studentForm.isCr} 
                        onChange={(e) => setStudentForm(prev => ({...prev, isCr: e.target.value === 'true'}))}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                    {studentModalType === 'add' && (
                      <div className="form-field">
                        <label>Password *</label>
                        <input 
                          type="password" 
                          value={studentForm.studentPassword} 
                          onChange={(e) => setStudentForm(prev => ({...prev, studentPassword: e.target.value}))}
                          placeholder="Enter password"
                          required
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-field">
                    <label>Address</label>
                    <textarea 
                      rows="3" 
                      value={studentForm.studentAdd} 
                      onChange={(e) => setStudentForm(prev => ({...prev, studentAdd: e.target.value}))}
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              )}
            </div>
            {studentModalType !== 'view' && (
              <div className="modal-footer">
                <button className="secondary-btn" onClick={closeStudentModal}>Cancel</button>
                <button 
                  className="primary-btn" 
                  onClick={studentModalType === 'add' ? handleAddStudent : handleUpdateStudent}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : (studentModalType === 'add' ? 'Add Student' : 'Update Student')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {toast.message && (
        <div className={`toast ${toast.type}`} onAnimationEnd={()=>setToast({type:'', message:''})}>{toast.message}</div>
      )}
    </div>
  );
};

export default AdminDashboard;