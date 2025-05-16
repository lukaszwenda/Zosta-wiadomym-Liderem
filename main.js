
document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = "<p>✅ Quiz załadowany pomyślnie! Możesz rozpocząć.</p>";
  } else {
    document.body.innerHTML += "<p style='color: red;'>❌ Błąd: Nie znaleziono kontenera #app</p>";
  }
});
