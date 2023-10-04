var listOfColors = ["green", "red", "yellow", "blue"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;
$(document).keypress(() => {
    if (!started) {
        gameStart();
        started = true;
    }
})
$(".btn").click(function () {
    if (started) {
        userClickedPattern.push(this.id);
        btnSelectedAnimation(this.id);
        playAudio(this.id);
        console.log("user " + userClickedPattern);
        checkAnswer(level - 1);
    }
});
// check answer
function checkAnswer(currentLeverl) {
    if (gamePattern[currentLeverl] === userClickedPattern[currentLeverl]) {
        console.log("equal");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => gameStart(), 1000);
        }
    } else {
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 50);
        headTitleChanger("game over click any key to start");
        started = false;
    }
}

// Start game
function gameStart() {
    level++;
    headTitleChanger("Level " + level);
    var randomColor = listOfColors[randromNumbers()];
    gamePattern.push(randomColor);
    btnRandomClick(randomColor);
    console.log(gamePattern);
}

// Randrom numbers generator from 0 - 3 = 4
function randromNumbers() {
    return Math.floor(Math.random() * 4);
}

// Head title changer by taking the text 
function headTitleChanger(headerText) {
    $("h1").text(headerText);
}
// btn randrom selected animation by taking id
function btnRandomClick(id) {
    $("#" + id).removeClass(id);
    setTimeout(() => $("#" + id).addClass(id), 50);
    playAudio(id);
}
// btn Selected action animation
function btnSelectedAnimation(id) {
    $("#" + id).addClass("pressed")
    setTimeout(() => $("#" + id).removeClass("pressed"), 100);
}
// find what button clicked
function btnClick(id) {
    playAudio(id);
    btnSelectedAnimation(id);
}
// Audio file location of the clicked button
function play(color) {
    var audioPath = "./sounds/";
    switch (color) {
        case 'blue': return audioPath + color + ".mp3";
            break;
        case 'yellow': return audioPath + color + ".mp3";
            break;
        case 'red': return audioPath + color + ".mp3";
            break;
        case 'green': return audioPath + color + ".mp3";
            break;
        default:
            return audioPath + "wrong.mp3";
    }
}
// Play Audio by taking btn id
function playAudio(id) {
    // play takes the color id and return the file location of audio
    audio(play(id));
}
// Its play audio by taking the audio file location
function audio(fileLocation) {
    var audioObject = new Audio(fileLocation);
    audioObject.play();
}