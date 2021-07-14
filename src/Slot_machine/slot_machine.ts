
import Tween from "./Tween";

export default class Slot_Machine {



    public anims: PIXI.Texture[][];
    public tweens: Tween[];
    public constainerArr: PIXI.Container[];
    public constainer: PIXI.Container;
    public arr: PIXI.AnimatedSprite[][];
    public button: PIXI.Sprite;

    private isStart: boolean;


    constructor() {
        this.isStart = false;
        this.arr = [];
        this.constainerArr = [];
        this.constainer = new PIXI.Container();

        let r1 = new PIXI.Graphics();
        r1.beginFill(0x000000)
        r1.drawRect(50, 350, 500, 300);
        r1.endFill();
        window.app.stage.addChild(r1);

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
            let r = this.arr[i][j].textures;
            this.arr[i][j].textures = this.arr[i][j + 3].textures;
            this.arr[i][j + 3].textures = r;
        }

    }

    newTween(i: number, time: number) {

        let r = this.addTween().addControl(this.constainerArr[i]).do({ y: [100, 400] });
        r.start(300, () => this.change(r, i), -1);
        setTimeout(() => {
            this.stopTween(r)
            if (i == this.constainerArr.length - 1) {
                this.button.interactive = true;
                this.isStart = false;
            }
        },
            time * 1000 + i * 100)
    }

    checkWin() {
        if (!this.isStart) {
            for (let i = 0; i < 3; i++) {
                let isWin: boolean = true;
                let winline = [this.arr[0][6 - this.constainerArr[0].y / 100 - i]];
                for (let j = 0; j < 4; j++) {
                    isWin = this.arr[j][6 - this.constainerArr[j].y / 100 - i].textures === this.arr[j + 1][6 - this.constainerArr[j + 1].y / 100 - i].textures
                    if (!isWin) {
                        break;
                    }
                    winline.push(this.arr[j + 1][6 - this.constainerArr[j + 1].y / 100 - i]);
                }
                if (winline.length >= 2) {
                    for (let e of winline) {
                        e.animationSpeed = 0.1;
                        e.play();

                    }
                }
            }

            let isWin: boolean = true;
            let winline = [this.arr[0][6 - this.constainerArr[0].y / 100 - 2]];
            for (let j = 0; j < 4; j++) {
                isWin = this.arr[j][6 - this.constainerArr[j].y / 100 - Math.abs(2 - j)].textures === this.arr[j + 1][6 - this.constainerArr[j + 1].y / 100 - Math.abs(2 - j - 1)].textures
                if (!isWin) {
                    break;
                }
                winline.push(this.arr[j + 1][6 - this.constainerArr[j + 1].y / 100 - Math.abs(2 - j - 1)]);
            }
            if (winline.length >= 2) {
                for (let e of winline) {
                    e.animationSpeed = 0.1;
                    e.play();

                }
            }

            winline = [this.arr[0][6 - this.constainerArr[0].y / 100 - 0]];

            isWin = true;
            isWin = this.arr[0][6 - this.constainerArr[0].y / 100 - 0].textures === this.arr[1][6 - this.constainerArr[1].y / 100 - 1].textures
            if (isWin) {
                winline.push(this.arr[1][6 - this.constainerArr[1].y / 100 - 1]);
                isWin = this.arr[1][6 - this.constainerArr[1].y / 100 - 1].textures === this.arr[2][6 - this.constainerArr[2].y / 100 - 2].textures;
                if (isWin) {
                    winline.push(this.arr[2][6 - this.constainerArr[2].y / 100 - 2]);
                    isWin = this.arr[2][6 - this.constainerArr[2].y / 100 - 2].textures === this.arr[3][6 - this.constainerArr[3].y / 100 - 1].textures
                    if (isWin) {
                        winline.push(this.arr[3][6 - this.constainerArr[3].y / 100 - 1]);
                        isWin = this.arr[3][6 - this.constainerArr[3].y / 100 - 1].textures === this.arr[4][6 - Math.floor(this.constainerArr[4].y / 100) - 0].textures
                        if (isWin) {
                            winline.push(this.arr[4][6 - Math.floor(this.constainerArr[4].y / 100) - 0]);
                        }
                    }
                }
            }

            if (winline.length >= 2) {
                for (let e of winline) {
                    e.animationSpeed = 0.1;
                    e.play();

                }
            }
        }
    }

    stopTween(e: Tween) {
        this.button.interactive = false;
        e.stop();
        let newY = Math.floor(e.controls[0].y / 100) * 100;
        this.addTween().addControl(e.controls[0]).do({ y: [e.controls[0].y, newY] }, Tween.BackOut).start(1000, this.checkWin.bind(this), 1);
        // this.button.interactive = true;
        // this.button.buttonMode = true;
    }


    onClick(): void {
        this.button.interactive = false;
        let randomTime = Math.random() * (2.1 - 1.5) + 1.5
        for (let i = 0; i < this.constainerArr.length; i++) {
            if (this.constainerArr[i].y != 100 || !this.isStart) {
                let r = this.addTween().addControl(this.constainerArr[i]).do({ y: [this.constainerArr[i].y, 400] })
                setTimeout(() => {
                    r.start(this.getTime(400 - this.constainerArr[i].y), () => { this.change(r, i); this.newTween(i, randomTime) }, 1)
                }, i * 100);
            }
            else {
                this.newTween(i, randomTime);
            }

        }
        this.isStart = true;


    }

    getTime(a: number): number {
        return a * 300 / 300
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
                // for (let i = 1; i <= 10; i++) {
                //     this.anims.push(PIXI.Texture.from(`assets/sym${i}_0.png`))
                // }
                for (let r in resources) {
                    let frames = [];
                    for (var i = 0; i < Object.keys(Object(resources[r]?.textures)).length; i++) {
                        let n = r[14];
                        const val = `${n}_${i}`;
                        frames.push(PIXI.Texture.from(`sym${val}.png`));
                    }
                    this.anims.push(frames);
                }

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
            let random = Math.random().toFixed(6);
            const anim = new PIXI.AnimatedSprite(this.anims[Math.floor(Math.random() * this.anims.length / 2)]);
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

