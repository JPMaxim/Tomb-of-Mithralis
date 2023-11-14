import {      /*<-- function names here*/} from "./functions.js"
import {      /*<-- class names here*/} from "./classes.js"
import {difficultyInquiry, classInquiry , nameInquiry      /*<-- inquiry funciton names*/} from "./inquiries.js"

// run difficulty inquiry
let difficulty = await difficultyInquiry();

// run class inquiry
let characterClass = await classInquiry();

// run name inquiry
let characterName = await nameInquiry();

// console.log(difficulty, characterClass, characterName)