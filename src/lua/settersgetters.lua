return function(_M, options)
	for optionId, metadata in ipairs(options) do
		_M["Set" .. metadata.name] = function(self, new)
			local givenType = type(new)
			local isValidNumber = metadata.type == "number" and new ~= math.huge and new == new
			local formattedFunctionName = self._NAME .. ":Set" .. metadata.name

			assert(
				givenType == metadata.type and isValidNumber,
				("bad argument #1 to %s (%s expected, got %s)")
				  :format(formattedFunctionName, metadata.type, givenType)
			)

			self.Options[optionId] = new
			self:UpdateOptions()
		end

		_M["Get" .. metadata.name] = function(self)
			return self.Options[optionId]
		end
	end
end