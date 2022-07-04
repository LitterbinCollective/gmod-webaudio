local BaseNode = require("BaseNode")
local DECLARE_SETTERS_GETTERS = require("settersgetters")

local SourceNode = {}
SourceNode._NAME = "SourceNode"

do
	function SourceNode:Start()
		self:Execute("start")
	end

	DECLARE_SETTERS_GETTERS(SourceNode, {
		{ name = "URL", type = "string" },
		{ name = "Pitch", type = "number" },
	})
end

return BaseNode.Extend(SourceNode)