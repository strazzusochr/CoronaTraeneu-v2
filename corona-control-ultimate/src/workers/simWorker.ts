// simWorker.ts (module worker) — simple CPU simulation that writes transform matrices into the SharedArrayBuffer
let mats: Float32Array | null = null;
let COUNT = 0;
const MATRIX_SIZE = 16;
let intervalId: any = null;

self.onmessage = (e: MessageEvent) => {
    const d = e.data;
    if (d.type === "init") {
        // SharedArrayBuffer handling
        mats = new Float32Array(d.shared);
        COUNT = d.count || COUNT;
        startLoop();
    }
};

function startLoop() {
    if (intervalId) return;
    const start = Date.now();

    intervalId = setInterval(() => {
        if (!mats) return;

        const t = (Date.now() - start) * 0.001;
        // Fill all instance matrices (column-major) — simple rotation + translation example
        for (let i = 0; i < COUNT; i++) {
            const o = i * MATRIX_SIZE;

            // simple scale
            const s = 0.6 + ((i % 7) * 0.06);

            // position in a large circular area
            const angle = t * 0.5 + i * 0.01;
            const radius = 20 + (i % 100) * 0.05;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle * 0.7) * 6 + ((i % 5) - 2);
            const z = Math.sin(angle) * radius * 0.5;

            // rotation quaternion -> matrix (we write a simple rotation matrix around Y)
            const cosA = Math.cos(angle + i * 0.001);
            const sinA = Math.sin(angle + i * 0.001);

            // column-major 4x4 (identity with rotation Y + translation + scale)
            mats[o + 0] = cosA * s;
            mats[o + 1] = 0;
            mats[o + 2] = -sinA * s;
            mats[o + 3] = 0;

            mats[o + 4] = 0;
            mats[o + 5] = s;
            mats[o + 6] = 0;
            mats[o + 7] = 0;

            mats[o + 8] = sinA * s;
            mats[o + 9] = 0;
            mats[o + 10] = cosA * s;
            mats[o + 11] = 0;

            mats[o + 12] = x;
            mats[o + 13] = y;
            mats[o + 14] = z;
            mats[o + 15] = 1;
        }

        // Optionally notify main thread that a frame is available:
        // self.postMessage({ type: 'frame' });
    }, 16); // ~60 Hz logical update
}
