import React from 'react';
import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './VoitureIndex.css'; 

const VoitureIndex = ({ voitures = [], onEdit }) => {
   console.log(voitures);
    const { t, i18n } = useTranslation();

    const handleDelete = (id) => {
        if (confirm(t('voitures.confirm_delete'))) {
            router.delete(`/voitures/${id}`, {
                onSuccess: () => {
                    console.log("Voiture supprimée avec succès");
                },
                onError: (errors) => {
                    console.error("Erreur lors de la suppression de la voiture", errors);
                },
            });
        }
    };

    return (
        <div className="dashboard-index-container">
            <h1>{t('voitures.list_title')}</h1>
            <div className="dashboard-list">
                {voitures.length > 0 ? (
                    voitures.map(voiture => {
                      
                        return (
                            <div key={voiture.id_voiture} className="dashboard-item">
                                <div className="dashboard-car-info">
                                    <img
                                        src={voiture.photo_url || "../../../img/car/default_car.png"}
                                        alt={voiture.modele.nom_modele}
                                        className="car-photo"
                                    />
                                    <div className="car-details">
                                        <h3 className="car-title">
                                            {voiture.annee} {voiture.modele.constructeur.nom_constructeur} {voiture.modele.nom_modele}
                                        </h3>
                                    
                                    </div>
                                </div>
                                <div className="dashboard-actions">
                                    <button
                                        onClick={() => onEdit(voiture)}
                                        className="edit-button"
                                    >
                                        {t('voitures.edit')}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(voiture.id_voiture)}
                                        className="delete-button"
                                    >
                                        {t('voitures.delete')}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>{t('voitures.no_data')}</p> // Message à afficher si aucune voiture n'est disponible
                )}
            </div>
        </div>
    );
};

export default VoitureIndex;
