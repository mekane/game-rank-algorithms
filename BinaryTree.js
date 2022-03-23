class Node {
    constructor(value) {
        this.left = null
        this.right = null
        this.value = value || null
    }
}


class BinaryTree {
    constructor() {
        this.root = new Node()
    }

    /**
     *
     * @param value Object
     */
    insert(value) {
        if (this.root.value === null) {
            this.root.value = value;
        }
        else {
            if (value.myRank < this.root.value.myRank)
                this.root.left = new Node(value);
            else if (value.myRank > this.root.value.myRank)
                this.root.right = new Node(value);
        }
    }
}

module.exports = {
    BinaryTree
}
