class Character {
    constructor (health, attack, defence, name) {
        this.health = health
        this.attack = attack
        this.defence = defence
        this.name = name
    }

    Defend(turnqueue,currentTurn) {
        this.defence = this.defence * 1.2
        let arr = ["defence",currentTurn + 1, this]
        turnqueue.push(arr)
        console.log(`${this.name} defended \n  ${this.name}'s defence increased by 20% for 1 turn`)
    }
}

export class Enemy extends Character {
    constructor (health, attack, defence, name, trait, playerName) {
        super(health,attack, defence,name)
        this.trait = trait
        this.stance = "defence"
        this.playerName = playerName
    }

    Attack(target) {
        target.health -= Math.round(this.attack * (1 - (target.defence / 100)))
        console.log(`${this.name} attacks! \n  ${this.name} dealt ${Math.round(this.attack * (1 - (target.defence / 100)))} to ${this.playerName}`)
    }

    StanceChange() {
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
    constructor (health, attack, defence, special,specialName, name) {
        super(health,attack,defence,name)
        this.special = special
        this.specialName = specialName
    }

    lightAttack(target) {
        target.health -= Math.round((this.attack * 0.75) * (1 - (target.defence / 100)))
        console.log(`${this.name} does a light attack! \n  ${this.name} dealt ${Math.round((this.attack * 0.75) * (1 - (target.defence / 100)))} damage to ${target.name}`)
    }

    heavyAttack(target) {
        // If you're fighting the first monster, heavy attack will miss. Else it hits
        if (target.trait == "stealth") {
            // attack misses
            console.log(`${this.name} does a heavy attack!
            ${target.name} dodged! "Ha, you move slower than my grandma, you're a fool if you think that will hit me."`)
        } else {
            target.health -= Math.round((this.attack * 1.25) * (1 - (target.defence / 100)))
            console.log(`${this.name} does a heavy attack! \n  ${this.name} dealt ${Math.round((this.attack * 1.25) * (1 (target.defence / 100)))} damage to ${target.name}`)            
        }

    }

    Taunt(target,taunt) {
        console.log(`${this.name} taunts ${target.name} \n  "${taunt}"`)
    }
}