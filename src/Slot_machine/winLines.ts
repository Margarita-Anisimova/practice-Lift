import Slot_Machine from "./Slot_Machine";

export default class WinLines {

    public winLines: PIXI.Sprite[];
    private winLinesCont: PIXI.Container;
    private slot_Machine: Slot_Machine;

    constructor(slot_Machine: Slot_Machine) {
        this.slot_Machine = slot_Machine;
        this.winLinesCont = new PIXI.Container();
        this.winLines = [];

        this.createWinLines();
        window.app.stage.addChild(this.winLinesCont);
    }

    createWinLines() {
        this.winLinesCont.height = 300;
        this.winLinesCont.position.set(window.app.screen.width / 2, 500);
        for (let i = 0; i < 5; i++) {
            let frame = new PIXI.Sprite(i <= 2 ? this.slot_Machine.textures.frameTexture[0] : this.slot_Machine.textures.frameTexture[i - 2]);
            frame.width = 500;
            frame.x = 0;
            frame.y = i <= 2 ? i * 100 - 100 : 0;
            frame.anchor.set(0.5);
            this.winLinesCont.addChild(frame);
            this.winLines.push(frame);
            frame.visible = false;

        }
    }


}