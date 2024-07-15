import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './VilleCreate.css';

const VilleCreate = ({ provinces }) => {
    const { t } = useTranslation();
    const { data, setData, post, errors } = useForm({
        nom_ville: '',
        province_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/villes", {
            data: {
                nom_ville: data.nom_ville,
                province_id: data.province_id,
            },
            onSuccess: () => {
                console.log("Ville créée avec succès");
                // Redireciona ou atualiza a lista de villes
            },
            onError: (errors) => {
                console.error("Erreur lors de la création de la ville", errors);
            },
        });
    };

    return (
        <>
            <Header />
            <div className="ville-create-container">
                <h1>{t('ville.create')}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t('ville.name')}</label>
                        <input
                            type="text"
                            value={data.nom_ville}
                            onChange={(e) => setData('nom_ville', e.target.value)}
                        />
                        {errors.nom_ville && <span>{errors.nom_ville}</span>}
                    </div>
                    <div>
                        <label>{t('ville.province')}</label>
                        <select
                            value={data.province_id}
                            onChange={(e) => setData('province_id', e.target.value)}
                        >
                            <option value="">Sélectionner une province</option>
                            {provinces.map((province) => (
                                <option key={province.id_province} value={province.id_province}>
                                    {province.nom_province}
                                </option>
                            ))}
                        </select>
                        {errors.province_id && <span>{errors.province_id}</span>}
                    </div>
                    <button type="submit">{t('ville.create_button')}</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default VilleCreate;
