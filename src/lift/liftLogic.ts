import Lift from "./Lift";
import Button from "./button";

enum DoorsState { 'Opening' = 1, 'Closed' = -1, 'stop' = 0 }

export default class LiftLogic {
    private lift: Lift;
    private DoorsState: DoorsState;
    private doors: boolean;
    private task: Button | undefined;
    private inWay: boolean;
    public queue: Map<number, Button>;
    public queue2: Map<number, Button>;
    private liftSpeed: number = 900;
    private doorsSpeed: number = 700;


    constructor(lift: any) {
        this.lift = lift;
        this.start();
        this.DoorsState = DoorsState.Opening;
        this.queue = new Map<number, Button>();
        this.queue2 = new Map<number, Button>();
        this.inWay = true;
        this.doors = false;
        this.task = this.lift.buttons[lift.floorsCount - 1];
    }


    buttonClick(button: Button) {
        button.button.tint = 0xfff200;
        if (this.lift.cabin.cabin.y < button.button.y || this.inWay === true) {
            this.queue.set(button.number, button);
        }
        else {
            this.queue2.set(button.number, button);
        }
    }

    start() {
        window.app.ticker.add((d) => {
            if (!this.doors) {
                if (this.queue.size == 0 && this.task?.number != 4) {
                    this.buttonClick(this.lift.buttons[this.lift.floorsCount - 1]);
                }
                let arr = Array.from(this.queue.entries()).sort((a, b) => a[0] - b[0]);
                this.task = arr.length != 0 ? arr[0][1] : this.task;
                if (this.task) {
                    this.moveCabin(d);
                }
            } else {
                this.moveDoor(d);
                this.queue.delete(this.task!.number);
            }
        })
    }

    moveCabin(d: number) {
        if (this.inWay && this.queue.size != 0) {
            if (this.lift.cabin.cabin.y < this.task!.button.y) {
                this.updateLiftInNeedFloor();
                this.inWay = this.task?.number != 4 ? false : true;
            }
            this.lift.cabin.cabin.y = this.lift.cabin.cabin.y - d / 1000 * this.liftSpeed;
            this.drawNewRope();
        }
        else if (this.lift.cabin.cabin.y > this.task!.button.y) {
            this.updateLiftInNeedFloor();
            if (this.task!.number === this.lift.floorsCount - 1) {
                this.queue = this.queue2;
                this.queue2 = new Map<number, Button>();
                this.inWay = true;
            }
        } else if (!this.inWay) {
            this.lift.cabin.cabin.y = this.lift.cabin.cabin.y + d / 1000 * this.liftSpeed;
            this.drawNewRope();
        }
    }

    drawNewRope() {
        this.lift.scene.removeChild(this.lift.cabin.rope);
        this.lift.cabin.rope = new PIXI.Graphics();
        this.lift.cabin.rope.lineStyle(4, 0x000000);
        this.lift.cabin.rope.moveTo(this.lift.cabin.cabin.width / 2 - 0.5, 0);
        this.lift.cabin.rope.lineTo(this.lift.cabin.cabin.width / 2 - 0.5, this.lift.cabin.cabin.y);
        this.lift.cabin.rope.zIndex = -1;
        this.lift.scene.addChild(this.lift.cabin.rope);
    }

    updateLiftInNeedFloor() {
        this.lift.cabin.cabin.y = this.task!.button.y;
        this.drawNewRope();
        this.task!.button.tint = 0x05ff0d;
        this.task!.button.interactive = false;
        this.doors = true;
    }

    moveDoor(d: number) {
        if (this.lift.cabin.door.width >= 76) {
            this.createNewDoor(d, 76);
            setTimeout(() => this.DoorsState = DoorsState.Closed, 1000)
        }
        this.createNewDoor(d);

        if (this.lift.cabin.door.width <= 4) {
            this.task!.button.tint = 0xffffff;
            this.task!.button.interactive = true;
            this.doors = false;
            this.createNewDoor(d, 4);
            this.DoorsState = DoorsState.Opening;
        }
    }

    createNewDoor(d: number, width: number = -1): void {
        let doorWidth = this.lift.cabin.door.width;
        let speed = d / 1000 * this.doorsSpeed * this.DoorsState;
        if (width === -1) {
            width = speed + doorWidth;
        }
        this.lift.cabin.door = new PIXI.Graphics();
        this.lift.cabin.door.beginFill(0xff0000);
        this.lift.cabin.door.drawRect(this.lift.cabin.cabin.width / 2 - (doorWidth + speed) / 2, 0, width, 100);
        this.lift.cabin.door.endFill();
        this.lift.cabin.cabin.removeChildAt(0);
        this.lift.cabin.cabin.addChild(this.lift.cabin.door);
    }


}