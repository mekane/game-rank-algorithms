# Game Ranker

Inspired by Pub Meeple, I wanted to play around with the sorting algorithm for ranking a set of games.
It's an interesting problem to me because I'm really into board games and rankings, and also I'm a
software engineer with a computer science degree.

It seems like an odd kind of sorting problem right off the bat since you're showing the user two choices
and asking them to pick which one they like better, and doing that until the list is "sorted". So you're
actually trying to discover the values to sort by while you're sorting. But as long as the user chooses 
consistently the list will be sorted and the values will "appear". Any comparison sort should work for
this purpose, and ideally we want to optimize for fewest number of comparisons.

It appears that the best algorithms are O(n log(n)) for comparisons, and best case requires at least log(n!).

## 01 Scored Buckets Sort

Not sure if this one has a real name or not, but you take the list and go through it in sequence. You compare each one
and the winner gets +1 score while the loser gets -1 score. Then group the items into buckets based on their score.
Next iteration repeat this process for each bucket, adjusting scores pair-by-pair. Keep doing this until all the buckets
are size 1 (the number of buckets == the length of the initial list). At first this seemed like it would settle out
quickly and perform well, but after simulating it I noticed that it works well at first but then starts to churn as the
scores fluctuate up and down in the middle. It seems predictable but it can take a while to settle out and it gets a lot
worse as the list grows.

| # items | steps | comparisons |
|---------|-------|-------------|
| 4, 5 | 4 | 5 |
| 6, 7 | 8 | 14 |
| 8, 9 | 12 | 30 |
| 10, 11 | 18 | 55 |
| 12, 13 | 26 | 91 |
| 14, 15 |  34 | 140 |
| 18, 19 | 54 | 285 |
| 50 | 390 | 5525 |
| 100 | 1520 | 42925 |

This is pretty bad: steps is O(n^2 / 6.25) and comparisons is O(n^3 / 23)
Ideally we especially want good performance on the comparisons since those will be direct user actions.

## 02 Tree Sort

It seems like a tree sort should be among the most efficient, and I wanted to try writing one. Hacked together
my own version. Made a class to hold the data, unit tested it, and wrote a script to insert
a bunch of different lists of varying lengths into the tree. Averaged the data and confirmed
that the number of comparisons required is O(N log N).

The tree sort works great and was surprisingly easy to make work, especially once I got a nice data structure
to work with. I think it would be a pain to utilize within a web app though. You'd have to break up the insertion
algorithm and be able to jump in and out of it to get comparison results. And the sorting down the tree would mean
each time you added / ranked a new game you'd always start with the first one you added and follow a predictable path.
This might not be so bad, but I can see it being nice to switch up the order and be able to compare the games in a 
more "random" order. The tree would also need to be balanced to avoid a super lopsided and wonky setup, if you happened
to rank your favorite or least-favorite game first, for example.

## 03 Interruptable Merge Sort

Pub Meeple said on Twitter that they use a merge sort. I looked at the alorithm and it's quite straightforward.
Also similar to what I was imagining with my original attempt, except that it combines into pairs and then
compares pairwise, wheras I was doing general group. Anyway I don't feel like I need to code up my own basic
merge sort because I understand how it works. What I'm interested here is code that will do a merge sort but
can start and stop / be interrupted at any point during the algorithm. The motivation for this is to make it
work within a web app and be able to receive user input for the comparisons. It should be fine to use a promise
to await the answer to a given comparison, but the user could also close the window at any time, so it would be
great to keep the state in local storage so they can come back to it. And also it would be slick to use a redux-style
pattern to allow undo / redo.

So this means we need a data structure that holds the current lists being sorted, the indexes we're trying to compare
at, and some notion of the "answer" to a given comparison. I imagine a dictionary of pairs would be cool, to have a
permanent record of the answers, but might not be necessary. Then we need a "next step" function that takes the state
and does the next step of the loop on it. Will need a fairly small list of data points and a manual step-through of the
sort algorithm to test against.

Read up on iterative merge sort, which is what I want - a non-recursive version. Messed around
with it on paper since most of the explanations get real obtuse real fast. They all start out
with a very generic description and then jump immediately to defining variables called 
L, R, m, n, i, j, A, and B without explaining what those are for. Very annoying.

Made a file called iterativeMergeSort with a test file just to build the function to do
it so I get a good grip on the loops. Then I'll be able to build the step-by-step state of doing it.

