import {useCallback, useEffect, useState} from "react";
import {IQuote, IQuoteAPI} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import Grid from "@mui/material/Grid2";
import QuoteItem from "../../components/QuoteItem/QuoteItem.tsx";
import {useParams} from "react-router-dom";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu.tsx";

const Quotes = () => {
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [loading, setLoading] = useState(true);
    const {category} = useParams();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            let url = "quotes.json";

            if (category && category !== "all") {
                url += `?orderBy="category"&equalTo="${category}"`;
            }

            const response = await axiosAPI.get<IQuoteAPI>(url);

            if (response.data) {
                const quotesArray = Object.keys(response.data).map((id) => ({
                    id,
                    ...response.data[id],
                }));
                setQuotes(quotesArray);
            } else {
                setQuotes([]);
            }
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }, [category]);


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
        content = <Loader/>;

        } else if (quotes.length > 0) {
            content = (
                <Grid container spacing={2}>
                    {quotes.map((quote) => (
                        <Grid key={quote.id}>
                            <QuoteItem quote={quote} onDeleteQuote={() => deleteQuote(quote)}/>
                        </Grid>
                    ))}
                </Grid>
            );
        } else {
            content = (<p>No quotes yet</p>)
    }


    return (
        <Grid container spacing={2}>
            <Grid>
                <CategoryMenu/>
            </Grid>

            <Grid>
                {content}
            </Grid>
        </Grid>
    );
};

export default Quotes;