import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Pagination from '../Pagination/Pagination'; // Certifique-se de ter o componente Pagination
import './CarrosserieIndex.css';

const CarrosserieIndex = ({ onEdit }) => {
    const { props } = usePage();
    const { carrosseries} = props; 
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchCarrosseries(currentPage);
    }, [currentPage]);

    const fetchCarrosseries = async (page) => {
        try {
            const response = await axios.get(`/carrosseries?page=${page}`);
            router.reload({ only: ['carrosseries'] });
        } catch (error) {
            console.error('Error fetching carrosseries:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t('carrosserie.confirm_delete'))) {
            try {
                await axios.delete(`/carrosseries/${id}`);
                router.reload({ only: ['carrosseries'] });
            } catch (error) {
                console.error('Error deleting carrosserie:', error);
                alert(t('carrosserie.delete_error'));
            }
        }
    };

    const handleEdit = (id) => {
        onEdit(id);
    };

    const paginatedCarrosseries = carrosseries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(carrosseries.length / itemsPerPage);

    return (
        <div className="carrosserie-index-container">
            <h1>{t('carrosserie.index_title')}</h1>
            <div className="carrosserie-list">
                {paginatedCarrosseries.length > 0 ? (
                    paginatedCarrosseries.map((carrosserie) => (
                        <div key={carrosserie.id_carrosserie} className="carrosserie-item">
                            <div>
                                <strong>{JSON.parse(carrosserie.type_carrosserie)[currentLanguage]}</strong>
                            </div>
                            <div className="carrosserie-actions">
                                <button
                                    onClick={() => handleEdit(carrosserie.id_carrosserie)}
                                    className="edit-button"
                                >
                                    {t('edit')}
                                </button>
                                <button
                                    onClick={() => handleDelete(carrosserie.id_carrosserie)}
                                    className="delete-button"
                                >
                                    {t('delete')}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t('carrosserie.no_data')}</p>
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

export default CarrosserieIndex;
