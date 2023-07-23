import { create } from 'zustand';


export interface useResultStoreConfig {
    /**
     * The current result string state
     */
    resultString: string;

    /**
     * Update the result string state
     * 
     * Params:
     * - `newResultString` The new string used to update the result state
     */
    updateResult: (newResultString: string) => void;
}

/**
 * Store the result of the generated dart class string
 */
const useResultStore = create((set) => ({
    /**
     * The current result string state
     */
    resultString: 'Generated dart class string will be showed here...',

    /**
     * Update the result string state
     * 
     * Params:
     * - `newResultString` The new string used to update the result state
     */
    updateResult: (newResultString: string) => {
        set((state: useResultStoreConfig) => ({
            resultString: newResultString,
        }));
    }
}));

export { useResultStore };