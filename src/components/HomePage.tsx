import { NavLink, Route, Routes } from 'react-router-dom'
import AddUser from './AddUser'
import Overview from './Overview'
import './styles.css'

function HomePage() {
    return (
        <div className="homepage-container">
            <aside>
                <nav>
                    <ul className="aside-nav-list">
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                                to="/"
                            >
                                Overview
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
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
                    <Route path="/" element={<Overview />}></Route>
                    <Route path="/add-user" element={<AddUser />}></Route>
                </Routes>
            </main>
        </div>
    )
}

export default HomePage
