import Textures from "./textures";

export default class Field {
    public columnsArr: PIXI.Container[];
    public commonContainer: PIXI.Container;
    public spritesArr: PIXI.AnimatedSprite[][];
    public textures: Textures;

    public winLines: PIXI.Sprite[];
    public winLinesCont: PIXI.Container;

    constructor() {
        this.textures = new Textures();
        this.spritesArr = [];
        this.columnsArr = [];
        this.commonContainer = new PIXI.Container();


        let mask = new PIXI.Graphics();
        mask.lineStyle(1, 0x000000, 1);
        mask.drawRect(window.app.screen.width / 2 - 250, 350, 500, 300);
        this.commonContainer.mask = mask;
        //this.createBackground();
        window.app.loader.onComplete.add(this.fillField.bind(this));

        // this.fillField();
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


        this.winLinesCont = new PIXI.Container();
        // this.winLinesCont.width = 400;
        this.winLinesCont.height = 300
        this.winLines = [];
        this.winLinesCont.position.set(window.app.screen.width / 2, 500);
        for (let i = 0; i < 5; i++) {
            let frame = new PIXI.Sprite(i <= 2 ? this.textures.frameTexture[0] : this.textures.frameTexture[i - 2]);
            frame.width = 500;
            frame.x = 0;
            frame.y = i <= 2 ? i * 100 - 100 : 0;
            frame.anchor.set(0.5);
            this.winLinesCont.addChild(frame);
            this.winLines.push(frame);
            frame.visible = false;

        }
        window.app.stage.addChild(this.winLinesCont);

    }

    createColumn(): PIXI.Container {
        let col: PIXI.Container = new PIXI.Container();
        let arrPict = [];
        for (let j = 0; j < 6; j++) {
            let random = Math.random().toFixed(6);
            const anim = new PIXI.AnimatedSprite(this.textures.anims[Math.floor(Math.random() * this.textures.anims.length)]);
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
        //tween.controls[0].y = 100;
        this.columnsArr[i].y = 100;
        for (let j = 0; j < 3; j++) {
            let r = this.spritesArr[i][j].textures;
            this.spritesArr[i][j].textures = this.spritesArr[i][j + 3].textures;
            this.spritesArr[i][j + 3].textures = r;
        }

    }
}