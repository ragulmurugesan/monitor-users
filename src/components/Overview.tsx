import { Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import GeoChart from 'react-google-charts';
import { regionsData } from '../model/mockdata';

export const options = {
  backgroundColor: "#81d4fa",
  defaultColor: "#f5f5f5",
};

function Overview() {

  const [totalUsers, updateUserCount] = useState('342,342');

  useEffect(() => {
    // During the initial rendering, fetch the totalUsers throught REST API and update users count
  }, [])

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', paddingTop: '36px' }}>
      <section className="overview-heading-section">
        <Typography variant='h4'>Users Monitor Dashboard</Typography>
        <Typography>Total Users: {totalUsers}</Typography>
      </section>
      <Paper elevation={3}>
        <GeoChart
          chartType="GeoChart"
          width="100%"
          data={regionsData}
          options={options}
        />
      </Paper>
    </Container>
  );
}

export default Overview;
