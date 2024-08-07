import React, { useState, useMemo } from 'react';
import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Pagination from '../../Pagination/Pagination';
import Modal from '../../Modal/Modal';
import './VoitureIndex.css';

const VoitureIndex = ({ voitures = [], onEdit }) => {
    const { t } = useTranslation();
    const [carList, setCarList] = useState(voitures);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState(null);

    const itemsPerPage = 5;

    const openModal = (car) => {
        setCarToDelete(car);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCarToDelete(null);
    };

    const handleDelete = (id) => {
        router.delete(`/voitures/${id}`, {
            onSuccess: () => {
                console.log("Voiture supprimée avec succès");
                // Mettre à jour la liste des voitures en local
                setCarList((prevCarList) => prevCarList.filter((voiture) => voiture.id_voiture !== id));
                closeModal();
            },
            onError: (errors) => {
                console.error("Erreur lors de la suppression de la voiture", errors);
            },
        });
    };

    const filteredVoitures = useMemo(() => {
        return carList.filter(voiture => {
            const matchesSearchTerm = voiture.modele.nom_modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      voiture.modele.constructeur.nom_constructeur.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesYear = selectedYear ? voiture.annee === parseInt(selectedYear) : true;
            const matchesModel = selectedModel ? voiture.modele.nom_modele === selectedModel : true;
            return matchesSearchTerm && matchesYear && matchesModel;
        });
    }, [carList, searchTerm, selectedYear, selectedModel]);

    const paginatedVoitures = filteredVoitures.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredVoitures.length / itemsPerPage);

    return (
        <div className="dashboard-index-container">
            <h1>{t('dashboard.voitures.list_title')}</h1>
            <div className="filter-section">
                <input
                    type="text"
                    placeholder={t('dashboard.filters.search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="filter-select"
                >
                    <option value="">{t('dashboard.filters.select_year')}</option>
                    {Array.from(new Set(carList.map(v => v.annee))).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="filter-select"
                >
                    <option value="">{t('dashboard.filters.select_model')}</option>
                    {Array.from(new Set(carList.map(v => v.modele.nom_modele))).map(model => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
            </div>
            <div className="dashboard-list">
                {paginatedVoitures.length > 0 ? (
                    paginatedVoitures.map(voiture => (
                        <div key={voiture.id_voiture} className="dashboard-item">
                            <div className="dashboard-car-info">
                                <img
                                    src={voiture.photo_url || "../../../img/car/default_car.png"}
                                    alt={voiture.modele.nom_modele}
                                    className="car-photo"
                                />
                                <div className="car-details">
                                    <h3 className="car-title">
                                        {voiture.annee} {voiture.modele.constructeur.nom_constructeur} {voiture.modele.nom_modele}
                                    </h3>
                                </div>
                            </div>
                            <div className="dashboard-actions">
                                <button
                                    onClick={() => onEdit(voiture)}
                                    className="edit-button"
                                >
                                    {t('buttons.edit')}
                                </button>
                                <button
                                    onClick={() => openModal(voiture)}
                                    className="delete-button"
                                >
                                    {t('buttons.delete')}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t('dashboard.voitures.no_data')}</p>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            {carToDelete && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={() => handleDelete(carToDelete.id_voiture)}
                    message={t('dashboard.voitures.confirm_delete')}
                />
            )}
        </div>
    );
};

export default VoitureIndex;
