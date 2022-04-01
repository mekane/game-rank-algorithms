const expect = require('chai').expect;
const {newSort, step} = require('./Merger.js');

const testInput = ['test4', 'test3', 'test1', 'test2'];

describe('Starting a new sort', () => {
    it('returns a new initial data structure', () => {
        const newState = newSort(testInput);

        const expectedState = {
            originalList: testInput,
            workingList: [
                ['test4'],
                ['test3'],
                ['test1'],
                ['test2'],
            ],
            listSize: 1,
            listIndex: 0,
            mergeIndexA: 0,
            mergeIndexB: 0,
            done: false
        };

        expect(newState).to.deep.equal(expectedState);
        expect(newState.originalList).to.equal(testInput);
    });
});

describe('iterating the outer loop', () => {
    const threePairs = ['a', 'a', 'b', 'b', 'c', 'c'];
    const state0 = newSort(threePairs);

    it('increments listIndex by two and keeps size the same', () => {
        expect(state0.listSize).to.equal(1);

        const state1 = step(state0, 0);
        expect(state1.listIndex).to.equal(2);
        expect(state1.listSize).to.equal(1);

        const state2 = step(state1, 0);
        expect(state2.listIndex).to.equal(4);
        expect(state2.listSize).to.equal(1);
    });

    it('restarts listIndex at zero and doubles list size when listIndex hits the end', () => {
        const state3 = doIterations(state0, 3);
        expect(state3.listIndex).to.equal(0);
        expect(state3.listSize).to.equal(2);
    });

    it('marks the routine done when listSize would exceed the original list length', () => {
        const state9 = doIterations(state0, 9);
        expect(state9.listSize).to.equal(4);
        expect(state9.done).to.equal(true);
    });

    it('does nothing and returns the input state if done is true', () => {
        const done = {
            listSize: 1,
            listIndex: 0,
            done: true
        };
        expect(step(done, 0)).to.equal(done);
        expect(step(done, 0)).to.deep.equal(done);
    });
});

function doIterations(state0, number) {
    let state = state0;
    for (let i = 0; i < number; i++) {
        state = step(state, 0);
    }
    return state;
}

describe.skip('iterating the next step', () => {
    const initialState = newSort(testInput);

    const stateAfterOneStep = {
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

    const stateAfterTwoSteps = {
        pairsToSort: [
            [
                ['test3', 'test4'],
                [],
            ],
            [
                ['test1', 'test2'],
                []
            ]
        ],
        nextComparison: {
            pairIndex: 0,
            list0Index: 0,
            list1Index: 1
        },
        done: false
    };

    it('passes in a previous state and the answer to the next comparison', () => {
        const nextState = step(initialState, -1);
        expect(nextState).to.deep.equal(stateAfterOneStep);
    });

    it('applies the nextComparison indexes to the next step', () => {
        const nextState = step(stateAfterOneStep, 1);
        expect(nextState).to.deep.equal(stateAfterTwoSteps);
    });

});
