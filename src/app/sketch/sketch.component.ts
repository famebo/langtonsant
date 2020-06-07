import {Component, OnInit, OnDestroy} from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']
})
export class SketchComponent implements OnInit, OnDestroy {

  constructor() {

  }

  x;
  y;
  dir;
  grid;
  gridWidth;
  ANTUP = 0;
  ANTRIGHT = 1;
  ANTDOWN = 2;
  ANTLEFT = 3;
  speed = 3;
  adim;
  stop11000Adim: boolean;

  private p5;

  // tslint:disable-next-line:only-arrow-functions
  public draw = function(p: any) {

    p.setup = () => {
      const myCanvas = p.createCanvas(600, 600);
      myCanvas.parent('boscanvas');
      this.grid = this.make2DArray(p.width, p.height);
      this.x = this.p5.width / 2;
      this.y = this.p5.height / 2;
      this.dir = this.ANTLEFT;
      this.adim = 0;
      this.stop11000Adim = false;
      p.stroke(0);
      p.strokeWeight(1);
      this.gridWidth = p.width / 100;
      for (let cn = 0; cn < p.height; cn++) {
        for (let rn = 0; rn < p.width; rn++) {
          const a = cn * this.gridWidth;
          const b = rn * this.gridWidth;
          p.rect(a, b, this.gridWidth, this.gridWidth);
        }
      }
    };

    p.draw = () => {
      p.strokeWeight(2);
      for (let n = 0; n < this.speed; n++) {

        const state = this.grid[this.x][this.y];
        if (state === 0) {
          this.turnRight();
          this.grid[this.x][this.y] = 1;
        } else if (state === 1) {
          this.turnLeft();
          this.grid[this.x][this.y] = 0;
        }
        p.fill(p.color(255, 165, 87));
        if (this.grid[this.x][this.y] === 1) {
            p.fill(p.color(81, 21, 255));
        }
        p.rect(this.x, this.y, this.gridWidth, this.gridWidth);
        if (!this.stop11000Adim || this.adim !== 11000) {
          this.moveForward(p);
          if (this.y > 0) {
            this.adim++;
          } else {
            this.dir = -1;
          }

        }
      }


    };

  }.bind(this);

  updateSetting(event) {
    this.speed = event.value;
  }

  start() {
    this.speed = 3;
    this.stop11000Adim = false;
  }

  stop11000() {
    this.stop11000Adim = true;
  }

  refresh(): void {
    window.location.reload();
  }

  public createCanvas = () => {
    if (this.p5 != null) {
      this.destroyCanvas();
    }

    this.p5 = new p5(this.draw);

  }

  public destroyCanvas = () => {
    console.log('destroying canvas');
    this.p5.noCanvas();
  }

  private turnRight() {
    this.dir++;
    if (this.dir > this.ANTLEFT) {
      this.dir = this.ANTUP;
    }
  }

  private turnLeft() {
    this.dir--;
    if (this.dir < this.ANTUP) {
      this.dir = this.ANTLEFT;
    }
  }

  private moveForward(p) {
    const add = this.gridWidth;
    if (this.dir === this.ANTUP) {
      this.y = this.y - add;
    } else if (this.dir === this.ANTRIGHT) {
      this.x = this.x + add;
    } else if (this.dir === this.ANTDOWN) {
      this.y = this.y + add;
    } else if (this.dir === this.ANTLEFT) {
      this.x = this.x - add;
    }
    if (this.y > p.height - 1) {
      this.y = -7;
    }
  }

  private make2DArray(cols, rows) {
    const arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  ngOnInit() {
    console.log('init');
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
    console.log('destroy');
  }

}
