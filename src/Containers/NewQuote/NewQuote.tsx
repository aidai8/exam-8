import QuoteForm from "../../components/QuoteForm/QuoteForm.tsx";
import {useNavigate} from "react-router-dom";
import {IQuoteForm} from "../../types";
import Loader from "../../components/UI/Loader/Loader.tsx";
import axiosAPI from "../../axiosAPI.ts";
import {toast} from "react-toastify";
import {useState} from "react";


const NewQuote = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitAddNewQuote = async (quote: IQuoteForm) => {
        try {
            setLoading(true);
            await axiosAPI.post('quotes.json', quote);
            toast.success("Quote added successfully!");
            navigate('/');
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    };

    let form = (<QuoteForm onSubmitAction={onSubmitAddNewQuote}/>)

    if (loading) form = <Loader/>

    return (
        <div>
            {form}
        </div>
    );
};

export default NewQuote;