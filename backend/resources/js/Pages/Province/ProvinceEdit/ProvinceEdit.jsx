import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './ProvinceEdit.css'; 

const ProvinceEdit = () => {
    const { t } = useTranslation(); 
    const { province } = usePage().props;
    console.log(province);
    const [data, setData] = useState({
        nom_province: province.nom_province || '',
        pays_id: province.pays_id || '',
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
        router.put(`/provinces/${province.id_province}`, data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Province mise à jour avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la mise à jour de la province", errors);
            },
        });
    };

    return (
        <>
            <Header />
            <div className="province-edit-container">
                <h1>{t('province.edit_title')}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t('province.name')}</label>
                        <input
                            type="text"
                            name="nom_province"
                            value={data.nom_province}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>{t('province.country')}</label>
                        <select
                            name="pays_id"
                            value={data.pays_id}
                            onChange={handleChange}
                        >
                            {/* Renderizar as opções da pays_id aqui */}
                        </select>
                    </div>
                    <button type="submit">{t('province.update_button')}</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ProvinceEdit;
