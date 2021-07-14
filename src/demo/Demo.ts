import { Graphics } from "pixi.js-legacy";
import AbstractState from "./states/AbstractState";
import Idle1 from "./states/Idle1";
import Idle2 from "./states/Idle2";
import Idle3 from "./states/Idle3";
import Rotate from "./states/Rotate";
import Tween from "./Tween";

export default class Demo {
    private _currentState: AbstractState;

    public idle1: AbstractState;
    public idle2: AbstractState;
    public idle3: AbstractState;
    public rotate: AbstractState;

    public background: PIXI.Sprite;
    public anim: PIXI.Sprite;
    public editButton: PIXI.Sprite;

    public tweens: Tween[];

    constructor() {
        this.idle1 = new Idle1(this);
        this.idle2 = new Idle2(this);
        this.idle3 = new Idle3(this);
        this.rotate = new Rotate(this);

        this.tweens = [];

        this.background = this.makeBg();
        this.editButton = this.makeEditBtn();
        this.addFighter();
    }

    set currentState(state: AbstractState) {
        if (this._currentState !== undefined) {
            this._currentState.end();
            console.log(`${this._currentState.name()} ==> ${state.name()}`);
        } else {
            console.log(` ==> ${state.name()}`);
        }
        this._currentState = state;
        this._currentState.start();
    }

    get currentState() {
        return this._currentState;
    }

    buttonClick(): void {
        if (this.currentState === this.rotate) {
            this.currentState = this.idle1
        } else {
            this.currentState = this.rotate;
        }
    }

    start() {
        this.currentState = this.idle1;

        window.app.ticker.add(() => {
            this.update();
        });
    }

    update() {
        if (this.currentState) {
            this.currentState.update();
            for (let i = 0; i < this.tweens.length; i++) {
                this.tweens[i].update(window.app.ticker.elapsedMS);
            }
        }
    }

    makeBg(): PIXI.Sprite {
        const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        bg.width = window.sceneWidth;
        bg.height = window.sceneHeight;
        this.addToStage(bg);
        return bg;
    }

    makeEditBtn(): PIXI.Sprite {
        const btn = new PIXI.Sprite(PIXI.Texture.WHITE);
        btn.width = 100;
        btn.height = 100;
        btn.buttonMode = true;
        btn.interactive = true;
        btn.on('pointerdown', this.buttonClick.bind(this));
        this.addToStage(btn);
        return btn;
    }

    addTween(): Tween {
        const tween = new Tween();
        this.tweens.push(tween);
        return tween;
    }

    addFighter(): void {
        window.app.loader
            .add('assets/fighter.json')
            .load(() => {
                // create an array of textures from an image path
                const frames = [];

                for (let i = 0; i < 30; i++) {
                    const val = i < 10 ? `0${i}` : i;

                    // magically works since the spritesheet was loaded with the pixi loader
                    frames.push(PIXI.Texture.from(`rollSequence00${val}.png`));
                }

                // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
                const anim = new PIXI.AnimatedSprite(frames);
                /*
                 * An AnimatedSprite inherits all the properties of a PIXI sprite
                 * so you can change its position, its anchor, mask it, etc
                 */
                this.anim = anim;
                anim.x = window.app.screen.width / 2;
                anim.y = window.app.screen.height / 2;
                anim.anchor.set(0.5);
                anim.animationSpeed = 0.5;
                anim.play();
                this.addToStage(anim);
                this.addTween().addControl(anim).do({ x: [100, 1200] }, Tween.ElasticOut).start(3000, undefined, -1);


                // let er = new Graphics();
                // er.lineStyle(5, 0x000000, 1);
                // er.moveTo(0, 700);
                // er.lineTo(1500, 700);
                // er.endFill();
                // this.addToStage(er);
                // let d = new Graphics();
                // d.beginFill(0x000000);
                // d.drawCircle(100, 50, 40);
                // d.endFill();
                // this.addToStage(d);
                // this.h = 0;
                // this.interval = setInterval(() => {

                //     this.addTween().addControl(d).do({ y: [ this.h, 600] }, Tween.CubicIn).start(500, undefined, 1);
                //     this.h += 80
                //     if ( this.h >= 600) {
                //         clearInterval(this.interval);
                //         this.tweens = [];
                //     }
                //     setTimeout(() => {
                //         let r = this.addTween().addControl(d).do({ y: [600,  this.h] }, Tween.CubicOut);
                //         r.start(500, undefined, 1);
                //     }, 500);
                // }, 1000);
                // setTimeout(() => {
                //     this.addTween().addControl(d).do({ x: [0, 1500] }).start(7000, undefined, 1);
                // }, 1000);




            });
    }

    addToStage(element: PIXIElement) {
        window.app.stage.addChild(element);
    }
}