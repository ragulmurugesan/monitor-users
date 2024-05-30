import { CircularProgress, Container, Typography } from '@mui/material';
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
        <Container maxWidth="lg" sx={{ height: '100%', paddingTop: '36px' }}>
            <section className="overview-heading-section">
                <Typography variant="h4">Users Monitor Dashboard</Typography>
                <Typography>Total Users: {totalUsers}</Typography>
            </section>
            <Paper square={false} elevation={3} sx={{ height: 'calc(100% - 106px)', borderRadius: '10px' }}>
                {countriesList.length > 0 ? (
                    <GeoChart
                        chartType="GeoChart"
                        width="100%"
                        height="100%"
                        data={countriesList}
                        options={options}
                    />
                ) : (
                    <div className="spinner">
                        <CircularProgress />
                    </div>
                )}
            </Paper>
        </Container>
    );
}

export default Overview;
