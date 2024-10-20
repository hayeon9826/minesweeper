"use client";

import Link from "next/link";
import {
  container,
  title,
  buttonContainer,
  button,
  lottieContainer,
  lottieWrapper,
} from "@/styles/home.css";
import Lottie from "react-lottie-player";
import animation from "@/assets/lottie/flag_animation.json";

const HomePage = () => {
  return (
    <div className={container}>
      <h1 className={title}>MINESWEEPER</h1>
      <div className={buttonContainer}>
        <Link href="/game" passHref>
          <button className={button}>게임 시작</button>
        </Link>
        <Link href="/rank" passHref>
          <button className={button}>순위 보기</button>
        </Link>
      </div>
      <div className={lottieWrapper}>
        <div className={lottieContainer}>
          <Lottie
            loop
            animationData={animation}
            play
            style={{ width: 100, height: 100 }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
