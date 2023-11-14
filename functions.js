
export function heal () {
    this.health += 20
    console.log(`${this.name} used their special ability HEAL \n  ${this.name} health increased by 20`)
}

export function hunkerDown () {
    this.defence *= 2.5
    turnqueue.push(["hunker",turn + 3, this])
    console.log(`${this.name} used their special ability HUNKER DOWN \n  ${this.name} defence multiplied by 2.5 for 3 turns`)
}

export function strongBlow () {
    this.attack *= 2
    turnqueue.push(["strongBlow",turn + 2, this])
    console.log(`${this.name} used their special ability STRONG BLOW \n  ${this.name} attack multiplied by 2 for 2 turns`)
}

export function coinToss (target) {
    if ((Math.random() * 2) > 1) {
        target.health = 0
    }
    else {
        this.health = 0
    }
}

export function turnCheck () {
    let len = turnqueue.length
    for (let i = 0; i < len; i++) {
        if (turnqueue[len - i][1] == currentTurn) {
            switch (turnqueue[len-9][0]) {
                case "defence":
                    turnqueue[len-9][2].defence /= 1.2
                    break;
                case "hunker":
                    turnqueue[len-9][2].defence /= 2.5
                case "strongBlow":
                    turnqueue[len-9][2].attack /= 2
                    break
            }
            turnqueue.splice(len - i, 1)
        }
    }
    currentTurn++
}

export function combat () {
    
}