import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { router } from '@inertiajs/react';
import './ProvinceIndex.css';

const ProvinceIndex = ({ provinces, onEdit }) => {
    const { t } = useTranslation();

    const handleDelete = async (id) => {
        if (window.confirm(t('province.confirm_delete'))) {
            try {
                await axios.delete(`/provinces/${id}`);
                router.reload({ only: ['provinces'] });
            } catch (error) {
                console.error('Error deleting province:', error);
                alert(t('province.delete_error'));
            }
        }
    };

    return (
        <div className="dashboard-index-container">
            <h1>{t('province.index_title')}</h1>
            <div className="dashboard-list">
                {provinces.map((province) => (
                    <div key={province.id_province} className="dashboard-item">
                        <div>
                            <strong>{province.nom_province}</strong>
                        </div>
                        <div className="dashboard-actions">
                            <button 
                                onClick={() => onEdit(province.id_province)}
                                className="edit-button"
                            >
                                {t('province.edit_button')}
                            </button>
                            <button 
                                onClick={() => handleDelete(province.id_province)}
                                className="delete-button"
                            >
                                {t('province.delete_button')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProvinceIndex;
