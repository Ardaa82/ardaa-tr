import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const CustomNotification = (message, type) => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const NotificationBox = ({ message, backgroundColor, borderColor }) => {
  const notificationStyle = {
    backgroundColor: backgroundColor || '#2196F3',
    color: '#fff',
    padding: '15px',
    borderRadius: '5px',
    border: `1px solid ${borderColor || '#2196F3'}`,
    marginBottom: '20px',
  };

  return <div style={notificationStyle}>{message}</div>;
};

function Contact({ currentUser }) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = 'ArdaAstra | İletişim';
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactFormData = {
        name: contactName,
        email: contactEmail,
        message: contactMessage,
      };

      const contactCollectionRef = collection(db, 'iletisim');
      await addDoc(contactCollectionRef, contactFormData);

      CustomNotification('Mesajınız başarıyla gönderildi.', 'success');

      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setSubmitted(true);
      setNotificationSent(true); // Bildiri mesajının gönderildiğini belirtmek için

      console.log('İletişim formu başarıyla Firestore\'a eklendi:', contactFormData);
    } catch (error) {
      console.error('İletişim formu gönderirken bir hata oluştu:', error);
      CustomNotification('Form gönderirken bir hata oluştu.', 'error');
    }
  };

  return (
    <div className='m-5'>
      {notificationSent ? (
        <NotificationBox
          message={t('cSuccesfullMessage')}
          backgroundColor="#4CAF50"
          borderColor="#388E3C"
        />
      ) : null}
      <div className="col-md-6 mt-4 ml-md-5 mb-4">
        <form onSubmit={handleContactSubmit}>
          <h2>{t('cContactMe')}</h2>
          <div className="mb-3">
            <label htmlFor="inputContactName" className="form-label">
              {t('cNameSurname')}
            </label>
            <input
              type="text"
              className="form-control"
              id="inputContactName"
              placeholder={t('cPlaceholderName')}
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputContactEmail" className="form-label">
              {t('cEmail')}
            </label>
            <input
              type="email"
              className="form-control"
              id="inputContactEmail"
              placeholder={t('cPlaceholderEmail')}
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="textareaContactMessage" className="form-label">
              {t('cMessage')}
            </label>
            <textarea
              className="form-control"
              id="textareaContactMessage"
              placeholder={t('cPlaceholderMessage')}
              value={contactMessage}
              onChange={(event) => setContactMessage(event.target.value)}
              rows="5"
              required
            ></textarea>
          </div>
          <Button variant="primary" type="submit">
            {t('cSendButton')}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
