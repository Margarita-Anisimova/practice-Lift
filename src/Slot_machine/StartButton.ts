import Field from "./Field";
import Slot_Machine from "./Slot_Machine";

export default class StartButton {
    public button: PIXI.Sprite;
    private slot_Machine: Slot_Machine;
    private field: Field;

    constructor(slot_Machine: Slot_Machine) {

        this.slot_Machine = slot_Machine;
        this.field = slot_Machine.field;

        window.app.loader.onComplete.add(this.createButton.bind(this));

    }

    createButton() {
        let button = new PIXI.Sprite(this.slot_Machine.textures.buttonTextures[0]);
        this.button = button;
        button.width = 100;
        button.height = 50;
        button.x = window.app.screen.width / 2 - button.width / 2;
        button.y = 160;
        button.buttonMode = true;
        button.interactive = true;
        button.on('pointerdown', this.onClick.bind(this));
        window.app.stage.addChild(button);
    }

    onClick(): void {
        this.field.winLines.winLines.forEach((e) => e.visible = false);
        this.button.interactive = false;
        this.button.texture = this.slot_Machine.textures.buttonTextures[1];
        let time = Math.random() * (2.1 - 1.5) + 1.5;
        for (let i = 0; i < this.field.columnsArr.length; i++) {
            if (this.field.columnsArr[i].y != 100 || !this.slot_Machine.isRunning) {
                this.slot_Machine.slot_Machine_Tweens.newStartTween(this.field.columnsArr[i], i, time);
            }
            else {
                this.slot_Machine.slot_Machine_Tweens.newBaseTween(this.field.columnsArr[i], i, time);
            }
        }
        this.slot_Machine.isRunning = true;
    }



}