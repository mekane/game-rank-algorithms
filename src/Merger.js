function newSort(listOfGames, debugEnabled = false) {

    if (listOfGames.length <= 1) {
        return {
            originalList: listOfGames,
            result: listOfGames,
            done: true
        }
    }

    const n = listOfGames.length;
    const logN = Math.log2(n) - 1;
    const guess = Math.max(1, Math.round(logN * n));

    if (debugEnabled) {
        console.log(`Estimate ${guess} comparisons to sort ${n} items`)
    }

    const subLists = listOfGames.map(g => [g]);
    return {
        originalList: listOfGames,
        subLists,
        listSize: 1,
        listIndex: 0,
        nextComparison: [subLists[0][0], subLists[1][0]],
        guess,
        done: false
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

    let sorted = (oldState.sorted || []).slice();
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

        sorted.push(currentMerge);
    } else if (currentMerge.length) {
        const nextA = subLists[listIndex][mergeIndexA];
        const nextB = subLists[listIndex + 1][mergeIndexB];

        return {
            originalList: oldState.originalList,
            currentMerge,
            mergeIndexA,
            mergeIndexB,
            listIndex,
            listSize,
            subLists,
            sorted,
            nextComparison: [nextA, nextB],
            done: false
        };
    }

    //TODO: how will the UI know the next comparison to offer? - maybe we should try to compute it and if we can't then we know to keep working

    let nextListSize = listSize * 2;
    debug(`[Outer] next listSize: ${nextListSize} >= ${oldState.originalList.length}: (${nextListSize >= oldState.originalList.length})`)

    const exceededListSize = nextListSize >= oldState.originalList.length;
    const sortedAllItems = sorted.length === oldState.originalList.length;
    if (exceededListSize || sortedAllItems) { //outer loop done
        return {
            originalList: oldState.originalList,
            result: sorted[0],
            done: true,
        }
    }

    debug(`    [Inner] next listIndex: ${listIndex + 2} >= ${subLists.length}: (${listIndex + 2 >= subLists.length})`)
    //list iterator inner loop check increment
    if ((listIndex + 2) >= subLists.length) { //outer loop
        debug(`    outer loop check: ${listIndex + 2} >= ${subLists.length}`);
        listSize = nextListSize;
        listIndex = 0;
        subLists = sorted;
        sorted = [];
    } else { //inner loop
        listIndex += 2;
    }

    const nextA = subLists[listIndex][0];
    const nextB = (subLists[listIndex + 1] || [])[0];

    /* TODO
    if (typeof nextB === 'undefined') {
        skip this step - iterate next
    }*/

    return {
        originalList: oldState.originalList,
        listIndex,
        listSize,
        subLists,
        sorted,
        nextComparison: [nextA, nextB],
        done: false
    };

    function debug(...args) {
        if (debugEnabled)
            console.log(...args);
    }
}

module.exports = {
    newSort,
    step
}