const fs = require("fs")
const loader = require("@assemblyscript/loader")
const myImports = { /* ... */ }
const cryptoxide = loader.instantiateSync(
  fs.readFileSync("cryptoxide.wasm"),
  myImports
)

export default cryptoxide;