import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import BigIdLogo from '../assets/big-id-logo.jpg';
import { COUNTRY_LIST_URL } from '../model/constants';
import { ICountry, ICountryResponse, MAP_KEYS } from '../model/monitor-users.model';
import AddUser from './AddUser';
import Overview from './Overview';
import './styles.css';

function HomePage() {
    const [totalUsers, updateUserCount] = useState<number>(0);
    const [countriesChartData, updateCountriesChartData] = useState<[string, number | string][]>([]); // contains the country name and users count - for the React Geo Chart
    const [countriesResponseList, updateCountriesResponseList] = useState<ICountryResponse[]>([]); // Response from the API fetch - contains the country code(id) with users count
    const [snackBarMessage, updateSnackbarMsg] = useState<string>('');

    useEffect(() => fetchCountries(), []);

    const fetchCountries = () => {
        fetch(COUNTRY_LIST_URL)
            .then((response) => response.json())
            .then((countryResponse: ICountryResponse[]) => {
                const chartData: [string, number | string][] = [[MAP_KEYS.Country, MAP_KEYS.Users]];
                let sumUsers = 0;
                countryResponse.forEach((item) => {
                    sumUsers += item.users;
                    chartData.push([item.name, item.users]);               
                });
                updateCountriesResponseList(countryResponse);
                updateUserCount(sumUsers);
                updateCountriesChartData(chartData);
            });
    };

    const onAddUsers = (countryObj: ICountry, count: number) => {
        // If we use name instead of code to compare its existence, we need not maintain a seperate variable called 'countriesResponseList'
        // But its ideal to use id hence we are store the response list this way.
        const countryAlreadyAdded = countriesResponseList.some(
            (country) => country.id === countryObj.code
        );
        const url = countryAlreadyAdded ? COUNTRY_LIST_URL + '/' + countryObj.code : COUNTRY_LIST_URL;
        fetch(url, {
            method: countryAlreadyAdded ? 'PUT' : 'POST',
            body: JSON.stringify({
                id: countryObj.code,
                name: countryObj.name,
                users: count,
            }),
        }).then((response) => {
            if (response.ok) {
                fetchCountries();
                updateSnackbarMsg('Users count has been updated successfully.');
            } else {
                updateSnackbarMsg(response.statusText);
            }
        });
    };

    const onSnackbarClose = () => {
        updateSnackbarMsg('');
    };

    return (
        <>
            <header>
                <span>
                    <img src={BigIdLogo} alt="Big Id logo" />
                </span>
                <span>
                    {/* Icons have been added for presentation purpose only */}
                    <SettingsOutlinedIcon />
                    <AccountCircleIcon />
                </span>
            </header>
            <div className="homepage-container">
                <aside>
                    <nav>
                        <ul className="aside-nav-list">
                            <li>
                                <NavLink
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                    to="/"
                                >
                                    Overview
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                    to="/add-user"
                                >
                                    Add User
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Overview
                                    countriesList={countriesChartData}
                                    totalUsers={totalUsers}
                                />
                            }
                        ></Route>
                        <Route
                            path="/add-user"
                            element={<AddUser onAddUser={onAddUsers} />}
                        ></Route>
                    </Routes>
                    <Snackbar
                        open={Boolean(snackBarMessage)}
                        autoHideDuration={3000}
                        message={snackBarMessage}
                        onClose={onSnackbarClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    />
                </main>
            </div>
        </>
    );
}

export default HomePage;
