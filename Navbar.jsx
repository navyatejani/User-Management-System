import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                `text-sm font-medium px-3 py-2 rounded-md ${isActive
                                    ? 'text-white bg-gray-900'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            Users
                        </NavLink>
                        <NavLink
                            to="/users/new"
                            className={({ isActive }) =>
                                `text-sm font-medium px-3 py-2 rounded-md ${isActive
                                    ? 'text-white bg-gray-900'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            Create User
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
