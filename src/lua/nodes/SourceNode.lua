local BaseNode = require("BaseNode")

local SourceNode = {}
SourceNode._NAME = "SourceNode"

do
	function SourceNode:Start()
		self:Execute("start")
	end

	function SourceNode:SetURL(url)
		if type(reverse) ~= "string" then error("not a string") end
		self.Options[1] = url
		self:UpdateOptions()
	end

	function SourceNode:SetPitch(pitch)
		if type(pitch) ~= "number" then error("not a number") end
		if pitch == nan or pitch == math.huge then return end
		self.Options[2] = pitch
		self:UpdateOptions()
	end
end

return BaseNode.Extend(SourceNode)