import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppBar from './AppBar';
import Footer from './Footer';
import Home from '../UserPages/Home';
import BookDb from '../UserPages/BookDb';
import Contact from '../UserPages/Contact';
import Login from '../LoginSignupPage/Login'
import Signup from '../LoginSignupPage/Signup'
import Admin from '../AdminPages/Admin'
import GelenMesajlar from '../AdminPages/GelenMesajlar'
import ToInform from '../UserPages/toInform';
import Copyright from '../UserPages/Copyright';
import PrivacyPolicy from '../UserPages/PrivacyPolicy';
import Profile from '../UserPages/profil';
import ForgotPassword from '../LoginSignupPage/resetPassword';

const Layout = () => (
  <BrowserRouter>
  <AppBar />
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/BookDb" element={<BookDb/>} />
          <Route path="/Contact" element={<Contact/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/GelenMesajlar" element={<GelenMesajlar/>} />
          <Route path="/ToInform" element={<ToInform/>} />
          <Route path="/Copyright" element={<Copyright/>} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        </Routes>
      </div>
      <Footer />
  </BrowserRouter>
);

export default Layout;
