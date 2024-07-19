import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './About.css';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="about-container">
        <h1 className="about-title">{t('about.title')}</h1>
        <section className="about-content">
          <div className="about-item fade-in">
            <h2>{t('about.history.title')}</h2>
            <p>{t('about.history.content')}</p>
          </div>
          <div className="about-item slide-in-left">
            <h2>{t('about.mission.title')}</h2>
            <p>{t('about.mission.content')}</p>
          </div>
          <div className="about-item slide-in-right">
            <h2>{t('about.values.title')}</h2>
            <ul>
              <li>{t('about.values.transparency')}</li>
              <li>{t('about.values.quality')}</li>
              <li>{t('about.values.customerService')}</li>
              <li>{t('about.values.environment')}</li>
            </ul>
          </div>
        </section>
        <section className="about-services">
          <h2>{t('about.services.title')}</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>{t('about.services.newCars.title')}</h3>
              <p>{t('about.services.newCars.content')}</p>
            </div>
            <div className="service-item">
              <h3>{t('about.services.usedCars.title')}</h3>
              <p>{t('about.services.usedCars.content')}</p>
            </div>
            <div className="service-item">
              <h3>{t('about.services.financing.title')}</h3>
              <p>{t('about.services.financing.content')}</p>
            </div>
            <div className="service-item">
              <h3>{t('about.services.afterSales.title')}</h3>
              <p>{t('about.services.afterSales.content')}</p>
            </div>
          </div>
        </section>
        <section className="about-cta">
          <h2>{t('about.cta.title')}</h2>
          <p>{t('about.cta.content')}</p>
          <Link href={`/voitures`} className="cta-button">
            {t('about.cta.button')}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;