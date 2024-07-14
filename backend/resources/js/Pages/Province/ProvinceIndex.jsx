import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ProvinceIndex.css';

const ProvinceIndex = ({ provinces }) => {
    const { t, i18n } = useTranslation();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/provinces/${id}`);
            window.location.reload(); 
        } catch (error) {
            console.error('Erro ao excluir province:', error);
        }
    };

    const handleEdit = (id) => {
        router.visit(`/provinces/${id}/edit`);
    };

    const getPaysNom = (nom_pays) => {
        try {
            const parsedNomPays = JSON.parse(nom_pays);
            return parsedNomPays[i18n.language];
        } catch (error) {
            console.error('Erreur lors de l\'analyse de nom_pays:', error);
            return ''; // Retourne une chaîne vide en cas d'erreur
        }
    };

    return (
        <>
            <Header />
            <div className="province-index-container">
                <h1>{t('province.index_title')}</h1>
                <div className="province-list">
                    {provinces.map((province) => (
                        <div key={province.id_province} className="province-item">
                            <div>
                                <strong>{province.nom_province}</strong> - {getPaysNom(province.pays.nom_pays) || 'Nom de pays indisponible'}
                            </div>
                            <div className="province-actions">
                                <button 
                                    onClick={() => handleEdit(province.id_province)}
                                    className="edit-button"
                                >
                                    {t('province.edit_button')}
                                </button>
                                <button 
                                    onClick={() => handleDelete(province.id_province)}
                                    className="delete-button"
                                >
                                    {t('province.delete_button')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProvinceIndex;
