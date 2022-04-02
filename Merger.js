function newSort(listOfGames) {

    return {
        originalList: listOfGames,
        subLists: listOfGames.map(g => [g]),
        listSize: 1,
        listIndex: 0,
        mergeIndexA: 0,
        mergeIndexB: 0,
        done: false
    }
}

/**
 *
 * @param oldState {{}} a previous sorting state object (read only)
 * @param answer { Number } the comparison result of the oldState's "nextComparison" pair
 * -1 = item 0 larger, 1 = item 1 larger
 */
function step(oldState, answer) {
    if (oldState.done)
        return oldState;

    let {listIndex, listSize} = oldState;
    const subLists = oldState.subLists.slice();

    const listA = subLists[listIndex];
    const listB = subLists[listIndex + 1] || [];

    let mergeIndexA = oldState.mergeIndexA || 0;
    let mergeIndexB = oldState.mergeIndexB || 0;

    let result = [];
    if (mergeIndexA < listA.length && mergeIndexB < listB.length) { //Merge loop still going
        console.log(`    [Merge Loop ${mergeIndexA} < ${listA.length}, ${mergeIndexB} < ${listB.length}]`)
        if (answer < 0) {
            console.log('      push list A')
            result.push(listA[mergeIndexA++])
        } else {
            console.log('      push list B')
            result.push(listB[mergeIndexB++])
        }
    }

    if (mergeIndexA >= listA.length || mergeIndexB >= listB.length) { //merge loop is done
        while (mergeIndexA < listA.length) {
            console.log('     AAA fill from rest of A')
            result.push(listA[mergeIndexA++])
        }
        while (mergeIndexB < listB.length) {
            console.log('     BBB fill from rest of B')
            result.push(listB[mergeIndexB++])
        }
    }


    const nextListSize = listSize * 2;
    //console.log(`[Outer] next listSize: ${nextListSize} >= ${oldState.originalList.length}: (${nextListSize >= oldState.originalList.length})`)
    if (nextListSize >= oldState.originalList.length) { //outer loop done
        return {
            originalList: oldState.originalList,
            listIndex,
            listSize,
            subLists,
            result,
            done: true,
        }
    }

    //console.log(`    [Inner] next listIndex: ${listIndex + 2} >= ${subLists.length}: (${listIndex + 2 >= subLists.length})`)
    //list iterator inner loop check increment
    if ((listIndex + 2) >= subLists.length) { //outer loop
        listSize = nextListSize;
        listIndex = 0;
    } else { //inner loop
        listIndex += 2;
    }

    return {
        originalList: oldState.originalList,
        listIndex,
        listSize,
        subLists,
        result,
        done: false
    }
    /*
    const pairsToSort = JSON.parse(JSON.stringify(oldState.pairsToSort));

    const {pairIndex, list0Index, list1Index} = oldState.nextComparison;
    const pair = pairsToSort[pairIndex];
    const list0 = pair[list0Index];
    const list1 = pair[list1Index];

    if (answer < 0)
        list0.unshift(list1.pop())
    else
        list0.push(list1.pop())

    let nextPairIndex = pairIndex + 1;
    if (nextPairIndex >= pairsToSort.length)
        nextPairIndex = 0;

    return {
        pairsToSort,
        nextComparison: {
            pairIndex: nextPairIndex,
            list0Index: 0,
            list1Index: 1
        },
        done: false,
    }
 */
}

module.exports = {
    newSort,
    step
}