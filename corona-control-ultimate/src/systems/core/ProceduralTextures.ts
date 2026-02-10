import * as THREE from 'three';

/**
 * V6.0 PROCEDURAL TEXTURES
 * 
 * Responsibility: Generate high-fidelity textures without external assets.
 * 
 * Includes:
 * - ASPHALT: Grainy, dark, cracked.
 * - SKIN: Realistic tones, sub-surface noise.
 * - FABRIC: Weave patterns.
 */

export class ProceduralTextures {
    private static cache: Map<string, THREE.CanvasTexture> = new Map();

    private static createTexture(name: string, draw: (ctx: CanvasRenderingContext2D, size: number) => void, size: number = 512): THREE.CanvasTexture {
        if (this.cache.has(name)) return this.cache.get(name)!;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;

        draw(ctx, size);

        const texture = new THREE.CanvasTexture(canvas);
        texture.name = name;
        this.cache.set(name, texture);
        return texture;
    }

    public static getAsphalt(): THREE.CanvasTexture {
        return this.createTexture('asphalt', (ctx, size) => {
            // Base Color
            ctx.fillStyle = '#222222';
            ctx.fillRect(0, 0, size, size);

            // Grain/Noise
            for (let i = 0; i < 5000; i++) {
                const x = Math.random() * size;
                const y = Math.random() * size;
                const intensity = Math.random() * 50;
                ctx.fillStyle = `rgb(${intensity},${intensity},${intensity})`;
                ctx.fillRect(x, y, 1, 1);
            }

            // Cracks
            ctx.strokeStyle = '#111111';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * size, Math.random() * size);
                ctx.lineTo(Math.random() * size, Math.random() * size);
                ctx.stroke();
            }
        });
    }

    public static getSkin(): THREE.CanvasTexture {
        return this.createTexture('skin', (ctx, size) => {
            // Base Skin Tone
            ctx.fillStyle = '#FFCDBE';
            ctx.fillRect(0, 0, size, size);

            // Sub-surface noise for realism
            for (let i = 0; i < 2000; i++) {
                const x = Math.random() * size;
                const y = Math.random() * size;
                ctx.fillStyle = `rgba(255, 100, 100, ${Math.random() * 0.1})`;
                ctx.fillRect(x, y, 2, 2);
            }
        });
    }

    public static getFabric(color: string = '#4444aa'): THREE.CanvasTexture {
        return this.createTexture(`fabric_${color}`, (ctx, size) => {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, size, size);

            // Weave pattern
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = 1;
            for (let i = 0; i < size; i += 4) {
                ctx.beginPath();
                ctx.moveTo(i, 0); ctx.lineTo(i, size);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i); ctx.lineTo(size, i);
                ctx.stroke();
            }
        });
    }
}
