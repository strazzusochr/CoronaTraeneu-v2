// wasmWorker.ts — skeleton to load and call a WebAssembly module that writes into a SharedArrayBuffer.
// This shows the message contract; implement your actual wasm glue per your toolchain (emscripten / wasm-pack).

let sharedBuf: SharedArrayBuffer | null = null;
let mats: Float32Array | null = null;

self.onmessage = async (e: MessageEvent) => {
    const d = e.data;
    if (d.type === "init-wasm") {
        sharedBuf = d.shared;
        if (sharedBuf) {
            mats = new Float32Array(sharedBuf);
        }

        // Example: load wasm module (replace with your compiled file)
        /*
        const resp = await fetch("/wasm/my_sim.wasm");
        const bytes = await resp.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(bytes, {
          env: {
            // supply imports your wasm expects
          },
        });
        */

        // If your wasm exports an update step that writes into its linear memory,
        // you must map that memory to the SharedArrayBuffer or copy results into mats.
        self.postMessage({ type: "wasm-ready" });
    }

    if (d.type === "step") {
        // call your wasm update function if available:
        // instance.exports.step();
        // then ensure mats is updated (via memory view or memcpy)
    }
};
