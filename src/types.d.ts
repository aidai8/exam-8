export interface IQuote {
    id: string;
    category: string;
    author: string;
    text: string;
}

export interface IQuoteForm {
    category: string;
    author: string;
    quoteText: string;
}

export interface IQuoteAPI {
    [id: string]: IQuoteForm;
}