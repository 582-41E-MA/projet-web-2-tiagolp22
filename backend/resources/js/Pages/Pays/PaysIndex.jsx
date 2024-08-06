import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import Pagination from '../Pagination/Pagination'; // Certifique-se de que o caminho está correto
import './PaysIndex.css';

const PaysIndex = ({ pays, onEdit }) => {
    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleDelete = async (id) => {
        if (window.confirm(t('pays.confirm_delete'))) {
            try {
                await router.delete(`/pays/${id}`, {
                    preserveState: true,
                    preserveScroll: true,
                });
            } catch (error) {
                console.error('Error deleting pays:', error);
                alert(t('pays.delete_error'));
            }
        }
    };

    const handleEdit = (pays) => {
        onEdit(pays);
    };

    const paginatedPays = pays.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(pays.length / itemsPerPage);

    return (
        <div className="dashboard-index-container">
            <h1>{t('pays.list_title')}</h1>
            <div className="dashboard-list">
                {paginatedPays.length > 0 ? (
                    paginatedPays.map(p => {
                        let nomPays = {};
                        try {
                            nomPays = JSON.parse(p.nom_pays);
                        } catch (error) {
                            console.error("Erreur lors de l'analyse du nom du pays:", error);
                            nomPays = { en: 'Invalid JSON', fr: 'JSON invalide' };
                        }

                        return (
                            <div key={p.id_pays} className="dashboard-item">
                                <div className="dashboard-name">
                                    {i18n.language === 'en' ? nomPays.en : nomPays.fr}
                                </div>
                                <div className="dashboard-actions">
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="edit-button"
                                    >
                                        {t('buttons.edit')}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id_pays)}
                                        className="delete-button"
                                    >
                                        {t('buttons.delete')}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>{t('pays.no_data')}</p>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default PaysIndex;
