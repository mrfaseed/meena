(function() {
    if (window.bgAudio) return; // Prevent duplicates

    const audio = new Audio('bg1.mp3');
    audio.loop = true;
    audio.volume = 0.6; 
    window.bgAudio = audio;

    // Restore the playback time from the previous page
    const savedTime = sessionStorage.getItem('bgMusicTime');
    if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Play audio. Browsers require user interaction before playing audio, 
    // so if it's blocked, we wait for their first click on the new page.
    let playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay blocked, wait for any interaction
            const startAudio = () => {
                audio.play();
                document.removeEventListener('click', startAudio);
                document.removeEventListener('touchstart', startAudio);
                document.removeEventListener('keydown', startAudio);
            };
            document.addEventListener('click', startAudio);
            document.addEventListener('touchstart', startAudio);
            document.addEventListener('keydown', startAudio);
        });
    }

    // Save the current playback time to sessionStorage frequently
    // so the next page loads it seamlessly
    setInterval(() => {
        if (!audio.paused) {
            sessionStorage.setItem('bgMusicTime', audio.currentTime);
        }
    }, 50); // fast interval for smooth transition
})();
