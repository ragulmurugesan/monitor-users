import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { countriesData } from '../model/constants';
import { ICountry } from '../model/monitor.model';

function AddUser() {
    const [selectedCountry, updateCountry] = useState('')
    const [count, updateCount] = useState<number>(0)

    const onCountryChange = (e: SelectChangeEvent) => {
        updateCountry(e.target.value)
    }

    const onAddUsers = () => {
        const url = 'http://localhost:3000/countryList'
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: selectedCountry,
                users: count,
            }),
        })
        updateCountry('')
        updateCount(0)
    }

    return (
        <Container maxWidth="lg" sx={{ height: '100vh', paddingTop: '36px' }}>
            <section className="overview-heading-section">
                <Typography variant="h4">Add Users</Typography>
                <Typography>Add users to the country</Typography>
            </section>
            <Paper
                elevation={3}
                sx={{ height: 'calc(100% - 125px)', padding: '12px 24px' }}
            >
                <FormControl size="medium" sx={{ width: '300px' }}>
                    <InputLabel id="choose-country">
                        Select a country
                    </InputLabel>
                    <Select
                        labelId="choose-country"
                        id="select-country"
                        value={selectedCountry}
                        label="Select a country"
                        onChange={onCountryChange}
                    >
                        {countriesData.map((country: ICountry) => (
                            <MenuItem key={country.code} value={country.code}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <FormControl
                    size="medium"
                    sx={{ width: '300px', marginTop: '32px' }}
                >
                    <TextField
                        id="users-count-input"
                        type="number"
                        label="Users in the country"
                        disabled={!selectedCountry}
                        value={count}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateCount(Number(e.target.value))
                        }}
                        variant="outlined"
                    />
                </FormControl>
                <br />
                <Button
                    sx={{ textTransform: 'none', marginTop: '32px' }}
                    variant="contained"
                    disabled={!selectedCountry || !count}
                    onClick={onAddUsers}
                >
                    Add Users
                </Button>
            </Paper>
        </Container>
    )
}

export default AddUser
