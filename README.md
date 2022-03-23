# Game Ranker

Inspired by Pub Meeple, I wanted to play around with the sorting algorithm for ranking a set of games.
It's an interesting problem to me because I'm really into board games and rankings, and also I'm a
software engineer with a computer science degree.

It seems like an odd kind of sorting problem right off the bat since you're showing the user two choices
and asking them to pick which one they like better, and doing that until the list is "sorted". So you're
actually trying to discover the values to sort by while you're sorting. But as long as the user chooses 
consistently the list will be sorted and the values will "appear". I think though that some algorithms might
not work for this since you need to know if they are larger or smaller than a specific value and all we can 
ever do is compare two items relative to each other. (Maybe that does work - need to read up more on algorithms)

## 01 Scored Buckets Sort

Not sure if this one has a real name or not, but you take the list and go through it in sequence. You compare each one
and the winner gets +1 score while the loser gets -1 score. Then group the items into buckets based on their score.
Next iteration repeat this process for each bucket, adjusting scores pair-by-pair. Keep doing this until all the buckets
are size 1 (the number of buckets == the length of the initial list). At first this seemed like it would settle out
quickly and perform well, but after simulating it I noticed that it works well at first but then starts to churn as the
scores fluctuate up and down in the middle. It seems predictable but it can take a while to settle out and it gets a lot
worse as the list grows.

