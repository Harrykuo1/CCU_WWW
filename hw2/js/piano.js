$(document).ready(function () {
    initVariable();
    renderWhiteBoard(10);
    renderBlackBoard(7);
});

const initVariable = () => {
    window.volume = 0.5;
    window.recordArr = [];
    window.isRecording = false;
    window.canPressed = true;
    window.isPlayingAll = false;
    window.whiteKeyWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--whiteKey-width'));
    window.blackKeyWidth = window.whiteKeyWidth * 2 / 3;
    window.whiteKeyWord = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    window.blackKeyWord = ['w', 'e', 't', 'y', 'u', 'o', 'p'];
    window.keyDict = {};
    window.pressedKeys = {};
    window.pressedKeysOnce = {};
}

const renderWhiteBoard = (num) => {
    let whiteBoard = document.getElementById("whiteBoard");
    for(let i=0; i<num; i++) {
        let whiteKey = document.createElement("div");
        whiteKey.setAttribute("class", "whiteKey");
        whiteKey.setAttribute("id", "whiteKey" + i);

        whiteKey.addEventListener('mousedown', () => {
            if (pressedKeys[i]) return;
            pressedKeys[i] = true;
            startMusic(window.whiteKeyWord[i]);
        });
        whiteKey.addEventListener('mouseup', () => {
            delete pressedKeys[i];
            endMusic(window.whiteKeyWord[i]);
        });

        wordDiv = renderWordDiv(window.whiteKeyWord[i], true)
        whiteKey.appendChild(wordDiv);
        whiteBoard.appendChild(whiteKey);

        keyDict[window.whiteKeyWord[i]] = ["white", i];
    }
}

const renderBlackBoard = (num) => {
    let leftOffset = whiteKeyWidth * 2 / 3;
    let blackBoard = document.getElementById("blackBoard");
    for(let i=0; i<num; i++) {
        let blackKey = document.createElement("div");
        blackKey.setAttribute("class", "blackKey absolute");
        blackKey.setAttribute("id", "blackKey" + i);
        blackKey.style.left = leftOffset + "px";

        blackKey.addEventListener('mousedown', () => {
            if (pressedKeys[i]) return;
            pressedKeys[i] = true;
            startMusic(window.blackKeyWord[i]);
        });
        blackKey.addEventListener('mouseup', () => {
            delete pressedKeys[i];
            endMusic(window.blackKeyWord[i]);
        });

        wordDiv = renderWordDiv(window.blackKeyWord[i], false)
        blackKey.appendChild(wordDiv);
        blackBoard.appendChild(blackKey);

        keyDict[window.blackKeyWord[i]] = ["black", i];

        if(i == 1 || i == 4) {
            leftOffset += whiteKeyWidth * 2;
        }
        else {
            leftOffset += whiteKeyWidth;
        }
    }
}

const renderWordDiv = (word, isWhiteKey) => {
    let wordDiv = document.createElement("div");
    if(isWhiteKey){
        wordDiv.setAttribute("class", "flex justify-center text-black");
    }
    else{
        wordDiv.setAttribute("class", "flex justify-center text-white");
    }
    wordDiv.textContent += word;
    return wordDiv;
}

document.addEventListener('keydown', async function(event) {
    let eventKey = event.key.toLowerCase()
    if (pressedKeysOnce[eventKey]) return;
    pressedKeys[eventKey] = true;
    pressedKeysOnce[eventKey] = true;
    startMusic(eventKey);
    await sleep(1);
    delete pressedKeys[eventKey];
    console.log("d " + eventKey)
});

document.addEventListener('keyup', function(event) {
    let eventKey = event.key.toLowerCase()
    delete pressedKeys[eventKey];
    delete pressedKeysOnce[eventKey];
    endMusic(eventKey);
});

const playMusic = (path) => {
    var audio = new Audio(path);
    audio.volume = window.volume;
    audio.play();
}

const startMusic = (word, fromPlayAll=false) => {
    if(window.keyDict.hasOwnProperty(word) && (window.canPressed || fromPlayAll)) {
        color = keyDict[word][0];
        keyIdx = keyDict[word][1];
        key = document.getElementById(color + "Key" + keyIdx)
        key.classList.add(color + "KeyClick");
        playMusic('sound/' + word + '.wav');
        if(window.isRecording) {
            if(Object.keys(window.pressedKeys).length == 1){
                window.recordArr.push([]);
            }
            window.recordArr[window.recordArr.length - 1].push(word)
        }
    }
}

const endMusic = (word, fromPlayAll=false) => {
    if(window.keyDict.hasOwnProperty(word) && (window.canPressed || fromPlayAll)) {
        color = keyDict[word][0];
        keyIdx = keyDict[word][1];
        key = document.getElementById(color + "Key" + keyIdx)
        key.classList.remove(color + "KeyClick");
    }
}

const setVolume = (volume) => {
    window.volume = volume / 100.0;
};

const setIsRecording = (cb) => {
    if(cb.checked) {
        window.isRecording = true;
    }
    else {
        window.isRecording = false;
    }
}

const playAll = async () => {
    if(window.isPlayingAll){
        return;
    }
    window.isPlayingAll = true;
    window.canPressed = false
    let originStatus = window.isRecording
    window.isRecording = false;
    for (const wordSet of window.recordArr) {
        for(const word of wordSet){
            startMusic(word, true);
        }
        await sleep(350);
        for(const word of wordSet){
            endMusic(word, true);
        }
    }
    window.isRecording = originStatus;
    window.canPressed = true;
    window.isPlayingAll = false;
};

const delRecordingArr = () => {
    window.recordArr = []
}

const clears = () => {
    alert("已清空");
    delRecordingArr();
}
  
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}