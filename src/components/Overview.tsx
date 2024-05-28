import { Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import GeoChart from 'react-google-charts';
import { countriesData } from '../model/constants';
import { ICountryResponse } from '../model/monitor.model';

export const options = {
    backgroundColor: '#81d4fa',
    defaultColor: 'red',
};

export interface Region {
    Country: string;
    Users: number;
}

function Overview() {
    const [totalUsers, updateUserCount] = useState<number>();
    const [countriesList, updateCountriesList] = useState<[string, number | string][]>();

    const fetchCountries = () => {
        const url = 'http://localhost:3000/countryList';
        fetch(url)
            .then((response) => response.json())
            .then((data: ICountryResponse[]) => {
                const result: [string, number | string][] = [['Country', 'Users']];
                let sumUsers = 0;
                data.forEach((item) => {
                    sumUsers += item.users;
                    countriesData.forEach((country) => {
                        if (item.id === country.code) {
                            result.push([country.name, item.users]);
                        }
                    });
                });
                updateUserCount(sumUsers);
                updateCountriesList(result);
            });
    };

    useEffect(() => fetchCountries(), []);

    return (
        <Container maxWidth="lg" sx={{ height: '100vh', paddingTop: '36px' }}>
            <section className="overview-heading-section">
                <Typography variant="h4">Users Monitor Dashboard</Typography>
                <Typography>Total Users: {totalUsers}</Typography>
            </section>
            <Paper elevation={3}>
                <GeoChart
                    chartType="GeoChart"
                    width="100%"
                    data={countriesList}
                    options={options}
                />
            </Paper>
        </Container>
    );
}

export default Overview;
