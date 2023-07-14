import { initialOperators } from "./data";

export interface IOpertarorsContext {
    operators: typeof initialOperators;
    getOperator: (id: number) => (typeof initialOperators)[0] | undefined;
    addOperator: (value: string) => void;
}
