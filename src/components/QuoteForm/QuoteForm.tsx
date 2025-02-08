import React, {FormEvent, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {IQuoteForm} from "../../types";

const initialState = {
    category: '',
    author: '',
    quoteText: '',
}

const QuoteForm = () => {
    const [form, setForm] = useState<IQuoteForm>(initialState);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    const handleChange = (e: SelectChangeEvent) => {
        setForm({...form, category: e.target.value});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{name, value} = e.target;
        setForm({...form, [name]: value});
    };

    return (
        <form onSubmit={onSubmit}>
            <Typography variant="h4" sx={{flexGrow: 1, textAlign: "center"}}>Submit New Quote</Typography>
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
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="star_wars">Star Wars</MenuItem>
                        <MenuItem value="famous_people">Famous People</MenuItem>
                        <MenuItem value="saying">Saying</MenuItem>
                        <MenuItem value="humor">Humor</MenuItem>
                        <MenuItem value="motivation">Motivation</MenuItem>
                    </Select>
                </Grid>

                <Grid size={12}>
                <TextField
                    sx={{width:'100%'}}
                    label="Author"
                    name="author"
                    variant="outlined"
                    value={form.author}
                    onChange={onInputChange}
                />
                </Grid>

                <Grid size={12}>
                    <TextField
                        sx={{width:'100%'}}
                        label="Quote Text"
                        name="quoteText"
                        variant="outlined"
                        value={form.quoteText}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={12}>
                    <Button sx={{width: '100%'}} type="submit" variant="contained">Save</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default QuoteForm;