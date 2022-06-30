local BaseNode = require("BaseNode")

local SourceNode = {}
SourceNode._NAME = "SourceNode"

do
	function SourceNode:Start()
		self:Execute("start")
	end
end

return BaseNode.Extend(SourceNode)