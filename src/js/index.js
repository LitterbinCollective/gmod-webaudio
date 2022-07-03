import './lib/polyfill';

function Context() {
	this.audio = new AudioContext();
	this.gain = this.audio.createGain();
	this.compressor = this.audio.createDynamicsCompressor();

	this.compressor.connect(this.gain);
	this.gain.connect(this.audio.destination);

	this.availableNodes = {
		ReverbNode: require('./nodes/ReverbNode'),
		SourceNode: require('./nodes/SourceNode'),
		VolumeNode: require('./nodes/VolumeNode')
	};
	this.nodes = {};
}

Context.prototype.requestNode = function(nodeName, options, id) {
	var node = this.availableNodes[nodeName];
	if (!node)
		throw new Error('Node "' + nodeName + '" does not exist!');
	this.nodes[id] = new node(this, options);
	this.nodes[id].initialize(function() {
		gmodinterface.Callback(id);
	});
}

Context.prototype.updateOptions = function(id, options) {
	if (!this.nodes[id])
		throw new Error('Specified node "' + id + '" does not exist!');
	this.nodes[id].options = options;
	this.nodes[id].onUpdateOptions();
}

Context.prototype.execute = function(id, name) {
	if (!this.nodes[id])
		throw new Error('Specified node "' + id + '" does not exist!');
	this.nodes[id].execute(name);
}

Context.prototype.connect = function(id1, id2) {
	if (!this.nodes[id1])
		throw new Error('Specified node "' + id1 + '" does not exist!');
	if (id2 !== 'master' && !this.nodes[id2])
		throw new Error('Specified node "' + id2 + '" does not exist!');
	console.log(id1 + ' ==> ' + id2);
	this.nodes[id1].connect(this.nodes[id2] || this);
}

Context.prototype.disconnect = function(id1, id2) {
	if (!this.nodes[id1])
		throw new Error('Specified node "' + id1 + '" does not exist!');
	if (id2 !== 'all' && !this.nodes[id2])
		throw new Error('Specified node "' + id2 + '" does not exist!');
	console.log(id1 + ' =/> ' + id2);
	this.nodes[id1].disconnect(this.nodes[id2]);
}

window.$ctx = new Context();