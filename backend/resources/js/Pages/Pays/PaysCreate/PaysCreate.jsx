import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './PaysCreate.css';

const PaysCreate = () => {
    const { errors } = usePage().props;
    const [data, setData] = useState({
        nom_pays: {
            en: '',
            fr: ''
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            nom_pays: {
                ...prevData.nom_pays,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            nom_pays: data.nom_pays
        };

        console.log(formData);
        
        router.post("/pays", formData, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Pays créé avec succès");
                router.push('/pays');
            },
            onError: (errors) => {
                console.error("Erreur lors de la création du pays", errors);
            },
        });
    };

    return (
        <>
            <div className="form-container">
                <h1>Créer un Pays</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="en">Nom du Pays (EN)</label>
                        <input
                            id="en"
                            type="text"
                            name="en"
                            value={data.nom_pays.en}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.nom_pays?.en && <span className="error-text">{errors.nom_pays.en}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fr">Nom du Pays (FR)</label>
                        <input
                            id="fr"
                            type="text"
                            name="fr"
                            value={data.nom_pays.fr}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.nom_pays?.fr && <span className="error-text">{errors.nom_pays.fr}</span>}
                    </div>
                    <button className="create-button" type="submit">Créer</button>
                </form>
            </div>
        </>
    );
};

export default PaysCreate;
