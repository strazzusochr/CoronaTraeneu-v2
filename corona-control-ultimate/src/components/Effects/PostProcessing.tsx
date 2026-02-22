import React from 'react';
import { EffectComposer, Bloom, Vignette, SMAA, BrightnessContrast, HueSaturation } from '@react-three/postprocessing';
import { POST_PROCESSING_PRESETS } from '@/rendering/RenderPipeline';
import { getGameTime } from '@/core/TimeEngine';

/**
 * EFF-014: PostProcessing
 * Final visual polish for the project.
 */
interface PostProcessingProps {
    intensity?: number;
}

export const resolvePresetForHour = (h: number) => {
    if (h >= 6 && h < 12) return POST_PROCESSING_PRESETS.MORNING;
    if (h >= 12 && h < 18) return POST_PROCESSING_PRESETS.MIDDAY;
    if (h >= 18 && h < 22) return POST_PROCESSING_PRESETS.EVENING;
    return POST_PROCESSING_PRESETS.NIGHT;
};

export const PostProcessing: React.FC<PostProcessingProps> = ({ intensity = 1.5 }) => {
    const minutes = getGameTime() / 60;
    const hour = Math.floor(minutes / 60) % 24;

    const preset = resolvePresetForHour(hour);

    return (
        <EffectComposer multisampling={4}>
            <SMAA />
            <Bloom
                intensity={preset.bloomIntensity * (intensity / 1.5)}
                luminanceThreshold={preset.bloomThreshold}
                luminanceSmoothing={0.025}
                mipmapBlur
            />
            <BrightnessContrast brightness={0} contrast={0.08} />
            <HueSaturation saturation={0.15} hue={0} />
            <Vignette eskil={false} offset={0.1} darkness={0.65} />
        </EffectComposer>
    );
};

export default PostProcessing;
