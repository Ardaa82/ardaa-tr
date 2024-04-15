import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
//import adminUserId from '../AdminUserIds'

const GelenMesajlar = () => {
  const [contactMessages, setContactMessages] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);
  const adminUserId = ["0G7RpJjp28NxfRo16HrVAWgJypn2","6o9hNIAGuYRP1BHxWUnMqw8Tr2n2"];

  const fetchContactMessages = async () => {
    try {
      const contactCollectionRef = collection(db, 'iletisim');
      const snapshot = await getDocs(contactCollectionRef);
      const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setContactMessages(messagesData);
    } catch (error) {
      console.error('İletişim mesajlarını alma hatası:', error);
    }
  };

  useEffect(() => {
    document.title = 'ArdaAstra | Admin Gelen Mesajlar';
    const currentUserFromStorage = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUserFromStorage) {
      setCurrentUser(currentUserFromStorage);
    }
    const fetchInitialData = async () => {
      await fetchContactMessages();
    };
    fetchInitialData();
  }, []);
  
  const deleteMessage = async (messageId) => {
    try {
      const messageRef = doc(db, 'iletisim', messageId);
      await deleteDoc(messageRef);
      // Silindikten sonra mesajları yeniden getir
      await fetchContactMessages();
      console.log("Mesaj başarıyla silindi.");
    } catch (error) {
      console.error("Mesaj silme hatası: ", error);
    }
  };
  const isAdmin = currentUser && adminUserId.includes(currentUser.uid);

  return (
    <div className="container">
      <div>
        {!isAdmin && (
          <div className='p-5' >
            <h4>Gelen mesajları sadece adminler görebilir!!</h4>
          </div>
        )}

        {isAdmin && (
          <div >
            <h3 className="text-center my-4">İletişim Formundan Gelen Mesajlar</h3>
            <div className="row">
              {contactMessages.map((message) => (
                <div key={message.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="border rounded p-4">
                    <h5>Gönderen: {message.name}</h5>
                    <p><b>Gmail:</b> {message.email}</p>
                    <p> <b>Mesaj:</b> {message.message}</p>
                    {isAdmin && (
                      <button className="btn btn-danger btn-sm rounded-end" onClick={() => deleteMessage(message.id)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GelenMesajlar;
