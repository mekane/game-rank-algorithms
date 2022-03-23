const games = require('./games.js');
const { shuffle } = require('./common');

function compare(node, newNode) {
    if (typeof node !== 'object' || typeof newNode !== 'object')
        return;

    if (node.myRank < newNode.myRank) {
        node.right = newNode;
        newNode.parent = node;
    } else {
        node.left = newNode;
        newNode.parent = node;
    }

    comparisons++;
}

let step = 1;
let comparisons = 0;

/**
 * @type Node {{left: null, right: null}}
 */
const tree = {
    right: null,
    left: null
};

/*========== MAIN PROGRAM ==========*/
shuffle(games);

console.log(games);
console.log(`Ranking ${games.length} games took ${step} total steps with ${comparisons} total comparisons`);
