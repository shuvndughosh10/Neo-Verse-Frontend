export default function Contact() {
  return (
        /* Single card with map on top; form (left) and info (right) below */
        <div className="card welcome-card">
          <h2>Contact</h2>
          <div style={{ marginBottom: '1rem' }}>
            <iframe
              title="TAT Location"
              className="map-embed"
              width="945"
              height="373"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7482.0614668432645!2d85.807754!3d20.340349!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190902b2a59ce5%3A0xdfb554a4e0bafffb!2sTrident%20Academy%20of%20Technology!5e0!3m2!1sen!2sus!4v1758093410636!5m2!1sen!2sus"
            ></iframe>
          </div>

          <div className="contact-grid">
            <form className="form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" placeholder="Your mobile number" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your email" />
              </div>
              <div className="form-group">
                <label>Query details</label>
                <textarea rows={8} placeholder="Write your query" style={{ width: '100%', padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }} />
              </div>
              <button type="button" className="btn btn-primary">Send</button>
            </form>

            <div className="card portal-card">
              <h2>Get in touch</h2>
              <p>
                Trident Academy of Technology,<br />
                F2/A, Chandaka Industrial Estate,<br />
                In front of Infocity, Bhubaneswar,<br />
                Odisha, Pin: 751024
              </p>
              <p>
                India, email: info@trident.ac.in<br />
                Phone: +91 98611 91195<br />
                Admission Contact: +91 98611 91195, +91 70084 43525<br />
                Website: tat.ac.in
              </p>
            </div>
          </div>
        </div>
  );
}
