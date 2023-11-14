class character {
    constructor (health, attack, defence, name) {
        this.health = health
        this.attack = attack + 10
        this.defence = defence
        this.name = name
    }

    Defend() {
        defense += 4
        console.log(`${this.name} defended \n  ${this.name}'s defense increased by 4`)
    }
}

export class enemy extends character {
    constructor (health, attack, defence, trait, name, playerName) {
        super(health,attack,defence,name)
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

export class player extends character {
    constructor (health, attack, defence, special, name) {
        super(health,attack,defence,name)
        this.special = special
    }

    lightAttack(target) {
        target.health -= Math.round((this.attack * 0.75) * (1 - (target.defence / 100)))
        console.log(`${this.name} does a light attack! \n  ${this.name} dealt ${Math.round((this.attack * 0.75) * (1 - (target.defence / 100)))} damage to ${target.name}`)
    }

    heavyAttack(target) {
        target.health -= Math.round((this.attack * 1.25) * (1 - (target.defence / 100)))
        console.log(`${this.name} does a heavy attack! \n  ${this.name} dealt ${Math.round((this.attack * 1.25) * (1 (target.defence / 100)))} damage to ${target.name}`)
    }

    Taunt(target,taunt) {
        console.log(`${this.name} taunts ${target.name} \n  "${taunt}"`)
    }
}