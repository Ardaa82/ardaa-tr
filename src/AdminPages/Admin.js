import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import adminUserId from '../AdminUserIds'


const Admin = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const adminUserId = ["0G7RpJjp28NxfRo16HrVAWgJypn2","6o9hNIAGuYRP1BHxWUnMqw8Tr2n2"];

  
  useEffect(() => {
    document.title = 'ArdaAstra | Admin Panel';
    const currentUserFromStorage = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUserFromStorage) {
      setCurrentUser(currentUserFromStorage);
    }
  }, []);

  const isAdmin = currentUser && adminUserId.includes(currentUser.uid);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          {!isAdmin && (
            <div className='p-5'>
              <h4>Bu sayfa adminlere özeldir!!!!</h4>
            </div>
          )}

          {isAdmin && (
            <div>
              <h2 className="mb-4">Admin Sayfası</h2>
              <p>Burası sadece adminlerin erişebileceği bir sayfadır.</p>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <p>Gelen Mesajlar butonuna tıklayarak iletişim kısmından gönderilen formları görürsün.</p>
                  <Link to="/GelenMesajlar" className="btn btn-outline-secondary">Gelen Mesajlar</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
