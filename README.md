# mayte

## Requirements

1. node 6+
1. yarn (`npm install -g yarn`)

## Installation

    yarn install

## Run iOS

    open ios/mayte.xcodeproj

## Run Android

    react-native run-android

## Development API

When running in development, this expects https://github.com/superseriouscompany/api.mayte.com to be running at https://mayte.ngrok.io

## Linking libraries

For some reason, cocoapod installation of react pods is not working. If `react-native link` doesn't work for you, link manually:

1. `open node_modules/new-thing`
1. Find the `.xcodeproj`, drag it in to `Libraries` in XCode
1. Go to `Build Phases > Link Binary With Libraries` and add the `.a` file

## Illustrator Scripts

Located in `app/util/illustrator`, these scripts can be executed in Illustrator to (e.g) randomly alter the colors of selected paths - they are all tuned to the current Unicorn design language. To use, select path(s) in Illustrator and click `File -> Scripts -> Other Script...` (or `cmd+F12`) and select a script to execute.
