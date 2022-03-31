const expect = require('chai').expect;
const {newSort, step} = require('./Merger.js');

const testInput = ['test4', 'test3', 'test1', 'test2'];

describe('Starting a new sort', () => {
    it('returns a new initial data structure', () => {
        const newState = newSort(testInput);

        const expectedState = {
            pairsToSort: [
                [
                    ['test4'],
                    ['test3'],
                ],
                [
                    ['test1'],
                    ['test2'],
                ]
            ],
            nextComparison: {
                pairIndex: 0,
                list0Index: 0,
                list1Index: 1
            },
            done: false
        };

        expect(newState).to.deep.equal(expectedState);
    });
});

describe('iterating the next step', () => {
    it('passes in a previous state and the answer to the next comparison', () => {
        const initialState = newSort(testInput);
        const nextState = step(initialState, -1);

        const expectedState = {
            pairsToSort: [
                [
                    ['test3', 'test4'],
                    [],
                ],
                [
                    ['test1'],
                    ['test2']
                ]
            ],
            nextComparison: {
                pairIndex: 1,
                list0Index: 0,
                list1Index: 1
            },
            done: false
        };

        expect(nextState).to.deep.equal(expectedState);
    });
});
