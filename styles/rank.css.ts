import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#e0f7a8", // Light green background similar to the game page
});

export const title = style({
  fontSize: "36px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "20px",
});

export const formContainer = style({
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  fontSize: "18px",
});

export const select = style({
  marginLeft: "10px",
  padding: "5px",
  fontSize: "16px",
  border: "2px solid #007bff",
  borderRadius: "4px",
});

export const list = style({
  listStyleType: "none",
  padding: "0",
  marginTop: "20px",
  fontSize: "18px",
  color: "#333",
});

export const listItem = style({
  marginBottom: "10px",
  fontSize: "18px",
  fontWeight: "500",
  display: "flex",
  gap: "6px",
});

export const rankWrapper = style({
  backgroundColor: "#99cc66", // Similar to game page color
  padding: "20px",
  width: "400px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
});

export const timeText = style({
  color: "#007bff",
});
