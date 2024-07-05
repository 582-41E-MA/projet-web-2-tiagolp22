import React, { useState, useEffect } from 'react';

import { useForm } from '@inertiajs/inertia-react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const VoitureCreate = () => {
  const { t, i18n } = useTranslation(); // Uso de useTranslation para obter t e i18n
    const { data, setData, post, processing, errors } = useForm({
        modele_id: '',
        annee: '',
        date_arrivee: '',
        prix_achat: '',
        prix_vente: '',
        couleur: '',
        type_transmission_id: '',
        groupe_motopropulseur_id: '',
        type_carburant_id: '',
        carrosserie_id: '',
        nombre_portes: '',
        nombre_places: '',
        kilometrage: '',
        description: '',
        etat_vehicule: '',
        commandes_id_commande: null,
    });

    // State pour stocker les options des selects
    const [modeles, setModeles] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [groupesMotopropulseur, setGroupesMotopropulseur] = useState([]);
    const [carburants, setCarburants] = useState([]);
    const [carrosseries, setCarrosseries] = useState([]);

    // Fonction pour charger les options depuis la base de données
    const fetchOptions = async () => {
        try {
            const [modelesResponse, transmissionsResponse, groupesResponse, carburantsResponse, carrosseriesResponse] = await Promise.all([
            axios.get('http://127.0.0.1:8000/modeles'),
                axios.get('http://127.0.0.1:8000/transmissions'),
                axios.get('http://127.0.0.1:8000/groupes_motopropulseur'),
                axios.get('http://127.0.0.1:8000/typecarburants'),
                axios.get('http://127.0.0.1:8000/carrosseries'),
            ]);

            setModeles(modelesResponse.data);
            setTransmissions(transmissionsResponse.data);
            setGroupesMotopropulseur(groupesResponse.data);
            setCarburants(carburantsResponse.data);
            setCarrosseries(carrosseriesResponse.data);
        } catch (error) {
            console.error('Erreur lors du chargement des options : ', error);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/voitures', {
            data,
            onSuccess: () => {
                console.log('Voiture créée avec succès!');
                // Redirection ou affichage d'un message de succès
            },
            onError: (errors) => {
                console.error('Erreur lors de la création de la voiture', errors);
            },
        });
    };

    return (
        <>
            <Header />
            <div className="form-container">
            <img className='logo_formulaire' src="../../../img/logo/logo.png" alt="Logo" />
                <h3>{t('car_create.title')}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="modele_id">{t('car_create.model')}</label>
                        <select
                        className="form-select"
                            name="modele_id"
                            id="modele_id"
                            value={data.modele_id}
                            onChange={(e) => setData('modele_id', e.target.value)}
                        >
                            <option value="">{t('car_create.select_option')}</option>
                            {modeles.map((modele) => (
                                <option className="form-option" key={modele.id} value={modele.id}>
                                    {modele.nom_modele}
                                </option>
                            ))}
                        </select>
                        {errors.modele_id && <span className="error">{errors.modele_id}</span>}
                    </div>

                    <div className="form-group">
    <label htmlFor="annee">{t('car_create.year')}</label>
    <select
    className="form-select"
        name="annee"
        id="annee"
        value={data.annee}
        onChange={(e) => setData('annee', e.target.value)}
    >
        <option className="form-option" value="">{t('car_create.select_option')}</option>
        {Array.from({ length: 35 }, (_, index) => 1990 + index).map((year) => (
            <option className="form-option" key={year} value={year}>
                {year}
            </option>
        ))}
    </select>
    {errors.annee && <span className="error">{errors.annee}</span>}
</div>

                    <div className="form-group">
                        <label htmlFor="date_arrivee">{t('car_create.arrival_date')}</label>
                        <input
                            className='date'
                            type="date"
                            name="date_arrivee"
                            id="date_arrivee"
                            value={data.date_arrivee}
                            onChange={(e) => setData('date_arrivee', e.target.value)}
                        />
                        {errors.date_arrivee && <span className="error">{errors.date_arrivee}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="prix_achat">{t('car_create.purchase_price')}</label>
                        <input
                            type="text"
                            name="prix_achat"
                            id="prix_achat"
                            value={data.prix_achat}
                            onChange={(e) => setData('prix_achat', e.target.value)}
                        />
                        {errors.prix_achat && <span className="error">{errors.prix_achat}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="prix_vente">{t('car_create.sale_price')}</label>
                        <input
                            type="text"
                            name="prix_vente"
                            id="prix_vente"
                            value={data.prix_vente}
                            onChange={(e) => setData('prix_vente', e.target.value)}
                        />
                        {errors.prix_vente && <span className="error">{errors.prix_vente}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="couleur">{t('car_create.color')}</label>
                        <input
                            type="text"
                            name="couleur"
                            id="couleur"
                            value={data.couleur}
                            onChange={(e) => setData('couleur', e.target.value)}
                        />
                        {errors.couleur && <span className="error">{errors.couleur}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="type_transmission_id">{t('car_create.transmission_type')}</label>
                        <select
                        className="form-select"
                            name="type_transmission_id"
                            id="type_transmission_id"
                            value={data.type_transmission_id}
                            onChange={(e) => setData('type_transmission_id', e.target.value)}
                        >
                            <option value="">{t('car_create.select_option')}</option>
                            {transmissions.map((transmission) => (

                              <option  className="form-option" key={transmission.id} value={transmission.id}>

                              {i18n.language === 'en' ?
                                  JSON.parse(transmission.type_transmission).en :
                                  JSON.parse(transmission.type_transmission).fr
                              }
                          </option>
                            ))}
                        </select>
                        {errors.type_transmission_id && <span className="error">{errors.type_transmission_id}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="groupe_motopropulseur_id">{t('car_create.powertrain_group')}</label>
                        <select
                        className="form-select"
                            name="groupe_motopropulseur_id"
                            id="groupe_motopropulseur_id"
                            value={data.groupe_motopropulseur_id}
                            onChange={(e) => setData('groupe_motopropulseur_id', e.target.value)}
                        >
                            <option className="form-option" value="">{t('car_create.select_option')}</option>
                            {groupesMotopropulseur.map((groupe) => (
                              <option key={groupe.id} value={groupe.id}>
                              {i18n.language === 'en' ?
                                  JSON.parse(groupe.type_groupe_motopropulseur).en :
                                  JSON.parse(groupe.type_groupe_motopropulseur).fr
                              }
                          </option>
                            ))}
                        </select>
                        {errors.groupe_motopropulseur_id && <span className="error">{errors.groupe_motopropulseur_id}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="type_carburant_id">{t('car_create.fuel_type')}</label>
                        <select
                        className="form-select"
                            name="type_carburant_id"
                            id="type_carburant_id"
                            value={data.type_carburant_id}
                            onChange={(e) => setData('type_carburant_id', e.target.value)}
                        >

                        <option value="">{t('car_create.select_option')}</option>

                            {carburants.map((carburant) => {
                                console.log(carburant)
                            return (
                                

                                <option className="form-option" key={carburant.id} value={carburant.id}>

                                {i18n.language === 'en' ?
                                    JSON.parse(carburant.type_carburant).en :
                                    JSON.parse(carburant.type_carburant).fr
                                }
                            </option>
                            
                            );
})}
                        </select>
                        {errors.type_carburant_id && <span className="error">{errors.type_carburant_id}</span>}
                    </div>

                    <div className="form-group">

    <label htmlFor="carrosserie_id">{t('car_create.body_type')}</label>
    <select
        className="form-select"
        name="carrosserie_id"
        id="carrosserie_id"
        value={data.carrosserie_id}
        onChange={(e) => setData('carrosserie_id', e.target.value)}
    >
        <option value="">{t('car_create.select_option')}</option>
        {carrosseries.map((carrosserie) => (
            <option className="form-option" key={carrosserie.id} value={carrosserie.id}>
                {i18n.language === 'en' ? JSON.parse(carrosserie.type_carrosserie).en : JSON.parse(carrosserie.type_carrosserie).fr}
            </option>
        ))}
    </select>
    {errors.carrosserie_id && <span className="error">{errors.carrosserie_id}</span>}
</div>


                    <div className="form-group">
                        <label htmlFor="nombre_portes">{t('car_create.number_of_doors')}</label>
                        <input
                            type="text"
                            name="nombre_portes"
                            id="nombre_portes"
                            value={data.nombre_portes}
                            onChange={(e) => setData('nombre_portes', e.target.value)}
                        />
                        {errors.nombre_portes && <span className="error">{errors.nombre_portes}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre_places">{t('car_create.number_of_seats')}</label>
                        <input
                            type="text"
                            name="nombre_places"
                            id="nombre_places"
                            value={data.nombre_places}
                            onChange={(e) => setData('nombre_places', e.target.value)}
                        />
                        {errors.nombre_places && <span className="error">{errors.nombre_places}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="kilometrage">{t('car_create.mileage')}</label>
                        <input
                            type="text"
                            name="kilometrage"
                            id="kilometrage"
                            value={data.kilometrage}
                            onChange={(e) => setData('kilometrage', e.target.value)}
                        />
                        {errors.kilometrage && <span className="error">{errors.kilometrage}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">{t('car_create.description')}</label>
                        <textarea
                         className="form-textarea"
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <span className="error">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="etat_vehicule">{t('car_create.vehicle_condition')}</label>
                        <input
                            type="text"
                            name="etat_vehicule"
                            id="etat_vehicule"
                            value={data.etat_vehicule}
                            onChange={(e) => setData('etat_vehicule', e.target.value)}
                        />
                        {errors.etat_vehicule && <span className="error">{errors.etat_vehicule}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="commandes_id_commande">{t('car_create.order_id')}</label>
                        <input
                            type="text"
                            name="commandes_id_commande"
                            id="commandes_id_commande"
                            value={data.commandes_id_commande}
                            onChange={(e) => setData('commandes_id_commande', e.target.value)}
                        />
                        {errors.commandes_id_commande && <span className="error">{errors.commandes_id_commande}</span>}
                    </div>

                    <button type="submit" disabled={processing}>
                        {t('car_create.submit_button')}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default VoitureCreate;
