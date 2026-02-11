/**
 * Corona Control Ultimate - Error Handler (V6 Hybrid)
 * Implementiert Feature-Detection und globales Error-Tracking.
 */

export class ErrorHandler {
    static init() {
        console.log('--- ERROR HANDLER INITIALIZING ---');

        // Globale Fehlerbehandlung
        window.addEventListener('error', (event) => {
            console.error('Globale Fehler:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
            this.showOverlay(event.message);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unbehandelter Promise:', event.reason);
            this.showOverlay('Unhandled Promise: ' + event.reason);
        });

        // Feature-Erkennung
        this.checkBrowserFeatures();
    }

    private static showOverlay(msg: string) {
        const overlay = document.getElementById('error-overlay');
        if (overlay) {
            overlay.style.display = 'block';
            overlay.innerHTML += `<div style="margin-top:10px; border-top:1px solid white; padding-top:10px;"><b>ERROR:</b> ${msg}</div>`;
        }
    }

    static checkBrowserFeatures() {
        const features = [
            { name: 'WebGPU', check: () => 'gpu' in navigator },
            { name: 'SharedArrayBuffer', check: () => typeof SharedArrayBuffer !== 'undefined' },
            {
                name: 'WebGL2', check: () => {
                    const canvas = document.createElement('canvas');
                    return !!canvas.getContext('webgl2');
                }
            }
        ];

        console.table(features.map(f => ({
            Feature: f.name,
            Supported: f.check() ? '✅ YES' : '❌ NO'
        })));

        // Permissions noise suppression (already handled by server headers, but good for local logs)
        const permissions = [
            'ambient-light-sensor', 'battery', 'document-domain',
            'layout-animations', 'legacy-image-formats', 'oversized-images',
            'vr', 'wake-lock'
        ];
        console.info('Ignoring policy-restricted features:', permissions.join(', '));
    }
}

// Auto-init in development or production
if (typeof window !== 'undefined') {
    ErrorHandler.init();
}
