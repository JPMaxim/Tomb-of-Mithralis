import {playerTurn      /*<-- inquiry funciton names*/} from "./inquiries.js"

export function heal (target,turnqueue,currentTurn) {
    this.health += 20
    console.log(`${this.name} used their special ability HEAL \n  ${this.name} health increased by 20`)
}

export function hunkerDown (target,turnqueue,currentTurn) {
    this.defence *= 2.5
    let arr = ["hunker",currentTurn + 3, this]
    turnqueue.push(arr)
    console.log(`${this.name} used their special ability HUNKER DOWN \n  ${this.name} defence multiplied by 2.5 for 3 turns`)
}

export function strongBlow (target,turnqueue,currentTurn) {
    this.attack *= 2
    let arr = ["strongBlow",currentTurn + 2, this]
    turnqueue.push(arr)
    console.log(`${this.name} used their special ability STRONG BLOW \n  ${this.name} attack multiplied by 2 for 2 turns`)
}

export function chargeAttack () {
    let arr = ["charge",currentTurn + 1, this]
    turnqueue.push(arr)
    console.log(`${this.name} is charging an attack`)
}

export function coinToss (target,turnqueue,currentTurn) {
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
        if (turnqueue[len - i - 1][1] == currentTurn) {
            switch (turnqueue[len - i - 1][0]) {
                case "defence":
                    turnqueue[len - i - 1][2].defence /= 1.2
                    console.log(`${turnqueue[len - i - 1][2].name}'s defence returns to normal`)
                    break;
                case "hunker":
                    turnqueue[len - i - 1][2].defence /= 2.5
                    console.log(`${turnqueue[len - i - 1][2].name}'s Hunker Down wears off`)
                case "strongBlow":
                    turnqueue[len - i - 1][2].attack /= 2
                    console.log(`${turnqueue[len - i - 1][2].name}'s attack goes back down`)
                    break
                case "charge":
                    player.health -= turnqueue[len - i - 1][2] 
                    console.log(`${turnqueue[len - i - 1][2].name}'s executes their charge attack`)
                    break
            }
            turnqueue.splice(len - i, 1)
        }
    }
}

export async function combat (player,enemy,turnqueue,currentTurn) {
    
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
                player.Defend(turnqueue,currentTurn)
                break
            case `-${player.specialName}`:
                player.special(enemy,turnqueue,currentTurn)
                break
            case "-Taunt":
                player.Taunt(enemy,"test")
                break
        }
        turnCheck(player,turnqueue,currentTurn)
        currentTurn++
        /*console.table({
            name: player.name,
            attack: player.attack,
            turn: currentTurn,
            health: player.health,
            enemyHealth: enemy.health,
            defence: player.defence,
            specialName: player.specialName,
            queue: turnqueue
        })*/
    }
}