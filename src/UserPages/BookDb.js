import React, { useState, useEffect } from "react";
import '../style/style.css';
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useTranslation } from 'react-i18next';

function BookDb() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "kitaplar");
  const adminUserId = ["0G7RpJjp28NxfRo16HrVAWgJypn2","6o9hNIAGuYRP1BHxWUnMqw8Tr2n2"];
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentUserFromStorage = JSON.parse(sessionStorage.getItem("currentUser"));
    document.title = 'ArdaAstra | Kitaplar';
    if (currentUserFromStorage) {
      setCurrentUser(currentUserFromStorage);
    }

    const unsubscribe = onSnapshot(collection(db, "kitaplar"), (querySnapshot) => {
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({ ...doc.data(), id: doc.id });
      });
      setUsers(userData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      console.log("Kitap eklemek için oturum açmalısınız.");
      return;
    }

    try {
      await addDoc(usersCollectionRef, { kitap_adi: newName, kitap_yazari: newAge });
      setNewName("");
      setNewAge("");
      await fetchUsers();
      console.log("Kitap başarıyla eklendi.");
    } catch (error) {
      console.error("Kitap ekleme hatası: ", error);
    }
  };

  const fetchUsers = async () => {
    if (currentUser) {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  const deleteUser = async (id) => {
    if (!currentUser || !adminUserId.includes(currentUser.uid)) {
      console.log("Bu işlemi gerçekleştirmek için izniniz yok.");
      return;
    }

    try {
      const userDoc = doc(db, "kitaplar", id);
      await deleteDoc(userDoc);
      await fetchUsers();
      console.log("Kitap başarıyla silindi.");
    } catch (error) {
      console.error("Kitap silme hatası: ", error);
    }
  };

  return (
    <div className="container mt-5 mb-4">
      <div className="row">
        <div className="col-md-6">
          {!currentUser ? (
            <div>
              <h4> 
                {t('bDontLogin')}
              </h4>
            </div>
          ) : (
            <form className="mt-4" onSubmit={createUser}>
              <h2>{t('bTitleName')} </h2>
              <div className="mb-3">
                <label htmlFor="inputBookName" className="form-label">
                  {t('bBookTitle')}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputBookName"
                  placeholder={t('bBookTitle')}
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputAuthor" className="form-label">
                  {t('bBookAuthor')}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAuthor"
                  placeholder={t('bBookAuthor')}
                  value={newAge}
                  onChange={(event) => setNewAge(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success">
                {t('bSaveBook')}
              </button>
            </form>
          )}
        </div>

        <div className="col-md-5 mt-4">
          <h2>{t('bBookList')} </h2>
          {users.map((user) => (
            <div key={user.id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center ">
                <div>
                  <h5 className="card-title" style={{ color: "black" }}>
                  {t('bBookNameList')}: {user.kitap_adi}
                  </h5>
                  <p className="card-text" style={{ color: "black" }}>
                  {t('bBookAuthorList')}: {user.kitap_yazari}
                  </p>
                </div>
                {currentUser && adminUserId.includes(currentUser.uid) && (
                  <button
                    className="btn btn-danger btn-sm rounded-end"
                    onClick={() => deleteUser(user.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookDb;
