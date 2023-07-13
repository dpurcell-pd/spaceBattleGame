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
        hull = Math.floor(randomizeStat(3 , 7)),
        firepower = Math.floor(randomizeStat(2, 5)),
        accuracy = (randomizeStat(.6, .9)).toFixed(1)
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
    ATTACK_BTN.remove();    
    const NAME = prompt("What's your name?");
    
    GAME_TEXT.innerHTML = `Nice to meet you, ${NAME}. Welcome aboard the USS Assembly!
    <br><br>
    `;
    GAME_SECTION.appendChild(GAME_TEXT); 
    
    startGame();
}

startGame = () => {
    setTimeout(() => {
        GAME_TEXT.innerHTML += `Looks like we're gonna have to skip the pleasantries...we've got enemy ships inbound!
        <br><br>
        
        Take a moment to get your console open so you can get a read on their stats, and when you're ready...press the button below to engage the first target!`
        GAME_SECTION.appendChild(ATTACK_BTN);        
        alienHorde = AlienShip.generateHorde();
        player = new USSAssembly(); 
    }, 2000);

}

attack = () => {    
    while (!retreat && alienHorde.length > 0) {      
        console.log("Player Phase"); 
        if (Math.random() < player.accuracy) {
            alienHorde[0].hull -= player.firepower;
            console.log(`You've successfully hit the alien ship for ${player.firepower} damage!`);
            
            if (alienHorde[0].hull <= 0) {                             
                alienHorde.shift();
                if (alienHorde.length > 0) {
                    console.log(`Remaining enemies: ${alienHorde.length}`);           
                    const DECISION = prompt("You've destroyed one of the horde! Would you like to retreat? (Y/N)");           
                    if (DECISION !== null && DECISION.toLowerCase() === "y") {
                        retreat = true;
                        GAME_TEXT.innerHTML = `The USS Assembly narrowly escaped the alien horde and lived to fight another day...`
                        ATTACK_BTN.remove();                                                
                    } else if (DECISION.toLowerCase() === "n" || DECISION === null || DECISION === "") {
                        console.log("Then let's keep fighting!");
                    }
                } else {
                    GAME_TEXT.innerHTML = `The USS Assembly has successfully defeated the alien invasion and saved Earth.
                        <br><br>    

                        Congratulations, soldier.
                        `;
                    }                
            }
        } else {
            console.log("Our shots missed! DON'T LET UP!!!")
        }

        if (!retreat && alienHorde.length > 0) {
            console.log("Enemy Phase");
            if (Math.random() < alienHorde[0].accuracy) {
                player.hull -= alienHorde[0].firepower;
                console.log(`The alien forces have landed a shot of ${alienHorde[0].firepower} against our hull!`);
                console.log(`Remaining hull strength: ${player.hull}`);

                if (player.hull <= 0) {
                    GAME_TEXT.innerHTML = `The USS Assembly suffered catastrophic damage against the alien horde and was destroyed.
                    <br><br>
       
                    Game Over.
                    `;
                } 
            } else {
                console.log("The enemy shot missed! STAY FOCUSED!!!");
            }
        }
    }       
}


const ATTACK_BTN = document.createElement("button");
ATTACK_BTN.innerHTML = "ATTACK!"
ATTACK_BTN.addEventListener("click", attack);

randomizeStat = (min, max) => {    
    return Math.random() * (max - min) + min;
}

const NEW_GAME = true;
const gameButton = document.getElementById("game-btn");
gameButton.addEventListener("click", intro);


