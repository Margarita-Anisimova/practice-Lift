import Lift from "./Lift";

export default class Button {
    public readonly number: number;
    public button: PIXI.Sprite;
    private lift: Lift;
    public floor: PIXI.Container;

    constructor(lift: Lift, number: number) {
        this.number = number;
        this.lift = lift;
        this.draw()
    }

    draw() {
        this.floor = new PIXI.Container();
        let texture = PIXI.Texture.from('assets/floor1.png');
        let background = new PIXI.Sprite(texture);
        background.position.set(100, this.number * 100 + 10 * this.number);
        background.width = 300;
        background.height = 100;

        this.button = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.button.width = 30;
        this.button.height = 30;
        this.button.x = 100;
        this.button.y = this.number * 100 + 10 * this.number;
        this.button.buttonMode = true;
        this.button.interactive = true;
        this.button.on('pointerdown', this.onClick.bind(this));

        let text = new PIXI.Text((5 - this.number).toString(), { fontFamily: 'Calibri', fontSize: 15, fill: 0x000000 });

        this.button.addChild(text);
        this.floor.addChild(background);
        this.floor.addChild(this.button);
        this.lift.scene.addChild(this.floor);
        //window.app.stage.addChild(this.button);
    }

    onClick(): void {

        this.lift.logic.buttonClick(this);
    }
}