class SpaceBattleGame {
    constructor() {
        this.alienHorde = [];
        this.player = player;
        this.retreat = false;
        this.intro = this.intro.bind(this);
        this.attack = this.attack.bind(this);
    }
    
    static intro = () => {    
        const NAME = prompt("What's your name?");
        
        GAME_SECTION.innerHTML = `<p>Nice to meet you, ${NAME}. Welcome aboard the USS Assembly!
        <br><br>
        
        </p>`;       
        SpaceBattleGame.startGame();
    }

    static startGame = () => {
        setTimeout(() => {
            GAME_SECTION.innerHTML += `<p>Looks like we're gonna have to skip the pleasantries...we've got enemy ships inbound!
            <br><br>
            
            Take a moment to get your console open so you can get a read on their stats, and when you're ready...press the button below to engage the first target!
            </p>`
            GAME_SECTION.innerHTML += `
                <button id="attack-btn">ATTACK</button>
                `;
            const ATTACK_BTN = document.getElementById("attack-btn");                       
            ATTACK_BTN.addEventListener("click", SpaceBattleGame.attack);                    
            
            SpaceBattleGame.alienHorde = AlienShip.generateHorde();
            SpaceBattleGame.player = new USSAssembly(); 
        }, 2000);    
    }

   static attack = () => {    
        while (!SpaceBattleGame.retreat && SpaceBattleGame.alienHorde.length > 0) {      
            console.log("Player Phase"); 
            if (Math.random() < SpaceBattleGame.player.accuracy) {
                SpaceBattleGame.alienHorde[0].hull -= SpaceBattleGame.player.firepower;
                console.log(`You've successfully hit the alien ship for ${SpaceBattleGame.player.firepower} damage!`);
                
                if (SpaceBattleGame.alienHorde[0].hull <= 0) {                             
                    SpaceBattleGame.alienHorde.shift();
                    if (SpaceBattleGame.alienHorde.length > 0) {
                        console.log(`Remaining enemies: ${SpaceBattleGame.alienHorde.length}`);           
                        const DECISION = prompt("You've destroyed one of the horde! Would you like to retreat? (Y/N)");
                        if (DECISION !== null && DECISION.toLowerCase() === "y") {
                            SpaceBattleGame.retreat = true;                                       
                            GAME_SECTION.innerHTML = `<p>The USS Assembly narrowly escaped the alien horde and lived to fight another day...</p>`                                                                                     
                        } else if (DECISION.toLowerCase() === "n" || DECISION === null || DECISION === "") {
                            console.log("Then let's keep fighting!");
                        }
                    } else {
                        GAME_SECTION.innerHTML = `<p>The USS Assembly has successfully defeated the alien invasion and saved Earth.
                            <br><br>    
    
                            Congratulations, soldier.
                            </p>`;
                        }                
                }
            } else {
                console.log("Our shots missed! DON'T LET UP!!!")
            }
    
            if (!SpaceBattleGame.retreat && SpaceBattleGame.alienHorde.length > 0) {
                console.log("Enemy Phase");
                if (Math.random() < SpaceBattleGame.alienHorde[0].accuracy) {
                    SpaceBattleGame.player.hull -= SpaceBattleGame.alienHorde[0].firepower;
                    console.log(`The alien forces have landed a shot of ${SpaceBattleGame.alienHorde[0].firepower} against our hull!`);
                    console.log(`Remaining hull strength: ${SpaceBattleGame.player.hull}`);
    
                    if (SpaceBattleGame.player.hull <= 0) {
                        GAME_SECTION.innerHTML = `<p>The USS Assembly suffered catastrophic damage against the alien horde and was destroyed.
                        <br><br>
           
                        Game Over.
                        </p>`;
                    } 
                } else {
                    console.log("The enemy shot missed! STAY FOCUSED!!!");
                }
            }
        }       
    }
}    

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


const GAME_SECTION = document.getElementById("game");
const GAME_TEXT = document.createElement("p");

randomizeStat = (min, max) => {    
    return Math.random() * (max - min) + min;
}

const gameButton = document.getElementById("game-btn");
gameButton.addEventListener("click", SpaceBattleGame.intro);


