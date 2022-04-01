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
    let listSize = 1;

    let working = listToSort.slice();
    working = partition(working, listSize);

    while (listSize < listToSort.length) {
        let subLists = working;
        working = [];

        for (let list = 0 ; list < subLists.length ; list += 2) {
            //console.log(`merge lists ${list}, ${list+1}`, subLists[list], subLists[list+1]);
            const result = innerMerge(subLists[list], subLists[list+1]);
            //console.log('  ', result);
            working.push(result);
            //console.log('->', working);


            function innerMerge(listA, listB = []) {
                let i = 0, j = 0;
                const result = [];

                while (i < listA.length && j < listB.length) {
                    //console.log(`{ compare A[${i}] and B[${j}]: (${listA[i]}, ${listB[j]})`)
                    if (listA[i] < listB[j]) {
                        result.push(listA[i++])
                        output(i, j, -1);
                    }
                    else {
                        result.push(listB[j++])
                        output(i, j, -1);
                    }
                }

                // copy leftovers
                while (i < listA.length) {
                    //console.log(' * auto-push rest of A')
                    result.push(listA[i++])
                }
                while (j < listB.length) {
                    //console.log(' * auto-push rest of B')
                    result.push(listB[j++])
                }

                return result;

                function output(i, j, answer) {
                    const state = {
                        lists: subLists,
                        working,
                        mergingListA: list,
                        mergingListB: list + 1,
                        listA,
                        listB,
                        indexA: i,
                        indexB: j,
                        answer,
                        result
                    };
                    //console.dir(state);
                }
            }
        }

        listSize *= 2;
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