import React, {FormEvent, useCallback, useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {IQuoteForm} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Loader from "../UI/Loader/Loader.tsx";

interface Props {
   isEdit?: boolean;
   idQuote?: string;
   onSubmitAction: (quote: IQuoteForm) => void;
}

const initialState = {
    category: '',
    author: '',
    quoteText: '',
}

const QuoteForm: React.FC<Props> = ({isEdit = false, onSubmitAction, idQuote}) => {
    const [form, setForm] = useState<IQuoteForm>(initialState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchOneQuote = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosAPI<IQuoteForm>(`quotes/${idQuote}.json`);

            if (!response.data) {
                toast.error('Quote not Found');
                navigate('/');
                return;
            }
            setForm(response.data);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }, [idQuote, navigate]);

    useEffect(() => {
       void fetchOneQuote();
    }, [fetchOneQuote]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmitAction({...form});
    };
    const handleChange = (e: SelectChangeEvent) => {
        setForm({...form, category: e.target.value});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{name, value} = e.target;
        setForm({...form, [name]: value});
    };

    return (
        <>
            {loading ? <Loader/>
            :
            <form onSubmit={onSubmit}>
                <Typography variant="h4"
                            sx={{flexGrow: 1, textAlign: "center"}}>{isEdit ? 'Edit' : 'Add new'} Quote</Typography>
                <Grid container spacing={2} sx={{mx: "auto", width: "50%", mt: 4}}>
                    <Grid size={12}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            name="category"
                            onChange={handleChange}
                            value={form.category}
                            fullWidth
                        >
                            <MenuItem value="star_wars">Star Wars</MenuItem>
                            <MenuItem value="famous_people">Famous People</MenuItem>
                            <MenuItem value="saying">Saying</MenuItem>
                            <MenuItem value="humor">Humor</MenuItem>
                            <MenuItem value="motivation">Motivation</MenuItem>
                        </Select>
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Author"
                            name="author"
                            variant="outlined"
                            value={form.author}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Quote Text"
                            name="quoteText"
                            variant="outlined"
                            value={form.quoteText}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Button sx={{width: '100%'}} type="submit"
                                variant="contained">{isEdit ? 'Edit' : 'Add'}</Button>
                    </Grid>
                </Grid>
            </form>
            }
        </>
    );
};

export default QuoteForm;