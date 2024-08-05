import React from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './TypeCarburantIndex.css';

const TypeCarburantIndex = ({ onEdit }) => {
    const { props } = usePage();
    const { typesCarburant } = props;
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce type de carburant ?')) {
            router.delete(`/type-carburants/${id}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };
    const handleEdit = (id) => {
        console.log('Edit ID:', id);
        onEdit(id);  // Utilisez la fonction onEdit passée en prop
    };

    return (
        <div className="type-carburant-index-container">
            <h1>{t('typeCarburant.index_title')}</h1>
            <div className="type-carburant-list">
                {typesCarburant.map((typeCarburant) => (
                    <div key={typeCarburant.id_type_carburant} className="type-carburant-item">
                        <div>
                            <strong>{typeCarburant.type_carburant[currentLanguage]}</strong>
                        </div>
                        <div className="type-carburant-actions">
                            <button
                                onClick={() => {
                                    console.log('Clicked Edit Button');
                                    handleEdit(typeCarburant.id_type_carburant);
                                }}
                                className="edit-button"
                            >
                                {t('edit')}
                            </button>
                            <button
                                onClick={() => handleDelete(typeCarburant.id_type_carburant)}
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

export default TypeCarburantIndex;