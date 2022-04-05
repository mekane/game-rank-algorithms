const {newSort, step} = require("../src/Merger.js");

const data = {
    'length 0': {
        list: [],
    },
    'length 1': {
        list: ['1'],
    },
    'length 2': {
        list: ['2', '1'],
    },
    'length 3': {
        list: ['2', '1', '3'],
    },
    'length 4': {
        list: ['2', '1', '4', '3'],
    },
    'length 5': {
        list: ['2', '1', '4', '3', '5'],
    },
    'length 7': {
        list: ['6', '2', '1', '7', '4', '3', '5'],
    },
    'length 8': {
        list: ['6', '2', '1', '7', '4', '3', '8', '5'],
    },
    'pre sorted': {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    'semi-sorted': {
        list: ['1', '2', '3', '4', '6', '5', '7', '8', '9', '11', '10', '12'],
    },
    'mixed': {
        list: ['5', '2', '8', '9', '1', '6', '12', '3', '10', '4', '11', '7'],
    },
    'reversed': {
        list: ['12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
    },
}

Object.values(data).forEach(d => {
    let state = newSort(d.list);
    d.guess = state.guess || 0;
    let steps = 0;

    let answer = +1;
    while (!state.done) {
        [nextA, nextB] = state.nextComparison;
        answer = nextA - nextB;
        state = step(state, answer);
        steps++;
    }
    d.count = steps;
})

const nameLabel = 'Name';
const itemLabel = 'Items';
const guessLabel = 'Guess';
const countLabel = 'Count';

let maxNameLength = nameLabel.length;
let maxItemsLength = itemLabel.length;
let maxGuessLength = guessLabel.length;
let maxCountLength = countLabel.length;

Object.keys(data).forEach(name => {
    const d = data[name];
    maxNameLength = Math.max(maxNameLength, name.length);
    maxItemsLength = Math.max(maxItemsLength, String(d.list.length).length);
    maxGuessLength = Math.max(maxGuessLength, String(d.guess).length);
    maxCountLength = Math.max(maxCountLength, String(d.count).length);
});

console.log('')
const nameHeader = pad('Name', maxNameLength);
const itemHeader = pad('Items', maxItemsLength);
const guessHeader = pad('Guess', maxGuessLength);
const countHeader = pad('Count', maxCountLength);
console.log(`${nameHeader} ${itemHeader} ${guessHeader} ${countHeader}`);

Object.keys(data).forEach(key => {
    const d = data[key];
    const name = pad(key, maxNameLength);
    const items = pad(d.list.length, maxItemsLength);
    const guess = pad(d.guess, maxGuessLength);
    const count = pad(d.count, maxCountLength);

    console.log(`${name} ${items} ${guess} ${count}`);
})

function pad(value, size) {
    let str = String(value);
    while (str.length < size)
        str = ' ' + str;
    return str;
}