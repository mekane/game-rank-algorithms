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
        //console.log(`{ compare A[${i}] and B[${j}]: (${listA[i]}, ${listB[j]})`)
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

function mergeSort(listToSort) {
    console.log('Iterative Merge Sort', listToSort);
    let listSize = 1;

    let working = listToSort.slice();
    working = partition(working, listSize);

    while (listSize < listToSort.length) {
        console.log(`[Outer Loop Open ${listSize} < ${listToSort.length}]`)
        let subLists = working;
        working = [];

        for (let listIndex = 0; listIndex < subLists.length; listIndex += 2) {
            console.log(`  [Inner Loop Open ${listIndex} < ${subLists.length}]`)
            //console.log(`merge lists ${list}, ${list+1}`, subLists[list], subLists[list+1]);

            //merge function ------
            const result = [];
            const listA = subLists[listIndex];
            const listB = subLists[listIndex+1] || [];

            let mergeIndexA = 0;
            let mergeIndexB = 0;

            console.log(`    Merge? ${mergeIndexA} < ${listA.length}, ${mergeIndexB} < ${listB.length}`)
            while (mergeIndexA < listA.length && mergeIndexB < listB.length) {
                console.log(`    [Merge Loop Open ${mergeIndexA} < ${listA.length}, ${mergeIndexB} < ${listB.length}]`)
                let a = 'debug';
                //console.log(`{ compare A[${i}] and B[${j}]: (${listA[i]}, ${listB[j]})`)
                if (listA[mergeIndexA] < listB[mergeIndexB]) {
                    a = -1;
                    console.log('      push list A')
                    result.push(listA[mergeIndexA++])
                } else {
                    a = +1;
                    console.log('      push list B')
                    result.push(listB[mergeIndexB++])
                }

                output(a);
                console.log(`    [Merge Loop Close ${mergeIndexA}, ${mergeIndexB}]`)
            }

            // copy leftovers
            while (mergeIndexA < listA.length) {
                console.log('      fill from rest of A')
                result.push(listA[mergeIndexA++])
            }
            while (mergeIndexB < listB.length) {
                console.log('      fill from rest of B')
                result.push(listB[mergeIndexB++])
            }
            //-------- end merge

            working.push(result);

            //console.log('->', working);

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
                console.log('      ',JSON.stringify(state, null, 8));
                console.log('\n');

            }

            console.log(`  [Inner Loop Close - listIndex: ${listIndex}]`)
        }

        listSize *= 2;
        console.log(`[Outer Loop Close - listSize: ${listSize}]`)
    }

    return working[0];
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