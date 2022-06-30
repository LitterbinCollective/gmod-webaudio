local WebAudio = {}
WebAudio._M = WebAudio
WebAudio._NAME = "WebAudio"

WebAudio.Constructors = {
	SourceNode = require("nodes.SourceNode")
}
WebAudio.BrowserController = require("browser")

return WebAudio