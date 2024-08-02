import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { router } from '@inertiajs/react';
import './ModeleIndex.css';

const ModeleIndex = ({ modeles, onEdit }) => {
    const { t } = useTranslation();

    const handleDelete = async (id) => {
        if (window.confirm(t('model.confirm_delete'))) {
            try {
                await axios.delete(`/modeles/${id}`);
                router.reload({ only: ['modeles'] });
            } catch (error) {
                console.error('Error deleting modele:', error);
                alert(t('model.delete_error'));
            }
        }
    };

    return (
        <div className="dashboard-index-container">
            <h1>{t('model.index_title')}</h1>
            <div className="dashboard-list">
                {modeles.map((modele) => (
                    <div key={modele.id_modele} className="dashboard-item">
                        <div>
                            <strong>{modele.nom_modele}</strong> - {modele.constructeur.nom_constructeur}
                        </div>
                        <div className="dashboard-actions">
                            <button 
                                onClick={() => onEdit(modele.id_modele)}
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
    );
};

export default ModeleIndex;