import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import City from "./components/City";
import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import Form from "./components/Form";
import { CityProvider } from "./contexts/CitiesContext";
import { FakeAuthProvider } from "./contexts/FakeAuthContext";
import ProtectFakeAuth from "./pages/ProtectFakeAuth";
// import { useEffect, useState } from "react";

function App() {
  return (
    <div>
      <CityProvider>
        <FakeAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </FakeAuthProvider>
      </CityProvider>
    </div>
  );
}

export default App;
