import {playerTurn, wait, tauntInquiry, Direction     /*<-- inquiry funciton names*/} from "./inquiries.js"
import {gameStart} from "./index.js"
import {shelldonTauntedOne, shelldonTauntedTwo, shelldonTauntedThree  /*<-- dialogue variable names*/} from "./dialogue.js"
import chalk from "chalk"

export function heal (target,turnqueue,currentTurn) { // elf special ability, increase current health by 20
    this.health += 20
    console.log(`${this.name} used their special ability ${this.specialName} \n  ${this.name}'s health increased by 20`)
}

export function hunkerDown (target,turnqueue,currentTurn) { // dwarf special ability, 2.5* defense for 3 turns
    this.defence *= 2.5
    let arr = ["hunker",currentTurn + 3, this]  // puts an array into the turnqueue that executes actions on later turns based on the string and object passed in
    turnqueue.push(arr)
    console.log(`${this.name} used their special ability ${this.specialName} \n  ${this.name}'s defence multiplied by 2.5 for 3 turns`)
}

export function strongBlow (target,turnqueue,currentTurn) { // human special ability, 2* damage for 2 turns
    this.attack *= 2
    let arr = ["strongBlow",currentTurn + 2, this]
    turnqueue.push(arr)
    console.log(`${this.name} used their special ability ${this.specialName} \n  ${this.name}'s attack multiplied by 2 for 2 turns`)
}

export function coinToss (target,turnqueue,currentTurn) { // wizard special ability, 50/50 chance win or lose
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

export function chargeAttack (turnqueue,currentTurn,entity) { // enemy 2 charge attack, starts a strong attack that will execute next turn
    let arr = ["charge",currentTurn + 1, entity]
    turnqueue.push(arr)
    console.log(`${entity.name} is charging an attack`)
}

export function turnCheck (player,turnqueue,currentTurn) { // checks the queue for anything that neds to be executed this turn
    let len = turnqueue.length  // predefines length as items will be deleted so this number needs to stay the same
    for (let i = 0; i < len; i++) {
        if (turnqueue[len - i - 1][1] == currentTurn) {  // checks if the item in turnqueue being checked needs to be ran this turn
            switch (turnqueue[len - i - 1][0]) {  // checks what needs to be done if it needs to be done this turn
                case "defence":  // brings defense back down after defending
                    turnqueue[len - i - 1][2].defence = Math.round(turnqueue[len - i - 1][2].defence / 1.2)
                    console.log(`${turnqueue[len - i - 1][2].name}'s defence reduces by 20% after last turn's defence`)
                    break
                case "hunker":  // brings defence back down after using hunker down
                    turnqueue[len - i - 1][2].defence = Math.round(turnqueue[len - i - 1][2].defence / 2.5)
                    console.log(`${turnqueue[len - i - 1][2].name}'s Hunker Down wears off`)
                    break
                case "strongBlow": // brings attack back down after using strong blow
                    turnqueue[len - i - 1][2].attack /= 2
                    console.log(`${turnqueue[len - i - 1][2].name}'s attack goes back down`)
                    break
                case "charge":  // executes monsterTwos charge attack
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
    
    while (player.health > 0 && enemy.health > 0) { // loop that runs whilst combat is still going
        let response = await playerTurn(player) // querries the player for what move they want to make
        console.log("")
        switch (response.playerChoice) { // executes a function based on what the player chose
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
        enemyTurn(player,enemy,turnqueue,currentTurn) // does the enemies turn
        console.log("")
        turnCheck(player,turnqueue,currentTurn) // checks the tunrqueue
        currentTurn++ // advances turn by 1
        if (player.health > 0 && enemy.health > 0) { // displays player and enemy stats
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
    if (player.health <= 0) { // checks if the player or enemy died when while loop ends
        console.log(`${enemy.name}` + ` killed ${player.name}\n  GAME OVER`)
        // timespent in game
        console.log(getTimeSpent(gameStart, new Date, false));
        return false
    }
    else if (enemy.health <= 0) {
        console.log(`${player.name} killed ${enemy.name}\n`)
        return true
    }
}

function enemyTurn (player,enemy,turnqueue,currentTurn) {
    let chance = 3
    let len = turnqueue.length
    if (enemy.trait == "chargedAttack") { // lets monsterTwo pick the charge attack option
        chance = 4
    }
    for (let i = 0; i < len; i++) { // checks to see if it's already charging an attack
        if (turnqueue[len - i - 1][0] == "charge" ) {
            chance = "charging"
        }
    }
    switch (Math.floor((Math.random() * chance))) { // picks an action based on a random number that is rounded down
        case 0:
            enemy.Attack(player)
            break
        case 1:
            enemy.Defend(turnqueue,currentTurn)
            break
        case 2:
            enemy.StanceChange()
            break
        case 3:
            chargeAttack(turnqueue,currentTurn,enemy)
        case "charging":
            break
    }
}

export async function Puzzle() {  //runs the maze puzzle
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
    let layout = [line1.split(""),line2.split(""),line3.split(""),line4.split(""),line5.split(""),line6.split(""),line7.split(""),line8.split(""),line9.split(""),line10.split(""),line11.split(""),line12.split(""),] // creates a 2D array to store all letters in a grid
    let escape = false
    let coords = [0,0]
    let time = 120

    await wait(`You need to get out quick\nOnce you press enter you will have 2 minutes to escape the maze\n  P- player\n  O- walkable space\n  W- a wall\n  X- Your Exit\n  You may need to increase the terminal size to see the full maze`)
    for (let i = 1; i <= 120; i++) { // sets a timer for 2 minutes
        setTimeout(function(){ time -= 1 }, i * 1000) 
    }
    while (escape == false && time > 0) { // runs whilst you haven't escaped and time hasn't ran out
        for (let i = 0; i < 12; i++) { // gets player coordinates based on the letter P
            for (let x = 0; x < 12; x++) {
                if (layout[i][x] == "P") {
                    coords[0] = i
                    coords[1] = x
                } 
            }
        }

        Show(layout,coords) // displays the current board
        console.log(`time remaining: ${time}S`) // displays remaining time

        let response = await Direction() // waits for the player to pick a direction to move
        switch (response.result) { // checks if the selected direction is a valid move and if so, swaps the letters from the players current location and where they are moving to
            case "UP":
                if (layout[coords[0] - 1][coords[1]] == "W") {
                    console.log("You've hit a wall")
                }
                else if (layout[coords[0] - 1][coords[1]] == "X") {
                    console.log("you got out!")
                    return true // returns true to show as a successful escape in index.js
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
    return false // returns false to show a failed escape in index.js
}

function Show(layout,coords) {
    let showArr = []
    let tempArr = []
    for (let i = 0; i < 12; i++) {
        tempArr = []
        for (let x = 0; x < 12; x++) {// adds coloured letters based on the layout array to a temporary array that holds one line
            if ((i >= coords[0] - 2 &&  i <= coords[0] + 2) && (x >= coords[1] - 2 &&  x <= coords[1] + 2)) { // checks to see if it's within 2 spaces from the player
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
                tempArr.push(chalk.blackBright("#")) // if it's more than 2 spaces from the player, it shows a grey # symbolizing no visibility
            }
        }
        showArr[i] = tempArr // sets the temporary array holding one line to it's height show array
    }

    for (let i = 0; i < 12; i++) { // joins each line together with a space between to show all 12 lines of the maze
        let arr = showArr[i]
        console.log(arr.join(" "))
    }
}

// Calculate time in game Function
export function getTimeSpent(start, end, success) {
    let timeSpent =  end - start;
    let minutesFloat = (timeSpent / 1000 / 60).toFixed(2)
    let minutes = Math.floor(minutesFloat);
    let splitSecs = minutesFloat.toString().split(".")
    let seconds = Math.floor(parseInt(splitSecs[1]) * 0.6)
    if (success == true) {
        return `You spent ${minutes} minutes, ${seconds} seconds to complete Tomb of Mythralis. Congratulations, and thanks for playing!`
    } else {
        return `You spent ${minutes} minutes, ${seconds} seconds before meeting your end in the Tomb of Mythralis. Better luck next time!`
    }
}