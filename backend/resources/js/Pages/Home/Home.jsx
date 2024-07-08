import React from 'react';
import Slider from 'react-slick';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { InertiaLink } from '@inertiajs/inertia-react';
import './Home.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Home() {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="banner">
            <img src="../../../img/banner/banner.jpg" alt="Image de fond du banner" className="banner-image" />
            <div className="banner-content wrapper">
                <h1>Les Meilleurs Voitures d'Occasion</h1>
                <p>Découvrez des voitures d'occasion de qualité à des prix imbattables. Quebecar, transparence et service personnalisé pour votre confiance. </p>
                  <Link href="/voitures" className="btn">{t('header.catalogue')}</Link>
            </div>
            <div className="banner-footer">
                <p>Nous sommes fiers d'être Québécois</p>
                <img src="../../../img/icones/flower.png" alt="flower qc" className="flower-qc" />
            </div>
        </div>
      <img className="banner"  alt="bannière" />
      <div className="wrapper">
        <div className="container">
          <div className="carousel">
            <h2 className='Nouveautes'>{t('home.new_arrivals')}</h2>
            <Slider {...settings}>
              <div className="slide">
                <img src="https://via.placeholder.com/150" alt="Voiture" />
                <h3>Voiture 1</h3>
                <p>{t('home.car_description')}</p>
              </div>
              <div className="slide">
                <img src="https://via.placeholder.com/150" alt="Voiture" />
                <h3>Voiture 2</h3>
                <p>{t('home.car_description')}</p>
              </div>
              <div className="slide">
                <img src="https://via.placeholder.com/150" alt="Voiture" />
                <h3>Voiture 3</h3>
                <p>{t('home.car_description')}</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
