const expect = require('chai').expect;
const {newSort, step} = require('./Merger.js');

const testInput = ['test4', 'test3', 'test1', 'test2'];

describe('Starting a new sort', () => {
    it('returns a new initial data structure', () => {
        const newState = newSort(testInput);

        const expectedState = {
            originalList: testInput,
            subLists: [
                ['test4'],
                ['test3'],
                ['test1'],
                ['test2'],
            ],
            listSize: 1,
            listIndex: 0,
            nextComparison: ['test4', 'test3'],
            guess: 4,
            done: false
        };

        expect(newState).to.deep.equal(expectedState);
        expect(newState.originalList).to.equal(testInput);
    })
})

describe('the step function', () => {
    it('takes a previous state and returns a new one', () => {
        const initialState = newSort(['1', '2', '3']);
        let newState = step(initialState, 0);
        expect(newState).to.not.equal(initialState);
    })

    it('does not modify the old state', () => {
        const initialState = newSort(['1', '2', '3']);
        const deepFreeze = require('deep-freeze');
        deepFreeze(initialState);

        function nextStep() {
            step(initialState, 0);
        }

        expect(nextStep).not.to.throw();
    })
})

describe('The inner merge logic', () => {
    it('adds merge properties when it is mid-merge', () => {
        const aboutToMerge = {
            originalList: testInput,
            subLists: [
                ['test3', 'test4'],
                ['test1', 'test2']
            ],
            listSize: 2,
            listIndex: 0,
            mergeIndexA: 0,
            mergeIndexB: 0,
            done: false
        }

        const nextState = step(aboutToMerge, +1)
        expect(nextState.currentMerge).to.deep.equal(['test1'])
        expect(nextState.mergeIndexA).to.equal(0)
        expect(nextState.mergeIndexB).to.equal(1)
    })

    it('adds a "nextComparison" property for the first step', () => {
        const state = newSort(['Two', 'One'])
        expect(state.nextComparison).to.deep.equal(['Two', 'One'])
    })

    it('adds a "nextComparison" property for the sub-lists', () => {
        const aboutToMerge = {
            originalList: testInput,
            subLists: [
                ['test3', 'test4'],
                ['test1', 'test2']
            ],
            listSize: 2,
            listIndex: 0,
            mergeIndexA: 0,
            mergeIndexB: 0,
            done: false
        }

        const nextState = step(aboutToMerge, +1)
        expect(nextState.nextComparison).to.deep.equal(['test3', 'test2'])
    })

    //TODO: add a test for a more in-progress merge
})

describe('iterating the outer loop', () => {
    const testList = ['a', 'b', 'c', 'd', 'e', 'f'];
    const state0 = newSort(testList);

    it('increments listIndex by two and keeps size the same', () => {
        expect(state0.listSize).to.equal(1);

        const state1 = step(state0, 0);
        expect(state1.listIndex).to.equal(2);
        expect(state1.listSize).to.equal(1);

        const state2 = step(state1, 0);
        expect(state2.listIndex).to.equal(4);
        expect(state2.listSize).to.equal(1);
    });

    it('restarts listIndex and doubles size when listIndex hits the end', () => {
        const state3 = doIterations(state0, 3);
        expect(state3.listIndex).to.equal(0);
        expect(state3.listSize).to.equal(2);
    });

    it('updates sub-lists and resets results when listIndex hits the end', () => {
        const state4 = doIterations(state0, 4);
        expect(state4.sorted).to.deep.equal([]);
        expect(state4.subLists).to.deep.equal([
            ['a', 'b'],
            ['c', 'd'],
            ['e', 'f']
        ])
    });

    it('does nothing and returns the input state if done is true', () => {
        const doneState = {
            listSize: 1,
            listIndex: 0,
            done: true
        };
        expect(step(doneState, 0)).to.equal(doneState);
        expect(step(doneState, 0)).to.deep.equal(doneState);
    });
});

describe('Unit tests for various length lists', () => {
    it('iterates zero times for one item', () => {
        const originalList = [1];
        const degenerateState = newSort(originalList);
        expect(degenerateState).to.deep.equal({
            originalList,
            result: [1],
            done: true
        })
    })

    it('iterates once for two items', () => {
        const originalList = ['Two', 'One'];
        const state0 = newSort(originalList);
        const state1 = step(state0, +1);
        expect(state1).to.deep.equal({
            originalList,
            result: ['One', 'Two'],
            done: true
        })
    })

    it('iterates for a list of three items', () => {
        const originalList = ['Two', 'One', 'Three'];
        const state0 = newSort(originalList);
        const state1 = step(state0, 1);
        expect(state1).to.deep.equal({
            originalList,
            listSize: 1,
            listIndex: 2,
            subLists: [
                ['Two'], ['One'], ['Three']
            ],
            sorted: [['One', 'Two']],
            nextComparison: ['Three', undefined],
            done: false
        })

        //TODO: Add look-ahead code to skip this non-decision
        const state2 = step(state1, 0);
        expect(state2).to.deep.equal({
            originalList,
            listSize: 2,
            listIndex: 0,
            subLists: [
                ['One', 'Two'], ['Three']
            ],
            sorted: [],
            nextComparison: ['One', 'Three'],
            done: false
        })

        //TODO: skip this too?
        const state3 = step(state2, -1);
        expect(state3).to.deep.equal({
            originalList,
            listSize: 2,
            listIndex: 0,
            mergeIndexA: 1,
            mergeIndexB: 0,
            currentMerge: ['One'],
            subLists: [
                ['One', 'Two'], ['Three']
            ],
            nextComparison: ['Two', 'Three'],
            sorted: [],
            done: false
        })

        const state4 = step(state3, -1);
        expect(state4).to.deep.equal({
            originalList,
            result: ['One', 'Two', 'Three'],
            done: true
        })

    })

    it.skip('iterates four times for four items', () => {
        const originalList = ['Two', 'One', 'Three', 'Four'];
        const state0 = newSort(originalList);
        const state1 = step(state0, 1);
        expect(state1).to.deep.equal({
            originalList,
            listSize: 1,
            listIndex: 2,
            subLists: [
                ['Two'], ['One'], ['Three'], ['Four']
            ],
            sorted: ['One', 'Two'],
            done: false
        })

        const state2 = step(state1, -1);
        expect(state2).to.deep.equal({
            originalList,
            listSize: 1,
            listIndex: 2,
            subLists: [
                ['One', 'Two'], ['Three', 'Four']
            ],
            done: false
        })

        const state3 = step(state2, -1);
        expect(state3).to.deep.equal({
            originalList,
            listSize: 2,
            listIndex: 0,
            subLists: [
                ['One', 'Two'], ['Three', 'Four']
            ],
            mergeIndexA: 1,
            mergeIndexB: 0,
            sorted: ['One'],
            done: false
        })
    })

    it('successfully sorts a list of length 8', () => {
        let state = newSort([3, 2, 1, 9, 5, 4, 10, 11]);
        let answer = +1;

        let steps = 0;
        while (!state.done) {
            [nextA, nextB] = state.nextComparison;
            answer = nextA - nextB;
            state = step(state, answer);
            steps++;
            //console.log(`Step ${steps}`)
            //console.log(state);
        }
    })
})


function doIterations(state0, number, debug = false) {
    let state = state0;
    for (let i = 1; i <= number; i++) {
        state = step(state, -1, debug);
        if (debug) {
            console.log(`=== Iteration ${i} result:`, state)
        }
    }
    return state;
}
