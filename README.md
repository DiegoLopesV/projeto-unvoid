# Unvoid Chess Game

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎮 Visão Geral do Projeto

Unvoid Chess Game é uma aplicação de xadrez customizado que permite aos jogadores definir dimensões personalizadas do tabuleiro (6x6 até 12x12) e jogar com peças que representam diferentes roles de desenvolvimento: Product Owner, Developer e Designer. O objetivo é capturar o Product Owner do adversário para vencer.

### ✨ Features Implementadas

- ✅ **Tabuleiro Customizável**: Dimensões de 6x6 a 12x12
- ✅ **Peças com Roles**: Product Owner, Developer, Designer
- ✅ **Tela de Vitória Animada**: Interface moderna com estrela e efeitos visuais
- ✅ **Controles Responsivos**: Interface adaptável para diferentes telas
- ✅ **Inputs Inteligentes**: Campos de texto com estados e validação

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.3.1](https://nextjs.org/)
- **Linguagem**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Estilização**: CSS Modules
- **Componentes**: [React 19.0.0](https://reactjs.org/)
- **Imagens**: Next.js Image Component
- **Fonte**: Kanit (Google Fonts)

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Docker (opcional, para execução em container)

### Execução Local
```bash
# Clonar o repositório
git clone <repository-url>
cd unvoid-chess-game

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Acessar a aplicação
# http://localhost:3000
```

### Execução com Docker
```bash
# Construir a imagem
docker build -t unvoid-chess-game .

# Executar o container
docker run -p 3000:3000 unvoid-chess-game

# Ou usar o script fornecido
sh ./main.sh
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Página principal
│   ├── page.module.css       # Estilos da página
│   ├── globals.css           # Estilos globais
│   └── layout.tsx            # Layout principal
├── components/
│   ├── ui/                   # Componentes de UI fundamentais
│   │   ├── BoardSquare/      # Quadrado do tabuleiro
│   │   ├── DimensionInput/   # Input de dimensões
│   │   ├── TextField/        # Campo de texto com estados
│   │   └── PlayButton/       # Botão de jogo
│   ├── layout/               # Componentes de layout
│   │   ├── GameBoard/        # Tabuleiro estático (legado)
│   │   └── DynamicGameBoard/ # Tabuleiro dinâmico
│   └── features/             # Funcionalidades de negócio
│       └── ChessGame/        # Componente principal do jogo
├── types/
│   └── chess.ts              # Tipos TypeScript do jogo
└── utils/
    └── chessLogic.ts         # Lógica do jogo
```

## 🎯 Plano de Componentização

### Componentes de UI Fundamentais (/components/ui)

#### BoardSquare.tsx
- **Localização**: `components/ui/BoardSquare/`
- **Descrição**: Componente para um único quadrado do tabuleiro
- **Props**: `isLight`, `pieceImage?`, `labelX?`, `labelY?`, `isSelected?`, `isValidMove?`, `onClick?`
- **Funcionalidade**: Renderiza quadrados com gradientes, peças, labels e estados de seleção

#### DimensionInput.tsx
- **Localização**: `components/ui/DimensionInput/`
- **Descrição**: Componente para inputs de dimensão do tabuleiro ("Scale")
- **Props**: `label`, `valueX`, `valueY`, `onXChange`, `onYChange`, `onConfirm`
- **Funcionalidade**: Interface para definir dimensões X e Y com botão de confirmação

#### TextField.tsx
- **Localização**: `components/ui/TextField/`
- **Descrição**: Componente de campo de texto com múltiplos estados
- **Props**: `label`, `value`, `onChange`, `variant?`
- **Estados**: enabled, active, filled, error
- **Funcionalidade**: Campo de input com transições automáticas de estado

#### PlayButton.tsx
- **Localização**: `components/ui/PlayButton/`
- **Descrição**: Botão de controle do jogo
- **Props**: `onClick`, `disabled?`, `isPlaying?`
- **Funcionalidade**: Botão com estados de play/pause

### Componentes de Layout (/components/layout)

#### DynamicGameBoard.tsx
- **Localização**: `components/layout/DynamicGameBoard/`
- **Descrição**: Tabuleiro de jogo dinâmico que se adapta às dimensões
- **Props**: `dimensions`, `pieces`, `currentTurn`, `onMove`, `selectedPiece`, `onPieceSelect`, `validMoves`
- **Funcionalidade**: Renderiza tabuleiro com dimensões customizáveis e lógica de jogo

### Componentes de Features (/components/features)

#### ChessGame.tsx
- **Localização**: `components/features/ChessGame/`
- **Descrição**: Componente principal que gerencia todo o jogo
- **Funcionalidade**: Orquestra a lógica do jogo, estados e interações
