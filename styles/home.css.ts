import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#e0f7a8", // Light green background
});

export const title = style({
  fontSize: "36px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "20px",
});

export const buttonContainer = style({
  display: "flex",
  gap: "20px",
});

export const button = style({
  padding: "10px 20px",
  fontSize: "18px",
  fontWeight: "500",
  color: "white",
  backgroundColor: "#007bff", // Blue button
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  ":hover": {
    backgroundColor: "#0056b3",
  },
});

export const lottieContainer = style({
  width: "100px",
  height: "100px",
  margin: "0 auto",
});

export const lottieWrapper = style({
  background: "white",
  marginTop: "30px",
  width: "150px",
  height: "150px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // Centers the Lottie animation
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
});
