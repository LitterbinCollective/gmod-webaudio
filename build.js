const { build } = require('esbuild');
const { promises } = require('fs');
const { bundle } = require('luabundle');

(async function () {
	const jsOutfile = 'gmod-webaudio.min.js';
	const luaOutfile = 'src/lua/browserjs.lua';
	const result = await build({
		entryPoints: ['src/js/index.js'],
		bundle: true,
		minify: true,
		platform: 'browser',
		target: 'chrome18',
		/* i wish there was a way to output the bundle directly to
		   the result object */
		outfile: jsOutfile
	});

	if (result.errors.length !== 0) {
		console.error(result.errors);
		return process.exit(1);
	}

	if (result.warnings.length !== 0)
		console.warn(result.warnings);

	const file = await promises.readFile(jsOutfile);
	await promises.rm(jsOutfile);
	await promises.writeFile(luaOutfile, 'local a = [==[' + file + ']==] return a');

	const bundled = await bundle('src/lua/main.lua', { paths: ['src/lua/?.lua'] });
	await promises.rm(luaOutfile);
	await promises.writeFile('bundle.lua', bundled);
})();