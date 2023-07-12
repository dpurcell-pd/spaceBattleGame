startGame = () => {
    
    class USSAssembly {
        constructor(hull = 20, firepower = 5, accuracy = .7) {
            this.hull = hull;
            this.firepower = firepower;
            this.accuracy = accuracy;
        }
    }

    class AlienShip {
        constructor(
            hull = Math.floor(randomizeStat(3 , 6)),
            firepower = Math.floor(randomizeStat(2, 4)),
            accuracy = (randomizeStat(.6, .8)).toFixed(1)
        ) {
            this.hull = hull;
            this.firepower = firepower;
            this.accuracy = accuracy;
        }
    }

    const NAME = prompt("What's your name?");
    const GAME_SECTION = document.getElementById("game");
    const GAME_TEXT = document.createElement("p");
    GAME_TEXT.innerHTML = `Nice to meet you ${NAME}. Welcome aboard the USS Assembly!
    <br><br>
    `;
    GAME_SECTION.appendChild(GAME_TEXT);
    setTimeout(() => {
        GAME_TEXT.innerHTML += `Looks like we're gonna have to skip the pleasantries...we've got enemy ships inboud!
        <br><br>
        
        Take a moment to get your console open so you can get a read on their stats, and when you're ready...press the button to engage the first target!`

        GAME_SECTION.appendChild(ATTACK_BTN);
    }, 2000);

    const ENEMY = new AlienShip();
    console.log(`New enemy ship appeared!
    Hull: ${ENEMY.hull} Firepower: ${ENEMY.firepower} Accuracy: ${ENEMY.accuracy}`);    
}

attack = () => {
    
}


randomizeStat = (min, max) => {    
    return Math.random() * (max - min) + min;
}

const NEW_GAME = true;
const GAME_BTN = document.getElementById("game-btn");
GAME_BTN.addEventListener("click", startGame);

const ATTACK_BTN = document.createElement("button");
ATTACK_BTN.innerHTML = "ATTACK!"
ATTACK_BTN.addEventListener("click", attack);
