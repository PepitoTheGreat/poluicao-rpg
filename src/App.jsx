// src/App.jsx

import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import CenaIntroducao from './scenes/CenaIntroducao';
import CenaPrincipal from './scenes/CenaPrincipal';
import CenaQueimada from './scenes/CenaQueimada';
import CenaIndustria from './scenes/CenaIndustria';
import CenaObra from './scenes/CenaObra';
import CenaPecuaria from './scenes/CenaPecuaria';
import CenaCarros from './scenes/CenaCarros';
import CenaSol from './scenes/CenaSol'; // <-- ADICIONE O IMPORT DA NOVA CENA

function App() {
  const [mostrandoIntro, setMostrandoIntro] = useState(true);

  const handleIntroConcluida = () => {
    setMostrandoIntro(false);
  };

  if (mostrandoIntro) {
    return <CenaIntroducao onConcluido={handleIntroConcluida} />;
  }

  return (
    <Routes>
      <Route path="/" element={<CenaPrincipal />} />
      <Route path="/queimada" element={<CenaQueimada />} />
      <Route path="/industria" element={<CenaIndustria />} />
      <Route path="/obra" element={<CenaObra />} />
      <Route path="/pecuaria" element={<CenaPecuaria />} />
      <Route path="/carros" element={<CenaCarros />} />
      <Route path="/sol" element={<CenaSol />} /> {/* <-- ADICIONE A NOVA ROTA */}
    </Routes>
  );
}

export default App;