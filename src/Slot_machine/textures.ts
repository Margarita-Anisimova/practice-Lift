export default class Textures {
    public anims: PIXI.Texture[][];
    public buttonTextures: PIXI.Texture[];
    public frameTexture: PIXI.Texture[];

    constructor() {
        this.frameTexture = [];
        this.loadTextures();
        this.anims = [];
        this.buttonTextures = [];
    }

    loadTextures(): void {
        let textures: string[] = [];
        for (let i = 1; i < 10; i++) {
            textures.push(`assets/texture${i}.json`)
        }
        window.app.loader
            .add(textures)
            .load((loader, resources) => {
                for (let r in resources) {
                    let frames = [];
                    for (var i = 0; i < Object.keys(Object(resources[r]?.textures)).length; i++) {
                        let n = r[14];
                        let val = `${n}_${i}`;
                        if (+n >= 6) {
                            val = i <= 9 ? `${n}_0${i}` : `${n}_${i}`
                        }
                        frames.push(PIXI.Texture.from(`sym${val}.png`));
                    }
                    if (frames.length !== 0)
                        this.anims.push(frames);
                }
                this.frameTexture.push(PIXI.Texture.from(`assets/line_1.png`));
                this.frameTexture.push(PIXI.Texture.from(`assets/line_4.png`));
                this.frameTexture.push(PIXI.Texture.from(`assets/line_5.png`));

                this.buttonTextures.push(PIXI.Texture.from(`assets/button_start_stay.png`));
                this.buttonTextures.push(PIXI.Texture.from(`assets/button_start_gray.png`));
            })
    }
}