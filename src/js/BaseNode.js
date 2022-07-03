function BaseNode(ctx, options) {
	this.ctx = ctx;
	this.options = options;
}

BaseNode.prototype.initialize = function(_cb) {
	throw new Error('initialize function is not extended!');
}

BaseNode.prototype.execute = function(_name) {}
BaseNode.prototype.onUpdateOptions = function() {}

BaseNode.prototype.connect = function(destination) {
	if (!this.output) return;
	this.output.connect(destination.input ? destination.input : destination.audio.destination);
}

BaseNode.prototype.disconnect = function(destination) {
	if (!this.output) return;
	this.output.disconnect(destination ? destination.input : undefined);
}

module.exports = BaseNode;