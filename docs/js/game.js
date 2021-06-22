import { Hook } from "./Hook.js";
import { Level } from "./Level.js";
import { Character } from "./Character.js";
import { Belt as Belt } from "./Belt.js";
class Game {
    constructor() {
        this.levels = [];
        this.belts = [];
        this.characters = [];
        this.currentLevel = 0;
        this.previousLevel = 0;
        this.clickHandler = (e) => {
            this.hook.shootHook(e.clientX, e.clientY);
            let target = e.target;
            if (target.id == "true") {
                this.currentLevel += 1;
                this.displayText(true);
                this.createLevel(this.levels[this.currentLevel]);
            }
            else {
                this.displayText(false);
            }
        };
        this.levels.push(new Level("B_s", "u", ["a", "t", "h", "u", "x"]), new Level("T_s", "a", ["r", "a", "i", "u", "v"]), new Level("P_n", "e", ["h", "f", "e", "o", "a"]), new Level("G_m", "u", ["p", "u", "o", "i", "q"]), new Level("t_st", "e", ["e", "u", "g", "i", "q"]));
        this.wordElement = document.createElement("wordElement");
        document.body.appendChild(this.wordElement);
        this.icon = document.createElement("icon" + this.currentLevel);
        this.icon.classList.add("icon");
        this.wordElement.appendChild(this.icon);
        document.body.addEventListener("click", this.clickHandler);
        if (this.currentLevel == 0) {
            this.spawnElement = document.querySelector('charcontainer' + this.currentLevel);
            this.createLevel(this.levels[this.currentLevel]);
        }
        for (let i = 0; i < 5; i++) {
            if (i % 2 == 0) {
                this.belts.push(new Belt(i * 50, true));
            }
            else {
                this.belts.push(new Belt(i * 50, false));
            }
        }
        this.hook = new Hook;
        this.gameloop();
    }
    gameloop() {
        for (const character of this.characters) {
            for (const belt of this.belts) {
                if (this.checkOnBelt(character.getBoundingRect(), belt.getBoundingRect())) {
                    character.onBelt = true;
                }
                else {
                    character.onBelt = false;
                }
            }
            character.update();
        }
        requestAnimationFrame(() => this.gameloop());
    }
    createLevel(level) {
        this.deletePreviousLevel();
        length = level.possibilities.length;
        this.currentWordText = document.createElement("currentWordText" + this.currentLevel);
        this.currentWordText.innerText = level.word;
        this.wordElement.appendChild(this.currentWordText);
        for (let i = 0; i < length; i++) {
            let randomValue = Math.floor(Math.random() * level.possibilities.length);
            if (level.possibilities.length > 0) {
                let c = level.possibilities.splice(randomValue, 1);
                if (c[0] == level.correctAnswer) {
                    this.characters.push(new Character(c[0], true, this.currentLevel, i));
                }
                else {
                    this.characters.push(new Character(c[0], false, this.currentLevel, i));
                }
            }
        }
    }
    deletePreviousLevel() {
        if (this.currentLevel > 0) {
            this.previousLevel = this.currentLevel - 1;
            let previousWordText = document.querySelector("currentWordText" + this.previousLevel);
            this.wordElement.removeChild(previousWordText);
            for (let i = 0; i < this.characters.length; i++) {
                this.characters[i].removePreviousCharacters(this.previousLevel);
            }
            this.characters = [];
        }
    }
    displayText(correct) {
        if (correct) {
            this.icon.classList.remove("incorrect");
            this.icon.classList.add("correct");
            this.icon.innerText = "";
            this.icon.innerText = "correct";
        }
        else {
            this.icon.classList.remove("correct");
            this.icon.classList.add("incorrect");
            this.icon.innerText = "";
            this.icon.innerText = "incorrect";
        }
    }
    checkOnBelt(characterCollider, beltCollider) {
        return Boolean(characterCollider.bottom <= beltCollider.top && beltCollider.top <= characterCollider.bottom);
    }
}
new Game();
//# sourceMappingURL=game.js.map