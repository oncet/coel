export const toggleDarkClass = (value) => {
  const root = document.documentElement;

  if (value) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};
