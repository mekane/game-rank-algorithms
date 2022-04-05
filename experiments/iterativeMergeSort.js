/**
 * Takes two arrays of numbers and merges them iteratively using merge sort
 * @param listA Array
 * @param listB Array
 * @return Array sorted
 */
function merge(listA, listB = []) {
    let i = 0, j = 0;
    const result = [];

    while (i < listA.length && j < listB.length) {
        //debug(`{ compare A[${i}] and B[${j}]: (${listA[i]}, ${listB[j]})`)
        if (listA[i] < listB[j])
            result.push(listA[i++])
        else
            result.push(listB[j++])
    }

    // copy leftovers
    while (i < listA.length)
        result.push(listA[i++])
    while (j < listB.length)
        result.push(listB[j++])

    return result;
}

function mergeSort(listToSort = [], debugEnabled = false) {
    debug('Iterative Merge Sort', listToSort);
    let listSize = 1;

    let working = listToSort.slice();
    working = partition(working, listSize);

    while (listSize < listToSort.length) {
        debug(`[Outer Loop Open ${listSize} < ${listToSort.length}]`)
        let subLists = working;
        working = [];

        for (let listIndex = 0; listIndex < subLists.length; listIndex += 2) {
            debug(`  [Inner Loop Open ${listIndex} < ${subLists.length}]`)
            //debug(`merge lists ${list}, ${list+1}`, subLists[list], subLists[list+1]);

            //merge function ------
            const result = [];
            const listA = subLists[listIndex];
            const listB = subLists[listIndex+1] || [];

            let mergeIndexA = 0;
            let mergeIndexB = 0;

            debug(`    Merge? ${mergeIndexA} < ${listA.length}, ${mergeIndexB} < ${listB.length}`)
            while (mergeIndexA < listA.length && mergeIndexB < listB.length) {
                debug(`    [Merge Loop Open ${mergeIndexA} < ${listA.length}, ${mergeIndexB} < ${listB.length}]`)
                let a = 'debug';
                //debug(`{ compare A[${i}] and B[${j}]: (${listA[i]}, ${listB[j]})`)
                if (listA[mergeIndexA] < listB[mergeIndexB]) {
                    a = -1;
                    debug('      push list A')
                    result.push(listA[mergeIndexA++])
                } else {
                    a = +1;
                    debug('      push list B')
                    result.push(listB[mergeIndexB++])
                }

                output(a);
                debug(`    [Merge Loop Close ${mergeIndexA}, ${mergeIndexB}]`)
            }

            // copy leftovers
            while (mergeIndexA < listA.length) {
                debug('      fill from rest of A')
                result.push(listA[mergeIndexA++])
            }
            while (mergeIndexB < listB.length) {
                debug('      fill from rest of B')
                result.push(listB[mergeIndexB++])
            }
            //-------- end merge

            working.push(result);

            //debug('->', working);

            function output(answer) {
                const state = {
                    result,
                    subLists,
                    working,
                    listSize,
                    listIndex,
                    mergeIndexA,
                    mergeIndexB,
                    //answer,
                };
                debug('      ',JSON.stringify(state, null, 8));
                debug('\n');

            }

            debug(`  [Inner Loop Close - listIndex: ${listIndex}]`)
        }

        listSize *= 2;
        debug(`[Outer Loop Close - listSize: ${listSize}]`)
    }

    return working[0];

    function debug(...args) {
        if (debugEnabled)
            debug(...args);
    }
}

function partition(list, n) {
    return list.reduce((prev, current, i) => {
        const listIndex = Math.floor(i / n);
        const sequence = (i / listIndex) || n;
        const startOfSequence = (sequence === n);

        if (startOfSequence)
            prev.push([current])
        else
            prev[listIndex].push(current)
        return prev;
    }, []);
}

module.exports = {
    merge,
    mergeSort,
    partition
}