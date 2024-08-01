import React, { useMemo } from 'react';
import WalletRow from '../../components/walletRow/WalletRow';
import { Currency, WalletBalance, FormattedWalletBalance } from '../../types/types';
import { usePrices, useWalletBalances} from '../../hooks/useWallets';

/*
    This is your code:
            import logo from './logo.svg';
            interface WalletBalance {
            currency: string;
            amount: number;
            }
            interface FormattedWalletBalance {
            currency: string;
            amount: number;
            formatted: string;
            }

            interface Props extends BoxProps {

            }
            const WalletPage: React.FC<Props> = (props: Props) => {
            const { children, ...rest } = props;
            const balances = useWalletBalances();
            const prices = usePrices();

                const getPriority = (blockchain: any): number => {
                switch (blockchain) {
                    case 'Osmosis':
                    return 100
                    case 'Ethereum':
                    return 50
                    case 'Arbitrum':
                    return 30
                    case 'Zilliqa':
                    return 20
                    case 'Neo':
                    return 20
                    default:
                    return -99
                }
                }

            const sortedBalances = useMemo(() => {
                return balances.filter((balance: WalletBalance) => {
                    const balancePriority = getPriority(balance.blockchain);
                    if (lhsPriority > -99) {
                        if (balance.amount <= 0) {
                        return true;
                        }
                    }
                    return false
                    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
                        const leftPriority = getPriority(lhs.blockchain);
                    const rightPriority = getPriority(rhs.blockchain);
                    if (leftPriority > rightPriority) {
                        return -1;
                    } else if (rightPriority > leftPriority) {
                        return 1;
                    }
                });
            }, [balances, prices]);

            const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
                return {
                ...balance,
                formatted: balance.amount.toFixed()
                }
            })

            const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
                const usdValue = prices[balance.currency] * balance.amount;
                return (
                <WalletRow 
                    className={classes.row}
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
                )
            })

            return (
                <div {...rest}>
                {rows}
                </div>
            )
            }
*/

/**
 * List out the computational inefficiencies and anti-patterns found in the code block below.
 * 1: Improve interface: FormattedWalletBalance can extend properties from walletBalance interface.
 * 2: Remove children prop not used in the component
 * 3: Check type in getPriority: cases of switch had type values is string, edit blockchain: any => blockchain: string
 * 4: Inefficient when use "useMemo": the dependencies list includes "prices", which are not use. This cause unnecessary re-calculations
 * 5: Improved filter logic:  The intention filter out balance with positive amount. With the way write code is not good,
 *    can we write return balance.amount > 0
 * 6: Avoid call "useMemo" twice: the sortedBalances are calculated first and then mapped to formattedBalances. 
 *    This can be combined into a single useMemo
 * 7: Explicit prop: Specified the props being used with ...rest to avoid passing unnecessary props
 * 8: Set value default for usdValue: if prices[balance.currency] is undefined then set default value is 0, preventing potential errors.
 * 9: Refactor code: Move up logic calculator usdValue into formattedBalance and  add usdValue into  FormattedWalletBalance interface. 
 *    Avoid create variable unnecessary and refactor code if, else if ex: return getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
 *    Move rows into div tag. Avoid create function unnecessary
 */

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const WalletPage: React.FC<Props> = (props) => {
    const { ...rest } = props;

    const balances = useWalletBalances();
    const prices = usePrices()

    const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis': return 100;
      case 'Ethereum': return 50;
      case 'Arbitrum': return 30;
      case 'Zilliqa': return 20;
      case 'Neo': return 20;
      default: return -99;
    }
    }

    const formattedBalances = useMemo(() => {
        return (balances.filter((balance: WalletBalance) => balance.amount > 0)).map((balanceItem: WalletBalance) => {
        return  { ...balanceItem,
            formatted: balanceItem.amount.toFixed(),
            usdValue: prices[balanceItem.currency as Currency] ? prices[balanceItem.currency as Currency] * balanceItem.amount : 0
        }
        }).sort((lhs: FormattedWalletBalance, rhs : FormattedWalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
    },[balances, prices])

    return (
        <div {...rest}>
        {
            formattedBalances.map((balance, index) => (
                <WalletRow
                    key={index}
                    currency={balance.currency}
                    formattedAmount={balance.formatted}
                    usdValue={balance.usdValue}
                    
                />
            ))
        }
        </div>
    );
};

export default WalletPage;
