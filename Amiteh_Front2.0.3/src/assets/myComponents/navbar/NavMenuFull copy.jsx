import React from 'react';
import Navbar from "@/assets/myComponents/Navbar";
import useFetchData from "@/assets/myComponents/hooks/useFetchData";
import { Link } from 'react-router-dom';

function NavMenu() {
  const { makes, categories, areas, loading, error } = useFetchData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700 h-50 w-50">
            <Link to="/"><img src="../../_Amiteh-Logo.png" alt="Amiteh Logo" /></Link>
          </div>

          <div className="flex items-center justify-between ml-auto">
            {/* Dynamically populated Navbar components */}
            <Navbar
              title="Kategorije"
              navitem1={categories[0]?.name || 'Osciloskopi'}
              navitem2={categories[1]?.name || 'Viri'}
              navitem3={categories[2]?.name || 'Analizatorji spektra'}
              navitem4={categories[3]?.name || 'Ostalo'}
              navitem5="vse Kategorije"

            />
            <Navbar
              title="Proizvajalci"
              navitem1={makes[0]?.name || 'Default1'}
              navitem2={makes[1]?.name || 'Default2'}
              navitem3={makes[2]?.name || 'Default3'}
              navitem4={makes[3]?.name || 'Default4'}
            />
            <Navbar
              title="Podrocja"
              navitem1={areas[0]?.name || 'Default1'}
              navitem2={areas[1]?.name || 'Default2'}
              navitem3={areas[2]?.name || 'Default3'}
              navitem4={areas[3]?.name || 'Default4'}
            />
            <Navbar
              title="Kontakt"
              navitem1="Kontakt1"
              navitem2="Kontakt2"
              navitem3="Kontakt3"
              navitem4="Kontakt4"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
