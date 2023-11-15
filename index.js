import { combat,heal,hunkerDown,strongBlow,chargeAttack,coinToss    /*<-- function names here*/} from "./functions.js"
import { Enemy,Player      /*<-- class names here*/} from "./classes.js"
import {difficultyInquiry, classInquiry , nameInquiry, wait      /*<-- inquiry funciton names*/} from "./inquiries.js"
import {combatOneHint      /*<-- dialogue variable names*/} from "./dialogue.js"

// run difficulty inquiry
let difficulty = await difficultyInquiry();

// run class inquiry
let characterClass = await classInquiry();

// run name inquiry
let characterName = await nameInquiry();

// console.log(difficulty, characterClass, characterName)

let turnqueue = []
let currentTurn = 0

// create Monster 1
// health, attack, defence, trait, name, playerName
const monsterOne = new Enemy(50, 10, 25, "Goblin Scout", "stealth", characterName.name)
// create Monster 2
const monsterTwo = new Enemy(75, 10, 25, "Minotaur", "chargedAttack", characterName.name)
// create Monster 3
const monsterThree = new Enemy(100, 10, 75, "Shelldon", "defence", characterName.name)

//health, attack, defence, special, specialName, name

let choice = characterClass.class;
let player
if ( choice =="Elf - (Health Specialist)") {player = new Player(125,15,15,heal,"Heal", characterName.name);}
 else if (choice == "Dwarf - (Defense Specialist)" ) {player = new Player(100,15,25,hunkerDown,"Hunker Down", characterName.name);}
  else if (choice == "Human - (Attack Specialist)") {player = new Player(100,20,15,strongBlow,"Strong Blow", characterName.name);}
   else if (choice == "Wizard - (Luck Specialist)") {player = new Player(100,10,16,coinToss,"Coin Toss", characterName.name);}

await wait("dialogue for start")

await wait("dialogue before first fight")

// Combat 1 Hint
if (difficulty.difficulty == "Easy - (hints included)") {
    await wait("Hint for Combat One:");
    console.log(combatOneHint)
}
// Combat One
await combat(player,monsterOne,turnqueue,currentTurn)

// reset turnqueue and currentTurn
turnqueue.splice(0,turnqueue.length)
currentTurn = 0

await wait("dialogue for enter second room")

await wait("dialogue before second fight")

// Combat 2 Hint
if (difficulty.difficulty == "Easy - (hints included)") {
    await wait("Hint for Combat Two:");
    console.log("The second monster you will face has a charged attack trait that deals heavy damage. Defending the turn after it charges can reduce the damage.")
}
// Combat Two
await combat(player,monsterTwo,turnqueue,currentTurn)

// reset turnqueue and currentTurn
turnqueue.splice(0,turnqueue.length)
currentTurn = 0

await wait("dialogue for enter third room")

await wait("dialogue before third fight")

// Combat 3 Hint
if (difficulty.difficulty == "Easy - (hints included)") {
    await wait("Hint for Combat Three:");
    console.log("The third and final monster you will face has a large amount of health along with a huge defense bonus while inside it's shell. However, it also has is a bit of an anger problem. If you were to taunt it enough, it may come out of it's shell in a rage. Luring the monster out of it's shell would significantly drop it's defense.")
}
// Combat Three
await combat(player,monsterThree,turnqueue,currentTurn)

await wait("victory dialogue")