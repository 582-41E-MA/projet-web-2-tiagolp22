import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './VoitureEdit.css';

const VoitureEdit = () => {
  
    const { t, i18n } = useTranslation();
    const { voiture, modeles } = usePage().props;

    useEffect(() => {
        console.log('Composant monté ou props mis à jour');
        console.log('Voiture:', voiture);
        console.log('Modeles:', modeles);
    }, [voiture, modeles]);

    if (!voiture || !modeles) {
        return <div>Erreur: Données manquantes</div>;
    }

    const { data, setData, put, processing, errors } = useForm({
      modele_id: voiture.modele_id,
      annee: voiture.annee,
      prix_vente: voiture.prix_vente,
      couleur: voiture.couleur ? voiture.couleur : { en: '', fr: '' },
      etat_vehicule: voiture.etat_vehicule ? voiture.etat_vehicule : { en: '', fr: '' },
      nombre_places: voiture.nombre_places,
      nombre_portes: voiture.nombre_portes,
      description: voiture.description ? voiture.description : { en: '', fr: '' },
  });
  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/voitures/${voiture.id_voiture}`, {
            preserveState: true,
                        onSuccess: () => {
            },
        });
    };

    return (
        <>
            <Header />
            <div className="voiture-edit-container">
                <h1 className="voiture-edit-title">{t('car.edit_title', { id: voiture.id_voiture })}</h1>
                <form className="voiture-edit-form" onSubmit={handleSubmit}>
                    <div className="voiture-edit-form-group">
                        <label>{t('car.model')}</label>
                        <select
                            name="modele_id"
                            value={data.modele_id}
                            onChange={handleChange}
                        >
                            {modeles.map((modele) => (
                                <option key={modele.id_modele} value={modele.id_modele}>
                                    {modele.nom_modele}
                                </option>
                            ))}
                        </select>
                        {errors.modele_id && <div className="error">{errors.modele_id}</div>}
                    </div>

                    <div className="voiture-edit-form-group">
                        <label>{t('car.year')}</label>
                        <input
                            type="number"
                            name="annee"
                            value={data.annee}
                            onChange={handleChange}
                        />
                        {errors.annee && <div className="error">{errors.annee}</div>}
                    </div>

                    <div className="voiture-edit-form-group">
                        <label>{t('car.sale_price')}</label>
                        <input
                            type="number"
                            name="prix_vente"
                            value={data.prix_vente}
                            onChange={handleChange}
                            step="0.01"
                        />
                        {errors.prix_vente && <div className="error">{errors.prix_vente}</div>}
                    </div>

                    <div className="voiture-edit-form-group">
                        <label>{t('car.color')}</label>
                        <input
                        type="text"
                        name="couleur"
                        value={data.couleur[i18n.language] || ''}
                        onChange={(e) => setData('couleur', { ...data.couleur, [i18n.language]: e.target.value })}
                    />
                        {errors.couleur && <div className="error">{errors.couleur}</div>}
                    </div>

                    <div className="voiture-edit-form-group">
                        <label>{t('car.vehicle_condition')}</label>
                        <input
                            type="text"
                            name="etat_vehicule"
                            value={data.etat_vehicule[i18n.language] || ''}
                            onChange={(e) => setData('etat_vehicule', { ...data.etat_vehicule, [i18n.language]: e.target.value })}
                        />
                        {errors.etat_vehicule && <div className="error">{errors.etat_vehicule}</div>}
                    </div>

                    <div className="voiture-edit-form-group">
                        <label>{t('car.number_of_seats')}</label>
                        <input
                            type="number"
                            name="nombre_places"
                            value={data.nombre_places}
                            onChange={handleChange}
                        />
                        {errors.nombre_places && <div className="error">{errors.nombre_places}</div>}
                    </div>

                    <div className="voiture-edit-form-group">
                        <label>{t('car.number_of_doors')}</label>
                        <input
                            type="number"
                            name="nombre_portes"
                            value={data.nombre_portes}
                            onChange={handleChange}
                        />
                        {errors.nombre_portes && <div className="error">{errors.nombre_portes}</div>}
                    </div>

                    <div className="voiture-edit-form-group">
                        <label>{t('car.description')}</label>
                        <textarea
                            name="description"
                            value={data.description[i18n.language] || ''}
                            onChange={(e) => setData('description', { ...data.description, [i18n.language]: e.target.value })}
                        ></textarea>
                        {errors.description && <div className="error">{errors.description}</div>}
                    </div>

                    <button type="submit" className="voiture-edit-submit-button" disabled={processing}>
                        {t('save_changes')}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default VoitureEdit;
