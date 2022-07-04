local BaseNode = require("BaseNode")
local DECLARE_SETTERS_GETTERS = require("settersgetters")

local VolumeNode = {}
VolumeNode._NAME = "VolumeNode"

do
	DECLARE_SETTERS_GETTERS(VolumeNode, {
		{ name = "Gain", type = "number" },
	})
end

return BaseNode.Extend(VolumeNode)