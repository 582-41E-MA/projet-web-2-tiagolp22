import React from 'react';
import { useTranslation } from 'react-i18next';
import './Error.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Error = ({ status, message }) => {
  const { t } = useTranslation();

  return (
    <div className="error-page">
      <Header />
      <main className="error-content">
        <h1 className="error-title">{t('error.title', { status: status || 404 })}</h1>
        <p className="error-message">{message || t('error.message')}</p>
        <a href="/" className="error-home-button">
          {t('error.back_to_home')}
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default Error;