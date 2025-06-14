// src/scenes/CenaPrincipal.jsx

import { Link } from 'react-router-dom';
import { fontesPoluicao } from '../data/fontesData';

// Caminhos corretos para as imagens de fundo e atmosfera
import fundo from '../assets/fundo.png';
import nuvens from '../assets/nuvens.png'; // O caminho correto
import mp from '../assets/mp.png';       // O caminho correto

function CenaPrincipal() {
  return (
    <div className="relative w-[1600px] h-[1800px] bg-black mx-auto">
      {/* CAMADA 0: O FUNDO */}
      <img
        src={fundo}
        alt="Fundo da cidade poluída"
        className="absolute top-0 left-0 z-0" // z-0: A camada mais baixa
        style={{ width: '1600px', height: '1800px' }}
      />
      
      {/* CAMADA 10: ELEMENTOS DE ATMOSFERA */}
      <img
        src={nuvens}
        alt="Nuvens de poluição"
        className="absolute z-30 pointer-events-none" // z-10: Acima do fundo
        style={{ top: '2px', left: '0px', width: '1604px' }}
      />
      <img
        src={mp}
        alt="Material Particulado"
        className="absolute z-10" // z-10: Acima do fundo
        style={{ top: '1210px', left: '0px', width: '1604px' }}
      />

      {/* CAMADA 20: ELEMENTOS CLICÁVEIS */}
      {fontesPoluicao.map((fonte) => (
        <Link to={fonte.link} key={fonte.id}>
          <img
            src={fonte.imagem}
            alt={fonte.nome}
            className="absolute z-20 cursor-pointer transition-transform hover:scale-105" // z-20: Na frente de tudo
            style={fonte.estilo}
          />
        </Link>
      ))}
    </div>
  );
}

export default CenaPrincipal;