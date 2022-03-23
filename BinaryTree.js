class Node {
    constructor(value) {
        this.left = null
        this.right = null
        this.value = value || null
    }
}


class BinaryTree {
    constructor(rootValue = null) {
        this.root = new Node()
        this.insert(rootValue);
    }

    /**
     *
     * @param value Object
     */
    insert(value) {
        if (value)
            _insertNode(this.root, value);
    }

    /**
     * Visit all nodes in order, LNR
     * Left, Node, Right
     *
     * @return Array
     */
    sortedList() {
        const result = [];

        visit(this.root);

        return result;

        function visit(node) {
            //console.log(`visit ${node.value.name}`);
            if (node.left) {
                visit(node.left);
            }

            result.push(node.value);

            if (node.right) {
                visit(node.right);
            }
        }
    }
}

/* private */
function _insertNode(node, value) {
    //console.log(`inserting ${value.name} at ${node.value ? node.value.name : 'empty node'}`);
    if (node.value === null) {
        //console.log('  node value is null - set value');
        node.value = value;
    } else {
        //console.log('  (node has value)');
        if (value.myRank < node.value.myRank) {
            //console.log(`  value (${value.myRank}) < node (${node.value.myRank})`);
            if (node.left === null) {
                //console.log(`    set left to new node (${value.myRank})`);
                node.left = new Node(value);
            } else {
                //console.log('    recurse to ' + node.left.value.name);
                _insertNode(node.left, value);
            }
        } else if (value.myRank > node.value.myRank) {
            //console.log(`  value (${value.myRank}) > node (${node.value.myRank})`);
            if (node.right === null) {
                //console.log(`    set right to new node (${value.myRank})`);
                node.right = new Node(value);
            } else {
                //console.log('    recurse to ' + node.right.value.name);
                _insertNode(node.right, value);
            }
        } else {
            //console.log('ignoring bogus value', value);
        }
    }
}


module.exports = {
    BinaryTree
}
