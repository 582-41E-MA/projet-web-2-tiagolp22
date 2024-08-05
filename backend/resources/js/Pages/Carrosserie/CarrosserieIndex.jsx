import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './CarrosserieIndex.css';

const CarrosserieIndex = ({ onEdit }) => {
    const { props } = usePage();
    const { carrosseries } = props;
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const handleDelete = async (id) => {
        if (confirm(t('carrosserie.confirm_delete'))) {
            try {
                await axios.delete(`/carrosseries/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting carrosserie:', error);
            }
        }
    };

    const handleEdit = (id) => {
        onEdit(id);
    };

    return (
        <div className="carrosserie-index-container">
            <h1>{t('carrosserie.index_title')}</h1>
            <div className="carrosserie-list">
                {carrosseries.map((carrosserie) => (
                    <div key={carrosserie.id_carrosserie} className="carrosserie-item">
                        <div>
                            <strong>{JSON.parse(carrosserie.type_carrosserie)[currentLanguage]}</strong>
                        </div>
                        <div className="carrosserie-actions">
                            <button
                                onClick={() => handleEdit(carrosserie.id_carrosserie)}
                                className="edit-button"
                            >
                                {t('edit')}
                            </button>
                            <button
                                onClick={() => handleDelete(carrosserie.id_carrosserie)}
                                className="delete-button"
                            >
                                {t('delete')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarrosserieIndex;