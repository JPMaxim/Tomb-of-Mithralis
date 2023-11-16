import chalk from "chalk"

class Character {
    constructor (health, attack, defence, name) { // sets the properties that all character derivatives will have
        this.health = health
        this.attack = attack
        this.defence = defence
        this.name = chalk.rgb(226, 230, 89)(name)
    }

    Defend(turnqueue,currentTurn,enemy) { // multiplies defence by 1.2 and adds it to the turn queue for it to be reduced next turn        
        switch (enemy) {
            case 1: // if defending against Minotaur
                this.defence = 90
                console.log(`${this.name} defended \n  ${this.name}'s defense is 90% when defending against Minotaur.`)
                break
            case 0:
                this.defence = Math.ceil(this.defence * 1.2)
                console.log(`${this.name} defended \n  ${this.name}'s defence increased by 20% for 1 turn`)
                break
        }
        let arr = ["defence",currentTurn + 1, this]
        turnqueue.push(arr)
    }
}

export class Enemy extends Character {
    constructor (health, attack, defence, name, trait, playerName) {
        super(health,attack, defence,name)
        this.trait = trait
        this.stance = "defence"
        this.playerName = chalk.rgb(226, 230, 89)(playerName)
    }

    Attack(target) { // reduces player health by enemy attack * (100 - player defence)%
        target.health -= Math.round(this.attack * (1 - (target.defence / 100)))
        console.log(`${this.name} attacks! \n  ${this.name} dealt ${Math.round(this.attack * (1 - (target.defence / 100)))} damage to ${this.playerName}`)
    }

    StanceChange() { // swaps whether the enemy is attack or defense specialised using a full turn to swap
        if (this.stance == "attack") {
            this.stance = "defence"
            this.defence += 10
            this.attack -= 10
            console.log(`${this.name} changed to it's defence stance! \n  ${this.name}'s defence increased by 10 \n  ${this.name}'s attack reduced by 10`)
        }
        else if (this.stance == "defence") {
            this.stance = "attack"
            this.attack += 10
            this.defence -= 10
            console.log(`${this.name} changed to it's attack stance! \n  ${this.name}'s attack increased by 10 \n  ${this.name}'s defence reduced by 10`)
        }
    }
}

export class Player extends Character {
    constructor (health, attack, defence, special,specialName,specialInfo, name) {
        super(health,attack,defence,name)
        this.special = special // takes in a function so that a seperate class contianing a single function isn't needed for each selectable race(elf,dwarf,human,wizard)
        this.specialName = chalk.rgb(255, 107, 15)(specialName)
        this.specialInfo = specialInfo
    }

    lightAttack(target) { // reduces enemy health by player attack * 0.75 * (100 - emeny defence)%
        target.health -= Math.round((this.attack * 0.75) * (1 - (target.defence / 100)))
        console.log(`${this.name} does a light attack! \n  ${this.name} dealt ${Math.round((this.attack * 0.75) * (1 - (target.defence / 100)))} damage to ${target.name}`)
    }

    heavyAttack(target) { // reduces enemy health by player attack * 1.25 * (100 - emeny defence)% but misses constantly on first monster encounter
        // If you're fighting the first monster, heavy attack will miss. Else it hits
        if (target.trait == "stealth") {
            // attack misses
            console.log(`${this.name} does a heavy attack!
            ${target.name} dodged! "Ha, you move slower than my grandma, you're a fool if you think that will hit me."`)
        } else {
            target.health -= Math.round((this.attack * 1.25) * (1 - (target.defence / 100)))
            console.log(`${this.name} does a heavy attack! \n  ${this.name} dealt ${Math.round((this.attack * 1.25) * (1 - (target.defence / 100)))} damage to ${target.name}`)            
        }
    }

    Taunt(target,taunt,oldDefense, newDefense, tauntResponse) {
        if (typeof(tauntResponse) != "string") { // non sheeldon taunts
            console.log(`${this.name} taunts ${target.name}: \n  "${taunt}"
            ${target.name}'s defense dropped from ${oldDefense}% to ${newDefense}% due to emotional damage.`)
        } else { // shelldon taunt
            console.log(`${this.name} taunts ${target.name}: \n  "${taunt}"
            ${tauntResponse}`)
            if (tauntResponse.charAt(0) == "P") {
                console.log(`${target.name}'s defense dropped from ${oldDefense}% to ${newDefense}% due to severe emotional damage.`)
            } else {
                console.log(`${target.name}'s defense remained the same`)
            }
        }
    }
}