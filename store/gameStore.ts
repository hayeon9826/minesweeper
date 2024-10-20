import { create } from "zustand";

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

interface GameState {
  grid: Cell[][];
  rows: number;
  cols: number;
  mineCount: number;
  isGameOver: boolean;
  isSuccess: boolean;
  startGame: (rows: number, cols: number) => void;
  revealCell: (x: number, y: number) => void;
  toggleFlag: (x: number, y: number) => void;
  resetGame: (rows: number, cols: number) => void;
}

const generateGrid = (
  rows: number,
  cols: number
): { grid: Cell[][]; mineCount: number } => {
  let mineCount = 0;
  const grid: Cell[][] = Array(rows)
    .fill(null)
    .map(() =>
      Array(cols)
        .fill(null)
        .map(() => {
          const isMine = Math.random() < 0.2; // 20% 확률로 지뢰
          if (isMine) mineCount++;
          return {
            isMine,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          };
        })
    );

  // 각 칸의 주변 지뢰 수 계산
  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (!cell.isMine) {
        let minesCount = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            if (
              newX >= 0 &&
              newX < rows &&
              newY >= 0 &&
              newY < cols &&
              grid[newX][newY].isMine
            ) {
              minesCount++;
            }
          }
        }
        cell.neighborMines = minesCount;
      }
    });
  });

  return { grid, mineCount };
};

export const useGameStore = create<GameState>((set, get) => ({
  grid: [],
  rows: 10,
  cols: 10,
  mineCount: 0,
  isGameOver: false,
  isSuccess: false,
  startGame: (rows: number, cols: number) => {
    const { grid, mineCount } = generateGrid(rows, cols);
    set({ grid, rows, cols, mineCount, isGameOver: false, isSuccess: false });
  },
  revealCell: (x, y) => {
    const state = get();
    let grid = [...state.grid];

    const revealAdjacentCells = (x: number, y: number) => {
      if (grid[x][y].isRevealed || grid[x][y].isFlagged) return; // 이미 열려 있거나 깃발이 있으면 반환

      grid[x][y].isRevealed = true; // 셀 열기

      // 주변에 지뢰가 없는 경우, 인접한 셀들도 재귀적으로 열기
      if (grid[x][y].neighborMines === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            if (
              newX >= 0 &&
              newX < state.rows &&
              newY >= 0 &&
              newY < state.cols &&
              !grid[newX][newY].isRevealed &&
              !grid[newX][newY].isMine
            ) {
              revealAdjacentCells(newX, newY); // 재귀적으로 인접한 셀 열기
            }
          }
        }
      }
    };

    revealAdjacentCells(x, y); // 클릭된 셀과 인접한 셀들을 재귀적으로 열기

    // 지뢰를 밟았는지 확인
    if (grid[x][y].isMine) {
      // 게임 오버 시 모든 셀 열기
      grid = grid.map((row) =>
        row.map((cell) => {
          // 잘못된 깃발 제거 (플래그가 있지만 지뢰가 없는 셀)
          if (cell.isFlagged && !cell.isMine) {
            return { ...cell, isFlagged: false, isRevealed: true }; // 플래그 제거하고 숫자만 표시
          }
          return { ...cell, isRevealed: true }; // 다른 셀은 모두 열기
        })
      );

      set({ grid, isGameOver: true });
    } else {
      // 지뢰가 아닌 경우에만 성공 조건을 체크
      const nonMineCells = grid.flat().filter((cell) => !cell.isMine);
      const isSuccess = nonMineCells.every((cell) => cell.isRevealed);
      if (isSuccess) {
        set({ isSuccess: true, isGameOver: true });
      } else {
        set({ grid });
      }
    }
  },
  toggleFlag: (x, y) =>
    set((state) => {
      const newGrid = state.grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === x && colIndex === y && !cell.isRevealed) {
            return { ...cell, isFlagged: !cell.isFlagged };
          }
          return cell;
        })
      );
      return { grid: newGrid };
    }),
  resetGame: (rows: number, cols: number) => {
    const { grid, mineCount } = generateGrid(rows, cols);
    set({ grid, rows, cols, mineCount, isGameOver: false, isSuccess: false });
  },
}));
