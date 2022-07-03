local WebAudio = {}
WebAudio._M = WebAudio
WebAudio._NAME = "WebAudio"

WebAudio.Constructors = {
	ReverbNode = require("nodes.ReverbNode"),
	SourceNode = require("nodes.SourceNode"),
	VolumeNode = require("nodes.VolumeNode")
}
WebAudio.BrowserController = require("browser")

return WebAudio