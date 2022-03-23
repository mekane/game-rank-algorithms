function shuffle(list) {
    const shuffles = list.length * 1.5;
    for (let i = 0; i < shuffles; i++) {
        const index = Math.floor(Math.random() * list.length);
        list.push(list.splice(index, 1)[0]);
    }
}

module.exports = {
    shuffle
}
