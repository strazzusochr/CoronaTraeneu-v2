import React, { useMemo } from 'react';

interface FlowerBedProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
}

export const FlowerBed: React.FC<FlowerBedProps> = ({ position, rotation = [0, 0, 0], scale = 1 }) => {
    // Generiere pseudo-zufällige aber deterministische Positionen für die Pflanzen pro Beet
    const { whiteFlowers, lavender, yellowFlowers, grass, tallPurple } = useMemo(() => {
        const prng = { s: Math.abs(position[0] * 100 + position[2]) + 1 };
        const rand = () => { prng.s = (prng.s * 16807) % 2147483647; return (prng.s - 1) / 2147483646; };
        
        // Bodendecker (Weiße kleine Blüten, vorne)
        const whiteFlowers = [];
        for(let i=0; i<40; i++) {
            whiteFlowers.push({
                pos: [(rand() - 0.5) * 5.8, 0.1, 0.8 + rand() * 0.4],
                scale: 0.15 + rand() * 0.15
            });
        }
        
        // Lavendel / Ziersalbei (Blau/Lila, eher vorne/Mitte)
        const lavender = [];
        for(let i=0; i<50; i++) {
            lavender.push({
                pos: [(rand() - 0.5) * 5.6, 0.3, 0.2 + rand() * 0.6],
                height: 0.5 + rand() * 0.4
            });
        }
        
        // Sonnenhut / Schafgarbe (Gelb, Mitte/Hinten)
        const yellowFlowers = [];
        for(let i=0; i<30; i++) {
            yellowFlowers.push({
                pos: [(rand() - 0.5) * 5.2, 0.5 + rand() * 0.3, -0.2 - rand() * 0.5],
                scale: 0.12 + rand() * 0.08
            });
        }

        // Ziergräser (Beige/Hellgrün, fluffy, Hinten)
        const grass = [];
        for(let i=0; i<80; i++) {
            grass.push({
                pos: [(rand() - 0.5) * 5.5, 0.5, -0.5 - rand() * 0.5],
                height: 0.8 + rand() * 0.5,
                rotZ: (rand() - 0.5) * 0.3,
                rotX: (rand() - 0.5) * 0.3
            });
        }

        // Hohes Eisenkraut (Lila, sehr hoch, ganz Hinten)
        const tallPurple = [];
        for(let i=0; i<20; i++) {
            tallPurple.push({
                pos: [(rand() - 0.5) * 4.8, 1.2 + rand() * 0.4, -0.8 - rand() * 0.3],
                scale: 0.15 + rand() * 0.1
            });
        }

        return { whiteFlowers, lavender, yellowFlowers, grass, tallPurple };
    }, [position]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Hölzerne Beet-Einfassung */}
            <mesh position={[0, 0.1, 1.3]} castShadow receiveShadow>
                <boxGeometry args={[6.2, 0.2, 0.2]} />
                <meshStandardMaterial color="#221814" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.1, -1.3]} castShadow receiveShadow>
                <boxGeometry args={[6.2, 0.2, 0.2]} />
                <meshStandardMaterial color="#221814" roughness={0.9} />
            </mesh>
            <mesh position={[3.0, 0.1, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 0.2, 2.4]} />
                <meshStandardMaterial color="#221814" roughness={0.9} />
            </mesh>
            <mesh position={[-3.0, 0.1, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 0.2, 2.4]} />
                <meshStandardMaterial color="#221814" roughness={0.9} />
            </mesh>
            
            {/* Mutterboden */}
            <mesh position={[0, 0.05, 0]} receiveShadow>
                <boxGeometry args={[6, 0.1, 2.4]} />
                <meshStandardMaterial color="#1a110a" roughness={1} />
            </mesh>

            {/* Bodendecker (Vorne) */}
            <group>
                {whiteFlowers.map((f, i) => (
                    <mesh key={`w_${i}`} position={f.pos as [number, number, number]} scale={f.scale} castShadow>
                        <dodecahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color="#eef0f2" roughness={0.8} />
                    </mesh>
                ))}
            </group>

            {/* Lavendel (Mitte-Vorne) */}
            <group>
                {lavender.map((l, i) => (
                    <group key={`l_${i}`} position={l.pos as [number, number, number]}>
                        <mesh position={[0, 0, 0]}>
                            <cylinderGeometry args={[0.015, 0.015, l.height]} />
                            <meshStandardMaterial color="#4caf50" roughness={0.8} />
                        </mesh>
                        <mesh position={[0, l.height * 0.3, 0]} castShadow>
                            <capsuleGeometry args={[0.06, l.height * 0.5, 4, 8]} />
                            <meshStandardMaterial color="#673ab7" roughness={0.7} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Gelbe Blumen (Mitte-Hinten) */}
            <group>
                {yellowFlowers.map((y, i) => (
                    <group key={`y_${i}`} position={y.pos as [number, number, number]}>
                        <mesh position={[0, -y.pos[1]/2, 0]}>
                            <cylinderGeometry args={[0.015, 0.015, y.pos[1]]} />
                            <meshStandardMaterial color="#4caf50" roughness={0.8} />
                        </mesh>
                        {/* Blütenblätter */}
                        <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
                            <torusGeometry args={[y.scale, y.scale*0.4, 4, 10]} />
                            <meshStandardMaterial color="#ffc107" roughness={0.6} />
                        </mesh>
                        {/* Blüte-Zentrum */}
                        <mesh position={[0, 0.02, 0]} castShadow>
                            <sphereGeometry args={[y.scale * 0.8, 6, 6, 0, Math.PI*2, 0, Math.PI/2]} />
                            <meshStandardMaterial color="#3e2723" roughness={0.9} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Ziergräser (Hinten) */}
            <group>
                {grass.map((g, i) => (
                    <mesh key={`g_${i}`} position={g.pos as [number, number, number]} rotation={[g.rotX, 0, g.rotZ]}>
                        <cylinderGeometry args={[0.008, 0.02, g.height]} />
                        <meshStandardMaterial color="#c5e1a5" roughness={0.9} />
                    </mesh>
                ))}
            </group>

            {/* Hohes Lila / Eisenkraut (Ganz Hinten) */}
            <group>
                {tallPurple.map((t, i) => (
                    <group key={`tp_${i}`} position={t.pos as [number, number, number]}>
                         <mesh position={[0, -t.pos[1]/2, 0]}>
                            <cylinderGeometry args={[0.015, 0.015, t.pos[1]]} />
                            <meshStandardMaterial color="#4caf50" roughness={0.8} />
                        </mesh>
                        <mesh castShadow>
                            <dodecahedronGeometry args={[t.scale, 0]} />
                            <meshStandardMaterial color="#9c27b0" roughness={0.6} />
                        </mesh>
                    </group>
                ))}
            </group>

        </group>
    );
};
