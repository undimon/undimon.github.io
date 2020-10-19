class Game {
	constructor(ctx) {
		this.ctx = ctx;
		this.mouse = {};
		this.previousCard = null;
		this.isFinished = false;
		this.initCards();
	}

	get config() {
		return {
			sceneWidth: 400,
			sceneHeight: 400,
			rows: 3,
			columns: 4,
			cardWidth: 80,
			cardHeight: 60,
            cardMargin: 10,
            cardsMarginTop: 100,
            cardsMarginLeft: 25,
			images: [
				"images/apple.jpg",
				"images/fig.jpg",
				"images/grape.jpg",
				"images/kiwi.jpg",
				"images/lemon.jpg",
				"images/lime.jpg",
				"images/mango.jpg",
				"images/melon.jpg",
				"images/orange.jpg",
				"images/peach.jpg",
				"images/pear.jpg",
				"images/pinapple.jpg",
				"images/plum.jpg",
				"images/raspberry.jpg",
				"images/strawberry.jpg",			
			]
		}
	}

	initCards() {
		this.cards = [];
		for (let column = 0; column < this.config.columns; column++) {
			for (let row = 0; row < this.config.rows; row++) {
				const card = new Card(this.ctx);
				card.width = this.config.cardWidth;
				card.height = this.config.cardHeight;
				card.x = column * this.config.cardWidth + column * this.config.cardMargin + this.config.cardsMarginLeft;
				card.y = row * this.config.cardHeight + row * this.config.cardMargin + this.config.cardsMarginTop;
				card.onClick = () => this.onCardClick(card);
				this.cards.push(card);
			}
		}
		this.setCardImages();		  
	}

	setCardImages() {
		// Shuffle the images
		this.config.images.sort(() => Math.random() - 0.5);
		// Shuffle the cards
		this.cards.sort(() => Math.random() - 0.5);
		// Assign images to cards
		let imageId = 0;
		for (let i = 0; i < this.cards.length; i += 2) {
			const imageSrc = this.config.images[imageId];
			this.cards[i].setImageSrc(imageSrc);
			this.cards[i+1].setImageSrc(imageSrc);	
			imageId++;		
		}
	}

	setMouseEvent(canvas, e) {
        const canvasRect = canvas.getBoundingClientRect();
		this.mouse.x = e.clientX - canvasRect.left;
		this.mouse.y = e.clientY - canvasRect.top;
		this.mouse.action = e.type;   
	}

	draw() {
		this.drawBoard();
		if (this.isFinished) {
            this.drawFinishScene();
            this.checkToStartNewGame();
		}
		else {
            this.drawCards();
            this.checkIsAllCardsMatched();
		}
        this.mouse.action = null;
	}

	drawBoard() {
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, this.config.sceneWidth, this.config.sceneHeight);
	}

	drawCards() {
		this.cards.forEach(card => {
			card.processMouseEvent(this.mouse);
			card.draw();
		});
    }
    
	drawFinishScene() {
		this.ctx.fillStyle = '#ffffff';
		this.ctx.font = '40px serif';
		this.ctx.fillText('Gongrats, you won! :)', 20, 180, this.config.sceneWidth);
		this.ctx.font = '20px serif';
		this.ctx.fillText('click anywhere to start a new game', 60, 220, this.config.sceneWidth);
    }
    
    checkIsAllCardsMatched() {
        if (this.cards.findIndex(card => !card.matched) === -1) {
            this.finishGame();
        }
    }

    checkToStartNewGame() {
		if (this.isFinished && this.mouse.action === "mouseup") {
            this.initCards();
            this.isFinished = false;
		}
    }

	onCardClick(card) {
		if (this.previousCard !== null && card.imageSrc === this.previousCard.imageSrc) {
			card.matched = true;
			this.previousCard.matched = true;
		}
		this.previousCard = card;
	}

	finishGame() {
		this.isFinished = true;
	}
}