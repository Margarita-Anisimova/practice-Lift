
import Tween from "./Tween";

export default class Slot_Machine {
    public anims: PIXI.Texture[];
    public tweens: Tween[];
    public constainerArr: PIXI.Container[];
    public constainer: PIXI.Container;
    public arr: PIXI.Sprite[][];
    public button: PIXI.Sprite;

    constructor() {
        this.arr = [];
        this.constainerArr = [];
        this.constainer = new PIXI.Container();


        window.app.stage.addChild(this.constainer);
        let button = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.button = button;
        button.width = 50;
        button.height = 50;
        button.x = 700;
        button.y = 70;
        button.buttonMode = true;
        button.interactive = true;
        button.on('pointerdown', this.onClick.bind(this));
        window.app.stage.addChild(button);

        this.anims = [];
        this.tweens = [];
        this.addTextures();

        window.app.ticker.add(() => {
            for (let i = 0; i < this.tweens.length; i++) {
                this.tweens[i].update(window.app.ticker.elapsedMS);
            }
        });
    }
    change(tween: Tween, i: number) {
        tween.controls[0].y = 100;
        for (let j = 0; j < 3; j++) {
            let r = this.arr[i][j].texture;
            this.arr[i][j].texture = this.arr[i][j + 3].texture;
            this.arr[i][j + 3].texture = r;
        }

    }

    newTween(i: number) {
        let r = this.addTween().addControl(this.constainerArr[i]).do({ y: [100, 400] });
        r.start(1000, () => this.change(r, i), -1);
        setTimeout(() => {
            this.stopTween(r)
        },
            1000 + i * 1000)
    }

    stopTween(e: Tween) {
        e.stop();
        let newY = Math.ceil(e.controls[0].y / 100) * 100;
        // this.addTween().addControl(e.controls[0]).do({ y: [e.controls[0].y, newY] }, Tween.ElasticOut).start(3000, undefined, 1);
        this.button.interactive = true;
    }


    onClick(): void {
        this.button.interactive = false;
        for (let i = 0; i < this.constainerArr.length; i++) {
            if (this.constainerArr[i].y != 100) {
                let r = this.addTween().addControl(this.constainerArr[i]).do({ y: [this.constainerArr[i].y, 400] })
                r.start(this.getTime(400 - this.constainerArr[i].y), () => { this.change(r, i); this.newTween(i) }, 1);
            }
            else {
                this.newTween(i);
            }
        }

    }

    getTime(a: number): number {
        return a * 1000 / 300
    }

    addTween(): Tween {
        const tween = new Tween();
        this.tweens.push(tween);
        return tween;
    }

    addTextures(): void {
        let r: string[] = [];
        for (let i = 1; i < 6; i++) {
            r.push(`assets/texture${i}.json`)
        }
        window.app.loader
            .add(r)
            .load((loader, resources) => {
                for (let i = 1; i <= 5; i++) {
                    this.anims.push(PIXI.Texture.from(`assets/sym${i}_0.png`))
                }
                // for (let r in resources) {
                //     let frames = [];
                //     for (var i = 0; i < Object.keys(Object(resources[r]?.textures)).length; i++) {
                //         let n = r[14];
                //         const val = `${n}_${i}`;
                //         frames.push(PIXI.Texture.from(`sym${val}.png`));
                //     }
                //     this.anims.push(frames);
                // }

                let r = new PIXI.Graphics();
                r.lineStyle(4, 0x000000, 1);
                r.drawRect(50, 350, 500, 300);

                let r1 = new PIXI.Graphics();
                r1.lineStyle(4, 0xFFFF00, 1);
                r1.drawRect(50, 350, 500, 300);
                window.app.stage.addChild(r1);
                for (let i = 0; i < 5; i++) {
                    let col: PIXI.Container = this.createCol();
                    col.x = 100 * i + 100;
                    col.y = 100;
                    this.constainerArr.push(col);
                    //window.app.stage.addChild(col);
                    this.constainer.addChild(col);
                    col.mask = r;
                }
            })
    }

    createCol(): PIXI.Container {
        let col: PIXI.Container = new PIXI.Container();
        let t = [];
        for (let j = 0; j < 6; j++) {
            const anim = new PIXI.Sprite(this.anims[Math.floor(Math.random() * this.anims.length / 2)]);
            anim.width = 100;
            anim.height = 100;
            anim.x = 0;
            anim.y = j * 100;
            anim.anchor.set(0.5);
            col.addChild(anim);
            t.push(anim);
        }
        this.arr.push(t);
        return col;
    }
}

