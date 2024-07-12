import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { router } from '@inertiajs/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Modele.css';

const ModeleIndex = ({ modeles }) => {
    const { t } = useTranslation();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/modele/${id}`);
            window.location.reload(); 
        } catch (error) {
            console.error('Error deleting modele:', error);
        }
    };

    const handleEdit = (id) => {
        router.visit(`/modeles/${id}/edit`);
    };

    return (
        <>
            <Header />
            <div className="modele-index-container">
                <h1>{t('model.index_title')}</h1>
                <div className="modele-list">
                    {modeles.map((modele) => (
                        <div key={modele.id_modele} className="modele-item">
                            <div>
                                <strong>{modele.nom_modele}</strong> - {modele.constructeur.nom_constructeur}
                            </div>
                            <div className="modele-actions">
                                <button 
                                    onClick={() => handleEdit(modele.id_modele)}
                                    className="edit-button"
                                >
                                    {t('model.edit_button')}
                                </button>
                                <button 
                                    onClick={() => handleDelete(modele.id_modele)}
                                    className="delete-button"
                                >
                                    {t('model.delete_button')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ModeleIndex;