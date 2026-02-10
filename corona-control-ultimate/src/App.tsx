import React, { Suspense, useState } from 'react';
import { HUD } from '@/components/ui/HUD';
import { MainMenu } from '@/components/ui/MainMenu';
import { GameCanvas } from '@/components/game/GameCanvas';
import { DebugOverlay } from '@/components/debug/DebugOverlay';

/**
 * V6.0 MASTER APP
 */
export default function App(): React.ReactElement {
  const [isStarted, setIsStarted] = useState(false);

  console.log('--- V6 MASTER APP RENDERING ---');

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {!isStarted ? (
        <MainMenu onStart={() => setIsStarted(true)} />
      ) : (
        <Suspense fallback={<div style={{ color: 'white', background: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Lade Stephansplatz (Build 54)...</div>}>
          <HUD />
          <GameCanvas />
        </Suspense>
      )}

      {/* Mandatory Debug Layer (GSCP Spec) */}
      <DebugOverlay />
    </div>
  );
}
