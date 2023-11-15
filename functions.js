import {playerTurn, wait, tauntInquiry, Direction     /*<-- inquiry funciton names*/} from "./inquiries.js"
import {shelldonTauntedOne, shelldonTauntedTwo, shelldonTauntedThree  /*<-- dialogue variable names*/} from "./dialogue.js"
import chalk from "chalk"

export function heal (target,turnqueue,currentTurn) { // elf special ability
    this.health += 20
    console.log(`${this.name} used their special ability ${this.specialName} \n  ${this.name}'s health increased by 20`)
}

export function hunkerDown (target,turnqueue,currentTurn) { // dwarf special ability
    this.defence *= 2.5
    let arr = ["hunker",currentTurn + 3, this]
    turnqueue.push(arr)
    console.log(`${this.name} used their special ability ${this.specialName} \n  ${this.name}'s defence multiplied by 2.5 for 3 turns`)
}

export function strongBlow (target,turnqueue,currentTurn) { // human special ability
    this.attack *= 2
    let arr = ["strongBlow",currentTurn + 2, this]
    turnqueue.push(arr)
    console.log(`${this.name} used their special ability ${this.specialName} \n  ${this.name}'s attack multiplied by 2 for 2 turns`)
}

export function coinToss (target,turnqueue,currentTurn) { // wizard special ability
    console.log(`${this.name} flips a cursed coin, he picks heads, if he's right he wins again, if he's wrong, this is his final battle`)
    if ((Math.random() * 2) > 1) {
        target.health = 0
        console.log("heads")
    }
    else {
        this.health = 0
        console.log("tails")
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
    //local varaible to track how many times taunt has been used
    let tauntCount = 0; 
    
    while (player.health > 0 && enemy.health > 0) {
        let response = await playerTurn(player)
        console.log("")
        switch (response.playerChoice) {
            case chalk.rgb(206, 94, 82)("-Light Attack"):
                player.lightAttack(enemy)
                break
            case chalk.rgb(227, 58, 39)("-Heavy Attack"):
                player.heavyAttack(enemy)
                break
            case chalk.blue("-Defend"):
                player.Defend(turnqueue,currentTurn)
                break
            case chalk.rgb(255, 107, 15)(`-${player.specialName}`):
                player.special(enemy,turnqueue,currentTurn)
                break
            case chalk.rgb(233, 9, 170)("-Taunt"):
                tauntCount += 1;
                // runs inquiry and then passes the users input into 'Taunt' function
                let customTaunt = await tauntInquiry();
                // reduces enemy defense stat and passes the old and new value to Taunt() so it will log to the user
                let shelldonResponse = null;
                let oldDefense = enemy.defence;
                if (enemy.trait == "defence") { // shelldon
                    switch (tauntCount) {
                        case 1:
                            shelldonResponse = shelldonTauntedOne;
                            break;
                        case 2:
                            shelldonResponse = shelldonTauntedTwo;
                            break;
                        case 3:
                            shelldonResponse = shelldonTauntedThree;
                            enemy.defence = 5;
                            break;
                    }
                } else { // non shelldon
                    enemy.defence -= 2;
                }
                player.Taunt(enemy, customTaunt.taunt, oldDefense, enemy.defence, shelldonResponse);
                break
        }
        console.log("")
        enemyTurn(player,enemy,turnqueue,currentTurn)
        console.log("")
        turnCheck(player,turnqueue,currentTurn)
        currentTurn++
        if (player.health > 0 && enemy.health > 0) {
            console.log(`\n  ${player.name}: HP-${chalk.greenBright(player.health)} DEF-${chalk.blueBright(player.defence)} ATT-${chalk.red(player.attack)}`)
            console.log(`  ${enemy.name}: HP-${chalk.greenBright(enemy.health)} DEF-${chalk.blueBright(enemy.defence)} ATT-${chalk.red(enemy.attack)} \n`)
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
        console.log(`${enemy.name}` + ` killed ${player.name}\n  GAME OVER`)
        return false
    }
    else if (enemy.health <= 0) {
        console.log(`${player.name} killed ${enemy.name}\n`)
        return true
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

export async function Puzzle() {
    let line1 = "WWWWWWWWWWWW"
    let line2 = "WOOOOOWOOOWW"
    let line3 = "WWWOWOWWOWWW"
    let line4 = "WOOOWOWWOWWW"
    let line5 = "WWOWWOWWOOWW"
    let line6 = "WWOWWPWWOWWW"
    let line7 = "WWOWWOOOOWWW"
    let line8 = "WWOOOWWWWWXW"
    let line9 = "WWWWOWWWWWOW"
    let line10 = "WWOOOOOOOOOW"
    let line11 = "WWWWOWWWWWWW"
    let line12 = "WWWWWWWWWWWW"
    let layout = [line1.split(""),line2.split(""),line3.split(""),line4.split(""),line5.split(""),line6.split(""),line7.split(""),line8.split(""),line9.split(""),line10.split(""),line11.split(""),line12.split(""),]
    let escape = false
    let coords = [0,0]
    let time = 120

    await wait(`You need to get out quick\nOnce you press enter you will have 2 minutes to escape the maze\n  P- player\n  O- walkable space\n  W- a wall\n  X- Your Exit`)
    for (let i = 1; i <= 120; i++) {
        setTimeout(function(){ time -= 1 }, i * 1000) 
    }
    while (escape == false && time > 0) {
        for (let i = 0; i < 12; i++) {
            for (let x = 0; x < 12; x++) {
                if (layout[i][x] == "P") {
                    coords[0] = i
                    coords[1] = x
                } 
            }
        }

        Show(layout,coords)
        console.log(`time remaining: ${time}S`)

        let response = await Direction()
        switch (response.result) {
            case "UP":
                if (layout[coords[0] - 1][coords[1]] == "W") {
                    console.log("You've hit a wall")
                }
                else if (layout[coords[0] - 1][coords[1]] == "X") {
                    console.log("you got out!")
                    return true
                }
                else {
                    layout[coords[0] - 1][coords[1]] = "P"
                    layout[coords[0]][coords[1]] = "O"
                }
                break
            case "DOWN":
                if (layout[coords[0] + 1][coords[1]] == "W") {
                    console.log("You've hit a wall")
                }
                else {
                    layout[coords[0] + 1][coords[1]] = "P"
                    layout[coords[0]][coords[1]] = "O"
                }
                break
            case "LEFT":
                if (layout[coords[0]][coords[1] - 1] == "W") {
                    console.log("You've hit a wall")
                }
                else {
                    layout[coords[0]][coords[1] - 1] = "P"
                    layout[coords[0]][coords[1]] = "O"
                }
                break
            case "RIGHT":
                if (layout[coords[0]][coords[1] + 1] == "W") {
                    console.log("You've hit a wall")
                }
                else {
                    layout[coords[0]][coords[1] + 1] = "P"
                    layout[coords[0]][coords[1]] = "O"
                }
                break
        }
    }
    return false
}

function Show(layout,coords) {
    let showArr = []
    let tempArr = []
    for (let i = 0; i < 12; i++) {
        tempArr = []
        for (let x = 0; x < 12; x++) {
            if ((i >= coords[0] - 2 &&  i <= coords[0] + 2) && (x >= coords[1] - 2 &&  x <= coords[1] + 2)) {
                if (layout[i][x] == "O") {
                    tempArr[x] = chalk.rgb(112, 128, 158)(layout[i][x])
                }
                else if (layout[i][x] == "W") {
                    tempArr[x] = chalk.rgb(173, 149, 109)(layout[i][x])
                }
                else if (layout[i][x] == "X") {
                    tempArr[x] = chalk.green(layout[i][x])
                }
                else if (layout[i][x] == "P") {
                    tempArr[x] = chalk.yellow(layout[i][x])
                }
            } 
            else {
                tempArr.push(chalk.blackBright("#"))
            }
        }
        showArr[i] = tempArr
    }

    for (let i = 0; i < 12; i++) {
        let arr = showArr[i]
        console.log(arr.join(" "))
    }
}