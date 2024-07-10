import React, { useState, useEffect } from 'react';
import './Filtres.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Filters({ onFilter }) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    etat: '',
    constructeur: '',
    modele: '',
    annee: '',
    prix_max: '',
    couleur: '',
    nombre_places: '',
    nombre_portes: '',
  });
  const [options, setOptions] = useState({
    colors: [''].concat(['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Silver', 'Grey']),
    modeles: [],
    constructeurs: [],
  });

  useEffect(() => {
    axios.get('/api/voitures/filter')
      .then(response => {
        const { colors, modeles, constructeurs } = response.data.filters;
        setOptions({
          colors: options.colors.concat(colors),
          modeles: [''].concat(modeles),
          constructeurs: [''].concat(constructeurs),
        });
      })
      .catch(error => {
        console.error('Error fetching filter options', error);
      });
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    axios.get('/api/voitures/filter', { params: filters })
      .then(response => {
        onFilter(response.data.voitures);
      })
      .catch(error => {
        console.error('Error fetching filtered cars', error);
      });
  };

  return (
    <div className="filters-container">
      <h3>{t('filters.filtres')}</h3>
      <div>
        <label>{t('filters.État')}</label>
        <select name="etat" value={filters.etat} onChange={handleChange}>
          <option value="">{t('filters.Tous')}</option>
          <option value="Neuf">{t('filters.Neuf')}</option>
          <option value="Occasion">{t('filters.Occasion')}</option>
        </select>
      </div>
      <div>
        <label>{t('filters.Constructeur')}</label>
        <select name="constructeur" value={filters.constructeur} onChange={handleChange}>
          {options.constructeurs.map(constructeur => (
            <option key={constructeur} value={constructeur}>{constructeur}</option>
          ))}
        </select>
      </div>
      <div>
        <label>{t('filters.Modèle')}</label>
        <select name="modele" value={filters.modele} onChange={handleChange}>
          {options.modeles.map(modele => (
            <option key={modele} value={modele}>{modele}</option>
          ))}
        </select>
      </div>
      <div>
        <label>{t('filters.Année')}</label>
        <input name="annee" type="number" value={filters.annee} onChange={handleChange} />
      </div>
      <div>
        <label>{t('filters.Prix maximum')}</label>
        <input name="prix_max" type="number" value={filters.prix_max} onChange={handleChange} />
      </div>
      <div>
        <label>{t('filters.Couleur')}</label>
        <select name="couleur" value={filters.couleur} onChange={handleChange}>
          {options.colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

      </div>
      <div>
        <label>{t('filters.Nombre de places')}</label>
        <select name="nombre_places" value={filters.nombre_places} onChange={handleChange}>
          <option value="">{t('filters.Toutes')}</option>
          <option value="2">{t('filters.2')}</option>
          <option value="4">{t('filters.4')}</option>
          <option value="5">{t('filters.5')}</option>
        </select>
      </div>
      <div>
        <label>{t('filters.Nombre de portes')}</label>
        <select name="nombre_portes" value={filters.nombre_portes} onChange={handleChange}>
          <option value="">{t('filters.Toutes')}</option>
          <option value="2">{t('filters.2')}</option>
          <option value="3">{t('filters.3')}</option>
          <option value="4">{t('filters.4')}</option>
        </select>
      </div>
      <button onClick={applyFilters}>{t('filters.Appliquer filtres')}</button>
    </div>
  );
}

export default Filters;
