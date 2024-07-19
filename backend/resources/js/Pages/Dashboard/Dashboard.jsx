import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaUserCog, FaGlobe, FaMapMarkerAlt, FaBuilding, FaCar, FaPlus, FaList } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ModeleCreate from '../Modele/ModeleCreate/ModeleCreate';
import PaysCreate from '../Pays/PaysCreate/PaysCreate';
import ProvinceCreate from '../Province/ProvinceCreate/ProvinceCreate';
import ConstructeurCreate from '../Constructeur/ConstructeurCreate/ConstructeurCreate';
import VilleCreate from '../Ville/VilleCreate/VilleCreate';
import VoitureCreate from '../Voiture/VoitureCreate/VoitureCreate';
import TaxeCreate from '../Taxe/TaxeCreate/TaxeCreate';
import TaxeIndex from '../Taxe/TaxeIndex';
import ConstructeurIndex from '../Constructeur/ConstructeurIndex';
import PaysIndex from '../Pays/PaysIndex';
import ProvinceIndex from '../Province/ProvinceIndex';
import VilleIndex from '../Ville/VilleIndex';
import ModeleIndex from '../Modele/ModeleIndex';

import PaysEdit from '../Pays/PaysEdit/PaysEdit';
import ProvinceEdit from '../Province/ProvinceEdit/ProvinceEdit';
import VilleEdit from '../Ville/VilleEdit/VilleEdit';
import ModeleEdit from '../Modele/ModeleEdit/ModeleEdit';
import VoitureEdit from '../Voiture/VoitureEdit/VoitureEdit';
import './Dashboard.css'; 

const Dashboard = ({ constructeurs, pays, villes, provinces, modeles, transmissions, groupesMotopropulseur, typesCarburant, carrosseries, privilege_id, taxes }) => {
    const [currentForm, setCurrentForm] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [editingId, setEditingId] = useState(null);

    
    const handleNavigationClick = (formName, id = null) => {
        setCurrentForm(formName);
        setEditingId(id);
    };
    const handleMenuClick = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    return (
        <>
            <Header />
            <div className="dashboard-container">
                <Sidebar className="sidebar">
                    <Menu className="menu">
                        <SubMenu
                            icon={<FaBuilding className="menu-icon" />}
                            label={'Constructeur'}
                            onClick={() => handleMenuClick('constructeurs')}
                        >
                            <MenuItem onClick={() => handleNavigationClick('constructeurCreate')}>
                                <FaPlus className="menu-icon" /> Créer Constructeur
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigationClick('constructeurIndex')}>
                                <FaList className="menu-icon" /> Liste Constructeurs
                            </MenuItem>
                        </SubMenu>

                        <SubMenu
                            icon={<FaGlobe className="menu-icon" />}
                            label={'Pays'}
                            onClick={() => handleMenuClick('pays')}
                        >
                            <MenuItem onClick={() => handleNavigationClick('paysCreate')}>
                                <FaPlus className="menu-icon" /> Créer Pays
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigationClick('paysIndex')}>
                                <FaList className="menu-icon" /> Liste Pays
                            </MenuItem>
                        </SubMenu>

                        <SubMenu
                            icon={<FaMapMarkerAlt className="menu-icon" />}
                            label={'Provinces'}
                            onClick={() => handleMenuClick('provinces')}
                        >
                            <MenuItem onClick={() => handleNavigationClick('provinceCreate')}>
                                <FaPlus className="menu-icon" /> Créer Province
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigationClick('provinceIndex')}>
                                <FaList className="menu-icon" /> Liste Provinces
                            </MenuItem>
                        </SubMenu>

                        <SubMenu
                            icon={<FaMapMarkerAlt className="menu-icon" />}
                            label={'Villes'}
                            onClick={() => handleMenuClick('villes')}
                        >
                            <MenuItem onClick={() => handleNavigationClick('villeCreate')}>
                                <FaPlus className="menu-icon" /> Créer Ville
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigationClick('villeIndex')}>
                                <FaList className="menu-icon" /> Liste Villes
                            </MenuItem>
                        </SubMenu>

                        <SubMenu
                            icon={<FaUserCog className="menu-icon" />}
                            label={'Modèles'}
                            onClick={() => handleMenuClick('modeles')}
                        >
                            <MenuItem onClick={() => handleNavigationClick('modeleCreate')}>
                                <FaPlus className="menu-icon" /> Créer Modèle
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigationClick('modeleIndex')}>
                                <FaList className="menu-icon" /> Liste Modèles
                            </MenuItem>
                        </SubMenu>

                        <SubMenu
                            icon={<FaCar className="menu-icon" />}
                            label={'Voitures'}
                            onClick={() => handleMenuClick('voitures')}
                        >
                            <MenuItem onClick={() => handleNavigationClick('voitureCreate')}>
                                <FaPlus className="menu-icon" /> Créer Voiture
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigationClick('voitureIndex')}>
                                <FaList className="menu-icon" /> Liste Voitures
                            </MenuItem>
                        </SubMenu>

                        <SubMenu
                            icon={<FaPlus className="menu-icon" />}
                            label={'Taxes'}
                            onClick={() => handleMenuClick('taxes')}
                        >
                            <MenuItem onClick={() => handleNavigationClick('taxeCreate')}>
                                <FaPlus className="menu-icon" /> Créer Taxe
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigationClick('taxeIndex')}>
                                <FaList className="menu-icon" /> Liste Taxes
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>
                <div className="main-content">
    {currentForm === 'constructeurCreate' && <ConstructeurCreate />}
    {currentForm === 'constructeurIndex' && <ConstructeurIndex constructeurs={constructeurs} onEdit={(id) => handleNavigationClick('constructeurEdit', id)} />}
    {currentForm === 'constructeurEdit' && <ConstructeurEdit id={editingId} />}
    
    {currentForm === 'paysCreate' && <PaysCreate />}
    {currentForm === 'paysIndex' && <PaysIndex pays={pays} onEdit={(id) => handleNavigationClick('paysEdit', id)} />}
    {currentForm === 'paysEdit' && <PaysEdit id={editingId} />}
    
    {currentForm === 'provinceCreate' && <ProvinceCreate pays={pays} />}
    {currentForm === 'provinceIndex' && <ProvinceIndex provinces={provinces} onEdit={(id) => handleNavigationClick('provinceEdit', id)} />}
    {currentForm === 'provinceEdit' && <ProvinceEdit id={editingId} pays={pays} />}
    
    {currentForm === 'villeCreate' && <VilleCreate pays={pays} provinces={provinces} />}
    {currentForm === 'villeIndex' && <VilleIndex villes={villes} onEdit={(id) => handleNavigationClick('villeEdit', id)} />}
    {currentForm === 'villeEdit' && <VilleEdit id={editingId} pays={pays} provinces={provinces} />}
    
    {currentForm === 'modeleCreate' && <ModeleCreate constructeurs={constructeurs} />}
    {currentForm === 'modeleIndex' && <ModeleIndex modeles={modeles} onEdit={(id) => handleNavigationClick('modeleEdit', id)} />}
    {currentForm === 'modeleEdit' && <ModeleEdit id={editingId} constructeurs={constructeurs} />}
    
    {currentForm === 'voitureCreate' && (
        <VoitureCreate
            typesCarburant={typesCarburant}
            modeles={modeles}
            transmissions={transmissions}
            groupesMotopropulseur={groupesMotopropulseur} 
            carrosseries={carrosseries}
            privilege_id={privilege_id}
        />
    )}
    {currentForm === 'voitureIndex' && <VoitureIndex onEdit={(id) => handleNavigationClick('voitureEdit', id)} />}
    {currentForm === 'voitureEdit' && (
        <VoitureEdit
            id={editingId}
            typesCarburant={typesCarburant}
            modeles={modeles}
            transmissions={transmissions}
            groupesMotopropulseur={groupesMotopropulseur} 
            carrosseries={carrosseries}
            privilege_id={privilege_id}
        />
    )}
    
    {currentForm === 'taxeCreate' && <TaxeCreate provinces={provinces}/>}
    {currentForm === 'taxeIndex' && <TaxeIndex taxes={taxes} onEdit={(id) => handleNavigationClick('taxeEdit', id)} />}
    {currentForm === 'taxeEdit' && <TaxeEdit id={editingId} provinces={provinces} />}
</div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
