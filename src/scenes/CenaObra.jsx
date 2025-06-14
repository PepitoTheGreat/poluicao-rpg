// src/scenes/CenaObra.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importando TODAS as imagens da cena da obra, incluindo o novo cenário
import cenarioImg from '../assets/scenes_assets/obra/cenario_obra.png';
import mulherFalando from '../assets/scenes_assets/obra/mulher/mulher_falando.png';
import mulherTriste from '../assets/scenes_assets/obra/mulher/mulher_triste.png';
import mulherPreocupada from '../assets/scenes_assets/obra/mulher/mulher_preocupada.png';
import mulherTossindo from '../assets/scenes_assets/obra/mulher/mulher_tossindo.png';
import mulherFrustrada from '../assets/scenes_assets/obra/mulher/mulher_frustrada.png';

// --- ROTEIRO ESTENDIDO PARA A CENA DA OBRA ---
const roteiro = {
  inicio: {
    texto: "Depois que essas obras começaram, percebemos que tem muita poeira no ar! *cof, cof*...",
    expressao: mulherTossindo,
    opcoes: [
      { texto: "É verdade. De onde vem toda essa poeira?", proximoId: "origemPoeira" },
      { texto: "Isso pode fazer mal à saúde?", proximoId: "saude" },
    ]
  },
  origemPoeira: {
    texto: "A maior parte vem da movimentação de terra, do corte de concreto e do transporte de materiais sem cobertura. Tudo isso lança no ar o 'Material Particulado', ou MP.",
    expressao: mulherFalando,
    opcoes: [
      { texto: "E além da poeira, existe outra fonte de poluição?", proximoId: "quimicos" },
      { texto: "E o que esse 'MP' causa na nossa saúde?", proximoId: "saude" },
    ]
  },
  quimicos: {
    texto: "Sim, infelizmente. As tintas, solventes e adesivos que usam aqui liberam gases invisíveis, os 'Compostos Orgânicos Voláteis' (COVs), que poluem o ar que respiramos.",
    expressao: mulherPreocupada,
    opcoes: [
      { texto: "Entendi. Então a saúde é a mais afetada, certo?", proximoId: "saude" },
      { texto: "E não há nada que possa ser feito?", proximoId: "solucoes" },
    ]
  },
  saude: {
    texto: "Exatamente. Os principais problemas são respiratórios e cardiovasculares. É frustrante ver que crianças e idosos são os que mais sofrem com alergias e crises de asma por causa disso.",
    expressao: mulherFrustrada,
    opcoes: [
      { texto: "É revoltante. Existem soluções para isso?", proximoId: "solucoes" },
      { texto: "Não imaginava que era tão sério. Obrigado.", proximoId: "final" },
    ]
  },
  solucoes: {
    texto: "Claro que existem! Medidas como umedecer a área de trabalho para baixar a poeira, cobrir os caminhões e usar produtos com baixo teor de químicos já fariam uma diferença enorme.",
    expressao: mulherFalando,
    opcoes: [
        { texto: "Bom saber que há o que fazer. Obrigado.", proximoId: "final" },
    ]
  },
  final: {
    texto: "É importante saber de onde vem a poluição para podermos cobrar por construções mais responsáveis. Obrigada por conversar.",
    expressao: mulherFalando,
    final: true,
  }
};


function CenaObra() {
  const [etapa, setEtapa] = useState('aguardando');
  const [personagemVisivel, setPersonagemVisivel] = useState(false);
  const [idNoAtual, setIdNoAtual] = useState('inicio');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setEtapa('botao_visivel');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const iniciarConversa = () => {
    setEtapa('dialogo');
    setTimeout(() => setPersonagemVisivel(true), 100);
  };

  const handleOpcaoClick = (proximoId) => {
    if (proximoId === 'final') {
        setEtapa('finalizado');
    } else if (proximoId) {
      setIdNoAtual(proximoId);
    }
  };

  const interromperDialogo = () => {
    setEtapa('interrompido');
  };

  const voltarAoDialogo = () => {
    setEtapa('dialogo');
  };

  const noAtual = roteiro[idNoAtual];

  return (
    <div className="relative w-full h-screen overflow-hidden">
        {/* IMAGEM DE CENÁRIO ADICIONADA AQUI */}
        <img src={cenarioImg} alt="Cenário de uma obra de construção" className="absolute top-0 left-0 w-full h-full object-cover" />

      {(etapa === 'dialogo' || etapa === 'interrompido' || etapa === 'finalizado') && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 transition-opacity duration-1000" />
      )}

      {etapa === 'botao_visivel' && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button onClick={iniciarConversa} className="px-6 py-3 bg-white/20 text-white backdrop-blur-md rounded-lg text-xl animate-pulse">
            Alguém se aproxima...
          </button>
        </div>
      )}

      {(etapa === 'dialogo' || etapa === 'interrompido' || etapa === 'finalizado') && (
        <div className="absolute inset-0 flex items-end justify-center">
          <img
            src={etapa === 'interrompido' ? mulherTriste : noAtual.expressao}
            alt="Mulher da obra"
            className={`h-5/6 object-contain absolute right-0 bottom-0 transition-transform duration-1000 ease-in-out ${personagemVisivel ? 'translate-x-0' : 'translate-x-full'}`}
          />
          
          <div className={`w-1/2 h-auto min-h-[33%] bg-black/80 rounded-t-lg p-6 text-white text-2xl flex flex-col justify-between absolute left-4 bottom-0 speech-bubble`}>
            <p>{etapa === 'interrompido' ? 'Sei como é, muita poeira na cabeça...' : noAtual.texto}</p>

            <div className="flex flex-col items-start gap-3 mt-4">
              {etapa === 'dialogo' && !noAtual.final && noAtual.opcoes.map((opcao) => (
                <button key={opcao.texto} onClick={() => handleOpcaoClick(opcao.proximoId)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-left">
                  {opcao.texto}
                </button>
              ))}
              
              {(etapa === 'dialogo' && noAtual.final) || etapa === 'finalizado' ? (
                 <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Voltar para a cidade</button>
              ): null}

              {etapa === 'dialogo' && !noAtual.final && (<button onClick={interromperDialogo} className="px-4 py-2 bg-transparent text-gray-400 hover:bg-gray-700 rounded text-sm">"Não me interesso por isso."</button>)}

              {etapa === 'interrompido' && (
                <>
                  <button onClick={() => navigate('/')} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Voltar para a cidade</button>
                  <button onClick={voltarAoDialogo} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">"Desculpe, pode continuar."</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CenaObra;