import { 
  Position, 
  ChessPiece, 
  PieceType, 
  PieceColor, 
  BoardDimensions,
  Move,
  GameConfig 
} from '../types/chess';

// Validação de dimensões do tabuleiro
export const isValidBoardSize = (dimensions: BoardDimensions): boolean => {
  return dimensions.rows >= 6 && dimensions.rows <= 12 && 
         dimensions.cols >= 6 && dimensions.cols <= 12;
};

// Cálculo das posições iniciais das peças
export const calculateInitialPositions = (dimensions: BoardDimensions): ChessPiece[] => {
  const pieces: ChessPiece[] = [];
  
  // Peças brancas (linha inferior)
  pieces.push({
    type: 'product-owner',
    color: 'white',
    position: { row: dimensions.rows - 1, col: 0 }
  });
  
  pieces.push({
    type: 'developer',
    color: 'white',
    position: { row: dimensions.rows - 1, col: 1 }
  });
  
  pieces.push({
    type: 'designer',
    color: 'white',
    position: { row: dimensions.rows - 1, col: 2 }
  });
  
  // Peças pretas (linha superior)
  pieces.push({
    type: 'product-owner',
    color: 'black',
    position: { row: 0, col: dimensions.cols - 1 }
  });
  
  pieces.push({
    type: 'developer',
    color: 'black',
    position: { row: 0, col: dimensions.cols - 2 }
  });
  
  pieces.push({
    type: 'designer',
    color: 'black',
    position: { row: 0, col: dimensions.cols - 3 }
  });
  
  return pieces;
};

// Verifica se uma posição está dentro dos limites do tabuleiro
export const isWithinBounds = (position: Position, dimensions: BoardDimensions): boolean => {
  return position.row >= 0 && position.row < dimensions.rows &&
         position.col >= 0 && position.col < dimensions.cols;
};

// Verifica se uma posição está ocupada por uma peça
export const getPieceAtPosition = (position: Position, pieces: ChessPiece[]): ChessPiece | null => {
  return pieces.find(piece => 
    piece.position.row === position.row && piece.position.col === position.col
  ) || null;
};

// Verifica se uma posição está vazia
export const isPositionEmpty = (position: Position, pieces: ChessPiece[]): boolean => {
  return getPieceAtPosition(position, pieces) === null;
};

// Calcula movimentos válidos para cada tipo de peça
export const getValidMoves = (
  piece: ChessPiece, 
  pieces: ChessPiece[], 
  dimensions: BoardDimensions
): Position[] => {
  const moves: Position[] = [];
  
  switch (piece.type) {
    case 'product-owner':
      // Move 1 quadrado em qualquer direção
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      
      for (const [dRow, dCol] of directions) {
        const newPos = {
          row: piece.position.row + dRow,
          col: piece.position.col + dCol
        };
        
        if (isWithinBounds(newPos, dimensions)) {
          const targetPiece = getPieceAtPosition(newPos, pieces);
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push(newPos);
          }
        }
      }
      break;
      
    case 'developer':
      // Move até 3 quadrados em qualquer direção
      const devDirections = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      
      for (const [dRow, dCol] of devDirections) {
        for (let distance = 1; distance <= 3; distance++) {
          const newPos = {
            row: piece.position.row + (dRow * distance),
            col: piece.position.col + (dCol * distance)
          };
          
          if (!isWithinBounds(newPos, dimensions)) break;
          
          const targetPiece = getPieceAtPosition(newPos, pieces);
          if (targetPiece) {
            if (targetPiece.color !== piece.color) {
              moves.push(newPos);
            }
            break; // Não pode pular sobre peças
          }
          moves.push(newPos);
        }
      }
      break;
      
    case 'designer':
      // Move em forma de L (2 quadrados em uma direção, 1 perpendicular)
      const lMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2],  [1, 2],  [2, -1],  [2, 1]
      ];
      
      for (const [dRow, dCol] of lMoves) {
        const newPos = {
          row: piece.position.row + dRow,
          col: piece.position.col + dCol
        };
        
        if (isWithinBounds(newPos, dimensions)) {
          const targetPiece = getPieceAtPosition(newPos, pieces);
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push(newPos);
          }
        }
      }
      break;
  }
  
  return moves;
};

// Executa um movimento
export const executeMove = (
  from: Position,
  to: Position,
  pieces: ChessPiece[]
): { newPieces: ChessPiece[], capturedPiece?: ChessPiece } => {
  const newPieces = [...pieces];
  const pieceIndex = newPieces.findIndex(p => 
    p.position.row === from.row && p.position.col === from.col
  );
  
  if (pieceIndex === -1) {
    throw new Error('Peça não encontrada na posição de origem');
  }
  
  // Verifica se há uma peça na posição de destino para captura
  const capturedPieceIndex = newPieces.findIndex(p => 
    p.position.row === to.row && p.position.col === to.col
  );
  
  let capturedPiece: ChessPiece | undefined;
  if (capturedPieceIndex !== -1) {
    capturedPiece = newPieces[capturedPieceIndex];
    newPieces.splice(capturedPieceIndex, 1);
  }
  
  // Move a peça
  newPieces[pieceIndex] = {
    ...newPieces[pieceIndex],
    position: to
  };
  
  return { newPieces, capturedPiece };
};

// Verifica se o jogo terminou (Product Owner capturado)
export const checkGameEnd = (pieces: ChessPiece[]): PieceColor | null => {
  const whiteProductOwner = pieces.find(p => 
    p.type === 'product-owner' && p.color === 'white'
  );
  
  const blackProductOwner = pieces.find(p => 
    p.type === 'product-owner' && p.color === 'black'
  );
  
  if (!whiteProductOwner) return 'black';
  if (!blackProductOwner) return 'white';
  
  return null;
};

// Cria uma nova configuração de jogo
export const createNewGame = (dimensions: BoardDimensions): GameConfig => {
  if (!isValidBoardSize(dimensions)) {
    throw new Error('Dimensões do tabuleiro inválidas');
  }
  
  return {
    dimensions,
    pieces: calculateInitialPositions(dimensions),
    currentTurn: 'white',
    gameState: 'playing'
  };
}; 