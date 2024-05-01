// Component for our catalog on home page with searchbar
import { useState } from 'react';
import Favorites from './Favorites.js';
import Locations from './Locations.js';

function Catalog() {

    const [items, setItems] = useState([]);
    
    // Implement if we have time and a lot of ambition
    // For the moment, just used to test rendering locations
    function FullCatalog() {
        // Catalog with functioning Search bar
    }


    return (
        <div>
            <h1>Catalog of Trips</h1>
            <Favorites />
            <Locations />
            <FullCatalog />
        </div>
    );
}

export default Catalog;