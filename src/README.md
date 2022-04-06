# Source Code

## App

## Console

A console app that reads from a file in the directory called `games.json` and feeds them into the sorter. 
It will prompt the user one-by-one to choose games and sort them as it goes. When finished it prints the sorted list
out.

Run with `node index.js` (make sure you have created a file called `games.json` with your list of games)

### Example games.json file:

```json
[
  { "name":  "Game 1" },
  { "name":  "Game 2" },
  { "name":  "Game 3" }
]
```

## Common

A few simple utility functions for things like shuffling a list or padding a string to a certain width.

## Merger

The core module for the game ranking algorithm. Includes unit tests with pretty good coverage.

### Usage

Use `const { newSort, step } = require('Merger.js')` to import the two methods.

Call `newSort` with the list of games to sort. It returns a state object that includes two
properties of interest: `guess` and `nextComparison`. The `guess` property is an estimate
of how many total choices the user will need to make to rank all the games. `nextComparison`
is an array of two of the games - the next two that the algorithm will be comparing. Whatever
code is using the modules needs to prompt the user for their choice and then call `step` with 
the starting state and the answer.

The second function `step` is used to step one more iteration through the sorting algorithm,
 which will rank the set pair of games. It is called like `step(oldState, answer)` where oldState
is the initial state from `newSort` or the result of a previous call to `step`. The answer argument
should be -1 if the first game was chosen and +1 if the second game was chosen. The `step` function
returns a new state object containing the data for the in-progress sorting algorithm as well as
the next `nextComparison` pair to for the user to rank. Note that there is also a `done` property
which will turn to `true` when the sorting is finished.

Note: each state object is self-contained as is good enough to pick up the ranking from where it 
left off, so you really only need to save the latest object. However, if you keep all of them
in a list you can have trivial 'undo' capabilities by popping the last one off the list.
