const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  butInstall.style.visibility = "visible";
  // Implemented a click event handler on the `butInstall` element
  butInstall.addEventListener("click", async () => {
    event.prompt();
    installBtn.setAttribute("disabled", true);
    installBtn.textContent = "Installed!";
  });
});

// Added an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
});
