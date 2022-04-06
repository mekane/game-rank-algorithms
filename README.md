# Game Ranker

Inspired by Pub Meeple, I wanted to play around with the sorting algorithm for ranking a set of games.
It's an interesting problem to me because I'm really into board games and rankings, and also I'm a
software engineer with a computer science degree.

## Experiments

The `experiments/` directory has some code and scripts that I wrote to mess around
and try out some different sorting techniques. You can run them in the directory by
executing them with Node. For example: `node 01_scored_buckets.js`. Most of them turned 
into repeated execution of the algorithm to look at run-time statistics.

## Sorting App

The `src/` directory has the source code I came up with for a step-by-step merge sorter (called `Merger`). 
This lets the sort algorithm pause between iterations and ask the user for their choice between each of the
two options, since they don't have inherent numeric values. There is also a command-line version and a web 
version of an app that wraps the algorithm with a UI to help the user sort their list.

### Usage

Run all unit tests in the project with `npm test`

Build the webapp with `npm run build`, then open the `index.html` in build/ in a browser.
