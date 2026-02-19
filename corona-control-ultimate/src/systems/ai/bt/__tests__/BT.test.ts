
import { describe, it, expect, beforeEach } from 'vitest';
import { Blackboard, BTStatus, SequenceNode, SelectorNode } from '../BehaviorTree';
import { WaitAction, IsPlayerNearbyCondition } from '../Nodes';
import { NPCType, NPCState, Faction, EmotionalState } from '@/types/enums';

describe('Behavior Tree System', () => {
    let blackboard: Blackboard;

    beforeEach(() => {
        blackboard = new Blackboard();
    });

    describe('Core Nodes', () => {
        it('SequenceNode should return SUCCESS only if all children succeed', () => {
            const sequence = new SequenceNode();
            sequence.addChild({ tick: () => BTStatus.SUCCESS } as any);
            sequence.addChild({ tick: () => BTStatus.SUCCESS } as any);
            
            expect(sequence.tick(blackboard, 1)).toBe(BTStatus.SUCCESS);
        });

        it('SequenceNode should return FAILURE if any child fails', () => {
            const sequence = new SequenceNode();
            sequence.addChild({ tick: () => BTStatus.SUCCESS } as any);
            sequence.addChild({ tick: () => BTStatus.FAILURE } as any);
            
            expect(sequence.tick(blackboard, 1)).toBe(BTStatus.FAILURE);
        });

        it('SelectorNode should return SUCCESS if any child succeeds', () => {
            const selector = new SelectorNode();
            selector.addChild({ tick: () => BTStatus.FAILURE } as any);
            selector.addChild({ tick: () => BTStatus.SUCCESS } as any);
            
            expect(selector.tick(blackboard, 1)).toBe(BTStatus.SUCCESS);
        });
    });

    describe('Action Nodes', () => {
        it('WaitAction should return RUNNING until duration is reached', () => {
            const wait = new WaitAction(2);
            expect(wait.tick(blackboard, 1)).toBe(BTStatus.RUNNING);
            expect(wait.tick(blackboard, 1)).toBe(BTStatus.SUCCESS);
        });
    });

    describe('Condition Nodes', () => {
        it('IsPlayerNearbyCondition should return SUCCESS if player is in range', () => {
            const condition = new IsPlayerNearbyCondition(10);
            const npc = { 
                id: 1, 
                position: [0, 0, 0], 
                type: NPCType.POLICE, 
                state: NPCState.IDLE,
                faction: Faction.POLICE,
                emotions: { current: EmotionalState.NEUTRAL, stress: 0, aggression: 0, fear: 0 }
            };
            blackboard.set('self', npc);
            blackboard.set('playerPos', [5, 0, 0]);

            expect(condition.tick(blackboard, 0)).toBe(BTStatus.SUCCESS);
        });

        it('IsPlayerNearbyCondition should return FAILURE if player is out of range', () => {
            const condition = new IsPlayerNearbyCondition(10);
            const npc = { id: 1, position: [0, 0, 0] };
            blackboard.set('self', npc);
            blackboard.set('playerPos', [15, 0, 0]);

            expect(condition.tick(blackboard, 0)).toBe(BTStatus.FAILURE);
        });
    });
});
