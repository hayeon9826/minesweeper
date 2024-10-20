"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import * as styles from "@/styles/game.css";
import * as commonStyles from "@/styles/common.css";
import classNames from "classnames";
import { db } from "@/lib/firebase"; // Firestore 불러오기
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { confetti } from "@tsparticles/confetti";
import { toast } from "react-toastify";

const GamePage = () => {
  const {
    grid,
    startGame,
    revealCell,
    toggleFlag,
    isGameOver,
    resetGame,
    mineCount,
    isSuccess,
  } = useGameStore();

  const [difficulty, setDifficulty] = useState("easy");
  const [numRows, setNumRows] = useState(10);
  const [numCols, setNumCols] = useState(10);
  const [flagsRemaining, setFlagsRemaining] = useState(mineCount); // 깃발 수는 폭탄 수로 설정
  const [time, setTime] = useState(0); // 타이머 초기화
  const [timerRunning, setTimerRunning] = useState(false);
  const [username, setUsername] = useState(""); // 닉네임 입력
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼 표시 여부
  let timer: number;

  // 난이도에 따른 게임 크기 설정
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDifficulty(value);
    switch (value) {
      case "easy":
        setNumRows(10);
        setNumCols(10);
        break;
      case "medium":
        setNumRows(18);
        setNumCols(18);
        break;
      case "hard":
        setNumRows(24);
        setNumCols(24);
        break;
      case "extreme":
        setNumRows(32);
        setNumCols(32);
        break;
      default:
        setNumRows(10);
        setNumCols(10);
    }
  };

  // 타이머 로직
  useEffect(() => {
    if (timerRunning && !isGameOver && !isSuccess) {
      timer = window.setInterval(
        () => setTime((prevTime) => prevTime + 1),
        1000
      );
    } else {
      window.clearInterval(timer); // 게임이 성공하거나 종료되면 타이머 멈춤
    }
    return () => window.clearInterval(timer);
  }, [timerRunning, isGameOver, isSuccess]);

  useEffect(() => {
    startGame(numRows, numCols);
  }, [startGame, numRows, numCols]);

  useEffect(() => {
    setFlagsRemaining(mineCount); // 초기화 시 남은 깃발 수를 폭탄 수로 설정
  }, [mineCount]);

  const handleLeftClick = (x: number, y: number) => {
    const cell = grid[x][y];
    if (!isGameOver && !cell.isFlagged) {
      revealCell(x, y);
      setTimerRunning(true); // 첫 클릭 후 타이머 시작
    }
  };

  const handleRightClick = (x: number, y: number, event: React.MouseEvent) => {
    event.preventDefault(); // 우클릭 기본 동작 막기
    if (!isGameOver) {
      toggleFlag(x, y);
      // 깃발을 꽂거나 제거할 때 남은 깃발 수 업데이트
      setFlagsRemaining((prevFlags) =>
        grid[x][y].isFlagged ? prevFlags + 1 : prevFlags - 1
      );
    }
  };

  const handleReset = () => {
    setFlagsRemaining(mineCount); // 깃발 수 초기화
    setTime(0); // 타이머 초기화
    setTimerRunning(false); // 타이머 멈춤
    resetGame(numRows, numCols);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Firestore에 데이터 저장
      await addDoc(collection(db, "rankings"), {
        username: username,
        level: difficulty,
        time: time,
        createdAt: serverTimestamp(),
      });
      toast.success("랭킹에 성공적으로 등록되었습니다!");
      setIsFormVisible(false);
      handleReset();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  async function showConfetti() {
    await confetti("tsparticles", {
      position: {
        x: 0,
        y: 60,
      },
      angle: 50,
      count: 30,
      ticks: 500,
    });

    await confetti("tsparticles", {
      position: {
        x: 100,
        y: 60,
      },
      angle: 130,
      count: 30,
      ticks: 500,
    });
  }

  // 게임 성공 시 폼을 표시
  useEffect(() => {
    if (isSuccess) {
      showConfetti();
      setTimerRunning(false); // 성공 시 타이머 멈춤
      setIsFormVisible(true); // 성공 시 폼 표시
    }
  }, [isSuccess]);

  return (
    <div className={styles.gameContainer}>
      <div>
        <h2 className={commonStyles.paddingTopMd}>MINESWEEPER</h2>
        <div className={styles.infoContainer}>
          <div className={styles.levelContainer}>
            <select
              className={commonStyles.selectStyle}
              value={difficulty}
              onChange={handleDifficultyChange}
            >
              <option className={commonStyles.optionStyle} value="easy">
                Easy
              </option>
              <option className={commonStyles.optionStyle} value="medium">
                Medium
              </option>
              <option className={commonStyles.optionStyle} value="hard">
                Hard
              </option>
              <option className={commonStyles.optionStyle} value="extreme">
                Extreme
              </option>
            </select>
          </div>
          <div>🚩 {flagsRemaining}</div>
          <div className={styles.timerContainer}>⏰ {time}</div>
          <button className={commonStyles.primaryButton} onClick={handleReset}>
            게임 시작
          </button>
        </div>

        <div
          className={styles.gridContainer}
          style={{ gridTemplateColumns: `repeat(${numCols}, 32px)` }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={classNames(styles.cell, {
                  [styles.mineCell]: cell.isRevealed && cell.isMine,
                  [styles.revealedCell]: cell.isRevealed && !cell.isMine,
                  [styles.flagCell]: cell.isFlagged && !cell.isRevealed,
                })}
                onClick={() => handleLeftClick(rowIndex, colIndex)}
                onContextMenu={(event) =>
                  handleRightClick(rowIndex, colIndex, event)
                }
              >
                {cell.isRevealed && !cell.isMine
                  ? cell.neighborMines > 0
                    ? cell.neighborMines
                    : ""
                  : ""}
                {cell.isFlagged && "🚩"}
              </div>
            ))
          )}
        </div>
        {isFormVisible && (
          <form onSubmit={handleSubmit} className={styles.successForm}>
            <input
              className={styles.inputStyle}
              placeholder="닉네임 입력"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit" className={commonStyles.primaryButton}>
              랭킹 등록
            </button>
          </form>
        )}
        {isGameOver && !isSuccess && (
          <div className={styles.gameOverContainer}>
            <h2>GAME OVER</h2>
          </div>
        )}
        {isSuccess && (
          <div className={styles.successContainer}>
            <h2>YOU WIN!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
