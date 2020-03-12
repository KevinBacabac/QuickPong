var canvas;

var paddle;
var balls = [];

class Paddle {
  constructor() {
    this.x = 0;
    this.y = 220;
  }

  draw() {
    ctx.fillStyle = "grey";
    ctx.fillRect(this.x, this.y, 20, 100);
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = -1 * Math.random();
    this.dy = 2 * Math.random();
  }

  draw() {
    // Draw ball
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  move() {
    // Movement
    this.x += this.dx;
    this.y += this.dy;
  }
}

$(document).ready(() => {

  document.body.onmousedown = () => { return false; } //so page is unselectable

	// Canvas stuff
	canvas = $("#canvas")[0];
	ctx = canvas.getContext("2d");
	w = $("#canvas").width();
	h = $("#canvas").height();

	init();

  paddle = new Paddle();

  for (var i = 0; i < 100; i++) {
    balls.push(new Ball(Math.random() * 100 + 200, Math.random() * 100));
  }


});

////////////////////////////////
////////	GAME INIT
///////	Runs this code right away, as soon as the page loads.
//////	Use this code to get everything in order before your game starts
//////////////////////////////
function init() {
	requestAnimationFrame(paint);
}

//////////////////////////////////////////////////////
////////	Main Game Engine
////////////////////////////////////////////////////
function paint(timestamp) {
  ctx.fillStyle = "red";
  ctx.fillRect(0,0, w, h)

  paddle.draw();

  for (var ball of balls) {
    ball.draw();
    ball.move();

    var right_paddle_x = paddle.x + 20;
    var bottom_paddle_y = paddle.y + 100;
    var bottom_ball_y = ball.y + 20;


    if (ball.x < right_paddle_x && ball.y < bottom_paddle_y && bottom_ball_y > paddle.y) {
      ball.dx *= -1;
    }
  }

  requestAnimationFrame(paint);
}/////////////////////////////END PAINT/ GAME ENGINE
