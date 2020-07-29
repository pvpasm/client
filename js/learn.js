$(document).ready(() => {
    $.get("http://localhost:5000/api/learn/metadata", (data) => {
        populateChallList("baby", data["baby"])
        populateChallList("carriage", data["carriage"])
        populateChallList("walking", data["walking"])
        populateChallList("hiking", data["hiking"])
    })
})

function populateChallList(category, num) {
    for (var i = 0; i < num; ++i) {
        $(`#learn-${category}-list`).append(`<div class="learn-btn">${i + 1}</div>`)
    }
}