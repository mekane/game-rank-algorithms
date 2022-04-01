function newSort(listOfGames) {
    const pairsToSort = listOfGames.reduce((prev, current, i) => {
        if (i % 2 === 0)
            prev.push([[current]])
        else
            prev[prev.length - 1].push([current])
        return prev;
    }, []);

    return {
        pairsToSort,
        nextComparison: {
            pairIndex: 0,
            list0Index: 0,
            list1Index: 1
        },
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
}

module.exports = {
    newSort,
    step
}