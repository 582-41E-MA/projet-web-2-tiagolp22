import React, { useState, useEffect } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './VoitureEdit.css';

const VoitureEdit = () => {
    const { t, i18n } = useTranslation();
    const { voiture, modeles } = usePage().props;
    const [newPhotosPreviews, setNewPhotosPreviews] = useState([]);
    const [newPhotoCount, setNewPhotoCount] = useState(0);

    useEffect(() => {
    }, [voiture]);

    const parseJSONWithFallback = (jsonString) => {
        try {
            if (typeof jsonString === 'object') {
                return {
                    en: jsonString.en || '',
                    fr: jsonString.fr || '',
                };
            }
            const parsed = JSON.parse(jsonString);
            return {
                en: parsed.en || '',
                fr: parsed.fr || '',
            };
        } catch (error) {
            console.error('Erreur de parsing JSON :', error);
            return { en: '', fr: '' };
        }
    };

    const { data, setData, post, processing, errors } = useForm({
        modele_id: voiture.modele_id,
        annee: voiture.annee,
        prix_vente: voiture.prix_vente,
        couleur: parseJSONWithFallback(voiture.couleur),
        etat_vehicule: parseJSONWithFallback(voiture.etat_vehicule),
        nombre_places: voiture.nombre_places,
        nombre_portes: voiture.nombre_portes,
        description: parseJSONWithFallback(voiture.description),
        currentPhotos: voiture.photos || [],
        photos: [],
        photos_to_delete: [],
    });

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
            const url = `/photos/${photoId}`;
            
            router.delete(url, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setData(prevData => ({
                        ...prevData,
                        currentPhotos: prevData.currentPhotos.filter(photo => photo.id !== photoId),
                        photos_to_delete: [...prevData.photos_to_delete, photoId]
                    }));
                },
            });
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
        const formData = new FormData();

        // Ajout des champs de base
        formData.append('modele_id', data.modele_id);
        formData.append('annee', data.annee);
        formData.append('prix_vente', data.prix_vente);
        formData.append('couleur', JSON.stringify(data.couleur));
        formData.append('etat_vehicule', JSON.stringify(data.etat_vehicule));
        formData.append('nombre_places', data.nombre_places);
        formData.append('nombre_portes', data.nombre_portes);
        formData.append('description', JSON.stringify(data.description));

        data.photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });

        data.photos_to_delete.forEach((id, index) => {
            formData.append(`photos_to_delete[${index}]`, id);
        });

        router.post(`/voitures/${voiture.id_voiture}`, formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
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
                    <div className="voiture-edit-form-group">
                        <label>{t('car.current_photos')}</label>
                        <div className="current-photos">
                            {data.currentPhotos.map((photo) => (
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

                    <div className="voiture-edit-form-group">
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