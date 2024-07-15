import React from 'react';
import Slider from 'react-slick';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './Home.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Home({ voitures }) {
  const { t, i18n } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  console.log(voitures);

  return (
    <>
      <Header />
      <div className="banner">
        <img src="../../../img/banner/banner.jpg" alt="Image de fond du banner" className="banner-image" />
        <div className="banner-content wrapper">
          <h1>Les Meilleurs Voitures d'Occasion</h1>
          <p>Découvrez des voitures d'occasion de qualité à des prix imbattables. Quebecar, transparence et service personnalisé pour votre confiance.</p>
          <Link target="blank" href="/voitures" className="btn">{t('header.catalogue')}</Link>
        </div>
        <div className="banner-footer">
          <p>Nous sommes fiers d'être Québécois</p>
          <img src="../../../img/icones/flower.png" alt="flower qc" className="flower-qc" />
        </div>
      </div>

        <div className=".slider-container wrapper">
          <div className="carousel">
            <h2 className='Nouveautes'>{t('home.new_arrivals')}</h2>
            <Slider {...settings}>
              {voitures.map((voiture, index) => (
                <div key={index} className="slide">
                  <img src={voiture.photo_url ? voiture.photo_url : "../../../img/car/default_car.png"} alt={voiture.modele.nom_modele} />
                  <h3>{voiture.annee} {voiture.modele.nom_modele}</h3>
                  <p>{voiture.description ? JSON.parse(voiture.description)[i18n.language] : t('home.car_description')}</p>
                  <Link target="blank" href={`/voitures/${voiture.id_voiture}`} className="details-button">
                    Plus d'info
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>

      <Footer />
    </>
  );
}

export default Home;

