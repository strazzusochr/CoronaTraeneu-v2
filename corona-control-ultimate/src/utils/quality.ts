import * as THREE from "three";

export interface QualityPreset {
    name: "low-cpu" | "high";
    instancedCount: number;
    enableShadows: boolean;
    enablePMREM: boolean;
    useKTX2: boolean;
    simpleEnvColor: number;
}

export function detectSoftwareRenderer(gl: THREE.WebGLRenderer): boolean {
    try {
        const rendererStr = gl.capabilities.isWebGL2 ? "webgl2" : "webgl1"; // Fallback if getParameter fails context access in some wrappers
        // direct context access
        const ctx = gl.getContext();
        const debugInfo = ctx.getExtension('WEBGL_debug_renderer_info');
        let vendor = "";
        let renderer = "";

        if (debugInfo) {
            vendor = ctx.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "";
            renderer = ctx.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
        }

        const isSoftware =
            /swiftshader|microsoft basic render driver|angle \(.*warp|software|llvmpipe|mesa/i.test(
                renderer + " " + vendor
            );

        console.log(`[Graphics] Renderer: ${renderer} (${vendor}) -> Software Mode: ${isSoftware}`);
        return isSoftware;
    } catch (e) {
        console.warn("[Graphics] Detection failed, assuming software fallback.", e);
        return true; // safer fallback -> assume software
    }
}

export function getQualityPreset(gl: THREE.WebGLRenderer): QualityPreset {
    const software = detectSoftwareRenderer(gl);
    if (software) {
        return {
            name: "low-cpu",
            instancedCount: 500, // Reduced from 2000
            enableShadows: false,
            enablePMREM: false, // use simple ambient fallback if no HDR
            useKTX2: false, // Software transcoding is slow
            simpleEnvColor: 0x666666,
        };
    } else {
        return {
            name: "high",
            instancedCount: 2000,
            enableShadows: true,
            enablePMREM: true,
            useKTX2: true,
            simpleEnvColor: 0x888888,
        };
    }
}
