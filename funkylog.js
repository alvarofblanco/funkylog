const funkylog = ({ delay, randomized }) => {
	const sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	return async (s) => {
		console.clear()
		for (const c of s) {
			process.stdout.write(c)
			await sleep((randomized ? Math.random() : 1) * delay)
		}
		process.stdout.write('\n')
	}
}

const fs = require('fs')
const util = require('util')

const log = funkylog({ delay: 100, randomized: true })

const readFile = util.promisify(fs.readFile)
const getStuff = () => { return readFile('./text') }

const main = async () => {

	getStuff()
		.then(async (text) => {
			await log(text.toString())

			console.log('\n')
		})
		.catch(e => {
			console.error(e)
		})
}

main()