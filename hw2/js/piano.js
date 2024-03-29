$(document).ready(async function () {
    await render_whiteBoard(10);
    await render_blackBoard(7);
    window.volume = 0.5;
});

const playMusic = (path) => {
    var audio = new Audio(path);
    audio.volume = window.volume;
    audio.play();
}

const startMusic = (key, word, isWhiteKey) => {
    if(isWhiteKey){
        key.classList.add('whiteKeyClick');
    }
    else{
        key.classList.add('blackKeyClick');
    }
    playMusic('sound/' + word + '.wav');
}

const endMusic = (key, isWhiteKey) => {
    if(isWhiteKey){
        key.classList.remove('whiteKeyClick');
    }
    else{
        key.classList.remove('blackKeyClick');
    }
}

const render_whiteBoard = (num) => {
    let wordArr = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    let whiteBoard = document.getElementById("whiteBoard");
    for(let i=0; i<num; i++) {
        let whiteKey = document.createElement("div");
        whiteKey.setAttribute("class", "whiteKey");
        whiteKey.setAttribute("id", "whiteKey" + i);

        whiteKey.addEventListener('mousedown', () => {
            startMusic(whiteKey, wordArr[i], true);
        });
        whiteKey.addEventListener('mouseup', () => {
            endMusic(whiteKey, true);
        });

        let wordDiv = document.createElement("div");
        wordDiv.setAttribute("class", "flex justify-center text-black");
        wordDiv.textContent += wordArr[i];
        whiteKey.appendChild(wordDiv);

        whiteBoard.appendChild(whiteKey);
    }
}

const render_blackBoard = (num) => {
    let wordArr = ['w', 'e', 't', 'y', 'u', 'o', 'p'];
    let whiteKeyWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--whiteKey-width'));
    let blackKeyWidth = whiteKeyWidth * 2 / 3;
    let leftOffset = whiteKeyWidth * 2 / 3;
    let blackBoard = document.getElementById("blackBoard");
    for(let i=0; i<num; i++) {
        let blackKey = document.createElement("div");
        blackKey.setAttribute("class", "blackKey absolute");
        blackKey.setAttribute("id", "blackKey" + i);
        blackKey.style.left = leftOffset + "px";

        blackKey.addEventListener('mousedown', () => {
            startMusic(blackKey, wordArr[i], false);
        });
        blackKey.addEventListener('mouseup', () => {
            endMusic(blackKey, false);
        });

        let wordDiv = document.createElement("div");
        wordDiv.setAttribute("class", "flex justify-center text-white");
        wordDiv.textContent += wordArr[i];
        blackKey.appendChild(wordDiv);
        blackBoard.appendChild(blackKey);

        if(i == 1 || i == 4) {
            leftOffset += whiteKeyWidth * 2;
        }
        else {
            leftOffset += whiteKeyWidth;
        }
    }
}

document.addEventListener('keydown', function(event) {
    let whiteWordArr = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    let blackWordArr = ['w', 'e', 't', 'y', 'u', 'o', 'p'];

    keyIdx = whiteWordArr.indexOf(event.key)
    if(keyIdx != -1){
        whiteKey = document.getElementById("whiteKey" + keyIdx);
        startMusic(whiteKey, event.key, true);
    }

    keyIdx = blackWordArr.indexOf(event.key)
    if(keyIdx != -1){
        blackKey = document.getElementById("blackKey" + keyIdx);
        startMusic(blackKey, event.key, false);
    }
});

document.addEventListener('keyup', function(event) {
    let whiteWordArr = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    let blackWordArr = ['w', 'e', 't', 'y', 'u', 'o', 'p'];

    keyIdx = whiteWordArr.indexOf(event.key)
    if(keyIdx != -1){
        whiteKey = document.getElementById("whiteKey" + keyIdx);
        endMusic(whiteKey, true);
    }

    keyIdx = blackWordArr.indexOf(event.key)
    if(keyIdx != -1){
        blackKey = document.getElementById("blackKey" + keyIdx);
        endMusic(blackKey, false);
    }
});

const setVolume = (volume) => {
    window.volume = volume / 100.0;
};