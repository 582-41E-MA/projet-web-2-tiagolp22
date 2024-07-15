import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './ProvinceCreate.css';

const ProvinceCreate = ({ pays }) => {
    const { t, i18n } = useTranslation();
    const { data, setData, post, errors } = useForm({
        nom_province: '',
        pays_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/provinces", {
            data: {
                nom_province: data.nom_province,
                pays_id: data.pays_id,
            },
            onSuccess: () => {
                console.log("Province créée avec succès");
                // Redireciona ou atualiza a lista de provinces
            },
            onError: (errors) => {
                console.error("Erreur lors de la création de la province", errors);
            },
        });
    };

    return (
        <>
            <Header />
            <div className="province-create-container">
                <h1>{t('province.create')}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t('province.name')}</label>
                        <input
                            type="text"
                            value={data.nom_province}
                            onChange={(e) => setData('nom_province', e.target.value)}
                        />
                        {errors.nom_province && <span>{errors.nom_province}</span>}
                    </div>
                    <div>
                        <label>{t('province.country')}</label>
                        <select
                            value={data.pays_id}
                            onChange={(e) => setData('pays_id', e.target.value)}
                        >
                            <option value="">{t('select.country')}</option>
                            {pays.map((pays) => (
                                <option key={pays.id_pays} value={pays.id_pays}>
                                    {pays.nom_pays[i18n.language]}
                                </option>
                            ))}
                        </select>
                        {errors.pays_id && <span>{errors.pays_id}</span>}
                    </div>
                    <button type="submit">{t('province.create_button')}</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ProvinceCreate;
