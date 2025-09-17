export default function Developer() {
  return (
    <div className="card welcome-card" style={{ lineHeight: 1.8 }}>
      <h2>Student Information</h2>
      <p><strong>Name:</strong> Shuvendu Ghosh</p>
      <p><strong>Branch:</strong> Computer Science & Information Technology (CS & IT)</p>
      <p><strong>Registration Number:</strong> 2201289310</p>
      <p><strong>Roll Number:</strong> 54</p>
      <p><strong>Semester:</strong> 7th Semester (B.Tech)</p>
      <p><strong>Project Type:</strong> Minor Project</p>

      <hr style={{ margin: '1.25rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

      <h2>Project Information</h2>
      <p><strong>Project Title:</strong> <strong><em>Neo Verse – A Smart College Management System</em></strong></p>
      <p><strong>Domain:</strong> Full Stack Web Development (Spring Boot + React + PostgreSQL)</p>
      <p>
        <strong>Objective:</strong> To design and develop a <strong>role-based college management system</strong> that
        digitalizes academic and administrative activities such as student/faculty management, courses, attendance,
        notices, and results.
        {/* with advanced features like AI/ML analytics and chatbot integration. */}
      </p>
      <p>
        <strong>Motivation:</strong> Current college systems rely heavily on manual processes and fragmented software. Neo Verse
        aims to <strong>streamline workflows, improve efficiency, and enhance student-faculty interactions</strong> with modern technologies.
      </p>
      <p>
        <strong>Scope of Work:</strong> Covers <strong>Admin, HOD, Faculty, and Student dashboards</strong>, authentication & authorization,
        email/OTP integration, result analysis, timetable scheduling, and optional.
        {/* <strong>AI chatbot assistant</strong>. */}
      </p>
    </div>
  );
}


