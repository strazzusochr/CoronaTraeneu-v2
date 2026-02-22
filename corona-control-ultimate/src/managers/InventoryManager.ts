import { useGameStore } from '@/stores/gameStore';
import { NPCState } from '@/types/enums';

export interface Item {
    id: string;
    name: string;
    type: 'WEAPON' | 'CONSUMABLE' | 'QUEST' | 'GEAR';
    maxStack: number;
    description: string;
    icon?: string;
    effect?: (targetId?: number) => void;
}

export interface InventorySlot {
    index: number;
    item: Item | null;
    quantity: number;
}

export class InventoryManager {
    private static instance: InventoryManager;
    private itemDatabase: Map<string, Item> = new Map();

    private constructor() {
        this.initializeItems();
    }

    public static getInstance(): InventoryManager {
        if (!InventoryManager.instance) {
            InventoryManager.instance = new InventoryManager();
        }
        return InventoryManager.instance;
    }

    private initializeItems() {
        this.registerItem({
            id: 'ITEM_BATON',
            name: 'Schlagstock',
            type: 'WEAPON',
            maxStack: 1,
            description: 'Standard-Polizeiausrüstung. Nicht tödlich.',
            effect: () => console.log('Equipped Baton')
        });

        this.registerItem({
            id: 'ITEM_MEDKIT',
            name: 'Erste-Hilfe-Set',
            type: 'CONSUMABLE',
            maxStack: 5,
            description: 'Heilt 50 HP.',
            effect: () => {
                useGameStore.getState().setPlayerHealth(100);
                console.log('Used Medkit');
            }
        });

        this.registerItem({
            id: 'ITEM_MASK',
            name: 'FFP2-Maske',
            type: 'CONSUMABLE',
            maxStack: 10,
            description: 'Reduziert das Infektionsrisiko für Bürger.',
            effect: (targetId) => {
                if (targetId) {
                    useGameStore.getState().updateNpc(targetId, { state: NPCState.IDLE });
                    useGameStore.getState().adjustKarma(2);
                }
            }
        });

        this.registerItem({
            id: 'ITEM_SYRINGE',
            name: 'Adrenalin-Spritze',
            type: 'CONSUMABLE',
            maxStack: 5,
            description: 'Heilt verletzte Personen sofort.',
            effect: (targetId) => {
                if (targetId) {
                    useGameStore.getState().updateNpc(targetId, { state: NPCState.IDLE });
                    useGameStore.getState().adjustKarma(5);
                }
            }
        });

        this.registerItem({
            id: 'ITEM_RADIO',
            name: 'Funkgerät',
            type: 'GEAR',
            maxStack: 1,
            description: 'Fordert taktische Unterstützung an.',
            effect: () => {
                // Taktische Unterstützung wird im InteractionSystem/TacticsManager gehandhabt
            }
        });

        this.registerItem({
            id: 'ITEM_PEPPER_SPRAY',
            name: 'Pfefferspray',
            type: 'WEAPON',
            maxStack: 3,
            description: 'Betäubt Randalierer kurzzeitig (nicht tödlich).',
            effect: (targetId) => {
                if (targetId) {
                    useGameStore.getState().updateNpc(targetId, { state: NPCState.STUNNED });
                    useGameStore.getState().adjustKarma(-1);
                }
            }
        });
    }

    public registerItem(item: Item) {
        this.itemDatabase.set(item.id, item);
    }

    public getItem(id: string): Item | undefined {
        return this.itemDatabase.get(id);
    }

    public addItem(itemId: string, amount: number = 1): boolean {
        const itemDef = this.getItem(itemId);
        if (!itemDef) return false;

        // Logic to add to Store Inventory Array
        // This is complex to do with Zustand direct manipulation outside store actions
        // Ideally, we'd have an 'addItem' action in the store. 
        // For now, we simulate success.
        console.log(`[Inventory] Added ${amount}x ${itemDef.name}`);
        useGameStore.getState().setPrompt(`ERHALTEN: ${amount}x ${itemDef.name}`);
        return true;
    }

    public useItem(index: number) {
        // Logic to use item at slot index
        console.log(`Using item at index ${index}`);
    }
}
