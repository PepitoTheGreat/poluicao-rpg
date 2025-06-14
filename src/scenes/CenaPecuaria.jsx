// src/scenes/CenaPecuaria.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importando TODAS as imagens da cena, incluindo o novo cenário
import cenarioImg from '../assets/scenes_assets/pecuaria/cenario_pecuaria.png';
import fazendeiroFalando from '../assets/scenes_assets/pecuaria/fazendeiro/fazendeiro_falando.png';
import fazendeiroTriste from '../assets/scenes_assets/pecuaria/fazendeiro/fazendeiro_triste.png';
import fazendeiroPreocupado from '../assets/scenes_assets/pecuaria/fazendeiro/fazendeiro_preocupado.png';
import fazendeiroTossindo from '../assets/scenes_assets/pecuaria/fazendeiro/fazendeiro_tossindo.png';
import fazendeiroFrustrado from '../assets/scenes_assets/pecuaria/fazendeiro/fazendeiro_frustrado.png';

// --- ROTEIRO EXTENSO E INTERATIVO PARA A CENA DA PECUÁRIA ---
const roteiro = {
  inicio: {
    texto: "Nossa produção não para de crescer, o consumo de carne nunca foi tão alto! Mas confesso que o impacto disso no meio ambiente me preocupa.",
    expressao: fazendeiroPreocupado,
    opcoes: [
      { texto: "Impacto? Que tipo de impacto?", proximoId: "explicacaoGeral" },
      { texto: "Mas isso é bom para a economia, não?", proximoId: "economia" },
    ]
  },
  economia: {
    texto: "Sim, gera empregos e alimenta muita gente. Mas temos que pensar no equilíbrio. A forma como produzimos hoje tem um custo alto para o planeta.",
    expressao: fazendeiroFalando,
    opcoes: [
      { texto: "Qual é o principal custo para o planeta?", proximoId: "metano" },
      { texto: "Entendo. Fale mais sobre os outros impactos.", proximoId: "explicacaoGeral" },
    ]
  },
  explicacaoGeral: {
    texto: "Sabia que essa criação também pode emitir diferentes poluentes? E não é só um tipo, são vários, de formas diferentes.",
    expressao: fazendeiroFalando,
    opcoes: [
      { texto: "Fale sobre o gás que os animais produzem.", proximoId: "metano" },
      { texto: "E as queimadas nas pastagens?", proximoId: "queimaPastos" },
      { texto: "Ouvi falar sobre o desmatamento...", proximoId: "desmatamento" },
    ]
  },
  metano: {
    texto: "Esse é o Metano (CH₄). O processo digestivo dos bois libera esse gás, que é um gás de efeito estufa cerca de 28 vezes mais potente que o CO₂ para aquecer o planeta.",
    expressao: fazendeiroPreocupado,
    opcoes: [
      { texto: "Impressionante. E sobre a queima de pastos?", proximoId: "queimaPastos" },
      { texto: "Entendi. E o desmatamento?", proximoId: "desmatamento" },
    ]
  },
  queimaPastos: {
    texto: "É uma prática comum para renovar o pasto, mas é terrível. Libera fumaça com material particulado e gases tóxicos. *cof*... Afeta a todos nós.",
    expressao: fazendeiroTossindo,
    opcoes: [
      { texto: "E o desmatamento para criar esses pastos?", proximoId: "desmatamento" },
      { texto: "Entendi. Quais os impactos finais de tudo isso?", proximoId: "impactoFinal" },
    ]
  },
  desmatamento: {
    texto: "Exato. Para criar mais pasto, muitas vezes destroem florestas. Isso não só acaba com a biodiversidade, mas reduz a capacidade do planeta de absorver o CO₂, piorando o efeito estufa.",
    expressao: fazendeiroTriste,
    opcoes: [
      { texto: "Então, no fim, tudo está conectado.", proximoId: "impactoFinal" },
      { texto: "Obrigado pelas informações.", proximoId: "final" },
    ]
  },
  impactoFinal: {
    texto: "Exatamente. Juntos, todos esses processos contribuem para o aquecimento global, causam danos à nossa saúde por causa da fumaça e destroem os ecossistemas. Precisamos achar um caminho mais sustentável.",
    expressao: fazendeiroFrustrado,
    final: true,
  }
};


function CenaPecuaria() {
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
      <img src={cenarioImg} alt="Cenário de uma área de pecuária" className="absolute top-0 left-0 w-full h-full object-cover" />

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
            src={etapa === 'interrompido' ? fazendeiroTriste : noAtual.expressao}
            alt="Fazendeiro"
            className={`h-5/6 object-contain absolute right-0 bottom-0 transition-transform duration-1000 ease-in-out ${personagemVisivel ? 'translate-x-0' : 'translate-x-full'}`}
          />
          
          <div className={`w-1/2 h-auto min-h-[33%] bg-black/80 rounded-t-lg p-6 text-white text-2xl flex flex-col justify-between absolute left-4 bottom-0 speech-bubble`}>
            <p>{etapa === 'interrompido' ? '"Deixa pra lá então..."' : noAtual.texto}</p>

            <div className="flex flex-col items-start gap-3 mt-4">
              {etapa === 'dialogo' && !noAtual.final && noAtual.opcoes.map((opcao) => (
                <button key={opcao.texto} onClick={() => handleOpcaoClick(opcao.proximoId)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-left">
                  {opcao.texto}
                </button>
              ))}
              
              {(etapa === 'dialogo' && noAtual.final) || etapa === 'finalizado' ? (
                 <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Voltar para a cidade</button>
              ) : null}

              {etapa === 'dialogo' && !noAtual.final && (<button onClick={interromperDialogo} className="px-4 py-2 bg-transparent text-gray-400 hover:bg-gray-700 rounded text-sm">"Não quero saber disso."</button>)}

              {etapa === 'interrompido' && (
                <>
                  <button onClick={() => navigate('/')} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Voltar para a cidade</button>
                  <button onClick={voltarAoDialogo} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">"Pensei melhor, pode falar."</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CenaPecuaria;