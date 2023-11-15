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
const monsterOne = new Enemy(50, 10, 25, "monsterOne", "stealth", characterName.name)
// create Monster 2
const monsterTwo = new Enemy(75, 10, 25, "monsterTwo", "chargedAttack", characterName.name)
// create Monster 3
const monsterThree = new Enemy(100, 10, 25, "monsterThree", "defence", characterName.name)

//health, attack, defence, special, specialName, name
const player = new Player(100,15,25,hunkerDown,"Hunker Down", characterName.name)

combat(player,monsterTwo,turnqueue,currentTurn)