
/**
 * BTStatus - Status-Codes für Behavior Tree Nodes
 */
export enum BTStatus {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    RUNNING = 'RUNNING'
}

/**
 * Blackboard - Gemeinsamer Datenspeicher für einen Behavior Tree
 */
export class Blackboard {
    private data: Map<string, any> = new Map();

    set(key: string, value: any): void {
        this.data.set(key, value);
    }

    get<T>(key: string): T | undefined {
        return this.data.get(key);
    }

    has(key: string): boolean {
        return this.data.has(key);
    }

    delete(key: string): void {
        this.data.delete(key);
    }

    clear(): void {
        this.data.clear();
    }
}

/**
 * BTNode - Basisklasse für alle Behavior Tree Knoten
 */
export abstract class BTNode {
    protected name: string;

    constructor(name: string = 'BTNode') {
        this.name = name;
    }

    /**
     * Hauptmethode zum Ausführen des Knotens
     */
    abstract tick(blackboard: Blackboard, dt: number): BTStatus;

    getName(): string {
        return this.name;
    }
}

/**
 * CompositeNode - Basisklasse für Knoten mit mehreren Kindern
 */
export abstract class CompositeNode extends BTNode {
    protected children: BTNode[] = [];

    addChild(child: BTNode): this {
        this.children.push(child);
        return this;
    }
}

/**
 * SequenceNode - Führt Kinder nacheinander aus, bis eines fehlschlägt
 */
export class SequenceNode extends CompositeNode {
    constructor(name: string = 'Sequence') {
        super(name);
    }

    tick(blackboard: Blackboard, dt: number): BTStatus {
        for (const child of this.children) {
            const status = child.tick(blackboard, dt);
            if (status !== BTStatus.SUCCESS) {
                return status;
            }
        }
        return BTStatus.SUCCESS;
    }
}

/**
 * SelectorNode - Führt Kinder nacheinander aus, bis eines Erfolg hat
 */
export class SelectorNode extends CompositeNode {
    constructor(name: string = 'Selector') {
        super(name);
    }

    tick(blackboard: Blackboard, dt: number): BTStatus {
        for (const child of this.children) {
            const status = child.tick(blackboard, dt);
            if (status !== BTStatus.FAILURE) {
                return status;
            }
        }
        return BTStatus.FAILURE;
    }
}

/**
 * DecoratorNode - Basisklasse für Knoten mit genau einem Kind
 */
export abstract class DecoratorNode extends BTNode {
    protected child: BTNode;

    constructor(child: BTNode, name: string = 'Decorator') {
        super(name);
        this.child = child;
    }
}

/**
 * InverterNode - Kehrt SUCCESS in FAILURE und umgekehrt um
 */
export class InverterNode extends DecoratorNode {
    constructor(child: BTNode) {
        super(child, 'Inverter');
    }

    tick(blackboard: Blackboard, dt: number): BTStatus {
        const status = this.child.tick(blackboard, dt);
        if (status === BTStatus.SUCCESS) return BTStatus.FAILURE;
        if (status === BTStatus.FAILURE) return BTStatus.SUCCESS;
        return status;
    }
}
