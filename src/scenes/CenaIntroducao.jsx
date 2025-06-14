// src/scenes/CenaIntroducao.jsx

import React, { useState, useEffect } from 'react';
import logoReconecta from '../assets/logo-reconecta.png';
import tituloImg from '../assets/titulo-poluicao-ar.png'; // 1. IMPORTANDO O NOVO TÍTULO

function CenaIntroducao({ onConcluido }) {
  const [etapa, setEtapa] = useState('apresentacao');
  const [logoAnimado, setLogoAnimado] = useState(false);
  const [botaoVisivel, setBotaoVisivel] = useState(false);

  useEffect(() => {
    const timerLogo = setTimeout(() => {
      setLogoAnimado(true);
    }, 100);

    const timerBotao = setTimeout(() => {
      setBotaoVisivel(true);
    }, 1100);

    return () => {
      clearTimeout(timerLogo);
      clearTimeout(timerBotao);
    };
  }, []);


  const handleContinueClick = () => {
    setEtapa('titulo');
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      
      {etapa === 'apresentacao' && (
        <div className="flex flex-col items-center">
          <img 
            src={logoReconecta} 
            alt="(re)Conecta Apresenta" 
            className={`w-3/4 max-w-7xl mb-12 transition-transform duration-1000 ease-in-out ${logoAnimado ? 'scale-100' : 'scale-50'}`}
          />
          <button
            onClick={handleContinueClick}
            className={`mt-12 px-8 py-3 bg-white text-black font-bold rounded-lg text-xl transition-opacity duration-500 ${botaoVisivel ? 'opacity-100 hover:bg-gray-200' : 'opacity-0'}`}
            disabled={!botaoVisivel}
          >
            Continuar
          </button>
        </div>
      )}

      {/* ETAPA 2 ATUALIZADA COM A IMAGEM DO TÍTULO */}
      {etapa === 'titulo' && (
        <div className="animate-fade-in flex flex-col items-center">
          <img 
            src={tituloImg} 
            alt="Título: Poluição do Ar" 
            className="w-full max-w-2xl" // Ajuste o tamanho máximo se necessário
          />
          <p className="text-xl md:text-3xl mt-8">interaja com a nossa cidade!</p>
          <button
            onClick={onConcluido}
            className="mt-12 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg text-xl hover:bg-blue-500 transition-colors"
          >
            Iniciar Experiência
          </button>
          <p className="text-gray-400 mt-20 text-sm">
            Dica: aperte F11 para uma experiência em tela cheia.
          </p>
        </div>
      )}
    </div>
  );
}

export default CenaIntroducao;