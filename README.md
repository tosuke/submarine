![](https://github.com/Tosuke/Submarine/workflows/CI/badge.svg)

# Submarine

A cross-platform mobile client app for Sea.

## How to use

### Published Version

### Android User

See [DeployGate](https://deploygate.com/users/tosuke/apps/me.tosuke.submarine)

### iOS User

See [Expo](https://expo.io/@tosuke/submarine)

## Dev Infomation

### Requires

- expo-cli
- Apple Developer Account (If you want to build IPA)

### Required Environment Variables

| Name          | Description                                                |
| ------------- | ---------------------------------------------------------- |
| SEA_URL       | Root URL of an instance(eg. https://sea-ans.herokuapp.com) |
| CLIENT_ID     | Your app's id                                              |
| CLIENT_SECRET | Your app's secret                                          |

### How to build

Generate app.json

`$ yarn generate:app`

Copy App.app.tsx

`$ cp -r App.app.tsx`

Build apk

`$ expo build:android`

Build ipa

`$ expo build:ios`

### How to develop

Generate app.json

`$ yarn generate:app`

Develop with App

`$ yarn start`

Use Storybook

`$ yarn storybook`
