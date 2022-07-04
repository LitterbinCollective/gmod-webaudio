var BaseNode = require('../BaseNode');

function ReverbNode(ctx, options) {
	BaseNode.call(this, ctx, options);
	this.input = this.output = this.ctx.audio.createConvolver();
}

ReverbNode.prototype = Object.create(BaseNode.prototype);
ReverbNode.prototype.constructor = ReverbNode;

ReverbNode.prototype.initialize = function(cb) {
	var rate = this.ctx.audio.sampleRate,
	    length = rate * this.options[0],
	    decay = this.options[1],
	    impulse = this.ctx.audio.createBuffer(2, length, rate),
	    impulseL = impulse.getChannelData(0),
	    impulseR = impulse.getChannelData(1),
	    i, n;

	for (i = 0; i < length; i++) {
		n = this.options[2] == 1 ? length - i : i;
		impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
		impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
	}

	this.input.buffer = impulse;
	if (cb) cb();
}

ReverbNode.prototype.onUpdateOptions = function() {
	this.initialize();
}

module.exports = ReverbNode;