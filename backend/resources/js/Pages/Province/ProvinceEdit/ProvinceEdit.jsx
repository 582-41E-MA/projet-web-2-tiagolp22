import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './ProvinceEdit.css';

const ProvinceEdit = ({ pays, province }) => {
    
    const { t, i18n } = useTranslation();
    const [data, setData] = useState({
        nom_province: province ? province.nom_province : '',
        pays_id: province ? province.pays_id : '',
    });

    useEffect(() => {
        if (province) {
            setData({
                nom_province: province.nom_province || '',
                pays_id: province.pays_id || '',
            });
        }
    }, [province]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        
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

    const renderPaysOptions = () => {
        return pays.map((paysItem) => (
            <option key={paysItem.id_pays} value={paysItem.id_pays}>
                {paysItem.nom_pays[i18n.language] || 'Nom indisponible'}
            </option>
        ));
    };

    return (
        <div className="form-container">
            <h1>{t('province.edit_title')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>{t('province.nom_province')}</label>
                    <input
                        type="text"
                        name="nom_province"
                        value={data.nom_province}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>{t('province.pays')}</label>
                    <select
                        name="pays_id"
                        value={data.pays_id}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">{t('province.select_pays')}</option>
                        {renderPaysOptions()}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    {t('province.update_button')}
                </button>
            </form>
        </div>
    );
};

export default ProvinceEdit;
