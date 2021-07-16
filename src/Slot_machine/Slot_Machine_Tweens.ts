
import Tween from "./Tween";
import Slot_Machine from "./Slot_Machine";

export default class Slot_Machine_Tweens {
    public tweens: Tween[];
    private slot_Machine: Slot_Machine;
    private speed: number = 300;

    constructor(slot_Machine: Slot_Machine) {
        this.tweens = [];
        this.slot_Machine = slot_Machine;

        window.app.ticker.add(() => {
            for (let i = 0; i < this.tweens.length; i++) {

                this.tweens[i].update(window.app.ticker.elapsedMS);
                if (this.tweens[i].finished) {
                    this.tweens.splice(i, 1);
                }
            }
        });
    }

    addTween(): Tween {
        const tween = new Tween();
        this.tweens.push(tween);
        return tween;
    }

    newBaseTween(control: PIXI.Container, columnNumber: number, time: number) {
        let tween = this.addTween().addControl(control).do({ y: [100, 400] });
        tween.start(this.speed, () => this.slot_Machine.field.change(columnNumber), -1);
        setTimeout(() => {
            this.newStopTween(tween)
            if (columnNumber === this.slot_Machine.field.columnsArr.length - 1) {
                this.slot_Machine.startButton.button.interactive = true;
                this.slot_Machine.startButton.button.texture = this.slot_Machine.textures.buttonTextures[0];
                this.slot_Machine.isRunning = false;
                this.slot_Machine.checkWin();
            }
        }, time * 1000 + columnNumber * 100)
    }

    newStartTween(control: PIXI.Container, columnNumber: number, time: number) {
        let callback = () => {
            this.slot_Machine.field.change(columnNumber);
            this.newBaseTween(control, columnNumber, time)
        };
        let tween = this.addTween().addControl(control).do({ y: [control.y, 400] })
        setTimeout(() => {
            tween.start(this.getTime(400 - control.y), callback, 1)
        }, columnNumber * 100);
    }

    newStopTween(tween: Tween) {
        tween.stop();
        let newY = Math.floor(tween.controls[0].y / 100) * 100;
        this.addTween().addControl(tween.controls[0]).do({ y: [tween.controls[0].y, newY] }, Tween.BackOut).start(500, undefined, 1);
    }

    getTime(a: number): number {
        return a * this.speed / 300
    }
}