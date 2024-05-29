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
import { ICountry } from '../model/monitor-users.model';

interface AddUserProps {
    onAddUser(country: string, count: number): void;
}

function AddUser(props: AddUserProps) {
    const { onAddUser } = props;
    const [selectedCountry, updateCountry] = useState('');
    const [count, updateCount] = useState<number | undefined>();

    const onCountryChange = (e: SelectChangeEvent) => {
        updateCountry(e.target.value);
    };

    const onSubmit = () => {
        if (selectedCountry && count) {
            onAddUser(selectedCountry, count);
        }
        updateCountry('');
        updateCount(undefined);
    };

    return (
        <Container maxWidth="lg" sx={{ height: '100vh', paddingTop: '36px' }}>
            <section className="overview-heading-section">
                <Typography variant="h4">Add Users</Typography>
                <Typography>Enter the users count in the country</Typography>
            </section>
            <Paper elevation={3} sx={{ height: 'calc(100% - 160px)', padding: '24px' }}>
                <FormControl size="medium" sx={{ width: '300px' }}>
                    <InputLabel id="choose-country">Select a country</InputLabel>
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
                <FormControl size="medium" sx={{ width: '300px', marginTop: '32px' }}>
                    <TextField
                        id="users-count-input"
                        type="number"
                        label="Users in the country"
                        disabled={!selectedCountry}
                        value={count || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateCount(Number(e.target.value));
                        }}
                        variant="outlined"
                    />
                </FormControl>
                <br />
                <Button
                    type="submit"
                    sx={{ textTransform: 'none', marginTop: '32px' }}
                    variant="contained"
                    disabled={!selectedCountry || !count}
                    onClick={onSubmit}
                >
                    Add Users
                </Button>
            </Paper>
        </Container>
    );
}

export default AddUser;
