import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { getFeatureState } from '@/core/FeatureFlags';
import { useTimeEngine } from '@/core/TimeEngine';

/**
 * V6.0 POST-PROCESSING PIPELINE
 * 
 * Chains:
 * 1. Bloom (High Intensity for lights)
 * 2. Vignette (Dynamic Stress simulation)
 * 3. Chromatic Aberration (Riot/Impact effect)
 * 4. Noise (Film grain)
 */

export const PostProcessingPipeline = (): React.ReactElement | null => {
    const isEnabled = getFeatureState('POST_PROCESSING');
    const gameTimeSeconds = useTimeEngine(state => state.gameTimeSeconds);
    const hour = gameTimeSeconds / 3600;

    if (!isEnabled) return null;

    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0.9}
                mipmapBlur
                intensity={hour > 18 || hour < 6 ? 1.5 : 0.5}
            />

            <Vignette
                offset={0.5}
                darkness={0.5}
                eskil={false}
                blendFunction={BlendFunction.NORMAL}
            />

            <Noise opacity={0.05} />

            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.0005, 0.0005]} // Subtle shift for AAA feel
            />
        </EffectComposer>
    );
};
