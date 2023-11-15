import { combat,heal,hunkerDown,strongBlow,chargeAttack,coinToss    /*<-- function names here*/} from "./functions.js"
import { Enemy,Player      /*<-- class names here*/} from "./classes.js"
import {difficultyInquiry, classInquiry , nameInquiry, wait      /*<-- inquiry funciton names*/} from "./inquiries.js"

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
const monsterThree = new Enemy(100, 10, 25, "Shelldon", "defence", characterName.name)

//health, attack, defence, special, specialName, name

let choice = characterClass.class;
let player

if ( choice =="Elf - (Health Specialist)") {player = new Player(125,15,15,heal,"Heal", characterName.name);
await wait ("Elf dialogue before first fight");}
 else if (choice == "Dwarf - (Defense Specialist)" ) {player = new Player(100,15,25,hunkerDown,"Hunker Down", characterName.name);
await wait ("Dwarf dialogue before first fight");}
  else if (choice == "Human - (Attack Specialist)") {player = new Player(100,20,15,strongBlow,"Strong Blow", characterName.name);
await wait ("Human dialogue before first fight");}
   else if (choice == "Wizard - (Luck Specialist)") {player = new Player(100,10,16,coinToss,"Coin Toss", characterName.name); 
await wait ("wizard dialogue before first fight");}

await combat(player,monsterOne,turnqueue,currentTurn)
turnqueue.splice(0,turnqueue.length)
currentTurn = 0

await wait("dialogue for entering the second room")
if(choice == "Elf - (Health Specialist)"){
 await wait ("Elf dialogue before second fight");  
} else if (choice =="Dwarf - (Defense Specialist)") {
   await wait ("dwarf dialogue before second fight");
} else if (choice == "Human - (Attack Specialist)"){
   await wait ("human dialogue before second fight");
} else if (choice == "Wizard - (Luck Specialist)"){
   await wait ("wizard dialogue before second fight");
}

await combat(player,monsterTwo,turnqueue,currentTurn)


// reset turnqueue and currentTurn
turnqueue.splice(0,turnqueue.length)

currentTurn = 0


await wait("dialogue for enter third room")

await wait("dialogue for entering the second room")
if(choice == "Elf - (Health Specialist)"){
 await wait ("Elf dialogue before third fight");  
} else if (choice =="Dwarf - (Defense Specialist)") {
   await wait ("dwarf dialogue before third fight");
} else if (choice == "Human - (Attack Specialist)"){
   await wait ("human dialogue before third fight");
} else if (choice == "Wizard - (Luck Specialist)"){
   await wait ("wizard dialogue before third fight");
}

await combat(player,monsterThree,turnqueue,currentTurn)

await wait("victory dialogue")