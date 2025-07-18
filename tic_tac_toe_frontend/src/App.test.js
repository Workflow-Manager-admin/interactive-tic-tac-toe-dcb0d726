import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Tic Tac Toe Game', () => {
  test('renders game title', () => {
    render(<App />);
    expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  });

  test('renders empty board initially', () => {
    render(<App />);
    const gameSquares = screen.getAllByRole('button', { name: /Square \d+, empty/i });
    expect(gameSquares).toHaveLength(9);
    expect(screen.getByRole('button', { name: /reset game/i })).toBeInTheDocument();
  });

  test('shows correct player turn', () => {
    render(<App />);
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });

  test('places X and O alternately', () => {
    render(<App />);
    const squares = screen.getAllByRole('button', { name: /Square \d+, empty/i });
    
    // Click first square - should be X
    fireEvent.click(squares[0]);
    expect(screen.getByRole('button', { name: /Square 1, contains X/i })).toBeInTheDocument();
    expect(screen.getByText(/Next player: O/i)).toBeInTheDocument();
    
    // Click second square - should be O
    fireEvent.click(squares[1]);
    expect(screen.getByRole('button', { name: /Square 2, contains O/i })).toBeInTheDocument();
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });

  test('reset button clears the board', () => {
    render(<App />);
    const squares = screen.getAllByRole('button', { name: /Square \d+, empty/i });
    
    // Make some moves
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    
    // Click reset
    fireEvent.click(screen.getByRole('button', { name: /reset game/i }));
    
    // Check if board is cleared
    expect(screen.getAllByRole('button', { name: /Square \d+, empty/i })).toHaveLength(9);
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });
});
