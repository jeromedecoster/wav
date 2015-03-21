#!/usr/bin/env node --harmony
"use strict"

const readdir = require('fs').readdirSync
const fmt = require('util').format
const exec = require('child_process').execSync

const ffmpeg = __dirname + '/ffmpeg.exe'

let files = readdir('.').filter(e => /\.(dts|ac3)$/i.test(e))
if (!files.length) abort('no file found')

convert(files)

function convert(files) {
  files.forEach(file => {
    let dest = file + '.wav'
    let cmd = fmt('"%s" -i "%s" -ar 44100 -v quiet "%s"', ffmpeg, file, dest)
    console.log('create: ' + dest)
    exec(cmd)
  })
}

function abort(msg) {
  console.error(msg)
  process.exit(1)
}