import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap'; // Bootstrap Card component
import '../style/style.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title = 'ArdaAstra | Ana Sayfa';
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 mt-4"> {/* Ana içerik */}
          <h1 className="text-center mb-4">ArdaAstra</h1>
          <p className="text-center">
            {t('hTitle')}
          </p>
        </div>
        <div className="col-md-2 mt-4"> 
        </div>
      </div>
    </div>
  );
};

export default Home;
