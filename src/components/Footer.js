import React from 'react';
import Ardabreeze from '../images/ArdaBlog-Siyah.png';
import LanguageSwitcher from '../languages/languageSelector'
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function Footer() {
  const currentDate = new Date().getFullYear();
  const { t, i18n } = useTranslation();

  return (
    <div id="footer" className="bg-dark py-4" style={{ color: "white" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="d-flex align-items-center">
              <img src={Ardabreeze} style={{ width: "50px" }} alt="Ardabreeze" />
              <h4 className="ms-2">ArdaAstra</h4>
            </div>
            <p> {t('fDescription')}
            </p>

            <LanguageSwitcher/>

          </div>

          <div className="col-lg-4 d-flex flex-column align-items-center">
            <h4> {t('fSosyalTitle')}</h4>
            <p className="fs-3 d-flex justify-content-center">
              <a href="https://instagram.com/ardaterz_"  target="_blank" rel="noreferrer"  className='sosyal-icon me-2' >
                <i className="fa-brands fa-instagram" style={{ fontSize: "24px",paddingRight:"10px" }}>  </i>
              </a>
              <a href="https://twitter.com/ardaterz_" target="_blank" rel="noreferrer"  className='sosyal-icon me-2' >
                <i className="fa-brands fa-x-twitter" style={{ fontSize: "24px",paddingRight:"10px" }}> </i>
              </a>
              <a href="https://github.com/Ardaa82" target="_blank" rel="noreferrer"  className='sosyal-icon' >
                <i className="fa-brands fa-github" style={{ fontSize: "24px",paddingRight:"10px" }}>  </i>
              </a>
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-column align-items-center">
            <h5> {t('fCorporate')}</h5>
            <p> {t('fCorporateBlog')} <a href="https://ardablog.somee.com" target="_blank" rel="noreferrer" > <i className="fa-solid fa-up-right-from-square"  > </i></a></p>
            <a href="/Copyright">  <p>  {t('fCorporateCopyright')} </p> </a>
            <a href="/PrivacyPolicy">  <p>  {t('fCorporatePrivacy')} </p> </a>
            <a href="/toInform">  <p> {t('fCorporateInformation')}</p> </a>
          </div>
        </div>
          
        <p className="mt-4" >
          &copy; {currentDate} Arda INC. | {t('fBottomText')}
        </p>
      </div>
    </div>
  );
}

export default Footer;
