// src/scenes/CenaIndustria.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importando as imagens da cena da indústria
import cenarioImg from '../assets/scenes_assets/industria/cenario_industria.png';
import homemFalando from '../assets/scenes_assets/industria/homem/homem_falando.png';
import homemTriste from '../assets/scenes_assets/industria/homem/homem_triste.png';
import homemPreocupado from '../assets/scenes_assets/industria/homem/homem_preocupado.png';
import homemTossindo from '../assets/scenes_assets/industria/homem/homem_tossindo.png';
import homemFrustrado from '../assets/scenes_assets/industria/homem/homem_frustrado.png';

// --- ROTEIRO FINAL E INTERATIVO PARA A INDÚSTRIA ---
const roteiro = {
  inicio: {
    texto: "Desde que essa indústria chegou, tive um aumento de problemas com minha asma... *cof*...",
    expressao: homemTossindo,
    opcoes: [
      { texto: "Sinto muito. Por que isso acontece?", proximoId: "explicacaoGeral" },
      { texto: "Que tipo de poluição ela causa?", proximoId: "listaPoluentes" },
    ]
  },
  explicacaoGeral: {
    texto: "Você sabia que a indústria é responsável pela emissão de diversos poluentes atmosféricos? São eles que causam esses problemas.",
    expressao: homemPreocupado,
    opcoes: [
      { texto: "Pode me dar exemplos desses poluentes?", proximoId: "listaPoluentes" },
      { texto: "E quais os impactos gerais disso?", proximoId: "impactoGeral" },
    ]
  },
  listaPoluentes: {
    texto: "Claro. Eles emitem Dióxido de Enxofre (SO₂) e Óxidos de Nitrogênio (NOₓ), que podem causar chuva ácida. É frustrante...",
    expressao: homemFrustrado,
    opcoes: [
      { texto: "E o que é o 'material particulado'?", proximoId: "materialParticulado" },
      { texto: "E os gases de efeito estufa?", proximoId: "gasesEstufa" },
    ]
  },
  materialParticulado: {
    texto: "Esse é um dos piores. São partículas minúsculas, suspensas no ar, que penetram nos nossos pulmões e podem causar doenças respiratórias e até cardiovasculares.",
    expressao: homemPreocupado,
    opcoes: [
      { texto: "É por isso que os hospitais ficam mais cheios?", proximoId: "impactoSaude" },
      { texto: "Entendi. E os gases de efeito estufa?", proximoId: "gasesEstufa" },
    ]
  },
  gasesEstufa: {
    texto: "Exatamente. Fora tudo isso, ainda temos o Dióxido de Carbono (CO₂) e o Metano (CH₄), os famosos gases de efeito estufa que contribuem para o aquecimento global.",
    expressao: homemFalando,
    opcoes: [
      { texto: "Entendi a dimensão do problema. Obrigado.", proximoId: "final" },
    ]
  },
  impactoSaude: {
    texto: "Sim. A poluição do ar contribui diretamente para o aumento do volume de atendimentos de saúde e hospitalizações por doenças respiratórias.",
    expressao: homemTriste,
    opcoes: [
      { texto: "E para o meio ambiente como um todo?", proximoId: "impactoGeral" },
    ]
  },
  impactoGeral: {
    texto: "Para o meio ambiente, a poluição do ar está relacionada à chuva ácida, danos à biodiversidade e, claro, à intensificação das mudanças climáticas.",
    expressao: homemFalando,
    opcoes: [
      { texto: "É muita coisa... Obrigado pelas informações.", proximoId: "final" },
    ]
  },
  final: {
    texto: "Saber disso é o primeiro passo. Obrigado por se interessar pelo problema.",
    expressao: homemFalando,
    final: true,
  }
};


function CenaIndustria() {
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
      <img src={cenarioImg} alt="Cenário de uma área industrial" className="absolute top-0 left-0 w-full h-full object-cover" />

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
            src={etapa === 'interrompido' ? homemTriste : noAtual.expressao}
            alt="Homem operário"
            className={`h-5/6 object-contain absolute right-0 bottom-0 transition-transform duration-1000 ease-in-out ${personagemVisivel ? 'translate-x-0' : 'translate-x-full'}`}
          />
          
          <div className={`w-1/2 h-auto min-h-[33%] bg-black/80 rounded-t-lg p-6 text-white text-2xl flex flex-col justify-between absolute left-4 bottom-0 speech-bubble`}>
            <p>{etapa === 'interrompido' ? '"Entendo... Não se pode ajudar quem não quer."' : noAtual.texto}</p>

            <div className="flex flex-col items-start gap-3 mt-4">
              {etapa === 'dialogo' && !noAtual.final && noAtual.opcoes.map((opcao) => (
                <button key={opcao.texto} onClick={() => handleOpcaoClick(opcao.proximoId)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-left">
                  {opcao.texto}
                </button>
              ))}
              
              {etapa === 'dialogo' && noAtual.final && (
                 <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Voltar para a cidade</button>
              )}

              {etapa === 'dialogo' && (<button onClick={interromperDialogo} className="px-4 py-2 bg-transparent text-gray-400 hover:bg-gray-700 rounded text-sm">"Isso não é da minha conta."</button>)}

              {etapa === 'interrompido' && (
                <>
                  <button onClick={() => navigate('/')} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Voltar para a cidade</button>
                  <button onClick={voltarAoDialogo} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">"Espere, mudei de ideia."</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CenaIndustria;