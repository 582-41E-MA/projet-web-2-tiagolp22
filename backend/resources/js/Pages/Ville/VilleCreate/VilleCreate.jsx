import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './VilleCreate.css';

const VilleCreate = ({ provinces }) => {
    const { t } = useTranslation();
    const { data, setData, post, errors } = useForm({
        nom_ville: '',
        province_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Converte province_id para número
        const updatedData = {
            nom_ville: data.nom_ville,
            province_id: data.province_id 
        };

        console.log(updatedData);
        
        post("/villes", {
            data: updatedData,
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
            <div className="form-container">
                <h1>{t('ville.create')}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t('ville.name')}</label>
                        <input
                            type="text"
                            name="nom_ville"
                            value={data.nom_ville}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.nom_ville && <span className="error-text">{errors.nom_ville}</span>}
                    </div>

                    <div className="form-group">
                        <label>{t('ville.province')}</label>
                        <select
                            name="province_id"
                            value={data.province_id}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">{t('ville.select_province')}</option>
                            {provinces.map((province) => (
                                <option key={province.id_province} value={province.id_province}>
                                    {province.nom_province}
                                </option>
                            ))}
                        </select>
                        {errors.province_id && <span className="error-text">{errors.province_id}</span>}
                    </div>

                    <button className="create-button" type="submit">{t('ville.create_button')}</button>
                </form>
            </div>
        </>
    );
};

export default VilleCreate;
