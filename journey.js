document.addEventListener("DOMContentLoaded", () => {
    const envelopeWrapper = document.getElementById("envelope-container");
    const envelope = document.querySelector(".envelope");

    // Add random floating background lanterns dynamically
    function createLanterns() {
        const lanterns = document.querySelectorAll('.lantern');
        lanterns.forEach(lantern => {
            lantern.style.left = Math.random() * 90 + "vw";
            lantern.style.animationDuration = (Math.random() * 5 + 10) + "s";
            lantern.style.animationDelay = (Math.random() * 5) + "s";
            lantern.style.transform = `scale(${Math.random() * 0.4 + 0.8})`;
        });
    }
    createLanterns();

    // Trigger open animation on click
    envelopeWrapper.addEventListener("click", () => {
        if (!envelope.classList.contains("open")) {
            envelope.classList.add("open");
            envelopeWrapper.classList.add("opened");
        }
    });
});
