const games = [
    {
        name: 'Race for the Galaxy',
        myRank: 1,
        score: 0
    },
    {
        name: 'Dune: Imperium',
        myRank: 2,
        score: 0
    },
    {
        name: 'Agricola',
        myRank: 3,
        score: 0
    },
    {
        name: 'Res Arcana',
        myRank: 4,
        score: 0
    },
    {
        name: 'Kingdomino',
        myRank: 5,
        score: 0
    },
    {
        name: 'Guess Who',
        myRank: 6,
        score: 0
    },
    {
        name: 'Catan',
        myRank: 7,
        score: 0
    },
    {
        name: 'The Un-game',
        myRank: 8,
        score: 0
    }
];

/*
//Pad out the list of games to a given length for complexity testing
while (games.length < 100) {
    const i = games.length + 1;
    games.push({
        name: 'Trash ' + i,
        myRank: i,
        score: 0
    });
}
*/

module.exports = games;