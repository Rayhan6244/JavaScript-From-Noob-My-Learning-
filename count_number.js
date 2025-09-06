const decreseBtn = document.getElementById("decreseBtn");
const resetBtn = document.getElementById("resetBtn");
const increseBtn = document.getElementById("increseBtn");
const countLabel = document.getElementById("countLabel");

let count = Number(localStorage.getItem('count')) || 0;
countLabel.textContent = count;

function updateAndSaveCount(newValue) {
    count = newValue;
    countLabel.textContent = count;
    localStorage.setItem('count', count);
}

increseBtn.onclick = function() {
    updateAndSaveCount(count + 1);
}
decreseBtn.onclick = function() {
    updateAndSaveCount(count - 1);
}
resetBtn.onclick = function() {
    updateAndSaveCount(0);
}
