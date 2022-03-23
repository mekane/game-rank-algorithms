const expect = require('chai').expect;
const {BinaryTree} = require('./BinaryTree');

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
        const tree = new BinaryTree();
        expect(tree.root).to.deep.equal({
            left: null,
            right: null,
            value: null
        });
    });

    it('inserts the provided value at the root', () => {
        const value = testValue(4);
        const tree = new BinaryTree(value);
        expect(tree.root).to.deep.equal({
            left: null,
            right: null,
            value
        });
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

        const tree = new BinaryTree(rootValue);
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

    it(`ignores values that don't have a rank property`, () => {
        const rootValue = testValue(5);
        const bogusValue = {name: 'bogus'};

        const tree = new BinaryTree();
        tree.insert(rootValue);
        tree.insert(bogusValue);

        expect(tree.root).to.deep.equal({
            left: null,
            right: null,
            value: rootValue
        });
    });

    //TODO: test for equal values

    it('inserts two smaller values to the left', () => {
        const rootValue = testValue(5);
        const left1 = testValue(4);
        const left2 = testValue(3);

        const tree = new BinaryTree(rootValue);
        tree.insert(left1);
        tree.insert(left2);

        const expectedTree = {
            right: null,
            value: rootValue,
            left: {
                right: null,
                value: left1,
                left: {
                    right: null,
                    value: left2,
                    left: null
                }
            }
        }

        expect(tree.root).to.deep.equal(expectedTree);
    });

    it('inserts two larger values to the right', () => {
        const rootValue = testValue(5);
        const right1 = testValue(6);
        const right2 = testValue(7);

        const tree = new BinaryTree(rootValue);
        tree.insert(right1);
        tree.insert(right2);

        const expectedTree = {
            left: null,
            value: rootValue,
            right: {
                left: null,
                value: right1,
                right: {
                    right: null,
                    value: right2,
                    left: null
                }
            }
        }

        expect(tree.root).to.deep.equal(expectedTree);
    });

    it('inserts multiple values correctly', () => {
        const values = [4, 2, 3, 6, 5, 1, 7];

        const tree = new BinaryTree();
        values.forEach(v => tree.insert(testValue(v)));

        const expectedTree = {
            left: {
                left: {
                    left: null,
                    value: testValue(1),
                    right: null
                },
                value: testValue(2),
                right: {
                    left: null,
                    value: testValue(3),
                    right: null
                }
            },
            value: testValue(4),
            right: {
                left: {
                    left: null,
                    value: testValue(5),
                    right: null
                },
                value: testValue(6),
                right: {
                    right: null,
                    value: testValue(7),
                    left: null
                }
            }
        };

        expect(tree.root).to.deep.equal(expectedTree);
    });

});

//TODO keep the tree balanced