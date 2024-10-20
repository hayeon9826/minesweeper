import { style } from "@vanilla-extract/css";

export const primaryButton = style({
  padding: "8px 14px", // 버튼 크기
  borderRadius: "8px", // 둥근 테두리
  backgroundColor: "#007bff", // 기본 파란색
  color: "#fff", // 글자색은 흰색
  fontSize: "14px", // 글자 크기
  fontWeight: "500", // 글자 굵기
  border: "none", // 테두리 제거
  cursor: "pointer", // 클릭 가능한 커서
  transition: "background-color 0.3s ease", // hover 시 부드럽게 배경색 전환

  ":hover": {
    backgroundColor: "#0056b3", // hover 시 더 진한 파란색
  },

  ":active": {
    backgroundColor: "#004085", // 클릭 시 더 진한 색상
  },
});

export const selectStyle = style({
  padding: "8px 12px",
  borderRadius: "6px",
  backgroundColor: "#f8f9fa",
  fontSize: "16px",
  fontWeight: "bold",
  border: "1px solid #ced4da",
  color: "#333",
  cursor: "pointer",
  appearance: "none", // 기본 브라우저 스타일 제거
  transition: "border-color 0.2s ease",

  ":hover": {
    borderColor: "#007bff", // hover 시 테두리 색상 변경
  },

  ":focus": {
    borderColor: "#0056b3", // focus 시 테두리 색상 변경
    outline: "none", // focus 시 기본 outline 제거
    boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.25)", // focus 시 그림자 추가
  },
});

// option 요소 스타일링 (브라우저 기본 스타일 사용하므로 필요에 따라 확장 가능)
export const optionStyle = style({
  fontSize: "16px",
  fontWeight: "normal",
  color: "#333",
  padding: "8px 12px",
});

export const paddingTopMd = style({
  paddingTop: "16px",
});

export const main = style({
  paddingTop: "48px;",
});

// Header 스타일 정의
export const header = style({
  width: "100%",
  backgroundColor: "#007bff",
  padding: "10px 20px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  top: 0,
  zIndex: 1000,
});

// Header 내부 콘텐츠 정렬
export const headerContent = style({
  display: "flex",
  gap: "36px",
  alignItems: "center",
  alignContent: "center",
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",

  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column", // 모바일에서 세로로 쌓임
      alignItems: "flex-start",
    },
  },
});

// 로고 스타일
export const logo = style({
  color: "#fff",
  fontSize: "24px",
  fontWeight: "bold",
  textDecoration: "none", // 밑줄 제거
});

// 네비게이션 메뉴 스타일
export const nav = style({
  display: "flex",
  gap: "20px",

  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column", // 모바일에서 네비게이션을 세로로 정렬
      gap: "10px", // 링크 사이 간격 좁게
    },
  },
});

// 네비게이션 링크 스타일
export const navLink = style({
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none", // 기본 밑줄 제거
  fontWeight: "500",

  ":hover": {
    textDecoration: "underline", // 호버 시에만 밑줄
  },

  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: "18px", // 모바일에서 조금 더 큰 글자 크기
    },
  },
});
