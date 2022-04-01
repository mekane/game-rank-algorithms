function newSort(listOfGames) {

    return {
        originalList: listOfGames,
        workingList: listOfGames.map(g => [g]),
        listSize: 1,
        listIndex: 0,
        mergeIndexA: 0,
        mergeIndexB: 0,
        done: false
    }
}

/**
 *
 * @param oldState a previous sorting state object (read only)
 * @param answer the comparison result of the oldState's "nextComparison" pair
 * -1 = item 0 larger, 1 = item 1 larger
 */
function step(oldState, answer) {
    if (oldState.done)
        return oldState;

    let {listIndex, listSize} = oldState;
    const workingList = oldState.workingList.slice();

    const nextListSize = listSize * 2;
    //console.log(`[Outer] next listSize: ${nextListSize} >= ${oldState.originalList.length}: (${nextListSize >= oldState.originalList.length})`)
    if (nextListSize >= oldState.originalList.length) { //outer loop done
        return {
            originalList: oldState.originalList,
            listIndex,
            listSize,
            workingList,
            done: true,
        }
    }

    //console.log(`    [Inner] next listIndex: ${listIndex + 2} >= ${workingList.length}: (${listIndex + 2 >= workingList.length})`)
    //list iterator inner loop check increment
    if ((listIndex + 2) >= workingList.length) { //outer loop
        listSize = nextListSize;
        listIndex = 0;
    } else { //inner loop
        listIndex += 2;
    }

    return {
        originalList: oldState.originalList,
        listIndex,
        listSize,
        workingList
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