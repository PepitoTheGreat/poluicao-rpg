// src/scenes/CenaQueimada.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importando todas as expressões disponíveis
import cenarioImg from '../assets/scenes_assets/queimada/cenario_queimada.png';
import bombeiroFalando from '../assets/scenes_assets/queimada/bombeiro/bombeiro_falando.png';
import bombeiroTriste from '../assets/scenes_assets/queimada/bombeiro/bombeiro_triste.png';
import bombeiroPreocupado from '../assets/scenes_assets/queimada/bombeiro/bombeiro_preocupado.png';
import bombeiroTossindo from '../assets/scenes_assets/queimada/bombeiro/bombeiro_tossindo.png';
import bombeiroFrustrado from '../assets/scenes_assets/queimada/bombeiro/bombeiro_frustrado.png';

// --- ROTEIRO COM EXPRESSÕES VARIADAS ---
const roteiro = {
  inicio: {
    texto: "Ufa... *cof, cof*... Essas queimadas acontecem com frequência! Sempre que acontece o ar fica tomado pela fumaça.",
    expressao: bombeiroTossindo,
    opcoes: [
      { texto: "Que horrível! Que tipo de poluição isso gera?", proximoId: "poluentes" },
      { texto: "Imagino... E como isso afeta nossa saúde?", proximoId: "saude" },
    ]
  },
  poluentes: {
    texto: "As queimadas liberam diversos tipos de poluentes, como o Dióxido de Carbono (CO₂), que aquece o planeta, e o Monóxido de Carbono (CO), que é tóxico para nós. Também liberam partículas finas que vão direto para os pulmões.",
    expressao: bombeiroFalando,
    opcoes: [
      { texto: "Nossa! E como isso afeta o ecossistema?", proximoId: "ecossistema" },
      { texto: "Essas partículas nos pulmões soam perigosas...", proximoId: "saude" },
    ]
  },
  saude: {
    texto: "Exato. O material particulado pode penetrar fundo nos pulmões e agravar doenças como asma e bronquite. É frustrante ver isso acontecer todo ano e saber dos riscos para todos.",
    expressao: bombeiroFrustrado, // Nova expressão
    opcoes: [
      { texto: "Isso afeta só quem está perto?", proximoId: "fumacaLonge" },
      { texto: "Entendi. E os animais e as plantas?", proximoId: "ecossistema" },
    ]
  },
  ecossistema: {
    texto: "Além de nos prejudicar, as queimadas destroem o lar de incontáveis animais e afetam todo o ecossistema. Alguns podem nunca mais se recuperar.",
    expressao: bombeiroTriste, // Expressão de tristeza
    opcoes: [
      { texto: "Que triste... E essa fumaça pode ir para longe?", proximoId: "fumacaLonge" },
      { texto: "Obrigado pelas informações.", proximoId: "final" },
    ]
  },
  fumacaLonge: {
    texto: "Sim, infelizmente. A fumaça pode ser carregada pelo vento por centenas de quilômetros, afetando a qualidade do ar em diferentes cidades ao mesmo tempo.",
    expressao: bombeiroPreocupado, // Expressão de preocupação
    opcoes: [
      { texto: "Entendi a gravidade. Obrigado.", proximoId: "final" },
    ]
  },
  final: {
    texto: "Obrigado por dedicar seu tempo a entender o problema. A conscientização é a nossa melhor ferramenta.",
    expressao: bombeiroFalando,
    final: true,
  }
};

function CenaQueimada() {
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
    if (proximoId) {
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
      <img src={cenarioImg} alt="Cenário de uma floresta em chamas" className="absolute top-0 left-0 w-full h-full object-cover" />

      {(etapa === 'dialogo' || etapa === 'interrompido') && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 transition-opacity duration-1000" />
      )}

      {etapa === 'botao_visivel' && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button onClick={iniciarConversa} className="px-6 py-3 bg-white/20 text-white backdrop-blur-md rounded-lg text-xl animate-pulse">
            Alguém se aproxima...
          </button>
        </div>
      )}

      {(etapa === 'dialogo' || etapa === 'interrompido') && (
        <div className="absolute inset-0 flex items-end justify-center">
          <img
            src={etapa === 'interrompido' ? bombeiroTriste : noAtual.expressao}
            alt="Bombeiro"
            className={`h-5/6 object-contain absolute right-0 bottom-0 transition-transform duration-1000 ease-in-out ${personagemVisivel ? 'translate-x-0' : 'translate-x-full'}`}
          />

          {/* BALÃO DE DIÁLOGO AJUSTADO */}
          <div className={`w-1/2 h-auto min-h-[33%] bg-black/80 rounded-t-lg p-6 text-white text-2xl flex flex-col justify-between absolute left-4 bottom-0 speech-bubble`}>
            <p>{etapa === 'interrompido' ? '"Tudo bem.... Fica para a próxima."' : noAtual.texto}</p>

            <div className="flex flex-col items-start gap-3 mt-4">
              {etapa === 'dialogo' && !noAtual.final && noAtual.opcoes.map((opcao) => (
                <button key={opcao.texto} onClick={() => handleOpcaoClick(opcao.proximoId)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-left">
                  {opcao.texto}
                </button>
              ))}
              
              {etapa === 'dialogo' && noAtual.final && (
                 <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Voltar para a cidade</button>
              )}

              {etapa === 'dialogo' && (<button onClick={interromperDialogo} className="px-4 py-2 bg-transparent text-gray-400 hover:bg-gray-700 rounded text-sm">"Não tenho mais tempo."</button>)}

              {etapa === 'interrompido' && (
                <>
                  <button onClick={() => navigate('/')} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Voltar para a cidade</button>
                  <button onClick={voltarAoDialogo} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">"Me arrependi, pode continuar."</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CenaQueimada;