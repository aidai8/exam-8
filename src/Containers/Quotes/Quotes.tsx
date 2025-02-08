import {useCallback, useEffect, useState} from "react";
import {IQuote, IQuoteAPI} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import Grid from "@mui/material/Grid2";
import QuoteItem from "../../components/QuoteItem/QuoteItem.tsx";

const Quotes = () => {
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosAPI<IQuoteAPI>('quotes.json');
            setLoading(true);

            if (response.data) {
                const quotesObject = response.data;
                const quotesObjectKeys = Object.keys(quotesObject);
                const quotesArray = quotesObjectKeys.map(quoteIdOrKey => {
                    return {
                        id: quoteIdOrKey,
                        ...quotesObject[quoteIdOrKey],
                    }
                });

                setQuotes(quotesArray);
            } else {
                setQuotes([]);
            }
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
            void fetchData();
    }, [fetchData])

    const deleteQuote = async (quote: IQuote) => {
        if (quote.id) {
            try {
                setLoading(true);
                await axiosAPI.delete<IQuoteAPI>(`quotes/${quote.id}.json`);
                setQuotes([])
                void fetchData();
            } catch (e) {
                alert(e);
            } finally {
                setLoading(false);
            }
        }
    };

    let content =  null;
    if (loading) {
        content = (<Loader/>)
    }

    if (!loading) {
        if (quotes.length > 0) {
            content = (
                <Grid container spacing={2}>
                    {quotes.map((quote) => (
                        <Grid key={quote.id}>
                            <QuoteItem quote={quote} onDeleteQuote={() => deleteQuote(quote)}/>
                        </Grid>
                    ))}
                </Grid>
            )
        } else {
            content = (<p>No quotes yet</p>)
        }

    }

    return (
        <>
            {content}
        </>
    );
};

export default Quotes;