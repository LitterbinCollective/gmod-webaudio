local _M = {}
_M._M = _M
_M._NAME = 'BaseNode'

do
	function _M:Initialize() end
	function _M:Connect() end
	function _M:Disconnect() end
	function _M:Destroy() end
end

function _M.Extend(node)
	local metatable = {
		__index = function(self, key)
			return rawget(self, key) or node[key] or _M[key]
		end,
	}

	return function(WebAudio, options)
		local new = {}
		setmetatable(new, metatable)
		new.WebAudio = WebAudio
		new.Options = options
		new:Initialize()
		return new
	end
end

return _M