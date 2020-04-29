import { AsBind } from "as-bind";

const fs = require("fs")
const { WASI } = require("@wasmer/wasi")
const nodeBindings = require("@wasmer/wasi/lib/bindings/node")


// Instantiate a new WASI Instance
let wasi = new WASI({
    args: ['./cryptoxide.wasm'],
    env: {},
    bindings: {
        ...(nodeBindings.default || nodeBindings),
        fs: fs
    }
})


const wasm = fetch("./cryptoxide.wasm");
let wasmBytes = new Uint8Array(fs.readFileSync('./cryptoxide.wasm')).buffer

const def  = wasi.getImports(new WebAssembly.Module(wasmBytes))
// Instantiate the wasm file, and pass in our importObject
const asBindInstance =  AsBind.instantiateSync(wasm, {
    cryptoxide: {
        ...def
    }
});


export const cryptoxide = asBindInstance.exports.cryptoxide;