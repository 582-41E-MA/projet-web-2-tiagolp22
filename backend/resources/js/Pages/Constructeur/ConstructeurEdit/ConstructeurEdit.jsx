import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './ConstructeurEdit.css';

const ConstructeurEdit = ({ constructeur }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        nom_constructeur: constructeur.nom_constructeur,
        pays_origine: constructeur.pays_origine,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data for constructeur with ID:', constructeur.id_constructeur, data);
        router.put(`/constructeur/${constructeur.id_constructeur}`, data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Constructeur mis à jour avec succès");
                router.get('/dashboard');
            },
            onError: (errors) => {
                setErrors(errors);
                console.error("Erreur lors de la mise à jour du constructeur", errors);
            },
        });
    };

    return (
        <div className="constructeur-edit-container">
            <h1>{t('constructeur.edit_title')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>{t('constructeur.name')}</label>
                    <input
                        type="text"
                        name="nom_constructeur"
                        value={data.nom_constructeur}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.nom_constructeur && <span className="text-danger">{errors.nom_constructeur}</span>}
                </div>

                <div className="form-group">
                    <label>{t('constructeur.origin_country')}</label>
                    <input
                        type="text"
                        name="pays_origine"
                        value={data.pays_origine}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.pays_origine && <span className="text-danger">{errors.pays_origine}</span>}
                </div>

                <button type="submit" className="btn btn-primary">
                    {t('constructeur.update_button')}
                </button>
            </form>
        </div>
    );
};

export default ConstructeurEdit;