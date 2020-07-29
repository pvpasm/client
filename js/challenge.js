let editor;
$(document).ready(function () {
    monaco.editor.defineTheme('pvpasm', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '#1c2629', foreground: '#bbe1fa' }],
        colors: {
            'editor.background': '#1c2629',
            'editor.foreground': '#bbe1fa',
            'editorCursor.foreground': '#bbe1fa',
            'editor.lineHighlightBackground': '#000f4c75',
            'editorLineNumber.foreground': '#ccc',
            'editor.selectionBackground': '#883282b8',
            'editor.inactiveSelectionBackground': '#88000015'
        }
    });
    monaco.editor.setTheme('pvpasm');

    editor = monaco.editor.create(document.getElementById('code-editor'), {
        value: [
            'int test() {',
            '\treturn 0;',
            '}'
        ].join('\n'),
        language: 'c',
        theme: "pvpasm",
        fontSize: "16px",
        fontFamily: "Inconsolata",
        scrollbar: {
            // Subtle shadows to the left & top. Defaults to true.
            useShadows: false,
            horizontal: 'visible',

            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
        },
        tabSize: 4,
        autoClosingBrackets: true
    })

    let m_pos_x, m_pos_y;
    function resizeHorizontal(e) {
        e.preventDefault();
        const dx = m_pos_x - e.clientX;
        m_pos_x = e.clientX;
        const leftbox = $('#left-container');
        const rightbox = $('#right-container');
        leftbox.width(leftbox.width() - dx);
        rightbox.width(rightbox.width() + dx);
        editor.layout();
    }

    function resizeRightVertical(e) {
        e.preventDefault();
        const dy = m_pos_y - e.clientY;
        m_pos_y = e.clientY;
        const topbox = $('#notes-box');
        const bottombox = $('#code-editor-box');
        topbox.height(topbox.height() - dy);
        bottombox.height(bottombox.height() + dy);
        editor.layout();
    }

    function resizeLeftVertical(e) {
        e.preventDefault();
        const dy = m_pos_y - e.clientY;
        m_pos_y = e.clientY;
        const graphbox = $('#graph-box');
        const controlbox = $('#control-box');
        graphbox.height(graphbox.height() - dy);
        controlbox.height(controlbox.height() + dy);
    }

    $('#vertical-dragbar').mousedown(function (e) {
        e.preventDefault();
        m_pos_x = e.clientX;
        $(document).mousemove(resizeHorizontal);
    })

    $('#right-horizontal-dragbar').mousedown(function (e) {
        e.preventDefault();
        m_pos_y = e.clientY;
        $(document).mousemove(resizeRightVertical);
    })

    $('#left-horizontal-dragbar').mousedown(function (e) {
        e.preventDefault();
        m_pos_y = e.clientY;
        $(document).mousemove(resizeLeftVertical);
    })

    $(document).mouseup(function (e) {
        $(document).off("mousemove");
    })

    $(document).bind('keydown', function (e) {
        if (e.ctrlKey || e.metaKey && (e.which == 83)) {
            e.preventDefault();
            return false;
        }
    })

    $('#notes-area').bind('keydown', function (e) {
        if (e.which == 9) {
            var val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            this.value = val.substring(0, start) + '\t' + val.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
            return false;
        }
    })

    let params = getParams()
    let mode = params["mode"]
    if (mode != "practice") mode = "learn"

    if (mode == "practice") {
        // TODO: Practice mode
    }
    else {
        let validCategories = ["baby", "carriage", "walking", "hiking"]
        let category = params["category"]
        let level = params["level"]
        if (!validCategories.includes(category)) category = "baby"
        if (isNaN(level)) level = 1
        else level = parseInt(level)
        loadLesson(category, level)

        $('#btn-submit').click((e) => {
            submitCode(category, level, editor.getModel().getValue())
            $('#btn-submit').hide();
            $('.level-config').hide();
            $('#status-msg-box').hide()
            $('#spinner-submit').show();
        })
    }
})

function getParams() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function loadLesson(category, level) {
    $.get(`http://localhost:3000/api/learn/${category}/${level}`, (data) => {
        drawGraph(data["graph"])
        editor.getModel().setValue(data["code"])
        editor.setPosition({ lineNumber: 2, column: 0 });
    })
}

function submitCode(category, level, code) {
    $.post(`http://localhost:3000/api/validate/${category}/${level}`, { "code": code }, (data) => {
        $('#status-msg-content').text(data.msg)
        $('#status-msg-box').show()
        $('#btn-submit').show();
        $('.level-config').show();
        $('#spinner-submit').hide();
    }, "json")
}