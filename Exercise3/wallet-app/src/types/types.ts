export type Currency = "VLD" | "VTK" | "VVT" | "VTT";

export interface WalletBalance {
    blockchain: string;
    currency: Currency;
    amount: number;
}

export interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
    usdValue: number
}

