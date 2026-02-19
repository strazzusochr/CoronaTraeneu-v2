import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise, Scanline } from '@react-three/postprocessing';
import { POST_PROCESSING_PRESETS } from '@/rendering/RenderPipeline';
import { getGameTime } from '@/core/TimeEngine';

/**
 * EFF-014: PostProcessing
 * Final visual polish for the project.
 */
export const PostProcessing: React.FC = () => {
    const minutes = getGameTime() / 60;
    const hour = Math.floor(minutes / 60) % 24;

    const preset = resolvePresetForHour(hour);

    return (
        <EffectComposer disableNormalPass>
            <Bloom
                intensity={preset.bloomIntensity}
                luminanceThreshold={preset.bloomThreshold}
                luminanceSmoothing={0.025}
                mipmapBlur
            />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            <Scanline density={1.5} opacity={0.05} />
        </EffectComposer>
    );
};

export default PostProcessing;

export function resolvePresetForHour(hour: number) {
    if (hour >= 6 && hour < 12) {
        return POST_PROCESSING_PRESETS.MORNING;
    } else if (hour >= 12 && hour < 18) {
        return POST_PROCESSING_PRESETS.MIDDAY;
    } else if (hour >= 18 && hour < 22) {
        return POST_PROCESSING_PRESETS.EVENING;
    } else {
        return POST_PROCESSING_PRESETS.NIGHT;
    }
}
