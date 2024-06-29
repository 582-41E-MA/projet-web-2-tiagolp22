import React from 'react';
import Header from '../Components/Header/Header';

function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-4">
        <h1>Bienvenue sur le site de vente de véhicules d'occasion</h1>
        <p>Explorez notre catalogue de voitures et trouvez votre prochaine voiture.</p>
      </div>
    </div>
  );
}

export default Home;
