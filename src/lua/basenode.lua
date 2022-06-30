local _M = {}
_M._M = _M
_M._NAME = "BaseNode"

do
	_M.Options = {}

	function _M:Initialize()
		self:RequestSelf(function()
			self:OnInitialized()
		end)
	end

	function _M:UpdateOptions()
		if not self.ID then error("Unregistered " .. self._NAME) end
		self.WebAudio.BrowserController:UpdateOptions(self.ID, self.Options)
	end

	local NOOP = function() end
	function _M:RequestSelf(callback)
		if self.ID then error("Can't request self more!") end
		callback = callback or NOOP
		self.WebAudio.BrowserController:Request(self._NAME, self.Options, function(id)
			self.ID = id
			callback(id)
		end)
	end

	function _M:Execute(name)
		if not self.ID then error("Unregistered " .. self._NAME) end
		self.WebAudio.BrowserController:Execute(self.ID, name)
	end

	function _M:Destroy()
		if not self.ID then error("Unregistered " .. self._NAME) end
		self.WebAudio.BrowserController:DestroyNode(self.ID)
	end

	function _M:Connect(node)
		if not self.ID then error("Unregistered " .. self._NAME) end
		if node and not node.ID then error("Unregistered " .. node._NAME) end
		self.WebAudio.BrowserController:Connect(self.ID, node and node.ID or false)
	end

	function _M:Disconnect(node)
		if not self.ID then error("Unregistered " .. self._NAME) end
		if node and not node.ID then error("Unregistered " .. node._NAME) end
		self.WebAudio.BrowserController:Disconnect(self.ID, node and node.ID or false)
	end

	function _M:OnInitialized() end
end

function _M.Extend(node)
	local metatable = {
		__index = function(self, key)
			return rawget(self, key) or node[key] or _M[key]
		end,
	}

	return function(WebAudio, ...)
		local new = {}
		setmetatable(new, metatable)
		new.WebAudio = WebAudio
		new.Options = { ... }
		new:Initialize()
		return new
	end
end

return _M