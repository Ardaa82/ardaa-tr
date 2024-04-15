import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArdaBreeze_S from '../images/ArdaBlog-Siyah.png';
import { auth } from "../firebase-config";
import { useTranslation } from 'react-i18next';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggle = () => setIsOpen(!isOpen);
  const adminUserId = ["0G7RpJjp28NxfRo16HrVAWgJypn2", "6o9hNIAGuYRP1BHxWUnMqw8Tr2n2"];

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const currentUserFromStorage = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUserFromStorage) {
      setCurrentUser(currentUserFromStorage);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      sessionStorage.removeItem('currentUser');
    } catch (error) {
      console.error("Oturum kapatma hatası: ", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={ArdaBreeze_S} style={{ width: "60px" }} alt="ArdaBreeze Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggle}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/BookDb" className="nav-link"> {t('nBookdb')}</Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-link"> {t('nContact')}</Link>
            </li>
            <li className="nav-item">
              {currentUser ? (
                <Link to="/Profile" className="nav-link"> {t('nProfil')}</Link>
              ) : (
                <Link to="/Login" className="btn btn-outline-light"> {t('nLogin')}</Link>
              )}
            </li>
            <li className="nav-item">
              {currentUser && adminUserId.includes(currentUser.uid) && (
                <Link to="/Admin" className="nav-link">{t('nAdminPage')} </Link>
              )}
            </li>
            <li className="nav-item">
              {currentUser && (
                <button className="btn btn-danger rounded-pill" onClick={handleSignOut}> {t('nCheckout')}</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default App;
