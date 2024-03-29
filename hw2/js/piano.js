$(document).ready(async function () {
    await render_whiteBoard(10);
    await render_blackBoard(7);
});

const render_whiteBoard = (num) => {
    let wordArr = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    let whiteBoard = document.getElementById("whiteBoard");
    for(let i=0; i<num; i++){
        let whiteKey = document.createElement("div");
        whiteKey.setAttribute("class", "whiteKey");
        whiteKey.setAttribute("id", "whiteKey" + i);

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
    for(let i=0; i<num; i++){
        let blackKey = document.createElement("div");
        blackKey.setAttribute("class", "blackKey absolute");
        blackKey.setAttribute("id", "blackKey" + i);
        blackKey.style.left = leftOffset + "px";

        let wordDiv = document.createElement("div");
        wordDiv.setAttribute("class", "flex justify-center text-white");
        wordDiv.textContent += wordArr[i];
        blackKey.appendChild(wordDiv);
        blackBoard.appendChild(blackKey);

        if(i == 1 || i == 4){
            leftOffset += whiteKeyWidth * 2;
        }
        else{
            leftOffset += whiteKeyWidth;
        }
    }
}