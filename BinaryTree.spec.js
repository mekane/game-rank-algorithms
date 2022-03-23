const expect = require('chai').expect;
const { BinaryTree } = require('./BinaryTree');

/**
 * @param number Number
 * @returns {{name: string, myRank: number}}
 */
function testValue(number) {
    return {
        name: `item ${number}`,
        myRank: number
    }
}

describe('The BinaryTree class', () => {
    it('starts empty', () => {

    });

    it('inserts the first value into the root', () => {
        const testObj = {test: true};
        const tree = new BinaryTree();
        tree.insert(testObj);
        expect(tree.root.value).to.equal(testObj);
    });

    it('inserts a smaller value to the left of the root', () => {
        const rootValue = testValue(5);
        const leftValue = testValue(2);

        const tree = new BinaryTree();
        tree.insert(rootValue);
        tree.insert(leftValue);

        expect(tree.root.left).to.deep.equal({
            left: null,
            right: null,
            value: leftValue
        });
    })

    it('inserts a larger value to the right of the root', () => {
        const rootValue = testValue(5);
        const rightValue = testValue(8);

        const tree = new BinaryTree();
        tree.insert(rootValue);
        tree.insert(rightValue);

        expect(tree.root.right).to.deep.equal({
            left: null,
            right: null,
            value: rightValue
        });
    });

    //TODO: test for equal values
    //TODO: test for values that don't have a 'myRank' property

    //TODO: insert two lefts
    //TODO: insert two rights
});
