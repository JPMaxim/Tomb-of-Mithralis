import { heal,hunkerDown,strongBlow,coinToss,turnCheck     /*<-- function names here*/} from "./functions.js"
import { enemy,player      /*<-- class names here*/} from "./classes.js"
import {difficultyInquiry, classInquiry , nameInquiry      /*<-- inquiry funciton names*/} from "./inquiries.js"

// run difficulty inquiry
let difficulty = await difficultyInquiry();

// run class inquiry
let characterClass = await classInquiry();

// run name inquiry
let characterName = await nameInquiry();

// console.log(difficulty, characterClass, characterName)

let turnqueue = [] // holds data for what needs to be executed at the end of a specific turn
let currentTurn = 0 // index of the current turn

