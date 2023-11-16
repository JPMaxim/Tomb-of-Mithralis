import inquirer from 'inquirer';
import chalk from "chalk";
// Difficulty Inquiry
export async function difficultyInquiry() {
    return await inquirer.prompt({
        name: "difficulty",
        type: "list",
        message: "Choose what difficulty you would like to play:",
        choices: ["Easy - (hints included)", "Hard"]
    })
}
// Character Class Inquiry
export async function classInquiry() {
    return await inquirer.prompt({
        name: "class",
        type: "list",
        message: "Choose which Character Class you would like to play as:",
        choices: [chalk.greenBright("Elf - (Health Specialist)"), chalk.blueBright("Dwarf - (Defense Specialist)"), chalk.red("Human - (Attack Specialist)"), chalk.rgb(138, 19, 187)("Wizard - (Luck Specialist)")]
    })
}
// Character Name Inquiry
export async function nameInquiry() {
    return await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter a name for your character:"
    })
}

//Player Turn Inquiry
export async function playerTurn(player,enemy) {
    return await inquirer.prompt({
        name: "playerChoice",
        type: "list",
        message: "Choose your move:",
        choices: [chalk.rgb(206, 94, 82)(`-Light Attack`) + `   ${Math.round((player.attack * 0.75) * (1 - (enemy.defence / 100)))} damage`, 
        chalk.rgb(227, 58, 39)(`-Heavy Attack`) + `   ${Math.round((player.attack * 1.25) * (1 - (enemy.defence / 100)))} damage`, 
        chalk.blue(`-Defend`) + `   +${Math.round((player.defence * 1.2) - player.defence)} defence for 1 turn`, 
        chalk.rgb(255, 107, 15)(`-${player.specialName}`) + `   ${player.specialInfo}`, 
        chalk.rgb(233, 9, 170)("-Taunt") + `   Does emotional damage (disclaimer: does not damage enemies)`]
    })
}


// Custom Taunt Inquiry
export async function tauntInquiry() {
    return await inquirer.prompt({
        name: "taunt",
        type: "input",
        message: "What will you say to taunt the enemy?"
    })
}
// Waits for you to press enter in between console logs
export async function wait(words) {
    return await inquirer.prompt({
        name: "result",
        type: "confirm",
        message: `${words}\nPress enter to continue`,
    })
}

export async function Direction() {
    return await inquirer.prompt({
        name: "result",
        type: "list",
        message: "Pick a direction:",
        choices: ["UP", "RIGHT", "DOWN", `LEFT`]
    })
}