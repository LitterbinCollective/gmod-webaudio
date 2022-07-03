local BaseNode = require("BaseNode")

local ReverbNode = {}
ReverbNode._NAME = "ReverbNode"

do
	function ReverbNode:SetSeconds(sec)
		if type(sec) ~= "number" then error("not a number") end
		if sec == nan or sec == math.huge then return end
		self.Options[1] = sec
		self:UpdateOptions()
	end

	function ReverbNode:SetDecay(decay)
		if type(decay) ~= "number" then error("not a number") end
		if decay == nan or decay == math.huge then return end
		self.Options[2] = decay
		self:UpdateOptions()
	end

	function ReverbNode:SetReverse(reverse)
		if type(reverse) ~= "boolean" then error("not a boolean") end
		self.Options[3] = reverse and 1 or 0
		self:UpdateOptions()
	end
end

return BaseNode.Extend(ReverbNode)