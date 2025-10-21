// src/pages/AllUsers.jsx
import { Link } from 'react-router-dom';
import { useGetAllUsers, useDeleteUser } from '../services/userApi';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const AllUsers = () => {
    const { data: users, isLoading, isError, error } = useGetAllUsers();
    const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center py-10">
            <p className="ml-2 text-gray-600">Loading users...</p>
        </div>
    );

    if (isError) return (
        <p className="text-red-600 text-center py-10">Error: {error.message}</p>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
                <Link
                    to="/users/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow transition duration-150"
                >
                    + Create New User
                </Link>
            </div>

            {users?.length === 0 ? (
                <div className="bg-yellow-50 text-yellow-800 px-4 py-6 rounded-md shadow">
                    No users found. Try adding one!
                </div>
            ) : (
                <div className="overflow-x-auto border rounded-lg shadow">
                    <table className="min-w-full bg-white text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 uppercase text-xs font-semibold tracking-wider">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Full Name</th>
                                <th className="px-4 py-3">Username</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Gender</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">Verified</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user, index) => {
                                const fullName = `${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim();
                                return (
                                    <tr key={user._id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3">{fullName}</td>
                                        <td className="px-4 py-3">{user.username}</td>
                                        <td className="px-4 py-3">
                                            <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3">
                                            {user.phone?.countryCode} {user.phone?.number}
                                        </td>
                                        <td className="px-4 py-3 capitalize">{user.gender}</td>
                                        <td className="px-4 py-3 capitalize">{user.role}</td>
                                        <td className="px-4 py-3">
                                            {user.isEmailVerified ? (
                                                <span className="text-green-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-red-500 font-medium">No</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center items-center space-x-4">
                                                <Link
                                                    to={`/users/${user._id}`}
                                                    title="View User"
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <Link
                                                    to={`/users/${user._id}/edit`}
                                                    title="Edit User"
                                                    className="text-yellow-500 hover:text-yellow-600"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    disabled={isDeleting}
                                                    title="Delete User"
                                                    className={`text-red-600 hover:text-red-800 transition ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
