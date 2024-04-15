import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase-config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Button, Modal, Form } from 'react-bootstrap';
import DefaultImage from '../images/user.jpg'
import { ref, uploadBytes, getDownloadURL,getStorage  } from 'firebase/storage';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [formData, setFormData] = useState({
    phoneNumber: '',
    instagram: '',
    facebook: '',
    about: '',
    user_name: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');

  const getInstagramURL = (username) => `https://www.instagram.com/${username}`;
  const getFacebookURL = (username) => `https://www.facebook.com/${username}`;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        try {
          const docSnapshot = await getDoc(userRef);
          if (docSnapshot.exists()) {
            setUserProfile(docSnapshot.data());
            setFormData(docSnapshot.data());
            setUserName(docSnapshot.data().user_name || '');
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error('Firestore veri çekme hatası:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          // Document exists, update it
          await updateDoc(userRef, formData);
        } else {
          // Document doesn't exist, create it
          await setDoc(userRef, formData);
        }
        setUserProfile(formData);
        console.log('Profil güncellendi:', formData);
        alert('Profilin başarılı bir şekilde güncellendi.');
      } catch (error) {
        console.error('Firestore veri güncelleme hatası:', error);
      }
    }
  };
  const uploadProfilePicture = async (file) => {
    if (!auth.currentUser) return;

    const storage = getStorage();
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${file.name}`);

    try {
      // Resmi Firebase Storage'a yükle
      await uploadBytes(storageRef, file);

      // Resmin URL'sini al
      const downloadURL = await getDownloadURL(storageRef);

      // Firestore'daki kullanıcı belgesine resim URL'sini kaydet
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { profilePicture: downloadURL });

      console.log('Profil resmi yüklendi:', downloadURL);
      // Başarı mesajı veya işlem tamamlandığında yapılacaklar...
    } catch (error) {
      console.error('Profil resmi yükleme hatası:', error);
      // Hata mesajı veya işlem sırasında yapılacaklar...
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      await uploadProfilePicture(file);
    } catch (error) {
      console.error('Profil resmi yükleme hatası:', error);
      // Hata durumunda kullanıcıya bilgi verme veya işlem yapma
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
      <div className="col-md-4 mb-4">
          <div className="text-center">
            <h2>{userName}</h2>
            <img src={userProfile?.profilePicture || ''} alt="Profil Resmi" className="img-fluid rounded-circle mb-3" style={{ width: "200px", height:"200px" }} />
          </div>
        </div>
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-6">
              <h5> Hakkımda:</h5>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              {userProfile?.instagram && (
                <a className="btn rounded-pill me-2" href={getInstagramURL(userProfile.instagram)} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#C13584", color: "white" }}>
                  <i class="fa-brands fa-instagram " style={{ color: "#ffffff" }}></i>  İnstagram
                </a>
              )}
              {userProfile?.facebook && (
                <a className="btn rounded-pill" href={getFacebookURL(userProfile.facebook)} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#1877F2", color: "white" }}>
                  <i class="fa-brands fa-facebook" style={{ color: "#ffffff" }}></i>  Facebook
                </a>
              )}
            </div>
            <div>
              <p> {userProfile?.about || 'Henüz kendini bize anlatmamış'}</p>
            </div>
          </div>
          <div>
            <p><strong>Telefon Numarası:</strong> {userProfile?.phoneNumber || ''}</p>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-end mb-3'>
        <Button variant="btn btn-outline-dark" onClick={() => setShowModal(true)}>
          Bilgileri Düzenle
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Profil Bilgilerini Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="profilePicture">
            <Form.Label>Profil Resmi Yükle</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="user_name">
            <Form.Label>Kullanıcı Adı</Form.Label>
            <Form.Control
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="phoneNumber">


              <Form.Label>Telefon Numarası</Form.Label>
              <Form.Control
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="instagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="facebook">
              <Form.Label>Facebook</Form.Label>
              <Form.Control
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="about">
              <Form.Label>Hakkında</Form.Label>
              <Form.Control
                as="textarea"
                name="about"
                value={formData.about}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Kaydet
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default Profile;
