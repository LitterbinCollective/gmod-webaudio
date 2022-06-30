function SourceNode(ctx, options) {
	this.ctx = ctx;
	this.options = options;

	this.node = this.ctx.audio.createBufferSource();
}

SourceNode.prototype.initialize = function(cb) {
	var _this = this;
	var request = new XMLHttpRequest();
	request.open('GET', this.options[0]);
	request.responseType = 'arraybuffer';
	request.send();
	request.onload = function() {
		_this.ctx.audio.decodeAudioData(
			request.response,
			function(buffer) {
				_this.node.buffer = buffer;
				cb();
			},
			function(err) {
				console.log(err.message);
			}
		);
	};
}

SourceNode.prototype.onUpdateOptions = function() {
	this.initialize();
}

SourceNode.prototype.execute = function(name) {
	switch (name) {
		case 'start':
			this.node.start();
			break;
	}
}

SourceNode.prototype.connect = function(destination) {
	this.node.connect(destination.node ? destination.node : destination.audio.destination);
}

SourceNode.prototype.disconnect = function(destination) {
	this.node.disconnect(destination ? destination.node : undefined);
}

module.exports = SourceNode;