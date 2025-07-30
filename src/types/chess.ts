export type PieceType = 'product-owner' | 'developer' | 'designer';
export type PieceColor = 'white' | 'black';
export type GameState = 'setup' | 'playing' | 'finished';

export interface Position {
  row: number;
  col: number;
}

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  position: Position;
}

export interface BoardDimensions {
  rows: number;
  cols: number;
}

export interface GameConfig {
  dimensions: BoardDimensions;
  pieces: ChessPiece[];
  currentTurn: PieceColor;
  gameState: GameState;
  winner?: PieceColor;
}

export interface Move {
  from: Position;
  to: Position;
  piece: ChessPiece;
  capturedPiece?: ChessPiece;
}

export interface GameHistory {
  moves: Move[];
  currentIndex: number;
} 