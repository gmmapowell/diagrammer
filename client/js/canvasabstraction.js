class CanvasAbstraction {
	constructor(canvas) {
		this.canvas = canvas;
		this.cxt = canvas.getContext('2d');
	}

	newpath() {
		this.cxt.beginPath();
	}

	move(x, y) {
		this.cxt.moveTo(x, y);
	}

	line(x, y) {
		this.cxt.lineTo(x, y);
	}

	close() {
		this.cxt.closePath();
	}

	stroke() {
		this.cxt.stroke();
	}
}

export default CanvasAbstraction;