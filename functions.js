import {playerTurn, wait      /*<-- inquiry funciton names*/} from "./inquiries.js"

export function heal (target,turnqueue,currentTurn) { // elf special ability
    this.health += 20
    console.log(`${this.name} used their special ability HEAL \n  ${this.name} health increased by 20`)
}

export function hunkerDown (target,turnqueue,currentTurn) { // dwarf special ability
    this.defence *= 2.5
    let arr = ["hunker",currentTurn + 3, this]
    turnqueue.push(arr)
    console.log(`${this.name} used their special ability HUNKER DOWN \n  ${this.name} defence multiplied by 2.5 for 3 turns`)
}

export function strongBlow (target,turnqueue,currentTurn) { // human special ability
    this.attack *= 2
    let arr = ["strongBlow",currentTurn + 2, this]
    turnqueue.push(arr)
    console.log(`${this.name} used their special ability STRONG BLOW \n  ${this.name} attack multiplied by 2 for 2 turns`)
}

export function coinToss (target,turnqueue,currentTurn) { // wizard special ability
    if ((Math.random() * 2) > 1) {
        target.health = 0
    }
    else {
        this.health = 0
    }
}

export function chargeAttack (turnqueue,currentTurn,entity) { // enemy 2 charge attack
    let arr = ["charge",currentTurn + 1, entity]
    turnqueue.push(arr)
    console.log(`${entity.name} is charging an attack`)
}

export function turnCheck (player,turnqueue,currentTurn) { // checks the queue for anything that neds to be executed this turn
    let len = turnqueue.length
    for (let i = 0; i < len; i++) {
        if (turnqueue[len - i - 1][1] == currentTurn) {
            switch (turnqueue[len - i - 1][0]) {
                case "defence":
                    turnqueue[len - i - 1][2].defence /= 1.2
                    console.log(`${turnqueue[len - i - 1][2].name}'s defence returns to normal`)
                    break
                case "hunker":
                    turnqueue[len - i - 1][2].defence /= 2.5
                    console.log(`${turnqueue[len - i - 1][2].name}'s Hunker Down wears off`)
                    break
                case "strongBlow":
                    turnqueue[len - i - 1][2].attack /= 2
                    console.log(`${turnqueue[len - i - 1][2].name}'s attack goes back down`)
                    break
                case "charge":
                    player.health -= Math.round(turnqueue[len - i - 1][2].attack * 2.5 * (1 - (player.defence /100)))
                    console.log(`${turnqueue[len - i - 1][2].name} executes their charge attack \n  ${turnqueue[len - i - 1][2].name} does ${Math.round(turnqueue[len - i - 1][2].attack * 2.5 * (1 - (player.defence /100)))} damage to ${player.name}`)
                    break
            }
            turnqueue.splice(len - i - 1, 1)
        }
    }
}

export async function combat (player,enemy,turnqueue,currentTurn) {
    
    while (player.health > 0 && enemy.health > 0) {
        let response = await playerTurn(player)
        console.log("")
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
        enemyTurn(player,enemy,turnqueue,currentTurn)
        turnCheck(player,turnqueue,currentTurn)
        currentTurn++
        if (player.health > 0 && enemy.health > 0) {
            console.log(`\n  ${player.name}: HP-${player.health} DEF-${player.defence} ATT-${player.attack}`)
            console.log(`  ${enemy.name}: HP-${enemy.health} DEF-${enemy.defence} ATT-${enemy.attack} \n`)
        }
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
        await wait("")
    }
    if (player.health <= 0) {
        console.log(`${enemy.name} killed ${player.name}\n  GAME OVER`)
    }
    else if (enemy.health <= 0) {
        console.log(`${player.name} killed ${enemy.name}\n`)
    }
}

function enemyTurn (player,enemy,turnqueue,currentTurn) {
    let chance = 2
    let len = turnqueue.length
    if (enemy.trait == "chargedAttack") {
        chance = 3
    }
    for (let i = 0; i < len; i++) {
        if (turnqueue[len - i - 1][0] == "charge" ) {
            chance = "charging"
        }
    }
    switch (Math.floor((Math.random() * chance))) {
        case 0:
            enemy.Attack(player)
            break
        case 1:
            enemy.Defend(turnqueue,currentTurn)
            break
        case 2:
            chargeAttack(turnqueue,currentTurn,enemy)
        case "charging":
            break
    }
}