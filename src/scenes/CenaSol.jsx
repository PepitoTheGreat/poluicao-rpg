// src/scenes/CenaSol.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ATENÇÃO: Verifique se estes nomes de arquivos correspondem aos que você criou.
// Se necessário, importe mais expressões da sua pasta.
import cenarioSolImg from '../assets/scenes_assets/sol/cenario_sol.png'; 
import cientistaFalando from '../assets/scenes_assets/sol/cientista/cientista_falando.png';
import cientistaPreocupada from '../assets/scenes_assets/sol/cientista/cientista_preocupada.png';
import cientistaTriste from '../assets/scenes_assets/sol/cientista/cientista_triste.png';

// --- ROTEIRO PARA A CENA DO SOL ---
const roteiro = {
  inicio: {
    texto: "Olá. Vejo que notou nosso Sol... Ele não parece muito bem hoje, não é? A aparência dele é um reflexo direto da qualidade do nosso ar.",
    expressao: cientistaPreocupada,
    opcoes: [
      { texto: "Por que ele está com essa cor avermelhada?", proximoId: "cor" },
      { texto: "E por que ele parece... triste?", proximoId: "brilho" },
    ]
  },
  cor: {
    texto: "A cor avermelhada acontece por causa do 'Espalhamento Mie'. Partículas de poluição, como fuligem e fumaça, são maiores e espalham todos os comprimentos de onda de luz de forma mais igual. Isso 'apaga' os azuis e verdes, deixando passar apenas os tons de laranja e vermelho.",
    expressao: cientistaFalando,
    opcoes: [
      { texto: "Interessante. E por que o brilho dele está fraco?", proximoId: "brilho" },
      { texto: "Isso afeta nosso dia a dia?", proximoId: "impacto" },
    ]
  },
  brilho: {
    texto: "O brilho dele parece mais fraco porque a densa camada de poluição na atmosfera literalmente bloqueia parte da luz solar de chegar até a superfície. É como se ele estivesse atrás de um vidro sujo. Por isso ele parece tão abatido e triste.",
    expressao: cientistaTriste,
    opcoes: [
      { texto: "Nossa. E qual o impacto disso tudo?", proximoId: "impacto" },
      { texto: "Entendi a causa da cor. Pode repetir?", proximoId: "cor" },
    ]
  },
  impacto: {
    texto: "O impacto é enorme. Um céu assim indica uma alta concentração de poluentes que causam problemas respiratórios e cardiovasculares. Além disso, menos luz solar afeta a agricultura e o equilíbrio dos ecossistemas.",
    expressao: cientistaPreocupada,
    opcoes: [
      { texto: "Entendi a gravidade da situação. Obrigado.", proximoId: "final" },
    ]
  },
  final: {
    texto: "O céu é um espelho da saúde do nosso planeta. Cuidar do ar é cuidar de tudo ao nosso redor. Fico feliz que tenha se interessado.",
    expressao: cientistaFalando,
    final: true,
  }
};


function CenaSol() {
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
    if (proximoId === 'final' || roteiro[proximoId]?.final) {
        setIdNoAtual(proximoId);
        setEtapa('finalizado');
    } else if (proximoId) {
      setIdNoAtual(proximoId);
    }
  };

  const interromperDialogo = () => {
    setEtapa('interrompido');
  };

  // ESTA FUNÇÃO ESTAVA INCOMPLETA NO CÓDIGO QUE VOCÊ ME MOSTROU
  const voltarAoDialogo = () => {
    setEtapa('dialogo');
  };

  const noAtual = roteiro[idNoAtual];

  return (
    // Adicionando a imagem de fundo que você criou
    <div className="relative w-full h-screen overflow-hidden">
        <img src={cenarioSolImg} alt="Cenário do Sol" className="absolute top-0 left-0 w-full h-full object-cover" />

      {(etapa === 'dialogo' || etapa === 'interrompido' || etapa === 'finalizado') && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 transition-opacity duration-1000" />
      )}

      {etapa === 'botao_visivel' && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button onClick={iniciarConversa} className="px-6 py-3 bg-white/20 text-white backdrop-blur-md rounded-lg text-xl animate-pulse">
            Uma cientista se aproxima...
          </button>
        </div>
      )}

      {(etapa === 'dialogo' || etapa === 'interrompido' || etapa === 'finalizado') && (
        <div className="absolute inset-0 flex items-end justify-center">
          <img
            src={etapa === 'interrompido' ? cientistaTriste : noAtual.expressao}
            alt="Cientista"
            className={`h-5/6 object-contain absolute right-0 bottom-0 transition-transform duration-1000 ease-in-out ${personagemVisivel ? 'translate-x-0' : 'translate-x-full'}`}
          />
          <div className={`w-1/2 h-auto min-h-[33%] bg-black/80 rounded-t-lg p-6 text-white text-2xl flex flex-col justify-between absolute left-4 bottom-0 speech-bubble`}>
            <p>{etapa === 'interrompido' ? '"Oh, uma pena. É um assunto importante..."' : noAtual.texto}</p>
            <div className="flex flex-col items-start gap-3 mt-4">
              {etapa === 'dialogo' && !noAtual.final && noAtual.opcoes.map((opcao) => (
                <button key={opcao.texto} onClick={() => handleOpcaoClick(opcao.proximoId)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-left">{opcao.texto}</button>
              ))}
              {(etapa === 'dialogo' && noAtual.final) || etapa === 'finalizado' ? (<button onClick={() => navigate('/')} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Voltar para a cidade</button>) : null}
              {etapa === 'dialogo' && !noAtual.final && (<button onClick={interromperDialogo} className="px-4 py-2 bg-transparent text-gray-400 hover:bg-gray-700 rounded text-sm">"Prefiro não saber."</button>)}
              {etapa === 'interrompido' && (
                <>
                  <button onClick={() => navigate('/')} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Voltar para a cidade</button>
                  <button onClick={voltarAoDialogo} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">"Na verdade, mudei de ideia."</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CenaSol;