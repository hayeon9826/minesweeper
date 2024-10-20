"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import {
  container,
  title,
  formContainer,
  select,
  list,
  listItem,
  rankWrapper,
  timeText,
} from "@/styles/rank.css";

interface Ranking {
  id: string;
  username: string;
  time: number;
  level: string;
  createdAt: string;
}

const RankPage = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    const fetchRankings = async () => {
      const q = query(
        collection(db, "rankings"),
        where("level", "==", difficulty),
        orderBy("time", "asc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedRankings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Ranking[];
      setRankings(fetchedRankings);
    };

    fetchRankings();
  }, [difficulty]);

  return (
    <div className={container}>
      <h1 className={title}>{difficulty} 난이도 랭킹</h1>

      <div className={formContainer}>
        <label>
          난이도 선택:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={select}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="extreme">Extreme</option>
          </select>
        </label>
      </div>

      <div className={rankWrapper}>
        <ul className={list}>
          {rankings?.length > 0 ? (
            rankings.map((ranking, index) => (
              <li key={ranking.id} className={listItem}>
                <span>{index + 1}.</span>
                <span>
                  <b>{ranking.username}</b>
                </span>
                <span>
                  <span className={timeText}>{ranking.time}</span>초
                </span>
              </li>
            ))
          ) : (
            <div>기록이 없습니다.</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RankPage;
