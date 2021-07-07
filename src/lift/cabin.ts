import Lift from "./Lift";

export default class Cabin {
    public cabin: PIXI.Graphics;
    public door: PIXI.Graphics;
    public lift: Lift;

    constructor(lift: Lift) {
        this.lift = lift;
        this.draw();
    }

    draw(): void {
        this.cabin = new PIXI.Graphics();
        this.cabin.beginFill(0x3d3d4a);
        this.cabin.drawRect(0, 0, 80, 100);
        this.cabin.y = this.lift.buttons[this.lift.buttons.length - 1].button.y;
        this.cabin.endFill();

        this.door = new PIXI.Graphics();
        this.door.beginFill(0xff0000);
        this.door.drawRect(this.cabin.width / 2 - 4 / 2, 0, 4, 100);
        this.door.endFill();
        this.cabin.addChild(this.door);
        this.lift.scene.addChild(this.cabin);
    }
}