let alienHorde;
let player;
let retreat = false;

const GAME_SECTION = document.getElementById("game");
const GAME_TEXT = document.createElement("p");

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

    static generateHorde() { 
        const ALIEN_HORDE = [];              
        for (let i = 0; i < 6; i++) {   
            const ALIEN_SHIP = new AlienShip();
            ALIEN_HORDE.push(ALIEN_SHIP);
            console.log(`New enemy ship appeared!
            Hull: ${ALIEN_SHIP.hull} Firepower: ${ALIEN_SHIP.firepower} Accuracy: ${ALIEN_SHIP.accuracy}`);                
        }
        return ALIEN_HORDE;       
    }
}

intro = () => {    
    const NAME = prompt("What's your name?");
    
    GAME_TEXT.innerHTML = `Nice to meet you ${NAME}. Welcome aboard the USS Assembly!
    <br><br>
    `;
    GAME_SECTION.appendChild(GAME_TEXT); 
    
    startGame();
}

startGame = () => {
    setTimeout(() => {
        GAME_TEXT.innerHTML += `Looks like we're gonna have to skip the pleasantries...we've got enemy ships inboud!
        <br><br>
        
        Take a moment to get your console open so you can get a read on their stats, and when you're ready...press the button to engage the first target!`
        
        const ATTACK_BTN = document.createElement("button");
        ATTACK_BTN.innerHTML = "ATTACK!"
        ATTACK_BTN.addEventListener("click", attack);

        GAME_SECTION.appendChild(ATTACK_BTN);        
        alienHorde = AlienShip.generateHorde();
        player = new USSAssembly(); 
    }, 2000);

}

attack = () => {    
    if (Math.random() < player.accuracy) {
        alienHorde[0].hull -= player.firepower;
        console.log(`You've successfully hit the alien ship for ${player.firepower} damage!`);         
    }

    if (alienHorde[0].hull <= 0) {
        const DECISION = prompt("You've destroyed one of the horde! Would you like to retreat? (Y/N)");
        if (DECISION.toLowerCase === "y") {
            retreat = true;
        } else {
            console.log("Then lets keep fighting!");
        }
    }
}


randomizeStat = (min, max) => {    
    return Math.random() * (max - min) + min;
}

const NEW_GAME = true;
const GAME_BTN = document.getElementById("game-btn");
GAME_BTN.addEventListener("click", intro);


