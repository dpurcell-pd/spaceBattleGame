class SpaceBattleGame {
    //main class contructor
    constructor() {
        this.alienHorde = [];
        this.player = player;
        this.retreat = false;
        this.intro = this.intro.bind(this);
        this.attack = this.attack.bind(this);
    }
    
    //intro method triggered on Begin New Game button click
    static intro = () => {    
        const NAME = prompt("What's your name?");
        
        GAME_SECTION.innerHTML = `<p>Nice to meet you, ${NAME}. Welcome aboard the USS Assembly!
        <br><br>
        
        </p>`;       
        SpaceBattleGame.startGame();
    }

    //triggers at the last line of intro() and sets up remaining DOM HTML for gameplay
    static startGame = () => {
        //dramatic timeout for remaining DOM HTML and console display
        setTimeout(() => {
            GAME_SECTION.innerHTML += `<p>Looks like we're gonna have to skip the pleasantries...we've got enemy ships inbound!
            <br><br>
            
            Take a moment to get your console open so you can get a read on their stats, and when you're ready...press the button below to engage the first target!
            </p>`
            GAME_SECTION.innerHTML += `
                <button id="attack-btn">ATTACK</button>
                `;

            // attack button setup and click handler 
            const ATTACK_BTN = document.getElementById("attack-btn");                       
            ATTACK_BTN.addEventListener("click", SpaceBattleGame.attack);                    
            
            //populates the alienHorde array with six AlienShip objects
            SpaceBattleGame.alienHorde = AlienShip.generateHorde();
            //instatiates a USSAssembly object in player variable
            SpaceBattleGame.player = new USSAssembly(); 
        }, 2000);    
    }

    //attack button method 
   static attack = () => {   
    //code will run so long as retreat is false and alienHorde has at least one AlienShip 
        while (!SpaceBattleGame.retreat && SpaceBattleGame.alienHorde.length > 0) {      
            console.log("Player Phase");
            //determines player hit 
            if (Math.random() < SpaceBattleGame.player.accuracy) {
                //subtracts player firepower damage from first AlienShip hull property
                SpaceBattleGame.alienHorde[0].hull -= SpaceBattleGame.player.firepower;
                //player hit confirmation dialog
                console.log(`You've successfully hit the alien ship for ${SpaceBattleGame.player.firepower} damage!`);
                
                //check if current AlienShip has been destroyed
                if (SpaceBattleGame.alienHorde[0].hull <= 0) { 
                    //removes destroyed AlienShip from alienHorde array                            
                    SpaceBattleGame.alienHorde.shift();
                    //check if alienHorde has remaining AlienShip objects
                    if (SpaceBattleGame.alienHorde.length > 0) {
                        //remaining alienHorde confirmation dialog
                        console.log(`Remaining enemies: ${SpaceBattleGame.alienHorde.length}`);
                        //retreat prompt conditional           
                        const DECISION = prompt("You've destroyed one of the horde! Would you like to retreat? (Y/N)");
                        if (DECISION !== null && DECISION.toLowerCase() === "y") {
                            SpaceBattleGame.retreat = true;                                       
                            GAME_SECTION.innerHTML = `<p>The USS Assembly narrowly escaped the alien horde and lived to fight another day...</p>`                                                                                     
                        } else if (DECISION.toLowerCase() === "n" || DECISION === null || DECISION === "") {
                            console.log("Then let's keep fighting!");
                        }
                    } else {
                        //win state
                        GAME_SECTION.innerHTML = `<p>The USS Assembly has successfully defeated the alien invasion and saved Earth.
                            <br><br>    
    
                            Congratulations, soldier.
                            </p>`;
                        }                
                }
            } else {
                //missed player shot confirmation dialog
                console.log("Our shots missed! DON'T LET UP!!!")
            }
            //code will run so long as retreat is false and alienHorde has at least one AlienShip 
            if (!SpaceBattleGame.retreat && SpaceBattleGame.alienHorde.length > 0) {
                console.log("Enemy Phase");
                //determines enemy hit
                if (Math.random() < SpaceBattleGame.alienHorde[0].accuracy) {
                    //subtracts enemy firepower damage from player hull property
                    SpaceBattleGame.player.hull -= SpaceBattleGame.alienHorde[0].firepower;
                    //enemy hit confirmation dialog
                    console.log(`The alien forces have landed a shot of ${SpaceBattleGame.alienHorde[0].firepower} against our hull!`);
                    //remaining player health dialog
                    console.log(`Remaining hull strength: ${SpaceBattleGame.player.hull}`);
                    //lose state
                    if (SpaceBattleGame.player.hull <= 0) {
                        GAME_SECTION.innerHTML = `<p>The USS Assembly suffered catastrophic damage against the alien horde and was destroyed.
                        <br><br>
           
                        Game Over.
                        </p>`;
                    } 
                } else {
                    //missed enemy shot confirmation dialog
                    console.log("The enemy shot missed! STAY FOCUSED!!!");
                }
            }
        }       
    }
}    

//player ship class
class USSAssembly {
    constructor(hull = 20, firepower = 5, accuracy = .7) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
}

//alien ship class
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
//generate six AlienShip objects for ALIEN_HORDE
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

//HTML game section / text
const GAME_SECTION = document.getElementById("game");
const GAME_TEXT = document.createElement("p");

//stat randomizer method
randomizeStat = (min, max) => {    
    return Math.random() * (max - min) + min;
}

//HTML game button / event listener
const gameButton = document.getElementById("game-btn");
gameButton.addEventListener("click", SpaceBattleGame.intro);


