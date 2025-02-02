class Fighter {
    name;
    health = 100;
    force = 10;
    healthColor = "green";
    constructor(name) {
        this.name = name;
    }
    dicreaseHealth(enemyForce) {
        this.health -= enemyForce;
    }
    #getRandomNumber() {
        return Math.floor(Math.random() * 2);
    }
    attack(fighter) {
        if (this.#getRandomNumber() == 1) {
            fighter.dicreaseHealth(this.force);
            if(fighter.health < 0) fighter.health = 0;
            return true;
        } else {
            return false;
        }
    }
    getHealthColor(){
        if(this.health > 0 && this.health < 40){
            return "red"
        }
        if(this.health > 40 && this.health < 60){
            return "orange"
        }
        if(this.health > 60 && this.health < 80){
            return "yellow"
        }
        if(this.health > 80){
            return "green"
        }
    }
    isDead() {
        return this.health <= 0;
    }
}
let btnStart, btnRestart, btnAttack, screen, title, btnQuit;
let you, enemy, youHealth, enemyHealth;
let yourTurn = false;
onload = () => {
    btnStart = document.getElementById("btn-start");
    btnRestart = document.getElementById("btn-restart");
    btnAttack = document.getElementById("btn-attack");
    btnQuit = document.getElementById('btn-quit');
    screen = document.getElementById("img-screen");
    youHealth = document.getElementById("you-health");
    enemyHealth = document.getElementById("enemy-health");
    title = document.getElementById("lbl-title");
    document.getElementById("health1").style.visibility = "hidden";
    document.getElementById("health2").style.visibility = "hidden";
    btnAttack.style.display = "none";
    btnRestart.style.display = "none";
    btnQuit.style.display = "none";
    btnStart.addEventListener("click", startGame);
    btnAttack.addEventListener("click", attack);
    btnRestart.addEventListener("click", restartGame);
}
const restartGame = ()=>{
    btnRestart.style.display = "none";
    screen.src = "img/ressurect1.png";
   setTimeout(() => {
    screen.src = "img/ressurect2.png";
     setTimeout(() => {
        yourTurn = true;
        startGame();
     }, 800);
   }, 1000);

}
const startGame = () => {
    btnStart.style.display = "none";
    btnAttack.style.display = "block";
    btnAttack.style.visibility = "visible";
    document.getElementById("health1").style.visibility = "visible";
    document.getElementById("health2").style.visibility = "visible";
    you = new Fighter("David");
    enemy = new Fighter("Goliath");
   
    youHealth.style.width = `${you.health}%`;
    enemyHealth.style.width = `${enemy.health}%`
    youHealth.style.backgroundColor = you.getHealthColor();
    enemyHealth.style.backgroundColor = enemy.getHealthColor();
    screen.src = "fight/standing.png";

}
const attack = () => {
    screen.src = you.attack(enemy) ? "fight/you/attack.png" : "fight/enemy/block.png";
    youHealth.style.width = `${you.health}%`;
    enemyHealth.style.width = `${enemy.health}%`
    youHealth.style.backgroundColor = you.getHealthColor();
    enemyHealth.style.backgroundColor = enemy.getHealthColor();
    btnAttack.style.visibility = "hidden";
    setTimeout(() => {
        yourTurn = false;
        updateGame();
    }, 600);
}
const updateGame = () => {
    if (you.isDead() || enemy.isDead()) {
        btnAttack.style.display = "none";
        setTimeout(() => {
            stopGame();
        }, 600);
        return;
    }
    if(you.health < 30){
        you.force = you.force + 5;
    }
    youHealth.style.backgroundColor = you.getHealthColor();
    enemyHealth.style.backgroundColor = enemy.getHealthColor();
    screen.src = "fight/standing.png";
    youHealth.style.width = `${you.health}%`;
    enemyHealth.style.width = `${enemy.health}%`
    if (yourTurn) {
        btnAttack.style.visibility = "visible";
    } else {
        btnAttack.style.visibility = "hidden";
        screen.src = enemy.attack(you) ? "fight/enemy/attack.png" : "fight/you/block.png";
        youHealth.style.width = `${you.health}%`;
        enemyHealth.style.width = `${enemy.health}%`
        setTimeout(() => {
            yourTurn = true;
            updateGame();
        }, 600);
    }
    
}
const stopGame = () => {
    if (you.isDead()) {
        screen.src = "fight/enemy/win.png";
    } else {
        screen.src = "fight/you/win.png";
    }
    setTimeout(() => {
        btnRestart.style.display = "block";
    }, 2000);
    btnAttack.style.display = "none";
}




