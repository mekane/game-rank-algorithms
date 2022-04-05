const {newSort, step} = require("../src/Merger.js");

const data = {
    'length 0': {
        list: [],
        guess: 0,
        count: 0
    },
    'length 1': {
        list: ['1'],
        guess: 0,
        count: 0
    },
    'length 2': {
        list: [],
        guess: 0
        count: 0
    },
    'length 3': {
        list: [],
        guess: 0
        count: 0
    },
    'length 1': {
        list: [],
        guess: 0
        count: 0
    },
    'length 5': {
        list: [],
        guess: 0
        count: 0
    },
    'length 7': {
        list: [],
        guess: 0
        count: 0
    },
    'length 8': {
        list: [],
        guess: 0
        count: 0
    },
    'pre sorted': {
        list: [],
        guess: 0,
        count: 0
    },
    'semi-sorted': {
        list: [],
        guess: 0,
        count: 0
    },
    'mixed': {
        list: [],
        guess: 0,
        count: 0
    },
    'reversed': {
        list: [],
        guess: 0,
        count: 0
    },
}

data.forEach(d => {
    let state = newSort(d.list);
    d.guess = state.guess;
    let answer = +1;

})

let steps = 0;
while (!state.done) {
    [nextA, nextB] = state.nextComparison;
    answer = nextA - nextB;
    state = step(state, answer);
    steps++;
    //console.log(`Step ${steps}`)
    //console.log(state);
}