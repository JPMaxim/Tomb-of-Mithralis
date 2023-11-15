import inquirer from 'inquirer';
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
        choices: ["Elf - (Health Specialist)", "Dwarf - (Defense Specialist)", "Human - (Attack Specialist)", "Wizard - (Luck Specialist)"]
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
export async function playerTurn(obj) {
    return await inquirer.prompt({
        name: "playerChoice",
        type: "list",
        message: "Choose your move:",
        choices: ["-Light Attack", "-Heavy Attack", "-Defend", `-${obj.specialName}`, "-Taunt"]
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