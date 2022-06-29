import './polyfill';

function Context() {
	this.audio = new AudioContext();
	this.gain = this.audio.createGain();
	this.compressor = this.audio.createDynamicsCompressor();

	console.log('hoii!');
}

window.$ctx = new Context();