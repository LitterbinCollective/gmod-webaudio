local BaseNode = require("BaseNode")

local VolumeNode = {}
VolumeNode._NAME = "VolumeNode"

do
	function VolumeNode:SetGain(gain)
		if type(gain) ~= "number" then error("not a number") end
		if gain == nan or gain == math.huge then return end
		self.Options[1] = gain
		self:UpdateOptions()
	end
end

return BaseNode.Extend(VolumeNode)