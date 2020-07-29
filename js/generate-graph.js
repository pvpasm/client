const fn = "foo";
class Block {
    constructor(ops, isTop) {
        this.ops = ops;
        this.branch_true = null;
        this.branch_false = null;
        this.branch_always = null;
        this.dim = { x: 300, y: 210 };
        this.isTop = isTop;

        var maxlen = this.ops.slice().sort(function (a, b) { return b.length - a.length; })[0].length;
        this.dim.y = (this.ops.length + 1) * 24;
        this.dim.x = Math.max(this.dim.y + 30, maxlen * 10 + 20);
    }

    connect_true(toBlock) {
        this.branch_true = toBlock;
        if (toBlock.pos) return;
        toBlock.pos = {
            x: this.pos.x - 50 - this.dim.x / 2,
            y: this.pos.y + this.dim.y + 50
        };
    }

    connect_false(toBlock) {
        this.branch_false = toBlock;
        if (toBlock.pos) return;
        toBlock.pos = {
            x: this.pos.x + 50 + this.dim.x / 2,
            y: this.pos.y + this.dim.y + 50
        };
    }

    connect_always(toBlock) {
        this.branch_always = toBlock;
        if (toBlock.pos) return;
        toBlock.pos = {
            x: this.pos.x,
            y: this.pos.y + this.dim.y + 50
        };
    }

    draw() {
        createRect(this.pos, this.dim);
        if (this.isTop)
            createText({ x: this.pos.x - this.dim.x / 2 + 15, y: this.pos.y + 30 }, `${fn}:`, "graph-fn-name");
        this.ops.forEach(function (line, idx,) {
            var i = idx + (this.isTop ? 1 : 0);
            createText({ x: this.pos.x - this.dim.x / 2 + 15, y: this.pos.y + 30 + i * 20 }, line);
        }, this);

        if (this.branch_true) {
            connectBlocks(this, this.branch_true, "green");
        }

        if (this.branch_false) {
            connectBlocks(this, this.branch_false, "red");
        }

        if (this.branch_always) {
            connectBlocks(this, this.branch_always, "blue");
        }
    }
}

var svgNS = "http://www.w3.org/2000/svg";
function createText(pos, val, classes) {
    var text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", pos.x);
    text.setAttribute("y", pos.y);
    text.setAttribute("class", "graph-text " + classes);
    var textNode = document.createTextNode(val);
    text.appendChild(textNode);
    document.getElementById('graph-view').appendChild(text);
}

function createRect(pos, dim) {
    var rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", pos.x - dim.x / 2);
    rect.setAttribute("y", pos.y);
    rect.setAttribute("width", dim.x);
    rect.setAttribute("height", dim.y);
    rect.setAttribute("class", "graph-block");
    document.getElementById('graph-view').appendChild(rect);
}

function createLine(start, end, classes, marker) {
    var line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", start.x);
    line.setAttribute("y1", start.y);
    line.setAttribute("x2", end.x);
    line.setAttribute("y2", end.y);
    line.setAttribute("class", "graph-arrow " + classes);
    if (marker)
        line.setAttribute("marker-end", `url(#${marker})`);
    document.getElementById('graph-view').appendChild(line);
}

function connectBlocks(fromBlock, toBlock, color) {
    var fromPos = fromBlock.pos, toPos = toBlock.pos;
    if (fromPos.y < toPos.y) {
        if (fromPos.x > toPos.x) connectLeftDown(fromBlock, toBlock, color);
        else if (fromPos.x < toPos.x) connectRightDown(fromBlock, toBlock, color);
        else connectStraightDown(fromBlock, toBlock, color);
    }
    else {
        if (fromPos.x < toPos.x) connectLeftUp(fromBlock, toBlock, color);
        else connectRightUp(fromBlock, toBlock, color);
    }
}

function connectLeftDown(fromBlock, toBlock, color) {
    var startOffsetX = -15;
    createLine({ x: fromBlock.pos.x + startOffsetX, y: fromBlock.pos.y + fromBlock.dim.y + 1 }, { x: fromBlock.pos.x - 15, y: (fromBlock.pos.y + fromBlock.dim.y + toBlock.pos.y) / 2 }, `graph-${color}-arrow`, null);
    createLine({ x: fromBlock.pos.x + startOffsetX, y: (fromBlock.pos.y + fromBlock.dim.y + toBlock.pos.y) / 2 - 1 }, { x: toBlock.pos.x, y: (fromBlock.pos.y + fromBlock.dim.y + toBlock.pos.y) / 2 }, `graph-${color}-arrow`, null);
    createLine({ x: toBlock.pos.x, y: (fromBlock.pos.y + fromBlock.dim.y + toBlock.pos.y) / 2 }, { x: toBlock.pos.x, y: toBlock.pos.y - 7 }, `graph-${color}-arrow`, `graph-${color}-arrowhead`);
}

function connectRightDown(fromBlock, toBlock, color) {
    var startOffsetX = 15;
    createLine({ x: fromBlock.pos.x + startOffsetX, y: fromBlock.pos.y + fromBlock.dim.y + 1 }, { x: fromBlock.pos.x + startOffsetX, y: (fromBlock.pos.y + fromBlock.dim.y + toBlock.pos.y) / 2 }, `graph-${color}-arrow`, null);
    createLine({ x: fromBlock.pos.x + startOffsetX, y: (fromBlock.pos.y + fromBlock.dim.y + toBlock.pos.y) / 2 - 1 }, { x: toBlock.pos.x, y: (fromBlock.pos.y + fromBlock.dim.y + toBlock.pos.y) / 2 }, `graph-${color}-arrow`, null);
    createLine({ x: toBlock.pos.x, y: (fromBlock.pos.y + fromBlock.dim.y + toBlock.pos.y) / 2 }, { x: toBlock.pos.x, y: toBlock.pos.y - 7 }, `graph-${color}-arrow`, `graph-${color}-arrowhead`);
}

function connectStraightDown(fromBlock, toBlock, color) {
    createLine({ x: fromBlock.pos.x, y: fromBlock.pos.y + fromBlock.dim.y + 1 }, { x: toBlock.pos.x, y: toBlock.pos.y - 7 }, `graph-${color}-arrow`, `graph-${color}-arrowhead`);
}

function connectLeftUp(fromBlock, toBlock, color) {
    createLine({ x: fromBlock.pos.x - 15, y: fromBlock.pos.y + fromBlock.dim.y + 1 }, { x: fromBlock.pos.x - 15, y: fromBlock.pos.y + fromBlock.dim.y + 20 }, `graph-${color}-arrow`, null);
    createLine({ x: fromBlock.pos.x - 15, y: fromBlock.pos.y + fromBlock.dim.y + 19 }, { x: fromBlock.pos.x - fromBlock.dim.x / 2 - 30, y: fromBlock.pos.y + fromBlock.dim.y + 20 }, `graph-${color}-arrow`, null);
    createLine({ x: fromBlock.pos.x - fromBlock.dim.x / 2 - 30, y: fromBlock.pos.y + fromBlock.dim.y + 21 }, { x: fromBlock.pos.x - fromBlock.dim.x / 2 - 30, y: toBlock.pos.y - 21 }, `graph-${color}-arrow`, null);
    createLine({ x: fromBlock.pos.x - fromBlock.dim.x / 2 - 30, y: toBlock.pos.y - 20 }, { x: toBlock.pos.x, y: toBlock.pos.y - 20 }, `graph-${color}-arrow`, null);
    createLine({ x: toBlock.pos.x, y: toBlock.pos.y - 20 }, { x: toBlock.pos.x, y: toBlock.pos.y }, `graph-${color}-arrow`, `graph-${color}-arrowhead`);
}

function connectRightUp(fromBlock, toBlock, color) {
    createLine({ x: fromBlock.pos.x + 15, y: fromBlock.pos.y + fromBlock.dim.y + 1 }, { x: fromBlock.pos.x + 15, y: fromBlock.pos.y + fromBlock.dim.y + 20 }, `graph-${color}-arrow`, null);
    createLine({ x: fromBlock.pos.x + 15, y: fromBlock.pos.y + fromBlock.dim.y + 19 }, { x: fromBlock.pos.x + fromBlock.dim.x / 2 + 50, y: fromBlock.pos.y + fromBlock.dim.y + 20 }, `graph-${color}-arrow`, null);
    createLine({ x: fromBlock.pos.x + fromBlock.dim.x / 2 + 50, y: fromBlock.pos.y + fromBlock.dim.y + 21 }, { x: fromBlock.pos.x + fromBlock.dim.x / 2 + 50, y: toBlock.pos.y - 21 }, `graph-${color}-arrow`, null);
    createLine({ x: fromBlock.pos.x + fromBlock.dim.x / 2 + 50, y: toBlock.pos.y - 20 }, { x: toBlock.pos.x, y: toBlock.pos.y - 20 }, `graph-${color}-arrow`, null);
    createLine({ x: toBlock.pos.x, y: toBlock.pos.y - 20 }, { x: toBlock.pos.x, y: toBlock.pos.y }, `graph-${color}-arrow`, `graph-${color}-arrowhead`);
}

function drawGraph(graph) {
    var startX = $('#graph-view').parent().width() / 2;
    var startY = $('#graph-view').parent().height() / 10;

    let blocks = []
    for (var i = 0; i < graph.length; ++i) {
        var block_json = graph[i]
        blocks.push(new Block(block_json.ops, i == 0))
    }
    blocks[0].pos = { x: startX, y: startY };
    for (var i = 0; i < graph.length; ++i) {
        if (graph[i].fail) {
            blocks[i].connect_true(blocks[graph[i].jump])
            blocks[i].connect_false(blocks[graph[i].fail])
        }
        else if (graph[i].jump) {
            blocks[i].connect_always(blocks[graph[i].jump])
        }
    }
    for (var i = 0; i < graph.length; ++i) {
        blocks[i].draw()
    }

    function panGraph(e) {
        const dx = m_pos_x - e.clientX;
        const dy = m_pos_y - e.clientY;
        m_pos_x = e.clientX;
        m_pos_y = e.clientY;
        const graphview = $('#graph-view');
        const offset = graphview.offset();
        graphview.offset({ top: offset.top - dy, left: offset.left - dx });
    }

    let overText = false;
    $('rect').hover(
        function (e) {
            overText = true;
        }, function (e) {
            overText = false;
        }
    );

    $('text').hover(
        function (e) {
            overText = true;
        }, function (e) {
            overText = false;
        }
    );

    $('#graph-view').mousedown(function (e) {
        if (overText) return;
        var currentCursor = $(this).css('cursor');
        m_pos_x = e.clientX;
        m_pos_y = e.clientY;
        $(document).mousemove(panGraph);
    })
}