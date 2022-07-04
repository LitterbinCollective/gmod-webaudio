local BaseNode = require("BaseNode")
local DECLARE_SETTERS_GETTERS = require("settersgetters")

local ReverbNode = {}
ReverbNode._NAME = "ReverbNode"

do
	DECLARE_SETTERS_GETTERS(ReverbNode, {
		{ name = "Seconds", type = "number" },
		{ name = "Decay", type = "number" },
		{ name = "Reverse", type = "number" },
	})
end

return BaseNode.Extend(ReverbNode)