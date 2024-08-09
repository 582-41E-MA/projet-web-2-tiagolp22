import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './VoitureEdit.css';

const VoitureEdit = ({
    voiture,
    typesCarburant = [],
    modeles = [],
    transmissions = [],
    groupesMotopropulseur = [],
    carrosseries = [],
    privilege_id
}) => {
    // console.log('Props reçues:', { voiture, typesCarburant, modeles, transmissions, groupesMotopropulseur, carrosseries, privilege_id });
    const { t, i18n } = useTranslation();
    const [currentPhotos, setCurrentPhotos] = useState(voiture.photos || []);
    const [newPhotosPreviews, setNewPhotosPreviews] = useState([]);
    const [newPhotoCount, setNewPhotoCount] = useState(0);

    const parseJsonField = (field) => {
        if (typeof field === 'string') {
            try {
                return JSON.parse(field);
            } catch (e) {
                console.error('Erreur de parsing JSON:', e);
                return {};
            }
        }
        return field;
    };

    const fields = [
        { key: "modele_id", message: "model_required" },
        { 
            key: "annee", 
            message: "year_invalid", 
            validate: (value) => value && parseInt(value) >= 1900 && parseInt(value) <= new Date().getFullYear() + 1 
        },
        { key: "date_arrivee", message: "arrival_date_required" },
        { 
            key: "prix_vente", 
            message: "sale_price_invalid", 
            validate: (value) => value && !isNaN(value) && parseFloat(value) > 0 
        },
        { key: "prix_achat", message: "purchase_price_invalid", validate: (value) => !isNaN(value) && value >= 0 },
        { 
            key: "couleur", 
            message: "color_required", 
            validate: (value) => value && value[i18n.language] && value[i18n.language].trim() !== '' 
        },
        { 
            key: "etat_vehicule", 
            message: "vehicle_condition_required", 
            validate: (value) => value && value[i18n.language] && value[i18n.language].trim() !== '' 
        },
        { key: "type_transmission_id", message: "transmission_type_required" },
        { key: "groupe_motopropulseur_id", message: "powertrain_group_required" },
        { key: "type_carburant_id", message: "fuel_type_required" },
        { key: "carrosserie_id", message: "body_type_required" },
        { key: "nombre_portes", message: "number_of_doors_invalid", validate: (value) => !isNaN(value) && value >= 1 },
        { key: "nombre_places", message: "number_of_seats_invalid", validate: (value) => !isNaN(value) && value >= 1 },
        { key: "kilometrage", message: "mileage_invalid", validate: (value) => !isNaN(value) && value >= 0 },
        { 
            key: "description", 
            message: "description_required", 
            validate: (value) => value && value[i18n.language] && value[i18n.language].trim() !== '' 
        },
    ];

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        modele_id: voiture.modele_id || '',
        annee: voiture.annee || '',
        date_arrivee: voiture.date_arrivee || '',
        prix_achat: voiture.prix_achat || '',
        prix_vente: voiture.prix_vente || '',
        couleur: parseJsonField(voiture.couleur),
        etat_vehicule: parseJsonField(voiture.etat_vehicule),
        nombre_places: voiture.nombre_places || '',
        nombre_portes: voiture.nombre_portes || '',
        description: parseJsonField(voiture.description),
        kilometrage: voiture.kilometrage || '',
        currentPhotos: voiture.photos || [],
        photos: [],
        photos_to_delete: [],
        type_carburant_id: voiture.type_carburant_id || '',
        groupe_motopropulseur_id: voiture.groupe_motopropulseur_id || '',
        carrosserie_id: voiture.carrosserie_id || '',
        type_transmission_id: voiture.type_transmission_id || '',
    });
    const validateFields = () => {
        const newErrors = {};
        
        if (data.currentPhotos.length + data.photos.length < 3) {
            newErrors.photos = t('car.errors.minimum_photos_required');
        }
    
        fields.forEach(({ key, message, validate }) => {
            const value = data[key];
            if (!value || (validate && !validate(value))) {
                newErrors[key] = t(`car.errors.${message}`);
            }
        });
    
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const newFiles = Array.from(files);
            setData('photos', [...data.photos, ...newFiles]);
            const previews = newFiles.map(file => ({
                url: URL.createObjectURL(file),
                file: file
            }));
            setNewPhotosPreviews([...newPhotosPreviews, ...previews]);
            setNewPhotoCount(newFiles.length);
        } else if (name === 'couleur' || name === 'etat_vehicule' || name === 'description') {
            setData(name, { ...data[name], [i18n.language]: value });
        } else {
            setData(name, value);
        }
    };

    const handleDeletePhoto = (photoId) => {
        if (confirm('Voulez-vous vraiment supprimer cette photo ?')) {
            setData(prevData => ({
                ...prevData,
                currentPhotos: prevData.currentPhotos.filter(photo => photo.id !== photoId),
                photos_to_delete: [...prevData.photos_to_delete, photoId]
            }));
        }
    };

    const handleRemoveNewPhoto = (index) => {
        const newPreviews = [...newPhotosPreviews];
        newPreviews.splice(index, 1);
        setNewPhotosPreviews(newPreviews);

        const newPhotos = [...data.photos];
        newPhotos.splice(index, 1);
        setData('photos', newPhotos);
        setNewPhotoCount(newPhotos.length);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length > 0) {
            Object.keys(validationErrors).forEach((field) => {
                setError(field, validationErrors[field]);
            });
            return;
        }
    
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'photos') {
                data.photos.forEach((photo, index) => {
                    formData.append(`photos[${index}]`, photo);
                });
            } else if (key === 'photos_to_delete') {
                data.photos_to_delete.forEach((id, index) => {
                    formData.append(`photos_to_delete[${index}]`, id);
                });
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        });
    

        router.post(`/voitures/${voiture.id_voiture}`, formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <div className="form-container">
                <h1 className="voiture-edit-title">{t('car.edit_title', { id: voiture.id_voiture })}</h1>
                <form className="voiture-edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
    <label>{t('car.current_photos')}</label>
    <div className="current-photos">
        {data.currentPhotos && data.currentPhotos.map((photo) => (
            <div key={photo.id} className="photo-item">
                <img
                    src={`/storage/${photo.photos.replace('public/', '')}`}
                    alt="Voiture"
                    className="thumbnail"
                />
                <button
                    type="button"
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="delete-photo"
                >
                    X
                </button>
            </div>
        ))}
    </div>
</div>
                    <div className="form-group">
                        <label>{t('car.add_photos')}</label>
                        <input
                            type="file"
                            name="photos"
                            multiple
                            onChange={handleChange}
                        />
                        <span>{newPhotoCount} {t('car.photo_selected')}</span>
                        <div className="new-photos-preview">
                            {newPhotosPreviews.map((preview, index) => (
                                <div key={index} className="photo-item">
                                    <img src={preview.url} alt={`New photo ${index + 1}`} className="thumbnail" />
                                    <button type="button" onClick={() => handleRemoveNewPhoto(index)} className="delete-photo">
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="modele_id">{t("car.model")}</label>
                        <select
                            className="form-select"
                            name="modele_id"
                            id="modele_id"
                            value={data.modele_id}
                            onChange={(e) => setData("modele_id", e.target.value)}
                        >
                            <option value="">{t("car.select_option")}</option>
                            {modeles.map((modele) => (
                                <option
                                    className="form-option"
                                    key={modele.id_modele}
                                    value={modele.id_modele}
                                >
                                    {modele.nom_modele}
                                </option>
                            ))}
                        </select>
                        {errors.modele_id && <div className="error">{errors.modele_id}</div>}
                    </div>
                    <div className="form-group">
                        <label>{t('car.year')}</label>
                        <select
                            className="form-select"
                            name="annee"
                            id="annee"
                            value={data.annee}
                            onChange={(e) => setData("annee", e.target.value)}
                        >
                            <option className="form-option" value="">
                                {t("car.select_option")}
                            </option>
                            {Array.from(
                                { length: 35 },
                                (_, index) => 1990 + index
                            ).map((year) => (
                                <option
                                    className="form-option"
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="prix_vente">
                        {t("car.sale_price")}
                        </label>
                        <input
    type="number"
    id="prix_vente"
    name="prix_vente"
    className="form-control"
    value={data.prix_vente}
    onChange={(e) => setData("prix_vente", e.target.value)}
    disabled={privilege_id !== undefined && privilege_id !== 1}
/>
                        {errors.prix_vente && (
                            <div className="invalid-feedback">
                                {errors.prix_vente}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="prix_achat">
                            {t("car.purchase_price")}
                        </label>
                        <input
                            type="text"
                            name="prix_achat"
                            id="prix_achat"
                            value={data.prix_achat}
                            onChange={(e) =>
                                setData("prix_achat", e.target.value)
                            }
                        />
                        {errors.prix_achat && (
                            <span className="error">{errors.prix_achat}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="kilometrage">{t("car.mileage")}</label>
                        <input
                            type="text"
                            name="kilometrage"
                            id="kilometrage"
                            value={data.kilometrage}
                            onChange={(e) =>
                                setData("kilometrage", e.target.value)
                            }
                        />
                        {errors.kilometrage && (
                            <span className="error">{errors.kilometrage}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>{t('car.arrival_date')}</label>
                        <input type="date" name="date_arrivee" value={data.date_arrivee} onChange={handleChange} />
                        {errors.date_arrivee && <div className="error">{errors.date_arrivee}</div>}
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="couleur">{t("car.color")}</label>
                        <input
                            type="text"
                            name="couleur"
                            id="couleur"
                            value={data.couleur[i18n.language]}
                            onChange={(e) => {
                                setData("couleur", {
                                    ...data.couleur,
                                    [i18n.language]: e.target.value,
                                });
                            }}
                        />
                        {errors.couleur && (
                            <span className="error">{errors.couleur}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="etat_vehicule">{t('car.vehicle_condition')}</label>
                        <input
                            type="text"
                            name="etat_vehicule"
                            id="etat_vehicule"
                            value={data.etat_vehicule[i18n.language]}
                            onChange={(e) => {
                                setData("etat_vehicule", {
                                    ...data.etat_vehicule,
                                    [i18n.language]: e.target.value,
                                });
                            }}
                        />
                        {errors.etat_vehicule && (
                            <span className="error">
                                {errors.etat_vehicule}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre_places">
                            {t("car.number_of_seats")}
                        </label>
                        <input
                            type="text"
                            name="nombre_places"
                            id="nombre_places"
                            value={data.nombre_places}
                            onChange={(e) =>
                                setData("nombre_places", e.target.value)
                            }
                        />
                        {errors.nombre_places && (
                            <span className="error">
                                {errors.nombre_places}
                            </span>
                        )}
                    </div>


                    <div className="form-group">
                        <label htmlFor="nombre_portes">
                            {t("car.number_of_doors")}
                        </label>
                        <input
                            type="text"
                            name="nombre_portes"
                            id="nombre_portes"
                            value={data.nombre_portes}
                            onChange={(e) =>
                                setData("nombre_portes", e.target.value)
                            }
                        />
                        {errors.nombre_portes && (
                            <span className="error">
                                {errors.nombre_portes}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            {t("car.description")}
                        </label>
                        <textarea
                            className="form-textarea"
                            name="description"
                            id="description"
                            value={data.description[i18n.language]}
                            onChange={(e) => {
                                setData("description", {
                                    ...data.description,
                                    [i18n.language]: e.target.value,
                                });
                            }}
                        />
                        {errors.description && (
                            <span className="error">{errors.description}</span>
                        )}
                    </div>
                    <div className="form-group">
    <label>{t('car.fuel_type')}</label>
    <select
        className="form-select"
        name="type_carburant_id"
        id="type_carburant_id"
        value={data.type_carburant_id}
        onChange={(e) => setData("type_carburant_id", e.target.value)}
    >
        <option value="">{t("car.select_option")}</option>
        {typesCarburant.map((carburant) => (
            <option
                key={carburant.id_type_carburant}
                value={carburant.id_type_carburant}
            >
                {i18n.language === "en"
                    ? parseJsonField(carburant.type_carburant).en
                    : parseJsonField(carburant.type_carburant).fr}
            </option>
        ))}
    </select>
    {errors.type_carburant_id && <div className="error">{errors.type_carburant_id}</div>}
</div>

                    <div className="form-group">
                        <label>{t('car.engine_group')}</label>
                        <select
                            className="form-select"
                            name="groupe_motopropulseur_id"
                            id="groupe_motopropulseur_id"
                            value={data.groupe_motopropulseur_id}
                            onChange={(e) => {
                                const selectedGroupeId = e.target.value;
                                setData(
                                    "groupe_motopropulseur_id",
                                    selectedGroupeId
                                );
                            }}
                        >
                            <option className="form-option" value="">
                                {t("car.select_option")}
                            </option>
                            {groupesMotopropulseur.map((groupe) => (
                                <option
                                key={groupe.id_groupe_motopropulseur}
                                value={groupe.id_groupe_motopropulseur}
                            >
                                {i18n.language === "en"
                                    ? parseJsonField(groupe.type_groupe_motopropulseur).en
                                    : parseJsonField(groupe.type_groupe_motopropulseur).fr}
                            </option>
                            ))}
                        </select>
                        {errors.groupe_motopropulseur_id && <div className="error">{errors.groupe_motopropulseur_id}</div>}
                    </div>

                    <div className="form-group">
                        <label>{t('car.body_type')}</label>
                        <select
                            className="form-select"
                            name="carrosserie_id"
                            id="carrosserie_id"
                            value={data.carrosserie_id}
                            onChange={(e) => {
                                const selectedCarrosserieId = e.target.value;
                                setData(
                                    "carrosserie_id",
                                    selectedCarrosserieId
                                );
                            }}
                        >
                            <option value="">{t("car.select_option")}</option>
                            {carrosseries.map((carrosserie) => (
                                <option
                                className="form-option"
                                key={carrosserie.id_carrosserie}
                                value={carrosserie.id_carrosserie}
                            >
                                {i18n.language === "en"
                                    ? parseJsonField(carrosserie.type_carrosserie).en
                                    : parseJsonField(carrosserie.type_carrosserie).fr}
                            </option>
                            ))}
                        </select>
                        {errors.carrosserie_id && <div className="error">{errors.carrosserie_id}</div>}
                    </div>

                    <div className="form-group">
                        <label>{t('car.transmission_type')}</label>
                        <select
                                className="form-select"
                                name="type_transmission_id"
                                id="type_transmission_id"
                                value={data.type_transmission_id}
                                onChange={(e) => {
                                    const selectedTransmissionId =
                                        e.target.value;
                                    setData(
                                        "type_transmission_id",
                                        selectedTransmissionId
                                    );
                                }}
                            >
                                <option value="">{t("car.select_option")}</option>
                                {transmissions.map((transmission) => (
                                    <option
                                    className="form-option"
                                    key={transmission.id_transmission}
                                    value={transmission.id_transmission}
                                >
                                    {i18n.language === "en"
                                        ? parseJsonField(transmission.type_transmission).en
                                        : parseJsonField(transmission.type_transmission).fr}
                                </option>
                                ))}
                            </select>
                        {errors.type_transmission_id && <div className="error">{errors.type_transmission_id}</div>}
                    </div>

                  

              
                    <div className="form-actions">
                        <button className="edit-button" type="submit" disabled={processing}>
                            {t('buttons.update')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default VoitureEdit;