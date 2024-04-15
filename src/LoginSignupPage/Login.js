import React, { useState, useEffect } from "react";
import '../style/style.css';
import { Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from 'react-i18next';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    document.title = 'ArdaBreeze | Giriş Yap';
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setCurrentUser(auth.currentUser);
      window.location.href = '/';
      sessionStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
    } catch (error) {
      let errorMessage = "Kullanıcı adı veya şifre yanlış!!!.";

      setError(errorMessage);
      console.error("Oturum açma hatası: ", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <body className="giris-resmi">
      <div className='login template d-flex justify-content-center align-items-center vh-100 mt-5'>
        <div className='transparent-bg'>
          {error && (
            <div className="error-message">
              <p className="text-danger mt-2">{error}</p>
            </div>
          )}
          <form onSubmit={handleSignIn}>
            <h3 className='text-center'>{t('lLogin')} </h3>
            <div className='mb-2'>
              <label htmlFor='email'>{t('lLoginEmail')} </label>
              <input
                type='email'
                placeholder={t('lLoginEmail')}
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-2 position-relative'>
              <label htmlFor='password'>{t('lLoginPassword')} </label>
              <input
                type={showPassword ? 'text' : 'password'} // Şifreyi göster/gizle
                placeholder={t('lLoginPassword')}
                className='form-control password-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='password-icon' onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </div>
            </div>

            <div className="mb-2 d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                />
                <label htmlFor="rememberMe" className="ms-2">
                  {t('lRememberMe')}
                </label>
              </div>
              <Link to="/ForgotPassword" >
                {t('lFargotPassword')}
              </Link>
            </div>

            <div className='d-grid'>
              <button type='submit' className='btn btn-info'>
                {t('lLoginButton')}
              </button>
            </div>

            <p className='text-right'>
              {t('lDontAccount')}
              <Link to='/Signup' className='ms-2'>
                {t('lDontAccSignupButton')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </body>
  );
}

export default Login;
