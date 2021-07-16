
import StartButton from "./StartButton";
import Field from "./Field";
import Slot_Machine_Tweens from "./Slot_Machine_Tweens";
import Textures from "./textures";

export default class Slot_Machine {
    public startButton: StartButton;
    public field: Field;
    public slot_Machine_Tweens: Slot_Machine_Tweens;
    public isRunning: boolean;
    public textures: Textures;

    constructor() {
        this.textures = new Textures();
        this.isRunning = false;
        this.field = new Field(this);
        this.startButton = new StartButton(this);
        this.slot_Machine_Tweens = new Slot_Machine_Tweens(this);

    }

    addLine(lineNumber: number) {
        this.field.winLines.winLines[lineNumber].visible = true;
    }

    startАnimation(winLine: PIXI.AnimatedSprite[], lineNumber: number) {
        if (winLine.length >= 3) {

            for (let e of winLine) {
                e.animationSpeed = 0.1// 0.3;
                e.play();
            }
            this.addLine(lineNumber);
        }
    }

    private getRoundedColPosition(i: number): number {
        return Math.round(this.field.columnsArr[i].y / 100) || 1;
    }

    private getSpritePos(columnNumber: number, d: number) {
        return 6 - this.getRoundedColPosition(columnNumber) - d
    }

    checkRows() {
        for (let i = 2; i >= 0; i--) {
            let isWin: boolean = true;
            let winLine: PIXI.AnimatedSprite[] = [this.field.spritesArr[0][this.getSpritePos(0, i)]];
            for (let j = 0; j < 4; j++) {
                isWin = winLine[0].textures === this.field.spritesArr[j + 1][this.getSpritePos(j + 1, i)].textures
                if (!isWin) {
                    break;
                }
                winLine.push(this.field.spritesArr[j + 1][this.getSpritePos(j + 1, i)]);
            }
            this.startАnimation(winLine, 2 - i);

        }
    }

    checkLine1() {
        let isWin: boolean = true;
        let winLine = [this.field.spritesArr[0][this.getSpritePos(0, 2)]];
        for (let j = 0; j < 4; j++) {
            isWin = winLine[0].textures === this.field.spritesArr[j + 1][this.getSpritePos(j + 1, Math.abs(2 - j - 1))].textures
            if (!isWin) {
                break;
            }
            winLine.push(this.field.spritesArr[j + 1][this.getSpritePos(j + 1, Math.abs(2 - j - 1))]);
        }
        this.startАnimation(winLine, 3);
    }

    checkLine2() {
        let winLine = [this.field.spritesArr[0][this.getSpritePos(0, 0)]];

        let isWin = true;
        isWin = winLine[0].textures === this.field.spritesArr[1][this.getSpritePos(1, 1)].textures
        if (isWin) {
            winLine.push(this.field.spritesArr[1][this.getSpritePos(1, 1)]);
            isWin = winLine[0].textures === this.field.spritesArr[2][this.getSpritePos(2, 2)].textures;
            if (isWin) {
                winLine.push(this.field.spritesArr[2][this.getSpritePos(2, 2)]);
                isWin = winLine[0].textures === this.field.spritesArr[3][this.getSpritePos(3, 1)].textures
                if (isWin) {
                    winLine.push(this.field.spritesArr[3][this.getSpritePos(3, 1)]);
                    isWin = winLine[0].textures === this.field.spritesArr[4][this.getSpritePos(4, 0)].textures
                    if (isWin) {
                        winLine.push(this.field.spritesArr[4][this.getSpritePos(4, 0)]);
                    }
                }
            }
        }
        this.startАnimation(winLine, 4);
    }

    checkWin() {
        if (this.isRunning) {
            return;
        }
        this.checkRows();
        this.checkLine1();
        this.checkLine2();

    }
}

