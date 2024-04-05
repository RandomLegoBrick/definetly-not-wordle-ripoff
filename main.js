async function getFileContents(fileName) {
    const response = await fetch(fileName);
    if (!response.ok) throw new Error(response.status);
    const contents = await response.text();
  
    return contents;
}

// get wordle_la into array
let wordle_la = (await getFileContents('wordle_la.txt')).split('\n');
let wordle_ta = (await getFileContents('wordle_ta.txt')).split('\n');

function getWord(){
    return wordle_la[Math.floor(Math.random() * wordle_la.length)];
}

function wordIsValid(word){
    return wordle_la.includes(word) || wordle_ta.includes(word);
}

function decorateWord(word){
    var elements = "";
    for(var i = 0; i < word.length; i++){
        let color = "red";
        if(word[i] === selectedWord[i]) {
            color = "green";
        }else if(selectedWord.includes(word[i])){
            color = "yellow"
        }
        
        elements += "<span class='"+color+"'>" + word[i] + "</span>";
    }
    return elements;
}

var selectedWord = getWord();
console.log(selectedWord);

var input = document.getElementById("guess");
var currentGuess = 0;
var won = false;

var guessContainers = (function(){
    var containers = [];
    for(var i = 1; i < 6; i++){
        var container = document.getElementById(i.toString());
        for(var j = 0; j < 5; j++){
            container.innerHTML += "<span>_</span>";
        }
        containers.push(container);
    }
    return containers;
})();


input.addEventListener("keyup", function(event) {
    if(event.key === "Enter"){ 
        var guess = event.target.value;
        
        if(guess.length === 5 && wordIsValid(guess) && currentGuess < 5){
            guessContainers[currentGuess].innerHTML = decorateWord(guess);
            currentGuess ++;
            event.target.value = "";
            if(guess === selectedWord){
                won = true;
                currentGuess = 6;
                document.getElementById("won").style.display = "block";
            }

        }else {
            event.target.style.animation = 'none';
            event.target.offsetHeight;
            event.target.style.animation = "0.5s error forwards";
        }
        
        if(currentGuess >= 5 && !won){
            document.getElementById("lose").style.display = "block";
        }
    }
});
