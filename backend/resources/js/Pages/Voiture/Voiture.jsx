import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Filters from '../Filtres/Filtres'; 
import { InertiaLink } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
import './Voiture.css';

function Voiture({ voitures }) {
  const { t, i18n } = useTranslation();

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
                  <p>
                    {voiture.description 
                      ? JSON.parse(voiture.description)[i18n.language] 
                      : t('car_show.no_description')}
                  </p>
                  <InertiaLink href={`/voitures/${voiture.id_voiture}`} className="details-button">
                    More info
                  </InertiaLink>
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
