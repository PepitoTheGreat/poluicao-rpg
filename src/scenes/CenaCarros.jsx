// src/scenes/CenaCarros.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importando TODAS as imagens da cena dos carros, incluindo o novo cenário
import cenarioImg from '../assets/scenes_assets/carros/cenario_carros.png';
import cadeiranteFalando from '../assets/scenes_assets/carros/cadeirante/cadeirante_falando.png';
import cadeiranteTriste from '../assets/scenes_assets/carros/cadeirante/cadeirante_triste.png';
import cadeirantePreocupado from '../assets/scenes_assets/carros/cadeirante/cadeirante_preocupado.png';
import cadeiranteTossindo from '../assets/scenes_assets/carros/cadeirante/cadeirante_tossindo.png';
import cadeiranteFrustrado from '../assets/scenes_assets/carros/cadeirante/cadeirante_frustrado.png';

// --- ROTEIRO EXTENSO E INTERATIVO PARA A CENA DOS CARROS ---
const roteiro = {
  inicio: {
    texto: "É incrível como a quantidade de carros aumenta a cada dia, não é? A maioria ainda usa combustíveis fósseis, e o ar que respiramos paga o preço.",
    expressao: cadeirantePreocupado,
    opcoes: [
      { texto: "Paga o preço como?", proximoId: "explicacaoGeral" },
      { texto: "É por causa da fumaça, certo?", proximoId: "explicacaoGeral" },
    ]
  },
  explicacaoGeral: {
    texto: "Exato. A queima desses combustíveis emite diversos poluentes. Cada um com um impacto diferente, mas todos perigosos. Sobre qual deles você gostaria de saber?",
    expressao: cadeiranteFalando,
    opcoes: [
      { texto: "Monóxido de Carbono (CO)", proximoId: "co" },
      { texto: "Óxidos de Nitrogênio (NOₓ)", proximoId: "nox" },
      { texto: "Material Particulado (MP)", proximoId: "mp" },
      { texto: "Compostos Orgânicos Voláteis (COVs)", proximoId: "covs" },
      { texto: "Dióxido de Carbono (CO₂)", proximoId: "co2" },
    ]
  },
  co: {
    texto: "O CO é traiçoeiro. Ele reduz a capacidade do nosso sangue de transportar oxigênio. Em altas concentrações, pode causar dores de cabeça, tontura e problemas piores.",
    expressao: cadeiranteTossindo,
    opcoes: [
      { texto: "Entendi. Me explique sobre outro.", proximoId: "explicacaoGeral" },
      { texto: "Quais os impactos gerais de tudo isso?", proximoId: "impactoFinal" },
    ]
  },
  nox: {
    texto: "Os NOₓ são formados nos motores quentes e, na atmosfera, contribuem para a formação da chuva ácida, que corrói monumentos e prejudica florestas e plantações.",
    expressao: cadeiranteFrustrado,
    opcoes: [
      { texto: "Ok. Me fale sobre outro poluente.", proximoId: "explicacaoGeral" },
      { texto: "Quais os impactos gerais de tudo isso?", proximoId: "impactoFinal" },
    ]
  },
  mp: {
    texto: "O Material Particulado são micropartículas que saem do escapamento. Elas são tão finas que penetram fundo nos pulmões, agravando doenças respiratórias como a asma.",
    expressao: cadeirantePreocupado,
    opcoes: [
      { texto: "Terrível. E os outros?", proximoId: "explicacaoGeral" },
      { texto: "Quais os impactos gerais de tudo isso?", proximoId: "impactoFinal" },
    ]
  },
  covs: {
    texto: "Os COVs reagem com a luz do sol na atmosfera e formam o 'smog' fotoquímico, aquela névoa de poluição acinzentada que vemos sobre as grandes cidades em dias quentes.",
    expressao: cadeiranteFalando,
    opcoes: [
      { texto: "Interessante. Qual o próximo?", proximoId: "explicacaoGeral" },
      { texto: "Quais os impactos gerais de tudo isso?", proximoId: "impactoFinal" },
    ]
  },
  co2: {
    texto: "E, claro, o CO₂, o principal gás de efeito estufa. Cada carro a combustão é uma pequena fábrica ambulante contribuindo para as mudanças climáticas.",
    expressao: cadeiranteTriste,
    opcoes: [
      { texto: "Entendi a gravidade. Quais são os impactos finais de tudo isso?", proximoId: "impactoFinal" },
    ]
  },
  impactoFinal: {
    texto: "No fim, todos esses poluentes juntos nos trazem problemas respiratórios e cardiovasculares, danificam a vegetação e aceleram as mudanças climáticas. É um ciclo que precisa ser quebrado.",
    expressao: cadeiranteFrustrado,
    final: true,
  }
};


function CenaCarros() {
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
      {/* IMAGEM DE CENÁRIO ADICIONADA AQUI */}
      <img src={cenarioImg} alt="Cenário de uma estrada com carros" className="absolute top-0 left-0 w-full h-full object-cover" />

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
            src={etapa === 'interrompido' ? cadeiranteTriste : noAtual.expressao}
            alt="Pessoa em cadeira de rodas"
            className={`h-5/6 object-contain absolute right-0 bottom-0 transition-transform duration-1000 ease-in-out ${personagemVisivel ? 'translate-x-0' : 'translate-x-full'}`}
          />
          
          <div className={`w-1/2 h-auto min-h-[33%] bg-black/80 rounded-t-lg p-6 text-white text-2xl flex flex-col justify-between absolute left-4 bottom-0 speech-bubble`}>
            <p>{etapa === 'interrompido' ? '"Tudo bem, podemos conversar outra hora."' : noAtual.texto}</p>

            <div className="flex flex-col items-start gap-3 mt-4">
              {etapa === 'dialogo' && !noAtual.final && noAtual.opcoes.map((opcao) => (
                <button key={opcao.texto} onClick={() => handleOpcaoClick(opcao.proximoId)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-left">
                  {opcao.texto}
                </button>
              ))}
              
              {etapa === 'dialogo' && noAtual.final && (
                 <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Voltar para a cidade</button>
              )}

              {etapa === 'dialogo' && (<button onClick={interromperDialogo} className="px-4 py-2 bg-transparent text-gray-400 hover:bg-gray-700 rounded text-sm">"Prefiro não falar sobre isso."</button>)}

              {etapa === 'interrompido' && (
                <>
                  <button onClick={() => navigate('/')} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Voltar para a cidade</button>
                  <button onClick={voltarAoDialogo} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">"Na verdade, quero continuar."</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CenaCarros;