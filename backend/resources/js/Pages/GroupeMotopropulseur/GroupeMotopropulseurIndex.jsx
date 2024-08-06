import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import './GroupeMotopropulseurIndex.css';

const GroupeMotopropulseurIndex = ({ groupeMotopropulseurs, onEdit }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleDelete = async (id) => {
        if (window.confirm(t('groupeMotopropulseur.confirm_delete'))) {
            try {
                await axios.delete(`/groupe-motopropulseurs/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting groupe motopropulseur:', error);
            }
        }
    };

    const handleEdit = (id) => {
        onEdit(id);
    };

    const paginatedGroupeMotopropulseurs = groupeMotopropulseurs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(groupeMotopropulseurs.length / itemsPerPage);

    return (
        <div className="groupe-motopropulseur-index-container">
            <h1>{t('groupeMotopropulseur.index_title')}</h1>
            <div className="groupe-motopropulseur-list">
                {paginatedGroupeMotopropulseurs.map((groupe) => (
                    <div key={groupe.id_groupe_motopropulseur} className="groupe-motopropulseur-item">
                        <div>
                            <strong>{JSON.parse(groupe.type_groupe_motopropulseur)[currentLanguage]}</strong>
                        </div>
                        <div className="groupe-motopropulseur-actions">
                            <button
                                onClick={() => handleEdit(groupe.id_groupe_motopropulseur)}
                                className="edit-button"
                            >
                                {t('buttons.edit')}
                            </button>
                            <button
                                onClick={() => handleDelete(groupe.id_groupe_motopropulseur)}
                                className="delete-button"
                            >
                                {t('buttons.delete')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default GroupeMotopropulseurIndex;
