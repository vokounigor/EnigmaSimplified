let rotor1 = new Rotor(0, 1);
let rotor2 = new Rotor(1, 2);
let rotor3 = new Rotor(2, 3);
const reflector = [[0, 21], [1, 10], [2, 22], [3, 17], [4, 6], [5, 8], [6, 4], [7, 19], [8, 5], [9, 25], [10, 1], [11, 20], [12, 18], [13, 15], [14, 16], [15, 13], [16, 14], [17, 3], [18, 12], [19, 7], [20, 11], [21, 0], [22, 2], [23, 24], [24, 23], [25, 9]];
const letterOrder = "qwertyuiopasdfghjklzxcvbnm";


function reflect(input, go) {
    if (go) {
        return reflector[input][1];
    } else {
        return reflector[input][0];
    }
}

function runEnigma(letter) {
    let input = letterOrder.indexOf(letter);

    let currNum = input;
    currNum = rotor1.advance(currNum, true);
    currNum = rotor2.advance(currNum, true);
    currNum = rotor3.advance(currNum, true);
    currNum = reflect(currNum, true);
    currNum = rotor3.advance(currNum, false);
    currNum = rotor2.advance(currNum, false);
    currNum = rotor1.advance(currNum, false);
    moveRotor();
    return letterOrder.charAt(currNum);

}


function moveRotor() {
    rotor1.pos++;
    if (rotor1.pos == 26) {
        rotor1.pos = 0;
        rotor2.pos++;
        if (rotor2.pos == 26) {
            rotor2.pos = 0;
            rotor3.pos++;
            if (rotor3.pos == 26) {
                rotor3.pos = 0;
            }
        }
    }

    updateRotors();
}

function updateRotors() {
    for (let i = 1; i < 4; i++) {

        const rotor = document.querySelector('.rotor' + i);
        const next_num = rotor.childNodes[1];
        const curr_num = rotor.childNodes[3];
        const prev_num = rotor.childNodes[5];
        whichRotor(i, next_num, curr_num, prev_num);
    }

}

function whichRotor(i, next_num, curr_num, prev_num) {
    if (i == 1) {
        curr_num.innerHTML = rotor1.pos;
        prev_num.innerHTML = rotor1.pos - 1 < 0 ? 26 : rotor1.pos - 1;
        next_num.innerHTML = rotor1.pos + 1 > 26 ? 0 : rotor1.pos + 1;
    } else if (i == 2) {
        curr_num.innerHTML = rotor2.pos;
        prev_num.innerHTML = rotor2.pos - 1 < 0 ? 26 : rotor2.pos - 1;
        next_num.innerHTML = rotor2.pos + 1 > 26 ? 0 : rotor2.pos + 1;
    } else if (i == 3) {
        curr_num.innerHTML = rotor3.pos;
        prev_num.innerHTML = rotor3.pos - 1 < 0 ? 26 : rotor3.pos - 1;
        next_num.innerHTML = rotor3.pos + 1 > 26 ? 0 : rotor3.pos + 1;
    }
}


window.onload = () => {

    function listenKey(btn) {
        const pressed = btn.keyCode;

        if ((pressed >= 65 && pressed <= 90) || (pressed >= 97 && pressed <= 122)) {
            const letter = String.fromCharCode(pressed).toLowerCase();
            const output = runEnigma(letter);
            const elem = document.getElementById(output);
            elem.classList.add("pressed");
            setTimeout(() => {
                elem.classList.remove("pressed");
            }, 700);
        } else {
            return;
        }
    }


    window.addEventListener('keypress', listenKey);
    updateRotors();

    const r1 = document.querySelector('.rotor1');
    r1.addEventListener('click', () => {
        moveRotor();
    });

}
