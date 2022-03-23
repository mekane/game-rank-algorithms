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
    },
    {
        name: 'Trash',
        myRank: 9,
        score: 0
    },
    {
        name: 'Trash',
        myRank: 9,
        score: 0
    }
];

function compare(a, b) {
    if (typeof a !== 'object' || typeof b !== 'object')
        return;

    if (a.myRank < b.myRank) {
        a.score++;
        b.score--;
    } else {
        b.score++;
        a.score--
    }

    comparisons++;
}

function sortIntoBuckets() {
    const newBuckets = {};

    games.forEach(game => {
        const bucket = newBuckets[game.score] || [];
        bucket.push(game);
        newBuckets[game.score] = bucket;
    });

    return newBuckets;
}

function shuffle() {
    for (let i = 0; i < 16; i++) {
        const index = Math.floor(Math.random() * games.length);
        games.push(games.splice(index, 1)[0]);
    }
}

let step = 1;
let comparisons = 0;
let buckets = {
    '0': games
};

function nextStep() {
    step++;

    console.log(`---------- STEP ${step} ----------`);

    Object.keys(buckets).forEach(bucket => {
        //console.log(`  sorting bucket ${bucket}`)
        const list = buckets[bucket];

        for (let i = 0; i < list.length; i += 2) {
            const game0 = list[i];
            const game1 = list[i+1];

            compare(game0, game1);
            //console.log(`    compare ${game0} `);
        }
    });

    buckets = sortIntoBuckets();
    printBuckets();
}

function printBuckets() {
    const num = Object.keys(buckets).length;
    console.log(`${num} bucket${num > 1 ? 's' : ''}`);
    console.log(buckets);
    console.log('');
}


/*========== MAIN PROGRAM ==========*/
shuffle();
printBuckets();

let sorted = false;
while (!sorted) {
    nextStep();
    sorted = (Object.keys(buckets).length === games.length);
}

console.log('');
console.log(`Took ${step} total steps with ${comparisons} total comparisons`);
