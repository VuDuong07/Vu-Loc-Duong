import React, {  useEffect, useRef, useState } from "react";
import axios from 'axios';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  SubmitHandler, useForm,  } from "react-hook-form"
import  CircularProgress from "@mui/material/CircularProgress";
import  Button  from "@mui/material/Button";

import FormField from "../../components/formField/FormField";
import { StyledMUIBox, StyledMUIWrapText } from "../../styles/BaseComponent";


interface iFormValues {
    fromCurrency: string,
    toCurrency: string,
    amount: number
}

interface iPrice {
  currency: string,
   date: string, 
   price: number
}

const schema = yup.object().shape({
    fromCurrency: yup.string().required("From currency is required"),
    toCurrency: yup.string().required("To currency is required"),
    amount: yup.number().positive("Amount must be positive").required("Amount is required"),
})

const CurrencySwap: React.FC = () => {
    const {control, handleSubmit, formState: {errors}} = useForm<iFormValues>({
        resolver: yupResolver(schema)
    });
 
    const [prices, setPrices] = useState<iPrice[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [swapResult, setSwapResult] = useState<string | null>(null);
    const optionsRef = useRef<{value: string, label: string, image: string}[]>([])
    const tokenImageURL = process.env.REACT_APP_URL_TOKEN_IMAGE;
    const pricesURL =  process.env.REACT_APP_URL_PRICES;

    useEffect(() => {
        const fetchPrices = async () => {
          setLoading(true);
          try {
            if(pricesURL) {
              const response = await axios.get(pricesURL);
              
              if(response.status === 200 && response.data) {
                const uniqueData = getUniqueData(response.data);
  
                optionsRef.current = uniqueData.map((price: iPrice) => {
                  const currency =  price.currency
                  return {
                    value: currency,
                    label: currency,
                    image: getTokenImageURL(currency)
  
                  }
                })
                setPrices(response.data);
              }
            } else {
              console.error("Error getting pricesURL")
            }
          } catch (error) {
            console.error('Error fetching prices:', error);
          } finally {
            setLoading(false);
          }
        };
        
        fetchPrices()
      }, [pricesURL]);

    const getUniqueData = (data: iPrice[]): iPrice[] => {
      const map = new Map<string, iPrice>();
    
      data.forEach(item => {
            const key = item.currency;
            if (!map.has(key) || new Date(item.date) > new Date(map.get(key)!.date)) {
                map.set(key, item);
            }
      });
      return Array.from(map.values());
    };

    const getTokenImageURL = (currency: string) => {
      return `${tokenImageURL}/${currency}.svg`;
    };

  const onSubmit: SubmitHandler<iFormValues> = (data) => {
    const { fromCurrency, toCurrency, amount } = data;
    
    if (fromCurrency !== toCurrency) {
      const fromPrice = prices.find(p => p.currency === fromCurrency)?.price || 0;
      const toPrice = prices.find(p => p.currency === toCurrency)?.price || 0;
      const exchangedAmount = (amount * fromPrice) / toPrice;
      setSwapResult(`You will receive approximately ${exchangedAmount.toFixed(2)} ${toCurrency}`);
    } else {
      setSwapResult('From and to currencies cannot be the same.');
    }
  };

  if (loading) return <CircularProgress size={50} />;
  return (
       <StyledMUIBox component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormField 
                name="fromCurrency"
                control={control}
                label="From Currency"
                type="select"
                options={optionsRef.current}
                error={errors.fromCurrency?.message}
            />
            <FormField 
                name="toCurrency"
                label="To Currency"
                control={control}
                type="select"
                options={optionsRef.current}
                error={errors.toCurrency?.message}
            />
            <FormField
                name="amount"
                control={control}
                label="Amount"
                type="number"
                error={errors.amount?.message}
                />
            <Button type="submit" variant="contained" color="primary" >
              Swap
            </Button>
            {swapResult && <StyledMUIWrapText>
              {swapResult}
            </StyledMUIWrapText>}
       </StyledMUIBox>
    )
}

export default CurrencySwap;