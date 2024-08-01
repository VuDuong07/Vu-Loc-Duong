import React from 'react';
import "./walletRow.css"

interface WalletRowProps {
    currency: string;
    usdValue: number;
    formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({currency, usdValue, formattedAmount}) => {
    return (
        <div className="wallet-row">
          <div className="wallet-row__currency">
            <p>
              {currency}: {formattedAmount} (USD Value: ${usdValue}) 
            </p> 
          </div>
        </div>
    )
}

export default WalletRow