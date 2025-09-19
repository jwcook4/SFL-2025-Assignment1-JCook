document.addEventListener("DOMContentLoaded", () => {
    const saber = document.getElementById("saber-divider");
    const ignite = document.getElementById("saber-ignite");
    const retract = document.getElementById("saber-retract");

    if (!saber || !ignite || !retract) return;

    let isIgnited = false;

    const tryPlay = (audioEl, volume = 0.75) => {
        if (!audioEl) return;
        audioEl.volume = volume;
        audioEl.currentTime = 0;
        const playPromise = audioEl.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => { });
        }
    };

    const toggleSaber = () => {
        isIgnited = !isIgnited;
        saber.setAttribute("aria-pressed", String(isIgnited));
        saber.classList.toggle("active", isIgnited);
        if (isIgnited) {
            tryPlay(ignite, 0.8);
        } else {
            tryPlay(retract, 0.8);
        }
    };

    saber.addEventListener("click", toggleSaber);

    saber.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleSaber();
        }
    });
});
