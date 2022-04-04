function newSort(listOfGames) {

    const done = listOfGames.length === 1;
    const result = done ? listOfGames : [];

    return {
        originalList: listOfGames,
        subLists: listOfGames.map(g => [g]),
        listSize: 1,
        listIndex: 0,
        result,
        done
    }
}

/**
 *
 * @param oldState a previous sorting state object (read only)
 * @param answer { Number } the comparison result of the oldState's "nextComparison" pair
 * -1 = item 0 larger, 1 = item 1 larger
 */
function step(oldState, answer, debugEnabled = false) {
    if (oldState.done)
        return oldState;

    let {listIndex, listSize} = oldState;
    let subLists = oldState.subLists.slice();

    const listA = subLists[listIndex];
    const listB = subLists[listIndex + 1] || [];

    let mergeIndexA = oldState.mergeIndexA || 0;
    let mergeIndexB = oldState.mergeIndexB || 0;

    let result = oldState.result.slice() || [];
    let currentMerge = (oldState.currentMerge || []).slice();

    if (mergeIndexA < listA.length && mergeIndexB < listB.length) { //Merge loop still going
        debug(`    [Merge Loop ${mergeIndexA} < ${listA.length}, ${mergeIndexB} < ${listB.length}]`)
        if (answer < 0) {
            debug('      merge: push list A')
            currentMerge.push(listA[mergeIndexA++])
        } else {
            debug('      merge: push list B')
            currentMerge.push(listB[mergeIndexB++])
        }
    }

    if (mergeIndexA >= listA.length || mergeIndexB >= listB.length) { //merge loop is done
        while (mergeIndexA < listA.length) {
            debug('      AAA fill from rest of A')
            currentMerge.push(listA[mergeIndexA++])
        }
        while (mergeIndexB < listB.length) {
            debug('      BBB fill from rest of B')
            currentMerge.push(listB[mergeIndexB++])
        }

        result.push(currentMerge);
        currentMerge = [];
        mergeIndexA = null;
        mergeIndexB = null;
    }
    else {
        console.log('  == Current Merge', currentMerge)
        console.log('  == List A', listA)
        console.log('  == List B', listB)
        console.log()
        //TODO: can we just return here and skip the currentMerge.length check below?
    }

    //TODO: how will the UI know the next comparison to offer? - maybe we should try to compute it and if we can't then we know to keep working

    let nextListSize = listSize;

    //TODO: skip this?
    //don't do outer loop if merge is ongoing
    if ( !currentMerge.length ) {
         nextListSize *= 2;
        debug(`[Outer] next listSize: ${nextListSize} >= ${oldState.originalList.length}: (${nextListSize >= oldState.originalList.length})`)
    }

    const exceededListSize = nextListSize >= oldState.originalList.length;
    const sortedAllItems = result.length === oldState.originalList.length;
    if (exceededListSize || sortedAllItems) { //outer loop done
        return {
            originalList: oldState.originalList,
            listIndex,
            listSize,
            subLists,
            result: result[0],
            done: true,
        }
    }

    debug(`    [Inner] next listIndex: ${listIndex + 2} >= ${subLists.length}: (${listIndex + 2 >= subLists.length})`)
    //list iterator inner loop check increment
    if ((listIndex + 2) >= subLists.length) { //outer loop
        listSize = nextListSize;
        listIndex = 0;
        subLists = result;
        result = [];
    } else { //inner loop
        listIndex += 2;
    }

    const nextState = {
        originalList: oldState.originalList,
        listIndex,
        listSize,
        subLists,
        result,
        done: false
    };

    if (currentMerge.length) {
        nextState.currentMerge = currentMerge;
        nextState.mergeIndexA = mergeIndexA;
        nextState.mergeIndexB = mergeIndexB;
    }

    return nextState;

    function debug(...args) {
        if (debugEnabled)
            console.log(...args);
    }
}

module.exports = {
    newSort,
    step
}