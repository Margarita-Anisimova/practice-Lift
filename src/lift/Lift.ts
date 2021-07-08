import Cabin from "./cabin";
import Button from "./button";
import LiftLogic from "./liftLogic";

export default class Lift {
    public cabin: Cabin;
    public buttons: Button[];
    public logic: LiftLogic;
    public floorsCount: number;
    public scene: PIXI.Container;

    constructor() {

        this.scene = this.createScene();
        window.app.stage.addChild(this.scene);
        this.scene.sortableChildren = true;

        this.floorsCount = 5;
        this.buttons = this.createButton();

        this.cabin = new Cabin(this);
        this.logic = new LiftLogic(this);
    }

    createScene(): PIXI.Container {
        let r = new PIXI.Container();
        r.width = 500;
        r.height = 500;
        r.x = window.app.screen.width / 2 - 250;
        r.y = window.app.screen.height / 2 - 250;
        return r;
    }

    createButton(): Button[] {
        let result: Button[] = [];
        for (let i = 0; i < this.floorsCount; i++) {
            result.push(new Button(this, i))
        }
        return result;
    }
}