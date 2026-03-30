document.addEventListener("DOMContentLoaded", () => {
    const words = [
        "Look at screen carefully", 
        "hello",
        [ "muthu", "meena"],
        "this is a tiny surprise"
    ];
    
    const animationContainer = document.getElementById("animation-container");
    const finalScreen = document.getElementById("final-screen");
    const submitBtn = document.getElementById("submit-btn");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");
    const heartsContainer = document.getElementById("hearts-container");

    // Create floating hearts background
    function createHearts() {
        for(let i = 0; i < 25; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (Math.random() * 4 + 4) + "s";
            heart.style.animationDelay = (Math.random() * 6) + "s";
            heart.style.transform = `scale(${Math.random() * 0.6 + 0.4})`;
            heartsContainer.appendChild(heart);
        }
    }
    createHearts();

    let currentIndex = 0;

    function showNextWord() {
        if (currentIndex < words.length) {
            const currentItem = words[currentIndex];
            const isLast = currentIndex === words.length - 1;
            
            if (Array.isArray(currentItem)) {
                // Name building sequence
                const nameContainer = document.createElement("div");
                nameContainer.classList.add("name-sequence-container");
                animationContainer.appendChild(nameContainer);
                
                let partIndex = 0;
                function showNextPart() {
                    if (partIndex < currentItem.length) {
                        const wrapper = document.createElement("div");
                        wrapper.classList.add("name-part-wrapper");
                        
                        const textEl = document.createElement("span");
                        textEl.classList.add("name-part-text");
                        textEl.textContent = currentItem[partIndex] + (partIndex < currentItem.length - 1 ? " " : "");
                        
                        wrapper.appendChild(textEl);
                        nameContainer.appendChild(wrapper);
                        
                        partIndex++;
                        setTimeout(showNextPart, 1600); // 1.6s between words
                    } else {
                        // Full name shown, glow and then fade out
                        setTimeout(() => {
                            nameContainer.style.animation = "fadeOutContainer 1.5s ease-in-out forwards";
                            setTimeout(() => {
                                nameContainer.remove();
                                currentIndex++;
                                showNextWord();
                            }, 1400); 
                        }, 2500); 
                    }
                }
                showNextPart();
            } else {
                const wordEl = document.createElement("div");
                wordEl.classList.add("cinematic-text");
                wordEl.textContent = currentItem;
                animationContainer.appendChild(wordEl);

                if (isLast) {
                    // The final text fades in, shines, and moves into position
                    wordEl.style.animation = "cinemaRevealFinal 4s ease-in-out forwards";
                    setTimeout(() => {
                        // Show final UI smoothly
                        finalScreen.classList.remove("hidden");
                    }, 3800); 
                } else {
                    // Intermediate texts fade in glowing and fade out gracefully
                    wordEl.style.animation = "cinemaReveal 3s ease-in-out forwards";
                    setTimeout(() => {
                        wordEl.remove();
                        currentIndex++;
                        showNextWord();
                    }, 2900); // Trigger next word right as this one starts to vanish
                }
            }
        }
    }

    // Start text animation a bit after load
    setTimeout(showNextWord, 500);

    // Form logic
    function checkPassword() {
        const password = passwordInput.value.toLowerCase().trim();
        
        // Custom simple logic: "do until that" means wait for password
        if (password.length > 0) {
            submitBtn.innerHTML = "Unlocking ✨";
            createConfetti(submitBtn);
            
            // Initiate the epic split reveal
            setTimeout(() => {
                // 1. Fade out the entire entry UI (hearts, kitty, box)
                const entryLayer = document.getElementById("entry-layer");
                entryLayer.classList.add("entry-fade-out");
                
                // 2. Open the huge magical doors
                const leftGate = document.querySelector(".left-gate");
                const rightGate = document.querySelector(".right-gate");
                
                setTimeout(() => {
                    leftGate.classList.add("gate-open-left");
                    rightGate.classList.add("gate-open-right");
                    
                    // 3. The screen splits, remains black, and triggers the 3D sequence.
                    setTimeout(() => {
                        document.body.style.backgroundColor = "#0b0213";
                        
                        setTimeout(() => {
                            // Completely remove previous UI from view
                            document.getElementById("entry-layer").style.display = "none";
                            document.querySelector(".left-gate").style.display = "none";
                            document.querySelector(".right-gate").style.display = "none";
                            
                            // Trigger the magical 3D scene from heart3d.js
                            if(typeof window.Start3DJourney === "function") {
                                window.Start3DJourney();
                            }
                        }, 800);
                        
                    }, 500);
                    
                }, 500); // Wait for the fade-out to begin before pulling gates apart
                
            }, 800);
        } else {
            errorMsg.classList.remove("hidden");
            passwordInput.style.borderColor = "#ff0000";
            setTimeout(() => {
                errorMsg.classList.add("hidden");
                passwordInput.style.borderColor = "rgba(255, 182, 193, 0.8)";
            }, 3000);
        }
    }

    submitBtn.addEventListener("click", checkPassword);
    
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            checkPassword();
        }
    });

    // Fun sparkle click effect on the button
    function createConfetti(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement("div");
            sparkle.classList.add("sparkle-effect");
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            
            sparkle.style.setProperty('--dx', `${dx}px`);
            sparkle.style.setProperty('--dy', `${dy}px`);
            
            sparkle.style.left = `${rect.left + rect.width / 2}px`;
            sparkle.style.top = `${rect.top + rect.height / 2}px`;
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }
});
