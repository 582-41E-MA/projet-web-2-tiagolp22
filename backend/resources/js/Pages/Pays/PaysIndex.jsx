import React from 'react';
import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './PaysIndex.css';

const PaysIndex = ({ pays, onEdit }) => {
    const { t, i18n } = useTranslation();

    const handleDelete = (id) => {
        if (confirm(t('pays.confirm_delete'))) {
            router.delete(`/pays/${id}`, {
                onSuccess: () => {
                    console.log("Pays supprimé avec succès");
                    // Atualizar a página ou redirecionar conforme nécessaire
                },
                onError: (errors) => {
                    console.error("Erreur lors de la suppression du pays", errors);
                },
            });
        }
    };

    return (
        <div className="dashboard-index-container">
            <h1>{t('pays.list_title')}</h1>
            <div className="dashboard-list">
                {pays.map(p => {
                    let nomPays = {};
                    try {
                        nomPays = JSON.parse(p.nom_pays);
                    } catch (error) {
                        console.error("Erreur lors de l'analyse du nom du pays:", error);
                        nomPays = { en: 'Invalid JSON', fr: 'JSON invalide' };
                    }

                    return (
                        
                            <div key={p.id_pays} className="dashboard-item">
                                    <div className="dashboard-name">
                                        {i18n.language === 'en' ? nomPays.en : nomPays.fr}
                                    </div>
                                    <div className="dashboard-actions">
                                        <button
                                            onClick={() => onEdit(p)}
                                            className="edit-button"
                                        >
                                            {t('pays.edit')}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id_pays)}
                                            className="delete-button"
                                        >
                                            {t('pays.delete')}
                                        </button>
                                    </div>
                                </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PaysIndex;
