

var colors = [];

var squares = document.querySelectorAll(".square");
var solutionH1 = document.querySelector("#solution");
var messageDisplay = document.querySelector("#messageDisplay");
var header = document.querySelector("#header");
var resetButton = document.querySelector("#reset");
var solution;
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var onEasy = false;

resetButton.addEventListener("click", reset);

easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	onEasy = true;
	reset();
});

hardBtn.addEventListener("click", function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	onEasy = false;
	reset();
});

function randomColorGenerator(numOfColor) {
	colors = [];
	for (var i = 0; i < numOfColor; i++) {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		colors.push("rgb(" + r + ", " + g + ", " + b + ")");
	}
}

function setColor() {
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
	solution = squares[Math.floor(Math.random() * colors.length)];
	solutionH1.textContent = solution.style.backgroundColor;
}

function reset() {
	if (onEasy) {
		randomColorGenerator(3);
		setColor();
	} else {
		randomColorGenerator(6);
		setColor();
	}
	messageDisplay.textContent = "";
	resetButton.textContent = "New Color";
	header.style.backgroundColor = "#4070A5";
}

randomColorGenerator(6);
setColor();

for (var i = 0; i < colors.length; i++) {
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.backgroundColor;

		if (clickedColor == solution.style.backgroundColor) {
			messageDisplay.textContent = "Correct";
			answeredCorrect();
		} else {
			messageDisplay.textContent = "Incorrect";
			this.style.backgroundColor = "#232323";
		}
	});
}


function answeredCorrect() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = solution.style.backgroundColor;
	}
	resetButton.textContent = "Play Again?";
	header.style.backgroundColor = solution.style.backgroundColor
}