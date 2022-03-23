const games = require('./games.js');
const {shuffle} = require('./common');
const {BinaryTree} = require('./BinaryTree');

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


/*========== MAIN PROGRAM ==========*/
shuffle(games);
console.log(games);

const tree = new BinaryTree();
tree.insert(games[0]);
tree.insert(games[1]);
tree.insert(games[2]);

console.log(`Ranking ${games.length} games took ${step} total steps with ${comparisons} total comparisons`);

console.log(tree.root);
console.log(tree.root.left);
console.log(tree.root.right);
