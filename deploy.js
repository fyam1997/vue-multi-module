const git = require('git-rev-sync')
const ghPages = require('gh-pages')
const pkg = require('./app/package.json')

const commitMsg = `${pkg.version}@${git.long()}`
console.log(`Publishing: ${commitMsg}`)

ghPages.publish(
  './app/dist',
  {
    message: commitMsg,
  },
  () => {
    console.log('Done')
  },
)
