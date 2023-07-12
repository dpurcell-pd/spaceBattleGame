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

    const ENEMY = new AlienShip();
    console.log(`New enemy ship appeared!
    Hull: ${ENEMY.hull} Firepower: ${ENEMY.firepower} Accuracy: ${ENEMY.accuracy}`);
   
    
}


randomizeStat = (min, max) => {    
    return Math.random() * (max - min) + min;
}

const GAME_BTN = document.getElementById("game-btn");
GAME_BTN.addEventListener("click", startGame);