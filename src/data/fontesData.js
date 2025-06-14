// src/data/fontesData.js

import industriaImg from '../assets/industria.png';
import obraImg from '../assets/obra.png';
import pecuariaImg from '../assets/pecuaria.png';
import queimadaImg from '../assets/queimada.png';
import carroImg from '../assets/carros.png';
import solTristeImg from '../assets/sol_triste.png'; // <-- NOVO IMPORT

export const fontesPoluicao = [
  {
    id: 'industria',
    nome: 'Indústria',
    imagem: industriaImg,
    link: '/industria',
    estilo: { top: '149px', left: '-72px', width: '715px', position: 'absolute' }
  },
  {
    id: 'obra',
    nome: 'Obra',
    imagem: obraImg,
    link: '/obra',
    estilo: { top: '1015px', left: '8px', width: '585px', position: 'absolute' }
  },
  {
    id: 'pecuaria',
    nome: 'Pecuária',
    imagem: pecuariaImg,
    link: '/pecuaria',
    estilo: { top: '905px', left: '1000px', width: '570px', position: 'absolute' }
  },
  {
    id: 'queimada',
    nome: 'Queimada',
    imagem: queimadaImg,
    link: '/queimada',
    estilo: { top: '-25px', left: '1050px', width: '550px', position: 'absolute' }
  },
  {
    id: 'carro',
    nome: 'Carros',
    imagem: carroImg,
    link: '/carros',
    estilo: { top: '570px', left: '622px', width: '380px', position: 'absolute' }
  },
  // --- NOVO ELEMENTO ADICIONADO ---
  {
    id: 'sol',
    nome: 'Sol Triste',
    imagem: solTristeImg,
    link: '/sol', // Rota para a nova cena
    // ATENÇÃO: Ajuste a posição (top, left) e o tamanho (width) como desejar
    estilo: { top: '147px', left: '1268px', width: '150px', position: 'absolute' }
  }
];