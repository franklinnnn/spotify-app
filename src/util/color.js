export const setCardColor = (popularity) => {
  let color = "";
  if (popularity >= 81 && popularity <= 100) {
    color = "#d97706";
    document.documentElement.style.setProperty("--popularity", color);
  } else if (popularity >= 61 && popularity <= 80) {
    color = "#7c3aed";
    document.documentElement.style.setProperty("--popularity", color);
  } else if (popularity >= 41 && popularity <= 60) {
    color = "#0284c7";
    document.documentElement.style.setProperty("--popularity", color);
  } else if (popularity >= 21 && popularity <= 40) {
    color = "#059669";
    document.documentElement.style.setProperty("--popularity", color);
  } else if (popularity >= 0 && popularity <= 20) {
    color = "#475569";
    document.documentElement.style.setProperty("--popularity", color);
  }
  return color;
};
