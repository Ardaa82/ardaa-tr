import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../firebase-config'; // Firebase'den sendPasswordResetEmail fonksiyonunu içe aktar

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(email); // sendPasswordResetEmail fonksiyonunu kullanarak şifre sıfırlama e-postası gönder
      setResetEmailSent(true);
      setError(null);
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      setResetEmailSent(false);
      console.error('Şifre sıfırlama hatası:', error);
    }
  };

  return (
    <body className="giris-resmi">
      <div className='reset-password template d-flex justify-content-center align-items-center vh-100 mt-5'>
        <div className='transparent-bg'>
          {!resetEmailSent ? (
            <form onSubmit={handleResetPassword}>
              <h3 className='text-center'>Şifremi Sıfırla</h3>
              <div className='mb-2'>
                <label htmlFor='email'> E-posta Adresi</label>
                <input
                  className='form-control'
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className='d-grid'>
                <button className='btn btn-primary'>Şifre Sıfırlama Linki Gönder</button>
              </div>
              <p className='text-right'>
                <Link to="/Login" className='ms-2'>Giriş Sayfasına Geri Dön</Link>
              </p>
            </form>
          ) : (
            <div className="text-center">
              <p>Şifre sıfırlama e-postası gönderildi.</p>
              <Link to="/Login">Giriş Sayfasına Geri Dön</Link>
            </div>
          )}
        </div>
      </div>
    </body>
  )
}

export default ResetPassword;
