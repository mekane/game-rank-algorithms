const games = require('./games.js');

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
console.log(`Ranking ${games.length} games took ${step} total steps with ${comparisons} total comparisons`);
