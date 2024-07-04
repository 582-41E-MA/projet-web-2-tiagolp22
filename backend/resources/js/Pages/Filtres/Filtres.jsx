import React, { useState } from 'react';
import './Filtres.css';
import { useTranslation } from 'react-i18next';


function Filters() {
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [location, setLocation] = useState('H1W3L5');
  const [state, setState] = useState('Neuf');
  const [brand, setBrand] = useState('Honda');
  const [model, setModel] = useState('Civic');
  const [year, setYear] = useState('2013');
  const [price, setPrice] = useState('5000');

  return (
    <div className="filters-container">
      <h3>Filtres</h3>
      <table className="filters-table">
        <tbody>
          <tr>
            <td>Localisation</td>
            <td onClick={() => setShowLocationInput(!showLocationInput)}>
              {showLocationInput ? (
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  onBlur={() => setShowLocationInput(false)}
                  autoFocus
                />
              ) : (
                location
              )}
            </td>
          </tr>
          <tr>
            <td>État</td>
            <td>
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="Neuf">Neuf</option>
                <option value="Occasion">Occasion</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Marque</td>
            <td>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="Honda">Honda</option>
                <option value="Toyota">Toyota</option>
                <option value="Ford">Ford</option>
                {/* Ajoutez d'autres marques ici */}
              </select>
            </td>
          </tr>
          <tr>
            <td>Modèle</td>
            <td>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="Civic">Civic</option>
                <option value="Accord">Accord</option>
                {/* Ajoutez d'autres modèles ici */}
              </select>
            </td>
          </tr>
          <tr>
            <td>Année</td>
            <td>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                {Array.from({ length: 2024 - 1990 + 1 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Prix</td>
            <td>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                min="0"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Filters;