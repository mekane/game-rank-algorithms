const {games, testList} = require('./games.js');
const {shuffle} = require('./common');
const {BinaryTree} = require('./BinaryTree');

/*========== MAIN PROGRAM ==========*/

let counts;
let tree;
const results = {};
for (let size = 4; size < 21; size++) {
    counts = [];

    const games = testList(size);

    for (let rep = 0; rep < 10; rep++) {
        shuffle(games);
        tree = new BinaryTree();
        games.forEach(g => tree.insert(g));
        counts.push(tree.comparisons);
    }

    results[size] = counts;
}


Object.keys(results).forEach(size => {
    console.log(size, average(results[size]), '   ', results[size]);
});

function average(list) {
    const total = list.reduce((total, next) => total + next, 0);
    return Math.round(total / list.length);
}

//console.log(tree.sortedList());
//console.log(`Ranking ${games.length} games took ${tree.comparisons} total comparisons`);
