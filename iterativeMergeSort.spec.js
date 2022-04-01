const expect = require('chai').expect;
const {merge, mergeSort, partition} = require('./iterativeMergeSort');

describe('the iterative merge sort algorithm', () => {
    it('takes two single-element lists and combines them into a sorted list', () => {
        const A = [1];
        const B = [2];

        expect(merge(A, B)).to.deep.equal([1, 2]);
        expect(merge(B, A)).to.deep.equal([1, 2]);
    })

    it('merges sorted lists of length 2 and length 1', () => {
        const A = [1, 3];
        const B = [2];

        expect(merge(A, B)).to.deep.equal([1, 2, 3]);
        expect(merge(B, A)).to.deep.equal([1, 2, 3]);
    })

    it('merges sorted lists of length 2', () => {
        const A = [1, 3];
        const B = [2, 4];

        expect(merge(A, B)).to.deep.equal([1, 2, 3, 4]);
        expect(merge(B, A)).to.deep.equal([1, 2, 3, 4]);
    })

    it('merges sorted lists of length 3', () => {
        const A = [1, 3, 9];
        const B = [2, 4, 5];

        expect(merge(A, B)).to.deep.equal([1, 2, 3, 4, 5, 9]);
        expect(merge(B, A)).to.deep.equal([1, 2, 3, 4, 5, 9]);
    })
})

describe('partition', () => {
    it('splits a list into sub-lists of length n', () => {
        const list1 = [1, 2, 3, 4, 5];
        const list2 = [1, 2, 3, 4, 5, 6, 7, 8];
        const list3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        expect(partition(list1, 1)).to.deep.equal([[1], [2], [3], [4], [5]])
        expect(partition(list2, 1)).to.deep.equal([[1], [2], [3], [4], [5], [6], [7], [8]])

        expect(partition(list1, 2)).to.deep.equal([[1, 2], [3, 4], [5]])
        expect(partition(list2, 2)).to.deep.equal([[1, 2], [3, 4], [5, 6], [7, 8]])

        expect(partition(list1, 3)).to.deep.equal([[1, 2, 3], [4, 5]])
        expect(partition(list2, 3)).to.deep.equal([[1, 2, 3], [4, 5, 6], [7, 8]])
        expect(partition(list3, 3)).to.deep.equal([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13]])

        expect(partition(list3, 4)).to.deep.equal([[1, 2, 3,4 ], [ 5, 6, 7, 8], [9, 10, 11, 12], [13]])
    })
})

describe('the mergeSort function', () => {
    it('takes a list and iteratively splits it into smaller lists and merges them', () => {
        expect(mergeSort([2, 1])).to.deep.equal([1, 2])
        expect(mergeSort([3, 2, 1, 6, 5, 4])).to.deep.equal([1, 2, 3, 4, 5, 6])
    })
})
