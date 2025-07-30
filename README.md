# Unvoid Chess Game

## Visão Geral do Projeto

Unvoid Chess Game é uma aplicação de xadrez customizado que permite aos jogadores definir dimensões personalizadas do tabuleiro (6x6 até 12x12) e jogar com peças que representam diferentes roles de desenvolvimento: Product Owner, Developer e Designer. O objetivo é capturar o Product Owner do adversário para vencer.

## Tech Stack

- **Framework**: Next.js 15.3.1
- **Linguagem**: TypeScript
- **Estilização**: CSS Modules
- **Componentes**: React 19.0.0
- **Imagens**: Next.js Image Component
- **Fonte**: Kanit (Google Fonts)

## Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Docker (opcional, para execução em container)

### Execução Local
```bash
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

## Estrutura do Projeto

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

## Plano de Componentização

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

## Regras do Jogo

### Dimensões do Tabuleiro
- **Permitidas**: 6x6 até 12x12 (qualquer combinação)
- **Exemplos válidos**: 6x8, 10x7, 12x12
- **Exemplos inválidos**: 5x6, 13x6

### Peças e Movimentos

#### Product Owner
- **Movimento**: 1 quadrado em qualquer direção (vertical, horizontal, diagonal)
- **Captura**: Move sobre a peça adversária

#### Developer
- **Movimento**: Até 3 quadrados em qualquer direção
- **Captura**: Pula sobre a peça adversária
- **Restrição**: Não pode pular sobre peças ocupadas

#### Designer
- **Movimento**: Forma de "L" (2 quadrados em uma direção, 1 perpendicular)
- **Captura**: Move sobre a peça adversária

### Posicionamento Inicial
- **Peças Brancas**: Linha inferior (Product Owner, Developer, Designer)
- **Peças Pretas**: Linha superior (Product Owner, Developer, Designer)
- **Primeiro Turno**: Brancas

### Objetivo
Capturar o Product Owner do adversário para vencer o jogo.

## Características Técnicas

### Responsividade
- Design mobile-first com breakpoints em 768px e 1024px
- Tabuleiro adaptável com scroll horizontal em telas pequenas
- Componentes otimizados para diferentes tamanhos de tela

### Acessibilidade
- Tags HTML semânticas (`<main>`, `<button>`, etc.)
- Elementos interativos acessíveis via teclado
- Contraste adequado e tamanhos de fonte legíveis
- Estados visuais claros para seleção e movimentos válidos

### Performance
- Componentes otimizados com `useCallback` e `useMemo`
- Imagens otimizadas com Next.js Image
- Lazy loading para componentes não críticos
- Estados locais eficientes

### Tipagem
- TypeScript 100% tipado
- Interfaces bem definidas para todas as props
- Tipos específicos para lógica de jogo
- Sem uso de `any` em todo o código

## Checklist de Qualidade Final

### ✅ Princípio da Responsabilidade Única
- Cada componente tem um propósito claro e específico
- Separação clara entre UI, layout e lógica de negócio

### ✅ Reutilização Garantida
- Componentes "burros" que recebem dados via props
- Sem dados hardcoded nos componentes
- Lógica de negócio isolada em utils

### ✅ Tipagem 100% Segura
- Todas as props fortemente tipadas
- Interfaces TypeScript bem definidas
- Sem uso de `any` em todo o código

### ✅ Renderização Pura
- Componentes funcionais com props imutáveis
- Mesmo input sempre produz mesmo output
- Estados gerenciados adequadamente

### ✅ Acessibilidade Verificada
- Tags semânticas corretas
- Elementos interativos acessíveis
- Estados visuais claros

### ✅ Responsividade Implementada
- Design mobile-first
- Breakpoints adequados
- Adaptação fluida a diferentes telas

### ✅ Código Limpo
- JSX bem formatado e legível
- Nomes de props e variáveis claros
- Comentários apenas onde necessário
