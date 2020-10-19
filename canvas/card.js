class Card {
	constructor(ctx) {
		this.ctx = ctx;
		this.onClick = null;
		this.alpha = 1;
		this.revealed = false;
		this.matched = false;
		this.image = new Image();
	}

	setImageSrc(src) {
		this.imageSrc = src;
		this.image.src = this.imageSrc;
	}

	revealImage() {
		if (this.revealed) {
			return;
		}
		this.revealed = true;
		setTimeout(() => {
			if (!this.matched) {
				this.revealed = false;
			}
		}, 1000);
	}

	draw() {
		if (this.revealed) {
			this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			return;
		}

		this.ctx.save();
		this.ctx.globalAlpha = this.alpha;
		this.ctx.fillStyle = '#FFA500';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
		this.ctx.shadowOffsetX = 4;
		this.ctx.shadowOffsetY = 4;
		this.ctx.shadowBlur = 2;
		this.ctx.shadowColor = 'rgba(100, 100, 100, 1)';
		this.ctx.restore();
	}

	isIntersectWithMouse(mouseEvent) {
		return mouseEvent.x > this.x && mouseEvent.x < this.x + this.width && mouseEvent.y > this.y && mouseEvent.y < this.y + this.height;
	}
	
	processMouseEvent(mouseEvent) {
		if (mouseEvent.action === "mouseup") {
			if (this.isIntersectWithMouse(mouseEvent)) {
				this.alpha = 1;
				this.revealImage();
				this.onClick();
			}
		}
		if (mouseEvent.action === "mousedown") {
			if (this.isIntersectWithMouse(mouseEvent)) {
				this.alpha = 0.5;
			}
		}
		if (mouseEvent.action === "mousemove") {
			if (this.isIntersectWithMouse(mouseEvent)) {
				this.alpha = 0.8;
			}
			else {
				this.alpha = 1;
			}
		}				
	}
}