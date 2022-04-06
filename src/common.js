function shuffle(list) {
    const shuffles = list.length * 1.5;
    for (let i = 0; i < shuffles; i++) {
        const index = Math.floor(Math.random() * list.length);
        list.push(list.splice(index, 1)[0]);
    }
}

function pad(value, size) {
    let str = String(value);
    while (str.length < size)
        str = ' ' + str;
    return str;
}

module.exports = {
    pad,
    shuffle
}
