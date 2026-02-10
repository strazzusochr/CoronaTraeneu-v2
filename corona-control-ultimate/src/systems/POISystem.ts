import { Vector3 } from 'three';

export interface POIData {
    id: string;
    type: 'BENCH' | 'EVIDENCE' | 'DOOR' | 'PERSON';
    position: [number, number, number];
    interactionRadius: number;
    label: string;
    action: () => void;
}

/**
 * POISystem (V7.0)
 * Singleton Manager für interaktive Punkte in der Welt.
 */
export class POISystem {
    private static instance: POISystem;
    private pois: Map<string, POIData> = new Map();

    private constructor() {
        console.log("POI System initialized");
    }

    public static getInstance(): POISystem {
        if (!this.instance) {
            this.instance = new POISystem();
        }
        return this.instance;
    }

    /**
     * Registriert einen neuen Point of Interest.
     */
    public registerPOI(poi: POIData) {
        this.pois.set(poi.id, poi);
    }

    /**
     * Entfernt einen POI.
     */
    public unregisterPOI(id: string) {
        this.pois.delete(id);
    }

    /**
     * Gibt alle POIs in der Nähe einer Position zurück.
     * Nutzt initial einen einfachen Distanz-Check (V7.0 Spatial Optimierung folgt).
     */
    public getNearbyPOIs(position: [number, number, number], radius: number): POIData[] {
        const nearby: POIData[] = [];
        const playerPos = new Vector3(...position);

        this.pois.forEach(poi => {
            const poiPos = new Vector3(...poi.position);
            if (playerPos.distanceTo(poiPos) <= (poi.interactionRadius + radius)) {
                nearby.push(poi);
            }
        });

        return nearby;
    }

    /**
     * Führt die primäre Aktion des nächsten POIs aus.
     */
    public executeInteraction(id: string) {
        const poi = this.pois.get(id);
        if (poi) {
            poi.action();
        }
    }
}

export const poiSystem = POISystem.getInstance();
