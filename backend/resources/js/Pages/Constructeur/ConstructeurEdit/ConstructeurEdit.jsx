import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ConstructeurEdit.css';

const ConstructeurEdit = ({ id }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        nom_constructeur: '',
        pays_origine: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConstructeur = async () => {
            try {
                const response = await axios.get(`/api/constructeur/${id}`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching constructeur:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchConstructeur();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/constructeur/${id}`, data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Constructeur mis à jour avec succès");

            },
            onError: (errors) => {
                setErrors(errors);
                console.error("Erreur lors de la mise à jour du constructeur", errors);
            },
        });
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="constructeur-edit-container">
            <h1>{t('constructeur.edit_title')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom_constructeur">{t('constructeur.name')}</label>
                    <input
                        type="text"
                        id="nom_constructeur"
                        name="nom_constructeur"
                        value={data.nom_constructeur}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.nom_constructeur && <span className="text-danger">{errors.nom_constructeur}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="pays_origine">{t('constructeur.origin_country')}</label>
                    <input
                        type="text"
                        id="pays_origine"
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