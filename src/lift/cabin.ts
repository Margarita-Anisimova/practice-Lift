
import Lift from "./Lift";

export default class Cabin {
    public cabin: PIXI.Graphics;
    public door: PIXI.Graphics;
    private lift: Lift;
    public rope: PIXI.Graphics;


    constructor(lift: Lift) {
        this.lift = lift;
        this.draw();
    }

    draw(): void {
        this.cabin = new PIXI.Graphics();
        this.cabin.lineStyle(2, 0x000000, 1);
        this.cabin.beginFill(0x3d3d4a);
        this.cabin.drawRect(0, 0, 80, 100);
        this.cabin.endFill();
        this.cabin.y = this.lift.buttons[this.lift.buttons.length - 1].button.y;


        let p = new PIXI.Graphics();
        p.lineStyle(5, 0x000000, 1);
        p.moveTo(0, 0);
        p.lineTo(80, 0);

        this.rope = new PIXI.Graphics();
        this.rope.lineStyle(4, 0x000000);
        this.rope.moveTo(this.cabin.width / 2 - 0.5, 0);
        this.rope.lineTo(this.cabin.width / 2 - 0.5, this.cabin.y);
        this.rope.zIndex = -1;

        this.door = new PIXI.Graphics();
        this.door.beginFill(0xff0000);
        this.door.drawRect(this.cabin.width / 2 - 2, 0, 4, 100);
        this.door.endFill();
        this.cabin.addChild(this.door);
        this.lift.scene.addChild(this.rope);
        this.lift.scene.addChild(this.cabin);
        this.lift.scene.addChild(p);
    }
}