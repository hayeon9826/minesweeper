import { style } from "@vanilla-extract/css";

// 화면 중앙에 게임 보드 배치
export const gameContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh", // 화면 전체 높이를 사용하여 중앙 정렬
  backgroundColor: "#e0f7a8", // 배경색 조정
  flexDirection: "column",

  "@media": {
    "screen and (max-width: 768px)": {
      padding: "16px", // 모바일에서 여백 추가
    },
  },
});

// 게임 보드 스타일 (모바일과 데스크톱에서 다른 스타일 적용)
export const gridContainer = style({
  display: "grid",
  gap: "4px",
  backgroundColor: "#99cc66",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  margin: "20px 0px",

  "@media": {
    "screen and (max-width: 768px)": {
      gridTemplateColumns: "repeat(10, 24px)", // 작은 화면에서는 칸 크기를 줄임
      gap: "2px",
      padding: "5px",
    },
    "screen and (min-width: 769px)": {
      gridTemplateColumns: "repeat(10, 32px)", // 큰 화면에서는 칸 크기를 유지
    },
  },
});

// 칸 스타일
export const cell = style({
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#d1b06b",
  border: "2px solid #6b8e23",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "18px",
  userSelect: "none",
  color: "#333",
  textAlign: "center",

  ":hover": {
    background: "#b78e39", // hover 시 테두리 색상 변경
  },

  "@media": {
    "screen and (max-width: 768px)": {
      width: "24px", // 모바일에서 칸 크기 조정
      height: "24px",
      fontSize: "14px", // 모바일에서 글자 크기 조정
    },
  },
});

// 성공 메시지 스타일
export const successContainer = style({
  textAlign: "center",
  marginTop: "12px",
  color: "#008000",
});

// 타이머와 깃발 카운트 컨테이너
export const infoContainer = style({
  display: "flex",
  gap: "20px",
  marginBottom: "10px",
  fontSize: "20px",
  fontWeight: "500",

  "@media": {
    "screen and (max-width: 768px)": {
      gap: "10px", // 모바일에서 간격 조정
      fontSize: "16px", // 모바일에서 글자 크기 줄임
    },
  },
});

export const mineCell = style({
  backgroundColor: "#ff6666",
  color: "black",
  fontWeight: "bold",

  ":hover": {
    background: "#ff3333 !important", // hover 시 테두리 색상 변경
  },
});

export const flagCell = style({
  backgroundColor: "#ffe066",
  color: "red",
  fontSize: "18px",
  ":hover": {
    background: "#ffd11a !important", // hover 시 테두리 색상 변경
  },

  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: "14px", // 모바일에서 글자 크기 줄임
    },
  },
});

export const revealedCell = style({
  backgroundColor: "#f0e5bb",

  ":hover": {
    background: "#fff !important", // hover 시 테두리 색상 변경
  },
});

// 난이도 선택 컨테이너
export const levelContainer = style({
  display: "flex",
  gap: "8px",
  alignItems: "center",

  "@media": {
    "screen and (max-width: 768px)": {
      gap: "4px", // 모바일에서 간격 조정
    },
  },
});

export const gameOverContainer = style({
  textAlign: "center",
  marginTop: "12px",
  color: "#D63232",
});

export const timerContainer = style({
  width: "80px",
  display: "flex",
  flexWrap: "wrap",
});

export const wrongFlagCell = style({
  backgroundColor: "#ffcccc", // 잘못된 깃발이 있는 셀의 배경색
  color: "red", // ❌ 표시 색상
  fontSize: "18px",
  fontWeight: "bold",
});

export const successForm = style({
  paddingTop: "12px",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  justifyContent: "center",
});

export const inputStyle = style({
  padding: "8px 14px", // primary button과 동일한 패딩
  borderRadius: "8px", // 둥근 테두리
  border: "none", // 기본 테두리 제거
  fontSize: "14px", // 글자 크기
  fontWeight: "500", // 글자 굵기
  width: "auto", // 자동 크기 조정
  outline: "none", // 기본 포커스 outline 제거
  boxSizing: "border-box",

  ":focus": {
    border: "2px solid #007bff", // 포커스 시 파란색 테두리
    outline: "none", // 포커스 상태에서의 기본 테두리 제거
  },
});
