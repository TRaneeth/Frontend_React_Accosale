import React from "react";
import { Link } from "react-router-dom";


const Policies = () => {
  return (
    <div className="policies-page">
      <div className="policies-inner">
        <nav className="policies-nav">
          <Link to="/terms" className="pol-link">Terms & Conditions</Link>
          <Link to="/privacy" className="pol-link">Privacy Policy</Link>
          <Link to="/policies" className="pol-link active">Combined</Link>
        </nav>

        <section className="policy-card">
          <h1>Terms & Conditions — AccoSale</h1>
          <p className="muted">Last updated: January 2025</p>

          <h3>1. Use of Service</h3>
          <p>Users must be 18+ to transact on AccoSale. You are responsible for any activity from your account. Do not use AccoSale for illegal or fraudulent activities.</p>

          <h3>2. User Content</h3>
          <p>All listings and descriptions must be accurate. Do not post copyrighted or harmful content. Violations will lead to removal or suspension.</p>

          <h3>3. Buying & Selling</h3>
          <p>AccoSale is a listing platform — we are not liable for disputes between buyers and sellers. Verify item details before purchase; misuse may lead to bans.</p>

          <h3>4. Payments</h3>
          <p>Payments between users are handled outside the platform and are at users' own risk. AccoSale does not process or store payment details.</p>

          <h3>5. Termination & Liability</h3>
          <p>We reserve the right to suspend or delete accounts that violate terms. AccoSale is not responsible for data loss, hacks, or user disputes.</p>
        </section>

        <section className="policy-card">
          <h1>Privacy Policy — AccoSale</h1>
          <p className="muted">We respect your privacy. This short policy explains how we use data.</p>

          <h3>1. Data We Collect</h3>
          <p>We collect username, email, uploaded images, and chat content necessary for the service.</p>

          <h3>2. How We Use Data</h3>
          <p>Data is used to authenticate users, enable listings, prevent fraud, and improve the service. We do not sell your data.</p>

          <h3>3. Cookies & Local Storage</h3>
          <p>We use cookies/localStorage for login sessions and preferences. We do not use advertising trackers by default.</p>

          <h3>4. Security & Deletion</h3>
          <p>We use standard security measures, but users must keep strong passwords. Users may request account deletion; it will remove profile, listings, and chat history.</p>

          <h3>5. Changes</h3>
          <p>We may update these policies; using the site after updates implies acceptance.</p>

          <div className="policy-contact">
            <strong>Contact</strong>
            <p>If you have questions, email <a href="mailto:support@accosale.com">19891a0236@gmail.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Policies;
