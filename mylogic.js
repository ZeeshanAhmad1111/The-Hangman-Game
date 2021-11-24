"use strict";

const alphabets = document.querySelector(".alphabet");
const hinthidden = document.querySelector(".hint_hidden");
const hintmessage = document.querySelector(".hint_message");
const wordhidden = document.querySelector(".word_hidden");
const remlife = document.querySelector(".rem_life");
const hintbtn = document.querySelector(".hint_btn");
const resetbtn = document.querySelector(".reset_btn");
const notification = document.querySelector(".notif");
const result = document.querySelector(".res");
const corword = document.querySelector(".cor_word");
const playagain = document.querySelector(".play_again");

let letters;
let lifes;

const words = new Map([
    ["Apple", "Fruits"],
    ["Hulk", "Movies"],
    ["Delhi", "Places"],
]);

const words_list = [...words.keys()];

const getrandomword = function(list) {
    return list[Math.floor(Math.random() * words_list.length)];
}

let select_word;
let select_words;
alphabets.innerHTML = "";

const init = function(state) {
    if (state === "start") {
        for (const i of "abcdefghijklmnopqrstuvwxyz") {
            const html = `<button class="alpha">${i.toUpperCase()}</button>`;
            alphabets.insertAdjacentHTML('beforeend', html);
        }
    } else if (state === "reset") {
        letters.forEach(btn => {
            btn.classList.remove("disabled");
        });
    }

    hinthidden.classList.add("hidden");
    notification.classList.add("hidden");

    lifes = 8;

    letters = document.querySelectorAll(".alpha");
    remlife.textContent = lifes;

    select_words = getrandomword(words_list);
    select_word = select_words.toLowerCase();
    wordhidden.innerHTML = "";
    for (let i = 0; i < select_word.length; i++) {
        const html = `<p class="word">_</p>`;
        wordhidden.insertAdjacentHTML('beforeend', html);
    }
};

init("start");

const shownotif = function(msg) {
    notification.classList.remove("hidden");
    corword.textContent = `You ${msg}`;
    result.textContent = select_word;
};

const decreaselife = function() {
    lifes--;
    remlife.textContent = lifes;
    if (lifes === 0) {
        shownotif("Lost");
    }
};

const getindexes = function(letter) {
    let indexes = [];
    [...select_word].forEach((val, i) => {
        if (val === letter) {
            const index = i;
            indexes.push(index);
        }
    });
    return indexes;
};

const checkWord = function() {
    let val = true;
    for (let i = 0; i < wordhidden.children.length; i++) {
        if (wordhidden.children[i].textContent === "_") {
            val = false;
        }
    }
    return val;
};

const letterpress = function() {
    const letter = this.textContent.toLowerCase();
    if (select_word.includes(letter)) {
        const indexes_list = getindexes(letter);
        indexes_list.forEach((val, i) => {
            wordhidden.children[val].textContent = this.textContent;
        });
        if (checkWord()) shownotif("Won");
    } else {
        decreaselife();
    }
    this.classList.add("disabled");
};

letters.forEach(btn => {
    btn.addEventListener('click', letterpress);
});

hintbtn.addEventListener("click", function() {
    hinthidden.classList.remove("hidden");
    hintmessage.textContent = words.get(select_words);
});

resetbtn.addEventListener("click", function() {
    init("reset");
});

playagain.addEventListener("click", function() {
    init("reset");
});