var BaseNode = require('../BaseNode');

function SourceNode(ctx, options) {
	BaseNode.call(this, ctx, options);
	this.input = this.output = this.ctx.audio.createBufferSource();
}

SourceNode.prototype = Object.create(BaseNode.prototype);
SourceNode.prototype.constructor = SourceNode;

SourceNode.prototype.initialize = function(cb) {
	var _this = this;
	function callback(buffer) {
		if (!buffer && _this.cache)
			buffer = _this.cache
		else
			_this.cache = buffer;

		var pitch = _this.options[1];
		if (pitch < 0) {
			var reverse = _this.ctx.audio.createBuffer(
				buffer.numberOfChannels,
				buffer.length,
				buffer.sampleRate
			)

			for (var c = 0; c < buffer.numberOfChannels; c++) {
				var dest = reverse.getChannelData(c);
				var src = buffer.getChannelData(c);

				for (var sample = 0; sample < buffer.length; sample++)
					dest[sample] = src[buffer.length - sample];
			}

			buffer = reverse;
		}
		_this.input.buffer = buffer;
		_this.input.playbackRate.value = Math.abs(pitch);

		cb();
	}

	if (this.options[0] !== this.previousURL) {
		this.previousURL = this.options[0];
		var request = new XMLHttpRequest();
		request.open('GET', this.options[0]);
		request.responseType = 'arraybuffer';
		request.send();
		request.onload = function() {
			_this.ctx.audio.decodeAudioData(
				request.response,
				callback,
				function(err) {
					console.log(err.message);
				}
			);
		};
	} else
		callback();
}

SourceNode.prototype.onUpdateOptions = function() {
	this.initialize();
}

SourceNode.prototype.execute = function(name) {
	switch (name) {
		case 'start':
			this.input.start();
			break;
	}
}

module.exports = SourceNode;