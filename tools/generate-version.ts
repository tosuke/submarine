import * as fs from 'fs'
import $ from 'transform-ts'

const appJsonTransformer = $.obj({
  expo: $.obj({
    version: $.string,
  }),
})

const appJson = require('../app.json')

const {
  expo: { version },
} = appJsonTransformer.transformOrThrow(appJson)

const [, major, minor] = /^(\d+)\.(\d+)$/.exec(version) ?? []

const versionProperties = `
# Auto generated file. DO NOT EDIT
version.major=${major}
version.minor=${minor}
`

fs.writeFileSync('./android/version.properties', versionProperties)
