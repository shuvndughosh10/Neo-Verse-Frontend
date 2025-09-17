export default function Library() {
  return (
    <div className="card welcome-card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h2>Library Admin Login</h2>
      <p style={{ color: '#4a5568', marginBottom: '1rem' }}>Sign in to manage books, issues, and returns.</p>
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="admin@domain.com" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="********" />
      </div>
      <button className="btn btn-primary" type="button">Login</button>
    </div>
  );
}


