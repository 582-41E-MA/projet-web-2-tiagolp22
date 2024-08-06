import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import './ConstructeurIndex.css'; 

const ConstructeurIndex = ({ constructeurs, onEdit }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleDelete = async (id) => {
        if (window.confirm(t('constructeur.confirm_delete'))) {
            try {
                await axios.delete(`/constructeurs/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting constructeur:', error);
            }
        }
    };

    const handleEdit = (id) => {
        onEdit(id);
    };

    const paginatedConstructeurs = constructeurs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(constructeurs.length / itemsPerPage);

    return (
        <div className="constructeur-index-container">
            <h1>{t('constructeur.index_title')}</h1>
            <div className="constructeur-list">
                {paginatedConstructeurs.map((constructeur) => (
                    <div key={constructeur.id_constructeur} className="constructeur-item">
                        <div>
                            <strong>{constructeur.nom_constructeur}</strong> - {constructeur.pays_origine}
                        </div>
                        <div className="constructeur-actions">
                            <button 
                                onClick={() => handleEdit(constructeur.id_constructeur)}
                                className="edit-button"
                            >
                                {t('edit')}
                            </button>
                            <button 
                                onClick={() => handleDelete(constructeur.id_constructeur)}
                                className="delete-button"
                            >
                                {t('delete')}
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

export default ConstructeurIndex;
