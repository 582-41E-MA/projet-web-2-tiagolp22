import React from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import './VilleIndex.css';

const VilleIndex = ({ villes, onEdit }) => {
    const { t } = useTranslation();

    const handleDelete = async (id) => {
        if (window.confirm(t('ville.confirm_delete'))) {
            try {
                await router.delete(`/villes/${id}`);
            } catch (error) {
                console.error('Error deleting ville:', error);
                alert(t('ville.delete_error'));
            }
        }
    };

    return (
        <div className="dashboard-index-container">
            <h1>{t('ville.index_title')}</h1>
            <div className="dashboard-list">
                {villes.map((ville) => (
                    <div key={ville.id_ville} className="dashboard-item">
                        <div>
                            <strong>{ville.nom_ville}</strong> - {ville.province.nom_province}
                        </div>
                        <div className="dashboard-actions">
                            <button 
                                onClick={() => onEdit(ville.id_ville)}
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
    );
};

export default VilleIndex;
