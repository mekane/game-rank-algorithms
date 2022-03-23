const games = [
    {
        name: 'Race for the Galaxy',
        myRank: 1
    },
    {
        name: 'Dune: Imperium',
        myRank: 2
    },
    {
        name: 'Agricola',
        myRank: 3
    },
    {
        name: 'Res Arcana',
        myRank: 4
    },
    {
        name: 'Kingdomino',
        myRank: 5
    },
    {
        name: 'Guess Who',
        myRank: 6
    },
    {
        name: 'Catan',
        myRank: 7
    },
    {
        name: 'The Un-game',
        myRank: 8
    }
];

/*
//Pad out the list of games to a given length for complexity testing
while (games.length < 100) {
    const i = games.length + 1;
    games.push({
        name: 'Trash ' + i,
        myRank: i
    });
}
*/

module.exports = games;