import React from 'react';
import { Link, router } from '@inertiajs/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './Pays.css';

const Pays = ({ pays }) => {
    const { t, i18n } = useTranslation();
   
    const handleDelete = (id) => {
        if (confirm(t('pays.confirm_delete'))) {
            router.delete(`/pays/${id}`, {
                onSuccess: () => {
                    console.log("Pays supprimé avec succès");
                    // Atualizar a página ou redirecionar conforme necessário
                },
                onError: (errors) => {
                    console.error("Erreur lors de la suppression du pays", errors);
                },
            });
        }
    };

    return (
        <>
            <Header />
            <div className="pays-container">
                <h1>{t('pays.list_title')}</h1>
                <div className="pays-list">
                    {pays.map(p => {
                        let nomPays = {};
                        try {
                            nomPays = JSON.parse(p.nom_pays);
                        } catch (error) {
                            console.error("Erreur lors de l'analyse du nom du pays:", error);
                            nomPays = { en: 'Invalid JSON', fr: 'JSON invalide' };
                        }

                        return (
                            <div key={p.id_pays} className="pays-item">
                                <div className="pays-info">
                                    <div className="pays-name">
                                        {i18n.language === 'en' ? nomPays.en : nomPays.fr}
                                    </div>
                                    <div className="pays-actions">
                                        <Link href={`/pays/${p.id_pays}/edit`} className="edit-button">{t('pays.edit')}</Link>
                                        <button
                                            onClick={() => handleDelete(p.id_pays)}
                                            className="delete-button"
                                        >
                                            {t('pays.delete')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Pays;
