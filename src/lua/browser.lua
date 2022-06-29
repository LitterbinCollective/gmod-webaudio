local Browser = {}

function Browser:Log(...)
	MsgC(Color(108, 216, 45), "[WebAudio/Browser] ") print(...)
end

function Browser:Destroy()
	self:Log("Destroying...")
	self._DHTML:Remove()

	self.Destroyed = true
end

do
	Browser:Log("Initializing...")

	local DHTML = vgui.Create("DHTML")
	local jsCode = require("browserjs")
	DHTML:SetHTML(("<script>%s</script>"):format(jsCode))

	function DHTML:ConsoleMessage(text)
		Browser:Log(text)
	end

	Browser._DHTML = DHTML
end

return Browser