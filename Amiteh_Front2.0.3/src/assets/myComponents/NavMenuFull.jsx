import React from 'react';
import useFetchData from '@/assets/myComponents/hooks/useFetchData';
import NavBar from '@/assets/myComponents/NavBar';
import { Link } from 'react-router-dom';

function NavMenu() {
  const { makes, categories, areas, loading, error } = useFetchData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Correctly map over the results array for categories, makes, and areas
  const categoryItems = Array.isArray(categories.results) ? categories.results : [];
  const makeItems = Array.isArray(makes.results) ? makes.results : [];
  const areaItems = Array.isArray(areas.results) ? areas.results : [];

  return (
    <nav className="bg-white shadow dark:bg-gray-800 z-50">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <Link to="/" className="z-50">
              <img src="/_Amiteh-Logo.png" alt="Amiteh Logo" className="z-66" />
            </Link>

          </div>

          <div className="flex items-center justify-between ml-auto">
            <NavBar title="Področja" navItems={areaItems.map(area => area.name)} />
            <NavBar title="Izdelki" navItems={categoryItems.map(cat => cat.name)} />
            <NavBar title="Proizvajalci" navItems={makeItems.map(make => make.name)} />
            <NavBar title="Kontakt" navItems={['Kontakt1', 'Kontakt2', 'Kontakt3', 'Kontakt4']} />
          </div>
        </div>
      </div>
    </nav>
  
  );
}

export default NavMenu;
