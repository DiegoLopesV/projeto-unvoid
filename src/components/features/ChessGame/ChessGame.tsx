import { useState, useCallback } from 'react';
import { 
  GameConfig, 
  BoardDimensions, 
  ChessPiece, 
  Position, 
  GameState,
  PieceColor 
} from '../../../types/chess';
import { 
  createNewGame, 
  getValidMoves, 
  executeMove, 
  checkGameEnd,
  isValidBoardSize 
} from '../../../utils/chessLogic';
import DynamicGameBoard from '../../layout/DynamicGameBoard/DynamicGameBoard';
import DimensionInput from '../../ui/DimensionInput/DimensionInput';
import PlayButton from '../../ui/PlayButton/PlayButton';
import styles from './ChessGame.module.css';

export default function ChessGame() {
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [dimensions, setDimensions] = useState<BoardDimensions>({ rows: 6, cols: 6 });
  const [gameState, setGameState] = useState<GameState>('setup');

  const handleDimensionChange = useCallback((newDimensions: BoardDimensions) => {
    setDimensions(newDimensions);
  }, []);

  const handleStartGame = useCallback(() => {
    if (!isValidBoardSize(dimensions)) {
      alert('Dimensões inválidas! Use valores entre 6 e 12.');
      return;
    }

    const newGame = createNewGame(dimensions);
    setGameConfig(newGame);
    setGameState('playing');
    setSelectedPiece(null);
    setValidMoves([]);
  }, [dimensions]);

  const handlePieceSelect = useCallback((piece: ChessPiece | null) => {
    if (!gameConfig || gameState !== 'playing') return;

    setSelectedPiece(piece);
    
    if (piece && piece.color === gameConfig.currentTurn) {
      const moves = getValidMoves(piece, gameConfig.pieces, gameConfig.dimensions);
      setValidMoves(moves);
    } else {
      setValidMoves([]);
    }
  }, [gameConfig, gameState]);

  const handleMove = useCallback((from: Position, to: Position) => {
    if (!gameConfig || gameState !== 'playing') return;

    try {
      const { newPieces, capturedPiece } = executeMove(from, to, gameConfig.pieces);
      
      const winner = checkGameEnd(newPieces);
      
      setGameConfig(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          pieces: newPieces,
          currentTurn: prev.currentTurn === 'white' ? 'black' : 'white',
          gameState: winner ? 'finished' : 'playing',
          winner: winner || undefined
        };
      });

      setSelectedPiece(null);
      setValidMoves([]);
      
      if (winner) {
        setGameState('finished');
      }
    } catch (error) {
      console.error('Erro ao executar movimento:', error);
    }
  }, [gameConfig, gameState]);

  const handleResetGame = useCallback(() => {
    setGameConfig(null);
    setSelectedPiece(null);
    setValidMoves([]);
    setGameState('setup');
  }, []);

  const renderGameStatus = () => {
    if (!gameConfig) return null;

    if (gameConfig.gameState === 'finished') {
      const winnerText = gameConfig.winner === 'white' ? 'WHITE PIECES WON!' : 'BLACK PIECES WON!';
      
      return (
        <div className={styles.victoryScreen}>
          <div className={styles.victoryContent}>
            <div className={styles.starIcon}>⭐</div>
            <h1 className={styles.victoryTitle}>{winnerText}</h1>
            <div className={styles.victoryButtons}>
              <button className={styles.homeButton} onClick={() => window.location.href = '/'}>
                Voltar para a Home
              </button>
              <button onClick={handleResetGame} className={styles.newMatchButton}>
                Start New Match
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Cria um jogo inicial para mostrar o tabuleiro 6x6
  const initialGame = gameConfig || createNewGame({ rows: 6, cols: 6 });

  return (
    <div className={styles.chessGame}>
      <div className={styles.content}>
        <div className={styles.gameBoard}>
          <DynamicGameBoard
            dimensions={initialGame.dimensions}
            pieces={initialGame.pieces}
            currentTurn={initialGame.currentTurn}
            onMove={handleMove}
            selectedPiece={selectedPiece}
            onPieceSelect={handlePieceSelect}
            validMoves={validMoves}
          />
          
          {/* Mostra os controles apenas quando o jogo não está em andamento */}
          {gameState !== 'playing' && (
            <div className={styles.controls}>
              <DimensionInput
                label="Scale"
                valueX={dimensions.cols}
                valueY={dimensions.rows}
                onXChange={(value) => setDimensions(prev => ({ ...prev, cols: value }))}
                onYChange={(value) => setDimensions(prev => ({ ...prev, rows: value }))}
                onConfirm={handleStartGame}
              />
              <PlayButton 
                onClick={handleStartGame}
                disabled={!isValidBoardSize(dimensions)}
              />
            </div>
          )}
          
          {renderGameStatus()}
        </div>
      </div>
    </div>
  );
} 