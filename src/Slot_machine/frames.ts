export default class Frames {
    public lineFrames: PIXI.Sprite[][];
    private allFrames: PIXI.Sprite[];

    constructor() {
        this.createFrames();
        this.createLines();
    }

    createLines() {
        for (let i = 2; i >= 0; i--) {
            let arr = [];
            for (let j = 0; j < 5; j++) {
                arr.push(this.allFrames[i * 5 + j])
            }
            this.lineFrames.push(arr);
        }
        let arr = [];
        for (let j = 0; j < 5; j++) {
            arr.push(this.allFrames[0])
            arr.push(this.allFrames[6])
            arr.push(this.allFrames[12])
            arr.push(this.allFrames[8])
            arr.push(this.allFrames[4])
        }
        this.lineFrames.push(arr);
        arr = [];
        for (let j = 0; j < 5; j++) {
            arr.push(this.allFrames[10])
            arr.push(this.allFrames[6])
            arr.push(this.allFrames[2])
            arr.push(this.allFrames[8])
            arr.push(this.allFrames[14])
        }
        this.lineFrames.push(arr);
    }

    createFrames() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                let frame = new PIXI.Sprite();
                frame.width = 100;
                frame.height = 100;
                frame.x = 100 * i + window.app.screen.width / 2 - 200;
                frame.y = j * 100;
                frame.anchor.set(0.5);
                this.allFrames.push(frame);
            }
        }
    }
}