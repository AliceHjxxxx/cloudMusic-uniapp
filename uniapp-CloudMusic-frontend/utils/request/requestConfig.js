// 维护一个更完整的config对象
export async function requestConfig(ins, options, successHandler, failHandler, completeHandler) {
	ins.header = options.header || ins.header
	ins.baseUrl = options.baseUrl || ins.baseUrl
	// config base
	let config = {
		url: ins.baseUrl + options.url,
		header: ins.header,
	}
	if (ins.requestInterceptor) {
		let _cg = null
		try {
			_cg = await ins.requestInterceptor(Object.assign({}, options, config))
		} catch (e) {
			//TODO handle the exception
			return false
		}
		if (!_cg || typeof _cg != "object") {
			return false
		}
		Object.assign(options, _cg)
		config.url = options.url
		config.header = options.header

	}
	const type = options.type || 'request'
	if (type === 'request') {
		config['data'] = options.data || options.params || {}
		config['method'] = options.method || 'GET'
		config['dataType'] = options.dataType || 'json'
		config['responseType'] = options.responseType || 'text'
	} else if (type === "upload") {
		config['filePath'] = options.filePath
		config['name'] = options.name
		config['method'] = options.method || 'POST'
		config['formData'] = options.formData
		config['fileType'] = options.fileType || 'image'
		delete config.header['Content-Type']
	}
	return config

}
