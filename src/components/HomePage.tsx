import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { countriesData } from '../model/constants';
import { ICountryResponse, MAP_KEYS } from '../model/monitor-users.model';
import AddUser from './AddUser';
import Overview from './Overview';
import './styles.css';

const COUNTRY_LIST_URL = 'http://localhost:3000/countryList';

function HomePage() {
    const [totalUsers, updateUserCount] = useState<number>(0);
    const [countriesNamesList, updateCountriesList] = useState<[string, number | string][]>([]); // contains the country name and users count
    const [countriesResponseList, updateCountriesResponseList] = useState<ICountryResponse[]>([]); // contains the country code(id) with users count
    const [snackBarMessage, updateSnackbarMsg] = useState<string>('');

    useEffect(() => fetchCountries(), []);

    const fetchCountries = () => {
        fetch(COUNTRY_LIST_URL)
            .then((response) => response.json())
            .then((data: ICountryResponse[]) => {
                const result: [string, number | string][] = [[MAP_KEYS.Country, MAP_KEYS.Users]];
                let sumUsers = 0;
                data.forEach((item) => {
                    sumUsers += item.users;
                    countriesData.forEach((country) => {
                        if (item.id === country.code) {
                            result.push([country.name, item.users]);
                        }
                    });
                });
                updateCountriesResponseList(data);
                updateUserCount(sumUsers);
                updateCountriesList(result);
            });
    };

    const onAddUsers = (countryCode: string, count: number) => {
        const countryAlreadyAdded = countriesResponseList.find(
            (country) => country.id === countryCode
        );
        const url = countryAlreadyAdded ? COUNTRY_LIST_URL + '/' + countryCode : COUNTRY_LIST_URL;
        fetch(url, {
            method: countryAlreadyAdded ? 'PUT' : 'POST',
            body: JSON.stringify({
                id: countryCode,
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
                            <Overview countriesList={countriesNamesList} totalUsers={totalUsers} />
                        }
                    ></Route>
                    <Route path="/add-user" element={<AddUser onAddUser={onAddUsers} />}></Route>
                </Routes>
                <Snackbar
                    open={Boolean(snackBarMessage)}
                    autoHideDuration={3000}
                    message={snackBarMessage}
                    onClose={onSnackbarClose}
                />
            </main>
        </div>
    );
}

export default HomePage;
