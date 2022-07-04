var BaseNode = require('../BaseNode');

function SourceNode(ctx, options) {
	BaseNode.call(this, ctx, options);
}

SourceNode.prototype = Object.create(BaseNode.prototype);
SourceNode.prototype.constructor = SourceNode;

SourceNode.prototype.initialize = function(cb) {
	var _this = this;
	var isNew = this.options[0] !== this.previousURL;
	function callback(buffer) {
		if (!isNew)
			buffer = _this.cache
		else
			_this.cache = buffer;

		var pitch = _this.options[1];
		var createNew = false;
		if (pitch < 0 && (!_this.reversed || isNew)) {
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

			createNew = true;
			buffer = reverse;
			_this.reversed = true;
		} else if (_this.reversed || isNew) {
			createNew = true;
			_this.reversed = false;
		}

		if (createNew) {
			_this.input = _this.output = _this.ctx.audio.createBufferSource();
			_this.input.buffer = buffer;
		}

		_this.input.playbackRate.value = Math.abs(pitch);

		if (cb) cb();
	}

	if (isNew) {
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