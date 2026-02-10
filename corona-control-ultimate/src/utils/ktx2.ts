import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import * as THREE from "three";

/**
 * setupKTX2(manager, renderer)
 * - place 'basis_transcoder' files in public/basis/
 */
export function setupKTX2(manager: THREE.LoadingManager, renderer?: THREE.WebGLRenderer): KTX2Loader {
    const loader = new KTX2Loader(manager).setTranscoderPath("/basis/");
    if (renderer) loader.detectSupport(renderer);
    return loader;
}
