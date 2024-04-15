import React, { useState, useEffect } from "react";
import '../style/style.css';
import { Link } from 'react-router-dom';
import { db,auth } from '../firebase-config'; // Firebase auth nesnesini içe aktar
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'; // createUserWithEmailAndPassword, updateProfile ve sendEmailVerification fonksiyonlarını içe aktar
import { useTranslation } from 'react-i18next';
import { doc, setDoc } from 'firebase/firestore';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); // Yeni state ekle: ad
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false); // Yeni state: şifreyi göster/gizle

  useEffect(() => {
    document.title = 'ArdaBreeze | Kayıt Ol';
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const displayName = `${firstName}`; // Kullanıcı adını al
  
      // Firestore'da 'users' koleksiyonuna kullanıcı adını kaydet
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        user_name: displayName, // Kullanıcı adını Firestore'a kaydet
      });
  

      alert('Kaydınız oluşturuldu. Lütfen e-postanızı kontrol edin ve hesabınızı doğrulayın.');

      window.location.href = '/Login';

    } catch (error) {
      console.error('Kayıt olma hatası:', error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <body className="giris-resmi">
      <div className='signup template d-flex justify-content-center align-items-center vh-100 mt-5'>
        <div className='transparent-bg'>
          <form onSubmit={handleSignUp}>
            <h3 className='text-center'>{t('sSignUp')} </h3>
            <div className='mb-2'>
              <label htmlFor='fname'>{t('sSignUpName')} </label>
              <input
                type='text'
                placeholder={t('sSignUpName')}
                className='form-control'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='email'> {t('sSignUpEmail')}</label>
              <input
                className='form-control'
                type="email"
                placeholder={t('sSignUpEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-2 position-relative'>
              <label htmlFor='password'>{t('sSignUpPassword')} </label>
              <input
                className='form-control'
                type={showPassword ? 'text' : 'password'}
                placeholder={t('sSignUpPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='password-icon' onClick={togglePasswordVisibility}>
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
              </div>
            </div>
            <div className='d-grid '>
              <button className='btn btn-primary '>{t('sSignUpButton')} </button>
            </div>
            <p className='text-right'>
             {t('sYouAccount')} <Link to="/Login" className='ms-2'>{t('sYouAccountLogin')} </Link>
            </p>
          </form>
        </div>
      </div>
    </body>
  )
}

export default Signup;
