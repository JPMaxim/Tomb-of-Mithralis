import {playerTurn      /*<-- inquiry funciton names*/} from "./inquiries.js"

export function heal (target) {
    this.health += 20
    console.log(`${this.name} used their special ability HEAL \n  ${this.name} health increased by 20`)
}

export function hunkerDown (target) {
    this.defence *= 2.5
    turnqueue.push(["hunker",currentTurn + 3, this])
    console.log(`${this.name} used their special ability HUNKER DOWN \n  ${this.name} defence multiplied by 2.5 for 3 turns`)
}

export function strongBlow (target) {
    this.attack *= 2
    turnqueue.push(["strongBlow",currentTurn + 2, this])
    console.log(`${this.name} used their special ability STRONG BLOW \n  ${this.name} attack multiplied by 2 for 2 turns`)
}

export function chargeAttack () {
    turnqueue.push(["charge",currentTurn + 1, this])
    console.log(`${this.name} is charging an attack`)
}

export function coinToss (target) {
    if ((Math.random() * 2) > 1) {
        target.health = 0
    }
    else {
        this.health = 0
    }
}

export function turnCheck (player,turnqueue,currentTurn) {
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
                case "charge":
                    player.health -= turnqueue[len-9][2] 
                    break
            }
            turnqueue.splice(len - i, 1)
        }
    }
    currentTurn++
}

export async function combat (player,enemy,turnqueue,currentTurn) {
    console.log(enemy.health)
    
    while (player.health > 0 && enemy.health > 0) {
        let response = await playerTurn(player)
        switch (response.playerChoice) {
            case "-Light Attack":
                player.lightAttack(enemy)
                break
            case "-Heavy Attack":
                player.heavyAttack(enemy)
                break
            case "-Defend":
                player.Defend()
                break
            case `-${player.specialName}`:
                player.special(enemy)
                break
            case "-Taunt":
                player.Taunt(enemy,"test")
                break
        }
        turnCheck(player,turnqueue,currentTurn)
        console.table({
            turn: currentTurn,
            health: player.health,
            defence: player.defence,
            specialName: player.specialName
        })
    }
}