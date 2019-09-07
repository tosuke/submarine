import * as fs from 'fs'
import $ from 'transform-ts'

const Env = $.obj({
  SEA_URL: $.string,
  CLIENT_ID: $.string,
  CLIENT_SECRET: $.string,
})

if (!fs.existsSync('./app.base.json')) {
  console.error('"app.base.json" is required')
  process.exit(1)
}

if (!fs.existsSync('./env.json')) {
  console.error('"env.json" is required')
  process.exit(1)
}

const appTemplate = JSON.parse(fs.readFileSync('./app.base.json', { encoding: 'utf8' }))
const env = Env.transformOrThrow(JSON.parse(fs.readFileSync('./env.json', { encoding: 'utf8' })))

const app = { ...appTemplate, extra: env }

fs.writeFileSync('./app.json', JSON.stringify(app))
