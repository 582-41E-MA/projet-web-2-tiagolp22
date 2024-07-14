import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './VilleIndex.css';

const VilleIndex = ({ villes }) => {
    const { t } = useTranslation();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/villes/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao excluir ville:', error);
        }
    };

    const handleEdit = (id) => {
        router.visit(`/villes/${id}/edit`);
    };

    return (
        <>
            <Header />
            <div className="ville-index-container">
                <h1>{t('ville.index_title')}</h1>
                <div className="ville-list">
                    {villes.map((ville) => (
                        <div key={ville.id_ville} className="ville-item">
                            <div>
                                <strong>{ville.nom_ville}</strong> - {ville.province.nom_province}
                            </div>
                            <div className="ville-actions">
                                <button 
                                    onClick={() => handleEdit(ville.id_ville)}
                                    className="edit-button"
                                >
                                    {t('ville.edit_button')}
                                </button>
                                <button 
                                    onClick={() => handleDelete(ville.id_ville)}
                                    className="delete-button"
                                >
                                    {t('ville.delete_button')}
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

export default VilleIndex;
