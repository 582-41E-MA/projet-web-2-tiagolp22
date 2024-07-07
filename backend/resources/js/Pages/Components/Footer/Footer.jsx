import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import './Footer.css';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer-content">
          <div className="footer-column">
            <img className='logo' src="../../../img/logo/logo.png" alt="logo" />
          </div>
          <div className="footer-column">
            <h4>{t('footer.search')}</h4>
            <InertiaLink href="/search" className="footer-link">{t('footer.suv')}</InertiaLink>
            <InertiaLink href="/search/trucks" className="footer-link">{t('footer.trucks')}</InertiaLink>
            <InertiaLink href="/search/cars" className="footer-link">{t('footer.cars')}</InertiaLink>
          </div>
          <div className="footer-column">
            <h4>{t('footer.good_to_know')}</h4>
            <InertiaLink href="/faq" className="footer-link">{t('footer.faq')}</InertiaLink>
            <InertiaLink href="/tips" className="footer-link">{t('footer.tips')}</InertiaLink>
            <InertiaLink href="/guides" className="footer-link">{t('footer.guides')}</InertiaLink>
          </div>
          <div className="footer-column">
            <h4>{t('footer.about')}</h4>
            <InertiaLink href="/about" className="footer-link">{t('footer.our_story')}</InertiaLink>
            <InertiaLink href="/team" className="footer-link">{t('footer.team')}</InertiaLink>
            <InertiaLink href="/contact" className="footer-link">{t('footer.contact_us')}</InertiaLink>
          </div>
        </div>
      </div>
      <div className="footer-text">
        &copy; 2024 QuebeCar. {t('footer.rights_reserved')}
      </div>
    </footer>
  );
}

export default Footer;
