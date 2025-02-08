import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosAPI from "../../axiosAPI.ts";
import {toast} from "react-toastify";
import QuoteForm from "../../components/QuoteForm/QuoteForm.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";
import {IQuoteForm} from "../../types";


const EditQuote = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {idQuote} = useParams();

    const onSubmitAddNewQuote = async (quote: IQuoteForm) => {
        try {
            setLoading(true);
            await axiosAPI.put(`quotes/${idQuote}.json`, quote);
            toast.success("Quote edited successfully!");
            navigate('/');
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    };

    let form = (<QuoteForm onSubmitAction={onSubmitAddNewQuote} isEdit idQuote={idQuote}/>)

    if (loading) form = <Loader/>

    return (
        <div>
            {form}
        </div>
    );
};

export default EditQuote;