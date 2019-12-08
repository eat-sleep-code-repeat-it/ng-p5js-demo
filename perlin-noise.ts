import * as p5 from 'p5';

// https://youtu.be/BjoM9oKOAKY
// https://github.com/shiffman?tab=repositories
// https://codepen.io/Jobarbo/pen/EmvEgv
export class PerlinNoise {
    w = 100;
    h = 100;
    private p: p5;

    yoff = 0.0;
    constructor(ww, hh, pp: p5) {
        this.w = ww;
        this.h = hh;
        this.p = pp;
    }
    render(dimension: number = 1) {
        const alpha = 10;
        const bcolor = this.p.color(120, 130, 130, alpha);
        this.p.background(bcolor); // 120, 130, 130, 1);

        const color = this.p.color(50, 30, 200, 1);
        this.p.fill(color);

        // We are going to draw a polygon out of the wave points
        this.p.beginShape();

        // Option #1: 1D Noise
        let xoff = this.yoff;
        if (dimension > 0) {
            // Option #2: 2D Noise
            xoff = 0;
        }

        // Iterate over horizontal pixels
        for (let x = 0; x <= this.w; x += 5) {
            // Calculate a y value according to noise, map to
            const stop2 = this.h;

            // Option #1: 1D Noise
            let noise = this.p.noise(xoff);
            let y = this.p.map(noise, 0, 1, 0, stop2);
            if (dimension > 0) {
                // Option #2: 2D Noise
                noise = this.p.noise(xoff, this.yoff);

                // map(value, start1, stop1, start2, stop2, [withinBounds])
                y = this.p.map(noise, 0, 1, 0, stop2, false);
            }

            // Set the vertex
            this.p.vertex(x, y);

            // Increment x dimension for noise
            xoff += 0.02;
        }
        // increment y dimension for noise
        this.yoff += 0.0085;

        this.p.vertex(this.w, this.h);
        this.p.vertex(0, this.h);
        this.p.endShape(p5.CLOSE);
    }
}
