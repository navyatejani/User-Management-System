// src/pages/CreateNewUser.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../services/userApi';

const CreateNewUser = () => {
    const navigate = useNavigate();
    const { mutate: createUser, isLoading, error } = useCreateUser();

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        email: '',
        altEmail: '',
        phone: { countryCode: '+91', number: '' },
        altPhone: { countryCode: '+91', number: '' },
        gender: '',
        dob: '',
        role: 'User',
        address: {
            street: '',
            altStreet: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India',
        },
        altAddress: {
            street: '',
            altStreet: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India',
        },
    });

    const handleChange = (e, parent, subKey) => {
        const { name, value } = e.target;
        if (parent) {
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [subKey || name]: value,
                },
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(formData, {
            onSuccess: () => {
                alert('✅ User created successfully.');
                navigate('/users');
            },
        });
    };

    const renderInput = ({ label, name, required = false, type = 'text', parent = null, subKey = null }) => {
        const id = `${parent || ''}-${name}`;
        const value = parent ? formData[parent][subKey || name] : formData[name];

        return (
            <div className="flex flex-col gap-1">
                <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}{required && <span className="text-red-500">*</span>}</label>
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    required={required}
                    onChange={(e) => parent ? handleChange(e, parent, subKey || name) : handleChange(e)}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create New User</h1>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Info */}
                <fieldset className="border border-gray-200 rounded-md p-4">
                    <legend className="text-lg font-semibold text-gray-700">Basic Information</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {[
                            { label: 'First Name', name: 'firstName', required: true },
                            { label: 'Middle Name', name: 'middleName' },
                            { label: 'Last Name', name: 'lastName', required: true },
                            { label: 'Username', name: 'username', required: true },
                            { label: 'Email', name: 'email', required: true },
                            { label: 'Alternate Email', name: 'altEmail' },
                        ].map(input => renderInput(input))}
                    </div>
                </fieldset>

                {/* Phone Section */}
                <fieldset className="border border-gray-200 rounded-md p-4">
                    <legend className="text-lg font-semibold text-gray-700">Phone Numbers</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {renderInput({ label: 'Country Code', name: 'countryCode', parent: 'phone', required: true })}
                        {renderInput({ label: 'Phone Number', name: 'number', parent: 'phone', required: true })}
                        {renderInput({ label: 'Alt Country Code', name: 'countryCode', parent: 'altPhone' })}
                        {renderInput({ label: 'Alt Phone Number', name: 'number', parent: 'altPhone' })}
                    </div>
                </fieldset>

                {/* Demographics */}
                <fieldset className="border border-gray-200 rounded-md p-4">
                    <legend className="text-lg font-semibold text-gray-700">Demographics</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender<span className="text-red-500">*</span></label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {renderInput({ label: 'Date of Birth', name: 'dob', type: 'date', required: true })}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Moderator">Moderator</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                {/* Address Sections */}
                {[
                    { key: 'address', label: 'Permanent Address' },
                    { key: 'altAddress', label: 'Temporary Address' }
                ].map(({ key, label }) => (
                    <fieldset key={key} className="border border-gray-200 rounded-md p-4">
                        <legend className="text-lg font-semibold text-gray-700">{label}</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {['street', 'altStreet', 'city', 'state', 'zipCode'].map(field =>
                                renderInput({
                                    label: field.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()),
                                    name: field,
                                    parent: key,
                                    required: ['street', 'city', 'state', 'zipCode'].includes(field)
                                })
                            )}
                        </div>
                    </fieldset>
                ))}

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 text-white text-lg rounded-md font-medium transition duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isLoading ? 'Creating...' : 'Create User'}
                    </button>

                    {error && (
                        <p className="text-red-600 mt-3 text-sm text-center">Error: {error.message}</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateNewUser;
