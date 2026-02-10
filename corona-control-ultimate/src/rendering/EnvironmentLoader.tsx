import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { PMREMGenerator, UnsignedByteType } from "three";

interface EnvironmentLoaderProps {
    url: string;
}

export default function EnvironmentLoader({ url }: EnvironmentLoaderProps) {
    const { gl, scene } = useThree();

    useEffect(() => {
        const pmremGenerator = new PMREMGenerator(gl);
        pmremGenerator.compileEquirectangularShader();

        const loader = new RGBELoader();
        loader.setDataType(UnsignedByteType); // safe default
        loader.load(
            url,
            (texture) => {
                const envMap = pmremGenerator.fromEquirectangular(texture).texture;
                scene.environment = envMap;
                // optionally set background: scene.background = envMap;
                texture.dispose();
                pmremGenerator.dispose();
            },
            undefined,
            (err) => {
                console.warn("EnvironmentLoader: HDR load failed", err);
            }
        );

        return () => {
            // cleanup handled above
        };
    }, [gl, scene, url]);

    return null;
}
