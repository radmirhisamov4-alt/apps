(() => {
  const intro = document.getElementById("brand-intro");
  const skip = document.getElementById("intro-skip");
  if (!intro || !skip || typeof intro.showModal !== "function") return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const replay = document.getElementById("intro-replay");
  const sessionKey = "radmir-corporation-intro-v1";
  let timer;
  let sceneTimer;
  const finish = () => {
    clearTimeout(timer);
    clearTimeout(sceneTimer);
    if (intro.open) intro.close();
    document.body.classList.remove("intro-active");
    try { sessionStorage.setItem(sessionKey, "seen"); } catch { /* Optional preference. */ }
  };
  skip.addEventListener("click", finish);
  intro.addEventListener("cancel", event => { event.preventDefault(); finish(); });
  intro.addEventListener("close", () => document.body.classList.remove("intro-active"));
  const play = () => {
    intro.classList.remove("intro-second");
    intro.classList.toggle("intro-reduced", reducedMotion);
    try {
      intro.showModal();
      document.body.classList.add("intro-active");
      if (reducedMotion) sceneTimer = setTimeout(() => intro.classList.add("intro-second"), 1800);
      timer = setTimeout(finish, 4000);
    } catch { finish(); }
  };
  if (replay) {
    replay.hidden = false;
    replay.addEventListener("click", play);
  }
  if (reducedMotion) return;
  try {
    if (sessionStorage.getItem(sessionKey)) return;
  } catch { /* The intro also works when browser storage is unavailable. */ }
  play();
})();
