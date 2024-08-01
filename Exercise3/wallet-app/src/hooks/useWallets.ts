import { WalletBalance, Currency  } from "../types/types";

const useWalletBalances = (): WalletBalance[] => {
    return [
        { blockchain: "Vvtheaven", currency: "VVT", amount: 77},
        { blockchain: "Vldumthia", currency: "VLD", amount: 12},
        { blockchain: "Vtkangle", currency: "VTK", amount: 10},
        { blockchain: "VttMarie", currency: "VTT", amount: 99},

    ]
}

const usePrices = (): Record<Currency, number> => {
    return {
        VLD: 7,
        VTT: 1,
        VVT: 1,
        VTK: 9
    }
}

export {
    useWalletBalances,
    usePrices
}