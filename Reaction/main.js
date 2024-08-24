document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start');
    const reactionBox = document.getElementById('reaction-box');
    const instructionText = document.getElementById('instruction');
    const warningText = document.getElementById('warning');
    const finalReactionTimeDisplay = document.getElementById('final-reaction-time');
    const resetBtn = document.getElementById('reset');
    const firstScreen = document.querySelector('.first-screen');
    const secondScreen = document.querySelector('.second-screen');
    const thirdScreen = document.querySelector('.third-screen');
    let startTime, timeout;
    let gameState = 'waiting';

    function showSecondScreen() {
        firstScreen.style.transform = 'translateY(-100vh)';
        secondScreen.style.transform = 'translateY(0)';
    }

    function showThirdScreen() {
        secondScreen.style.transform = 'translateY(-100vh)';
        thirdScreen.style.transform = 'translateY(0)';
    }

    function resetToSecondScreen() {
        thirdScreen.style.transform = 'translateY(100vh)';
        secondScreen.style.transform = 'translateY(0)';
        resetBox();
    }

    function resetBox() {
        reactionBox.style.backgroundColor = 'var(--start-color)';
        instructionText.textContent = "Click the blue box to start!"; 
        warningText.classList.add('hidden');
        gameState = 'waiting';
        clearTimeout(timeout);
    }

    function startGame() {
        showSecondScreen();
    }

    function startTest() {
        instructionText.textContent = "Wait for the green box!";
        reactionBox.style.backgroundColor = 'var(--ready-color)';
        warningText.classList.add('hidden');
        gameState = 'ready';
        timeout = setTimeout(() => {
            reactionBox.style.backgroundColor = 'var(--go-color)';
            gameState = 'go';
            startTime = performance.now();
        }, Math.random() * 5000 + 2000); 
    }

    function handleBoxClick() {
        if (gameState === 'waiting') {
            startTest();
        } else if (gameState === 'ready') {
            instructionText.textContent = "Click the blue box to start!";
            warningText.classList.remove('hidden'); 
            gameState = 'waiting'; 
            reactionBox.style.backgroundColor = 'var(--start-color)';
            clearTimeout(timeout);
        } else if (gameState === 'go') {
            const reactionTime = Math.round(performance.now() - startTime);
            finalReactionTimeDisplay.textContent = reactionTime;
            showThirdScreen();
        }
    }

    startBtn.addEventListener('click', startGame);
    reactionBox.addEventListener('click', handleBoxClick);
    resetBtn.addEventListener('click', resetToSecondScreen);
});
