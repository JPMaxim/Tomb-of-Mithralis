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
