import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import InputField from '../../InputField/InputField';
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
            nom_pays: JSON.stringify(data.nom_pays), 
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
            <Header />
            <div className="form-container">
                <h1>Créer un Pays</h1>
                <form onSubmit={handleSubmit}>
                        <InputField
                            label="Nom du Pays (EN)"
                            name="en"
                            value={data.nom_pays.en}
                            onChange={handleChange}
                            error={errors.nom_pays}
                        />
                        <InputField
                            label="Nom du Pays (FR)"
                            name="fr"
                            value={data.nom_pays.fr}
                            onChange={handleChange}
                            error={errors.nom_pays}
                        />
                    <button className="create-button"type="submit">Créer</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default PaysCreate;
