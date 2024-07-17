import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Contact.css'; // Assurez-vous d'importer vos styles CSS personnalisés ici

const Contact = () => {
    const { t } = useTranslation();


    const contactInfo = {
        address: '123 Rue Sherbrooke, Montréal, QC',
        phone: '+1 123 456 7890',
        email: 'Quebecar@contact.com',
    };

    return (
        <>
            <Header />
            <div className="contact-container">
                <h1 className="contact-title">{t('contact.title')}</h1>
                <div className="contact-info">
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                        <span>{contactInfo.address}</span>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faPhone} className="icon" />
                        <span>{contactInfo.phone}</span>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <span>{contactInfo.email}</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
