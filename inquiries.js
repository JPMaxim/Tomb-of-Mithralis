import inquirer from 'inquirer';

export async function difficulty() {
    return await inquirer.prompt({
        name: "difficulty",
        type: "list",
        message: "Choose what difficulty you would like to play:",
        choices: ["Easy - (hints included)", "Hard"]
    })
}