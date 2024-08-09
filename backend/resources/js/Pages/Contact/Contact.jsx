import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Contact.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  const { t } = useTranslation();

  // Informações de contato
  const contactInfo = {
    address: '123 Rue Sherbrooke, Montréal, QC',
    phone: '+1 123 456 7890',
    email: 'Quebecar@contact.com',
    mapsUrl: 'https://www.google.com/maps?q=23+Rue+Sherbrooke,+Montréal,+QC',
    hours: {
      weekday: '9:00 - 18:00',
      saturday: '10:00 - 16:00',
      sunday: 'Closed'
    },
    social: {
      facebook: 'https://www.facebook.com/Quebecar',
      twitter: 'https://www.twitter.com/Quebecar',
      instagram: 'https://www.instagram.com/Quebecar'
    }
  };

  return (
    <>
      <Header />
      <main className="contact-container">
        <div className="welcome-message">
          <h2>{t('contact.welcome')}</h2>
          <p>{t('contact.welcomeMessage')}</p>
        </div>

        <h1 className="contact-title">{t('contact.title')}</h1>

        <div className="contact-info">
          <div className="contact-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
            <a href={contactInfo.mapsUrl} target="_blank" rel="noopener noreferrer">
              {contactInfo.address}
            </a>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} className="icon" />
            <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faClock} className="icon" />
            <div className="hours">
              <p>{t('contact.hours.weekday')}: {contactInfo.hours.weekday}</p>
              <p>{t('contact.hours.saturday')}: {contactInfo.hours.saturday}</p>
              <p>{t('contact.hours.sunday')}: {contactInfo.hours.sunday}</p>
            </div>
          </div>
        </div>

        <div className="social-media">
          <h2>{t('contact.followUs')}</h2>
          <div className="social-icons">
            <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            </a>
            <a href={contactInfo.social.twitter} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            </a>
            <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
          </div>
        </div>

    
      </main>
      <Footer />
    </>
  );
}

export default Contact;
