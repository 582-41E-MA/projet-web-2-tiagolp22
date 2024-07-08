import './Voiture.css';
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Filters from '../Filtres/Filtres'; 
import { InertiaLink } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/react';

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
              <InertiaLink key={index} href={`/voitures/${voiture.id_voiture}`} className="car-link">
                <div className="car">
                  <img 
                    src={voiture.photos && voiture.photos.length > 0 
                          ? voiture.photos[0].url_photo 
                          : '../../../img/car/default_car.png'} 
                    alt={voiture.modele.nom_modele} 
                  />
                  <h3 className="car-title">{voiture.annee} {voiture.modele.nom_modele}</h3>
                  <p>{voiture.description}</p>

                  <Link href={`/voitures/${voiture.id_voiture}`} className="details-button">En savoir plus</Link>

                </div>
              </InertiaLink>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Voiture;
