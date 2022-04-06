#! /usr/bin/node
'use strict'

const {newSort, step} = require("../Merger");
const {pad} = require('../common');
const readLine = require('readline-sync');

const games = require('./games.json');

if (!games.length) {
    console.log('Error: no games found in ./games.json - please define an array of objects with names');
    process.exit(0);
}

let state = newSort(games);

console.log('');
console.log(`Sorting ${games.length} games, expect ${state.guess} choices`);

let choices = 0;
while (!state.done) {
    const [choiceA, choiceB] = state.nextComparison;
    const question = `[A] ${choiceA.name}    or    [B] ${choiceB.name}: `;

    console.log('');
    console.log('Which is better?')
    const choice = readLine.question(question);
    choices++;

    let answer = +1;
    if (choice.toLowerCase() === 'a') {
        answer = -1;
    }

    state = step(state, answer);
    console.log('');
}

console.log(`Sorting done, took ${choices} choices`);
console.log('');

const numSize = String(games.length).length;
state.result.forEach((game, rank) => {

    console.log(`${pad(rank+1, numSize)} ${game.name}`)
})
