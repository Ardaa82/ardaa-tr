import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguages(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: 'flag-icon-us' },
    { code: 'tr', name: 'Türkçe', flag: 'flag-icon-tr' }
  ];

  return (
    <Navbar variant="dark">
      <Navbar.Toggle aria-controls="language-navbar" />
      <Navbar.Collapse id="language-navbar">
        <Nav className="mr-auto">
          <Dropdown show={showLanguages} onToggle={(isOpen) => setShowLanguages(isOpen)}>
            <Dropdown.Toggle variant="dark" id="language-dropdown"> {/* Changed variant to "dark" */}
              <span className={`flag-icon ${languages.find(lang => lang.code === i18n.language)?.flag}`} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="flex-row bg-dark"> {/* Added bg-dark class */}
              {languages.map((lang) => (
                <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)} className="text-light"> {/* Added text-light class */}
                  <span className={`flag-icon ${lang.flag}`} />
                  {' '}
                  {lang.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LanguageSelector;
