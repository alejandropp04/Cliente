const btn = document.getElementById("themeBtn");
const panel = document.getElementById("panel");

btn.addEventListener("click", () => {
    panel.classList.toggle("dark");
});
