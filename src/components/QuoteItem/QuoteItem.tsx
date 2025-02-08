import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {IQuote} from "../../types";
import React from "react";
import {NavLink} from "react-router-dom";

interface Props {
    quote: IQuote;
    onDeleteQuote: React.MouseEventHandler;
}

const QuoteItem: React.FC<Props> = ({quote, onDeleteQuote}) => {
    return (
        <Card variant="outlined" sx={{minWidth: 275}}>
            <CardContent>
                <Typography gutterBottom sx={{fontSize: 19}}>
                    "{quote.quoteText}"
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary', fontSize: 15}}>
                    <strong>- {quote.author}</strong>
                </Typography>
                <hr/>
            </CardContent>
            <CardActions>
                <Button size="small" component={NavLink} to={`/quotes/${quote.id}/edit`}>Edit</Button>
                <Button size="small" onClick={onDeleteQuote}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default QuoteItem;