import * as fs from 'fs'
import * as Handlebars from 'handlebars'

const publicUrl = process.argv[2]
const expoRoot = publicUrl.replace(/^https/, 'exps')
const androidUrl = `${expoRoot}/android-index.json`
const iosUrl = `${expoRoot}/ios-index.json`

const templateSource = fs.readFileSync('./tools/preview.html', { encoding: 'utf8' })
const template = Handlebars.compile(templateSource)
const compiled = template({
  androidUrl,
  iosUrl,
  encodedAndroidUrl: encodeURIComponent(androidUrl),
  encodedIosUrl: encodeURIComponent(iosUrl),
})
fs.writeFileSync('./dist/index.html', compiled)
