window.Start3DJourney = function() {
    // 1. Setup the text container
    const container3D = document.getElementById("3d-universe");
    // clear three.js container just in case
    container3D.innerHTML = "";
    
    // Inject custom CSS for the letter UI, pause button, and butterfly game
    const style = document.createElement("style");
    style.innerHTML = `
        /* The Envelope / Letter Container */
        #letter-wrapper {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -45%);
            width: 90%;
            max-width: 800px; /* Made letter much larger */
            z-index: 20;
            opacity: 0;
            transition: opacity 2s ease-in-out, transform 2s ease-in-out;
            perspective: 1000px;
        }

        #letter-paper {
            background-color: #fff0f5; /* Light pink background */
            /* PERFECTLY ALIGNED UNDERLINES: 40px spacing */
            background-image: repeating-linear-gradient(transparent, transparent 38px, #f48fb1 39px, #f48fb1 40px);
            background-position: 0 0px;
            padding: 38px 40px 40px 60px; /* 38px top padding aligns the baseline of 40px line-height text to the line */
            border-radius: 10px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,182,193,0.3);
            font-family: 'Dancing Script', cursive;
            color: #880e4f; /* Romantic deep pink/magenta text */
            font-size: 2.2rem;
            line-height: 40px; /* Matches the gradient spacing exactly */
            text-align: left;
            position: relative;
            min-height: 500px; /* Extra height */
            transform-origin: top;
            animation: letterFloat 6s ease-in-out infinite alternate;
            box-sizing: border-box;
        }
        
        #letter-paper::before {
            content: '';
            position: absolute;
            top: 0; bottom: 0; left: 40px;
            width: 2px;
            background: rgba(255, 105, 180, 0.5); /* Ruled paper margin line */
        }

        @keyframes letterFloat {
            0% { transform: translateY(0px) rotateX(2deg); }
            100% { transform: translateY(-10px) rotateX(-2deg); box-shadow: 0 25px 55px rgba(0,0,0,0.7), inset 0 0 20px rgba(255,182,193,0.3); }
        }

        .typewriter-cursor {
            border-right: 2px solid #ff1493;
            animation: blink 0.7s infinite;
            margin-left: 2px;
        }
        @keyframes blink {
            0%, 100% { border-color: transparent; }
            50% { border-color: #ff1493; }
        }

        .signature {
            text-align: right;
            margin-top: 40px;
            font-size: 2.5rem;
            color: #d81b60;
        }

        /* Cute Anime Character Peeking */
        #anime-character {
            position: absolute;
            top: -110px; 
            left: 50%;
            transform: translateX(-50%);
            width: 140px; height: 140px;
            z-index: -1; /* Behind the letter */
            animation: peekAnim 4s ease-in-out infinite alternate;
        }

        @keyframes peekAnim {
            0% { transform: translate(-50%, 25px) rotate(-3deg); }
            100% { transform: translate(-50%, 0px) rotate(3deg); }
        }

        .chibi-head {
            width: 100px; height: 90px;
            background: #ffe0d2; /* Skin tone */
            border-radius: 50% 50% 45% 45%;
            margin: 0 auto;
            position: relative;
            top: 40px;
            box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
        }
        .chibi-hair-back {
            position: absolute;
            top: -15px; left: -10px;
            width: 120px; height: 120px;
            background: #ffb6c1; /* Pink cute hair */
            border-radius: 50%;
            z-index: -1;
        }
        .chibi-bangs {
            position: absolute;
            top: 0; left: 0;
            width: 100px; height: 40px;
            background: #ffb6c1;
            border-radius: 50% 50% 10px 10px;
        }
        .chibi-eye {
            width: 16px; height: 26px;
            background: #2c3e50;
            border-radius: 50%;
            position: absolute;
            top: 40px;
            animation: chibiBlink 4s infinite;
        }
        @keyframes chibiBlink {
            0%, 9%, 11%, 19%, 21%, 100% { transform: scaleY(1); }
            10%, 20% { transform: scaleY(0.1); }
        }
        .chibi-eye.left { left: 22px; }
        .chibi-eye.right { right: 22px; }
        .chibi-sparkle { width:6px; height:6px; background:#fff; border-radius:50%; position:absolute; top:3px; right:3px; }
        .chibi-blush {
            width: 18px; height: 9px; background: rgba(255,105,180,0.6); border-radius: 50%; position: absolute; top: 58px; filter: blur(2px);
            animation: blushGlow 2s infinite alternate;
        }
        @keyframes blushGlow { from { opacity: 0.5; } to { opacity: 1; } }
        .chibi-blush.left { left: 12px; }
        .chibi-blush.right { right: 12px; }
        .chibi-mouth {
            width: 14px; height: 7px; border-bottom: 2px solid #555; border-radius: 50%; position: absolute; top: 65px; left: 43px;
        }
        /* Little floating hearts from the chibi */
        .chibi-heart {
            position:absolute; color:#ff1493; font-size:18px; opacity:0;
            animation: floatChibiHeart 3s infinite ease-in;
        }
        @keyframes floatChibiHeart {
            0% { transform: translate(0, 0) scale(0.5); opacity:1; }
            100% { transform: translate(20px, -50px) scale(1.5); opacity:0; }
        }
        
        /* The CSS Heart Pause Button */
        #heart-pause-btn {
            position: fixed;
            bottom: 40px; 
            right: 40px; 
            width: 50px; 
            height: 50px;
            background: #ff1493;
            transform: rotate(-45deg);
            z-index: 100;
            cursor: pointer;
            opacity: 0; 
            transition: transform 0.3s, opacity 1s, box-shadow 0.3s;
            box-shadow: 0 0 15px rgba(255, 20, 147, 0.6);
        }
        #heart-pause-btn:hover {
            transform: rotate(-45deg) scale(1.1);
            box-shadow: 0 0 25px rgba(255, 20, 147, 1);
        }
        #heart-pause-btn::before, #heart-pause-btn::after {
            content: ''; position: absolute; width: 50px; height: 50px; background: #ff1493; border-radius: 50%;
        }
        #heart-pause-btn::before { top: -25px; left: 0; }
        #heart-pause-btn::after { top: 0; left: 25px; }

        #heart-pause-btn .icon {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            color: white; font-weight: 900; font-family: 'Poppins', sans-serif;
            font-size: 18px; z-index: 10;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        /* Butterfly Game CSS */
        #game-container {
            position: absolute;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: #1a0823;
            z-index: 15;
            display: none;
            overflow: hidden;
            font-family: 'Poppins', sans-serif;
            color: white;
            text-align: center;
        }
        .aesthetic-bg-text {
            position: absolute;
            color: rgba(255, 105, 180, 0.15); /* Faint pink romantic text */
            font-family: 'Dancing Script', cursive;
            white-space: nowrap;
            pointer-events: none;
            z-index: 10;
            animation: driftTxt 20s linear infinite;
        }
        @keyframes driftTxt {
            0% { transform: translateY(0) rotate(-10deg); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateY(-50px) rotate(-10deg); opacity: 0; }
        }

        #game-ui {
            margin-top: 50px;
            font-size: 1.8rem;
            z-index: 20;
            position: relative;
            text-shadow: 0 0 10px #ff69b4;
            animation: fadeIn 1s forwards;
        }
        
        .butterfly-obj {
            position: absolute;
            width: 50px; height: 50px;
            cursor: pointer;
            z-index: 50;
            transition: top 1.5s ease-in-out, left 1.5s ease-in-out;
        }
        .wing {
            position: absolute; top: 0; width: 25px; height: 50px; 
            background: rgba(255, 105, 180, 0.9);
            border: 2px solid #ff1493;
            box-shadow: 0 0 15px #ff1493;
        }
        .wing.left { left: 0; transform-origin: right center; border-radius: 50% 50% 10% 80%; animation: flapLeft 0.15s infinite alternate; }
        .wing.right { right: 0; transform-origin: left center; border-radius: 50% 50% 80% 10%; animation: flapRight 0.15s infinite alternate; }
        
        @keyframes flapLeft { from { transform: rotateY(0deg); } to { transform: rotateY(70deg); } }
        @keyframes flapRight { from { transform: rotateY(0deg); } to { transform: rotateY(-70deg); } }
        
        .pop-particle {
            position: absolute;
            width: 8px; height: 8px; background: #fff;
            border-radius: 50%; box-shadow: 0 0 10px #ff1493;
            pointer-events: none;
            animation: popAnim 0.6s forwards ease-out;
        }
        @keyframes popAnim { 0% { transform: scale(1) translate(0,0); opacity:1;} 100% { transform: scale(0) translate(var(--dx), var(--dy)); opacity:0;} }

        #game-winner {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            border: 2px solid #ff69b4;
            box-shadow: 0 0 30px rgba(255,105,180,0.5);
            display: none;
            animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            font-family: 'Dancing Script', cursive;
            color: #fff;
            font-size: 2.8rem;
            text-align: center;
        }
        @keyframes popIn { 0% { opacity:0; transform: translate(-50%, -40%) scale(0.8); } 100% { opacity:1; transform: translate(-50%, -50%) scale(1); } }

        @media (max-width: 600px) {
            #letter-paper { font-size: 1.6rem; padding: 38px 20px 30px 40px; }
            #letter-paper::before { left: 20px; }
            #heart-pause-btn { right: 30px; bottom: 30px; width: 40px; height: 40px; }
            #heart-pause-btn::before { top: -20px; width: 40px; height: 40px; }
            #heart-pause-btn::after { left: 20px; width: 40px; height: 40px; }
            #heart-pause-btn .icon { font-size: 14px; }
            #game-winner { font-size: 2rem; width: 90%; }
        }
    `;
    document.head.appendChild(style);

    // Create the letter UI structure
    const letterWrapper = document.createElement("div");
    letterWrapper.id = "letter-wrapper";
    letterWrapper.innerHTML = `
        <div id="anime-character">
            <div class="chibi-heart" style="left:-10px; top:20px; animation-delay: 0s;">💖</div>
            <div class="chibi-heart" style="right:-10px; top:10px; animation-delay: 1.5s;">✨</div>
            <div class="chibi-head">
                <div class="chibi-hair-back"></div>
                <div class="chibi-bangs"></div>
                <div class="chibi-eye left"><div class="chibi-sparkle"></div></div>
                <div class="chibi-eye right"><div class="chibi-sparkle"></div></div>
                <div class="chibi-blush left"></div>
                <div class="chibi-blush right"></div>
                <div class="chibi-mouth"></div>
            </div>
        </div>
        <div id="letter-paper"></div>
    `;
    document.body.appendChild(letterWrapper);
    const letterPaper = document.getElementById("letter-paper");

    // Pause button setup
    const pauseBtn = document.createElement("div");
    pauseBtn.id = "heart-pause-btn";
    pauseBtn.innerHTML = `<div class="icon" id="pause-icon">||</div>`;
    document.body.appendChild(pauseBtn);

    let isPaused = false;
    pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        document.getElementById("pause-icon").innerHTML = isPaused ? "▶" : "||";
    });

    const texts = [
        
       
        "Somewhere between our conversations, I started falling for you without even realizing it.",
        "I hide it in silence, knowing you may never feel the same.",
        "IStill, this one-sided love stays with me, soft and unspoken. 💫",
        "And even if you stop talk to me ...",
        "I want you to know...",
        "My heart still beats for you, my dear meena. 🦋💖",
        "<div class='signature'>your loving person, unknown person .</div>"
    ];

    setTimeout(() => {
        letterWrapper.style.opacity = 1;
        letterWrapper.style.transform = "translate(-50%, -50%)";
    }, 500);
    
    setTimeout(() => {
        pauseBtn.style.opacity = 0.9;
    }, 1500);

    let currentLineIndex = 0;
    let typeTimeout;
    let writtenHTML = ""; 

    function typeWriter(text, i, isHtmlBlock, cb) {
        if (isPaused) {
            typeTimeout = setTimeout(() => typeWriter(text, i, isHtmlBlock, cb), 200);
            return;
        }

        if(isHtmlBlock) {
            writtenHTML += text;
            letterPaper.innerHTML = writtenHTML;
            cb();
            return;
        }

        if (i < text.length) {
            letterPaper.innerHTML = writtenHTML + text.substring(0, i + 1) + '<span class="typewriter-cursor"></span>';
            
            let typingSpeed = 40 + Math.random() * 50; 
            if (text.charAt(i) === '.' || text.charAt(i) === ',') {
                typingSpeed += 250;
            }

            typeTimeout = setTimeout(() => typeWriter(text, i + 1, isHtmlBlock, cb), typingSpeed);
        } else {
            writtenHTML += text + "<br>"; 
            letterPaper.innerHTML = writtenHTML + '<span class="typewriter-cursor"></span>';
            
            setTimeout(() => {
                let waitInterval = setInterval(() => {
                    if(!isPaused) {
                        clearInterval(waitInterval);
                        cb();
                    }
                }, 200);
            }, 600); 
        }
    }

    function writeNextLine() {
        if (isPaused) {
            setTimeout(writeNextLine, 200);
            return;
        }

        if(currentLineIndex < texts.length) {
            const currentString = texts[currentLineIndex];
            const isHtml = currentString.includes("<div");
            
            typeWriter(currentString, 0, isHtml, () => {
                currentLineIndex++;
                writeNextLine();
            });
            
        } else {
            letterPaper.innerHTML = writtenHTML;
            
            let waitTime = 0;
            let finalWait = setInterval(() => {
                if(!isPaused) {
                    waitTime += 100;
                    if(waitTime > 5000) { 
                        clearInterval(finalWait);
                        letterWrapper.style.opacity = 0;
                        letterWrapper.style.transform = "translate(-50%, -45%) rotateX(-10deg)";
                        pauseBtn.style.opacity = 0; // Hide pause button since letter is done
                        setTimeout(() => {
                            letterWrapper.remove();
                            pauseBtn.remove();
                            startButterflyGame();
                        }, 2000);
                    }
                }
            }, 100);
        }
    }
    
    setTimeout(writeNextLine, 1500);

    // Playful Butterfly Catching Game
    function startButterflyGame() {
        const gameUI = document.createElement("div");
        gameUI.id = "game-container";
        gameUI.innerHTML = `
            <div id="game-ui">Catch the butterflies! <br> <span id="catch-count">0</span> / 6</div>
            <div id="game-winner">
                You caught them!<br><br>
                <span>Just like you caught in your way 😉</span><br><br>
                <button id="next-button" onclick="window.location.href='timeline.html'" style="margin-top: 15px; padding: 12px 35px; border-radius: 30px; border: none; background: #ff1493; color: white; font-family: 'Poppins', sans-serif; font-size: 1.4rem; cursor: pointer; box-shadow: 0 0 15px #ff1493; transition: transform 0.2s;">NEXT</button>
            </div>
        `;
        document.body.appendChild(gameUI);
        gameUI.style.display = "block";

        // Generate aesthetic background texts for future screenshots layout
        const bgWords = ["memories", "late night chats", "voice notes", "screenshots", "laughter", "our bond", "serendipity", "Slowly", "distance", "butterflies"];
        for (let k = 0; k < 25; k++) {
            let txt = document.createElement("div");
            txt.className = "aesthetic-bg-text";
            txt.innerText = bgWords[Math.floor(Math.random() * bgWords.length)];
            txt.style.left = (Math.random() * 95) + "vw";
            txt.style.top = (Math.random() * 95) + "vh";
            txt.style.fontSize = (2 + Math.random() * 3) + "rem";
            // Randomize animation pacing so they gracefully drift at different times
            txt.style.animationDelay = (Math.random() * 15) + "s";
            txt.style.animationDuration = (15 + Math.random() * 20) + "s";
            gameUI.appendChild(txt);
        }

        let score = 0;
        const totalToCatch = 6;
        let gameActive = true;

        for (let i = 0; i < totalToCatch; i++) {
            createButterfly();
        }

        function createButterfly() {
            if(!gameActive) return;
            
            const btn = document.createElement("div");
            btn.className = "butterfly-obj";
            btn.innerHTML = `<div class="wing left"></div><div class="wing right"></div>`;
            
            // Random start pos
            btn.style.left = Math.random() * 80 + 10 + "vw";
            btn.style.top = Math.random() * 80 + 10 + "vh";
            
            document.getElementById("game-container").appendChild(btn);

            // Move randomly every 1.5 seconds
            let moveInterval = setInterval(() => {
                if(!gameActive) clearInterval(moveInterval);
                btn.style.left = Math.random() * 80 + 10 + "vw";
                btn.style.top = Math.random() * 80 + 10 + "vh";
                
                // Randomly change size slightly for 3D fluttering feel
                let scale = 0.7 + Math.random() * 0.6;
                btn.style.transform = `scale(${scale}) rotate(${(Math.random()-0.5)*90}deg)`;
            }, 1500);

            // Click to pop
            btn.addEventListener("mousedown", popButterfly);
            btn.addEventListener("touchstart", popButterfly); // mobile compatibility
            
            function popButterfly(e) {
                e.preventDefault();
                clearInterval(moveInterval);
                btn.remove();
                
                // Explode particles
                const rect = btn.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;

                for (let j = 0; j < 8; j++) {
                    let p = document.createElement("div");
                    p.className = "pop-particle";
                    p.style.left = btnX + "px";
                    p.style.top = btnY + "px";
                    
                    let angle = Math.random() * Math.PI * 2;
                    let dist = Math.random() * 80 + 40;
                    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
                    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
                    
                    document.getElementById("game-container").appendChild(p);
                    setTimeout(() => p.remove(), 600);
                }

                // Increase score
                score++;
                document.getElementById("catch-count").innerText = score;

                if(score >= totalToCatch) {
                    gameActive = false;
                    document.getElementById("game-ui").style.display = "none";
                    document.getElementById("game-winner").style.display = "block";
                }
            }
        }
    }
};
