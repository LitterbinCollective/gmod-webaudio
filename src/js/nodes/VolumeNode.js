var BaseNode = require('../BaseNode');

function VolumeNode(ctx, options) {
	BaseNode.call(this, ctx, options);
	this.input = this.output = this.ctx.audio.createGain();
}

VolumeNode.prototype = Object.create(BaseNode.prototype);
VolumeNode.prototype.constructor = VolumeNode;

VolumeNode.prototype.initialize = function(cb) {
	this.input.gain.value = this.options[0];
	if (cb) cb();
}

VolumeNode.prototype.onUpdateOptions = function() {
	this.initialize();
}

module.exports = VolumeNode;