
function heal () {
    this.health += 20
    console.log(`${this.name} used their special ability HEAL \n  ${this.name} health increased by 20`)
}

function hunkerDown () {
    this.defense *= 2.5
    turnqueue.push(["defend",turn + 3, this])
    console.log(`${this.name} used their special ability HUNKER DOWN \n  ${this.name} defense multiplied by 2.5 for 3 turns`)
}

function strongBlow () {
    this.attack *= 2
    turnqueue.push(["strongBlow",turn + 2, this])
    console.log(`${this.name} used their special ability STRONG BLOW \n  ${this.name} attack multiplied by 2.5 for 2 turns`)
}

function coinToss (target) {
    if ((Math.random() * 2) > 1) {
        target.health = 0
    }
    else {
        this.health = 0
    }
}

function turn () {
    
}