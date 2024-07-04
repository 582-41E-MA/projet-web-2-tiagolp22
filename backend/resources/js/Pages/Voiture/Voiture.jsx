import './Voiture.css';
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Filters from '../Filtres/Filtres'; 
import { InertiaLink } from '@inertiajs/inertia-react';

function Voiture({ voitures }) {
  return (
    <>
      <Header />
      <img className="banner_catalog" src="../../../img/banner/banner_catalog.jpg" alt="bannière" />
      <div className="container">
        <div className="filters-section">
          <Filters />
        </div>
        <div className="cars-section">
          <div className="cars-grid">
            {voitures.map((voiture, index) => (
              <div key={index} className="car">
                <img src={voiture.image || '../../../img/car/default_car.png'} alt={voiture.modele.nom_modele} />
                <h3>{voiture.annee} {voiture.modele.nom_modele}</h3>
                <p>{voiture.description}</p>
                <InertiaLink href={`/voitures/${voiture.id_voiture}`} className="details-button">En savoir plus</InertiaLink>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Voiture;
