function newSort(listOfGames) {
    return {
        lists: listOfGames.map(x => [x]),
        nextComparison: [
            {list: 0, index: 0},
            {list: 1, index: 0}
        ]
    }
}

function step(oldState) {

}

module.exports = {
    newSort,
    step
}