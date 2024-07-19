import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { router } from '@inertiajs/react';
import './ConstructeurIndex.css'; 

const ConstructeurIndex = ({ constructeurs }) => {
    const { t } = useTranslation();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/constructeur/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting constructeur:', error);
        }
    };

    const handleEdit = (id) => {
        router.visit(`/constructeur/${id}/edit`);
    };

    return (
        <>
            <div className="constructeur-index-container">
                <h1>{t('constructeur.index_title')}</h1>
                <div className="constructeur-list">
                    {constructeurs.map((constructeur) => (
                        <div key={constructeur.id_constructeur} className="constructeur-item">
                            <div>
                                <strong>{constructeur.nom_constructeur}</strong> - {constructeur.pays_origine}
                            </div>
                            <div className="constructeur-actions">
                                <button 
                                    onClick={() => handleEdit(constructeur.id_constructeur)}
                                    className="edit-button"
                                >
                                    {t('edit')}
                                </button>
                                <button 
                                    onClick={() => handleDelete(constructeur.id_constructeur)}
                                    className="delete-button"
                                >
                                    {t('delete')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ConstructeurIndex;
