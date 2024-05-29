import { Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import GeoChart from 'react-google-charts';

export const options = {
    backgroundColor: '#81d4fa',
    defaultColor: 'red',
};

export interface Region {
    Country: string;
    Users: number;
}

interface OverviewType {
    countriesList: [string, number | string][];
    totalUsers: number;
}

function Overview(props: OverviewType) {
    const { totalUsers, countriesList } = props;

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
