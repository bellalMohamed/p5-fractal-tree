function Branch (a, b) {
    this.start = a;
    this.end = b;
    this.drawn = false;
    this.branched = false;
    this.show = function () {
        if (this.drawn) {
            return;
        }
        stroke(255);

        line(this.start.x, this.start.y, this.end.x, this.end.y)
        this.drawn = true;
    }

    this.branch = function (direction) {
        if (this.branched) {
            return;
        }
        this.branched;
        let dir = p5.Vector.sub(this.end, this.start);
        dir.rotate(PI / 4 * direction);
        // dir.mult(this.getRnd(.67, .7))
        dir.mult(.67)
        let newEnd = p5.Vector.add(this.end, dir);
        let branch = new Branch(this.end, newEnd);
        return branch;
    }

    this.getRnd = function (min, max) {
        return (Math.random() * (max - min)) + min;
    }
}

function mousePressed() {
    for (var i = tree.length - 1; i >= 0; i--) {
        if (tree[i].branched) {
            continue;
        }
        tree.push(tree[i].branch(1))
        // tree.push(tree[i].branch(-1.4))
        // tree.push(tree[i].branch(0.1))
        tree.push(tree[i].branch(-1))
        tree[i].branched = true;
    }
}

var tree = [];

function setup() {
    createCanvas(400, 400);
    background(100);
    let a = createVector(width / 2, height);
    let b = createVector(width / 2, height - 100);

    var root = new Branch(a, b);
    tree[0] = root;
}

function draw() {
    for (var i = 0; i < tree.length; i++) {
        tree[i].show();
    }
}
