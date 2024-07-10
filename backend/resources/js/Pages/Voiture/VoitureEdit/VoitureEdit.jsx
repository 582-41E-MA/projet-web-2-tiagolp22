import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './VoitureEdit.css'; // Assurez-vous de créer ce fichier CSS

const VoitureEdit = ({ voiture }) => {
  const { t, i18n } = useTranslation();

  // Utilisation du hook useForm pour gérer le formulaire
  const { data, setData, put, errors } = useForm({
    // Initialisation des données avec les valeurs de la voiture et décodage des champs nécessaires
    ...voiture,
    couleur: JSON.parse(voiture.couleur),
    description: JSON.parse(voiture.description),
    etat_vehicule: JSON.parse(voiture.etat_vehicule),
  });

  // Fonction de gestion du changement de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoi de la requête PUT pour mettre à jour la voiture
    put(`/voitures/${voiture.id}`, data)
      .then(() => {
        console.log('Voiture mise à jour avec succès !');
        // Redirection ou autre action en cas de succès
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la voiture :', error);
        // Gestion des erreurs ici
      });
  };

  return (
    <>
      <Header />
      <div className="voiture-edit-container">
        <h1 className="voiture-edit-title">{t('car.edit_title', { id: voiture.id })}</h1>
        <form className="voiture-edit-form" onSubmit={handleSubmit}>
          <div className="voiture-edit-form-group">
            <label>{t('car.model')}</label>
            <select
              name="modele_id"
              value={data.modele_id}
              onChange={handleChange}
            >
              {/* Options à remplacer avec la logique pour afficher les modèles */}
            </select>
            {errors.modele_id && <div className="error">{errors.modele_id}</div>}
          </div>
          <div className="voiture-edit-form-group">
            <label>{t('car.year')}</label>
            <input
              type="text"
              name="annee"
              value={data.annee}
              onChange={handleChange}
            />
            {errors.annee && <div className="error">{errors.annee}</div>}
          </div>
          <div className="voiture-edit-form-group">
            <label>{t('car.sale_price')}</label>
            <input
              type="text"
              name="prix_vente"
              value={data.prix_vente}
              onChange={handleChange}
            />
            {errors.prix_vente && <div className="error">{errors.prix_vente}</div>}
          </div>
          <div className="voiture-edit-form-group">
            <label>{t('car.vehicle_condition')}</label>
            <select
              name="etat_vehicule"
              value={data.etat_vehicule[i18n.language]}
              onChange={handleChange}
            >
              <option value="Neuf">Neuf</option>
              <option value="Occasion">Occasion</option>
            </select>
            {errors.etat_vehicule && <div className="error">{errors.etat_vehicule}</div>}
          </div>
          <div className="voiture-edit-form-group">
            <label>{t('car.color')}</label>
            <input
              type="text"
              name="couleur"
              value={data.couleur[i18n.language]}
              onChange={handleChange}
            />
            {errors.couleur && <div className="error">{errors.couleur}</div>}
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
              value={data.description[i18n.language]}
              onChange={handleChange}
            ></textarea>
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
          {/* Ajoutez plus de champs au besoin */}
          <button type="submit" className="voiture-edit-submit-button">Enregistrer</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default VoitureEdit;
