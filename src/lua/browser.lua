local jsCode = require("browserjs")

local BrowserController = {}
BrowserController._M = BrowserController
BrowserController._NAME = "BrowserController"
BrowserController.Callbacks = {}

function BrowserController:Log(...)
	MsgC(Color(108, 216, 45), "[WebAudio/BrowserController] ") print(...)
end

function BrowserController:Destroy()
	self:Log("Destroying...")
	self._DHTML:Remove()

	self.Destroyed = true
end

function BrowserController:SetVolume(volume)
	self:RunJavascript(("$ctx.gain.gain.value = %d;"):format(math.Clamp(volume, 0, 1)))
end

function BrowserController:Register(nodeName, callback)

end

local DHTML = vgui.Create("DHTML")
DHTML:SetSize(8, 8)
DHTML:SetAlpha(0)
DHTML:ParentToHUD()
DHTML:SetHTML("<!DOCTYPE html><html></html>")
DHTML.BrowserController = BrowserController

function DHTML:ConsoleMessage(text)
	self.BrowserController:Log(text)
end

do
	local STATE_CLICK = 1
	local STATE_RELEASE = 2

	DHTML.FixAutoplayStates = {
		[STATE_CLICK] = function (self)
			self:MouseCapture(true)

			self:SetMouseInputEnabled(true)
			gui.EnableScreenClicker(true)
			gui.InternalCursorMoved(0, 0)
			gui.InternalMousePressed(MOUSE_LEFT)
			gui.InternalMouseReleased(MOUSE_LEFT)

			self.FixAutoplayState = STATE_RELEASE
		end,
		[STATE_RELEASE] = function (self)
			gui.EnableScreenClicker(false)
			self:SetMouseInputEnabled(false)
			self:MouseCapture(false)
			self:OnAutoplayFixed()
			self.FixAutoplayState = nil
		end
	}

	function DHTML:FixAutoplay()
		self.FixAutoplayState = STATE_CLICK
	end

	function DHTML:Think()
		if self.FixAutoplayState then
			self.BrowserController:Log("Running FixAutoplay state:", self.FixAutoplayState)
			self.FixAutoplayStates[self.FixAutoplayState](self)
		end
	end

	function DHTML:OnFinishLoadingDocument()
		self.OnFinishLoadingDocument = nil
		self.BrowserController:Log("Document loaded!")
		self:FixAutoplay()
	end
end

function DHTML:OnAutoplayFixed()
	self.BrowserController:Log("Autoplay fixed, running JavaScript code...")
	DHTML:RunJavascript(jsCode)
end

BrowserController._DHTML = DHTML

return BrowserController