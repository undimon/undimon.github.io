const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);

canvas.addEventListener('mouseup', (e) => game.setMouseEvent(canvas, e));
canvas.addEventListener('mousedown', (e) => game.setMouseEvent(canvas, e));
canvas.addEventListener('mousemove', (e) => game.setMouseEvent(canvas, e));

draw();

function draw() {
	game.draw();
	window.requestAnimationFrame(draw);
}