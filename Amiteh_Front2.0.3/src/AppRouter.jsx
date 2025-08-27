import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/app/layout';
import HomePage from '@/pages/HomePage';
import Burek from '@/pages/Burek';
import Proizvajalci from '@/pages/Proizvajalci';
import Page1 from '@/pages/test/page1';
import PodrocjaDetail from '@/pages/dynamic/PodrocjaDetail';
import KategorijeDetail from '@/pages/dynamic/KategorijeDetail';
import ProizvajalciDetail from '@/pages/dynamic/ProizvajalciDetail';
import ProductDetail from '@/pages/dynamic/ProductDetail'; 
import NotFound from '@/pages/NotFound';
import LoadingSpinner from '@/assets/myComponents/LoadingSpinner'; // Import the spinner
import { Loader2 } from 'lucide-react';

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader2 />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="page1" element={<Page1 />} />
            <Route path="burek" element={<Burek />} />
            <Route path="Proizvajalci" element={<Proizvajalci />} />
            <Route path="Proizvajalci/:name" element={<ProizvajalciDetail />} />
            <Route path="Podrocja/:name" element={<PodrocjaDetail />} />
            <Route path="Izdelki/:name" element={<KategorijeDetail />} />
            <Route path="Produkt/:name" element={<ProductDetail />} /> 
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
