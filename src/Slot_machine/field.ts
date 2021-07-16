import Slot_Machine from "./Slot_Machine";
import WinLines from "./WinLines";

export default class Field {
    public columnsArr: PIXI.Container[];
    public commonContainer: PIXI.Container;
    public spritesArr: PIXI.AnimatedSprite[][];
    private slot_Machine: Slot_Machine;
    public winLines: WinLines;


    constructor(slot_Machine: Slot_Machine) {
        this.slot_Machine = slot_Machine;
        this.spritesArr = [];
        this.columnsArr = [];
        this.commonContainer = new PIXI.Container();
        this.createMask();
        window.app.loader.onComplete.add(this.fillField.bind(this));
    }

    createMask() {
        let mask = new PIXI.Graphics();
        mask.lineStyle(1, 0x000000, 1);
        mask.drawRect(window.app.screen.width / 2 - 250, 350, 500, 300);
        this.commonContainer.mask = mask;
    }

    createBackground() {
        let g = new PIXI.Graphics();
        g.beginFill(0x000000)
        g.drawRect(window.app.screen.width / 2 - 250, 350, 500, 300);
        g.endFill();
        window.app.stage.addChild(g);
    }

    fillField() {
        this.createBackground();
        for (let i = 0; i < 5; i++) {
            let col: PIXI.Container = this.createColumn();
            col.x = 100 * i + window.app.screen.width / 2 - 200;
            col.y = 100;
            this.columnsArr.push(col);
            this.commonContainer.addChild(col);
        }
        window.app.stage.addChild(this.commonContainer);

        let frame = new PIXI.Graphics();
        frame.lineStyle(4, 0xFFFF00, 1);
        frame.drawRect(window.app.screen.width / 2 - 250, 350, 500, 300);
        window.app.stage.addChild(frame);

        this.winLines = new WinLines(this.slot_Machine);
    }

    createColumn(): PIXI.Container {
        let col: PIXI.Container = new PIXI.Container();
        let arrPict = [];
        for (let j = 0; j < 6; j++) {
            let random = Math.random().toFixed(6);
            const anim = new PIXI.AnimatedSprite(this.slot_Machine.textures.anims[Math.floor(Math.random() * this.slot_Machine.textures.anims.length)]);
            anim.width = 100;
            anim.height = 100;
            anim.x = 0;
            anim.y = j * 100;
            anim.anchor.set(0.5);
            col.addChild(anim);
            arrPict.push(anim);
        }
        this.spritesArr.push(arrPict);
        return col;
    }

    change(i: number) {
        this.columnsArr[i].y = 100;
        for (let j = 0; j < 3; j++) {
            this.spritesArr[i][j + 3].textures = this.spritesArr[i][j].textures;
            this.spritesArr[i][j].textures = this.slot_Machine.textures.anims[Math.floor(Math.random() * this.slot_Machine.textures.anims.length)];
        }

    }
}