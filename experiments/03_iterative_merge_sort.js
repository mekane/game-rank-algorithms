const {mergeSort} = require('./iterativeMergeSort');

const list = [15, 2, 1, 3, 4, 8, 7, 6, 5, 9, 14, 13, 11, 12, 10];
const sorted = mergeSort(list);
console.log(sorted);
