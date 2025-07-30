import { useState } from 'react';
import { Position, ChessPiece, BoardDimensions } from '../../../types/chess';
import { getValidMoves, getPieceAtPosition } from '../../../utils/chessLogic';
import BoardSquare from '../../ui/BoardSquare/BoardSquare';
import styles from './DynamicGameBoard.module.css';

interface DynamicGameBoardProps {
  dimensions: BoardDimensions;
  pieces: ChessPiece[];
  currentTurn: 'white' | 'black';
  onMove: (from: Position, to: Position) => void;
  selectedPiece?: ChessPiece | null;
  onPieceSelect: (piece: ChessPiece | null) => void;
  validMoves: Position[];
}

export default function DynamicGameBoard({
  dimensions,
  pieces,
  currentTurn,
  onMove,
  selectedPiece,
  onPieceSelect,
  validMoves
}: DynamicGameBoardProps) {
  const squares = [];

  // Gera coordenadas para labels
  const columns = Array.from({ length: dimensions.cols }, (_, i) => 
    String.fromCharCode(65 + i)
  );
  const rows = Array.from({ length: dimensions.rows }, (_, i) => 
    String(dimensions.rows - i)
  );

  for (let row = 0; row < dimensions.rows; row++) {
    for (let col = 0; col < dimensions.cols; col++) {
      const position = { row, col };
      const isLight = (row + col) % 2 === 0;
      const piece = getPieceAtPosition(position, pieces);
      
      // Determina a imagem da peça
      let pieceImage: string | undefined;
      if (piece) {
        const typeMap = {
          'product-owner': 'product owner',
          'developer': 'developer',
          'designer': 'designer'
        };
        pieceImage = `/assets/pieces/type=${typeMap[piece.type]}, color=${piece.color}.png`;
      }

      // Labels apenas para primeira coluna (Y) e primeira linha (X)
      const labelY = col === 0 ? rows[row] : undefined;
      const labelX = row === dimensions.rows - 1 ? columns[col] : undefined;

      // Verifica se o quadrado está selecionado ou é um movimento válido
      const isSelected = selectedPiece && 
        selectedPiece.position.row === row && 
        selectedPiece.position.col === col;
      
      const isValidMove = validMoves.some(move => 
        move.row === row && move.col === col
      );

      squares.push(
        <BoardSquare
          key={`${row}-${col}`}
          isLight={isLight}
          pieceImage={pieceImage}
          labelX={labelX}
          labelY={labelY}
          isSelected={!!isSelected}
          isValidMove={isValidMove}
          onClick={() => handleSquareClick(position, piece)}
        />
      );
    }
  }

  const handleSquareClick = (position: Position, piece: ChessPiece | null) => {
    if (selectedPiece) {
      // Se uma peça já está selecionada, tenta fazer um movimento
      if (validMoves.some(move => move.row === position.row && move.col === position.col)) {
        onMove(selectedPiece.position, position);
        onPieceSelect(null);
      } else if (piece && piece.color === currentTurn) {
        // Se clicou em outra peça do mesmo jogador, seleciona ela
        onPieceSelect(piece);
      } else {
        // Cancela a seleção
        onPieceSelect(null);
      }
    } else if (piece && piece.color === currentTurn) {
      // Seleciona a peça se for do jogador atual
      onPieceSelect(piece);
    }
  };

  return (
    <div 
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${dimensions.cols}, 72px)`,
        gridTemplateRows: `repeat(${dimensions.rows}, 72px)`
      }}
    >
      {squares}
    </div>
  );
} 