const expect = require('chai').expect;
const {newSort} = require('./Merger.js');

describe('Starting a new sort', () => {
    it('returns a new initial data structure', () => {
        const newState = newSort(['test4', 'test3', 'test1', 'test2']);

        expect(newState).to.deep.equal({
            lists: [
                ['test4'],
                ['test3'],
                ['test1'],
                ['test2'],
            ],
            nextComparison: [
                {list: 0, index: 0},
                {list: 1, index: 0}
            ]
        });
    });
});

describe('iterating the next step', () => {

});