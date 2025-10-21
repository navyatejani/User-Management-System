// src/pages/UpdateUserDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserById, useUpdateUser } from '../services/userApi';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const UpdateUserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: user, isLoading, isError } = useGetUserById(id);
    const updateUserMutation = useUpdateUser();

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                middleName: user.middleName || '',
                lastName: user.lastName || '',
                username: user.username || '',
                email: user.email || '',
                altEmail: user.altEmail || '',
                gender: user.gender || '',
                dob: user.dob ? user.dob.slice(0, 10) : '',
                role: user.role || '',
                phone: {
                    countryCode: user.phone?.countryCode || '',
                    number: user.phone?.number || '',
                },
                altPhone: {
                    countryCode: user.altPhone?.countryCode || '',
                    number: user.altPhone?.number || '',
                },
                address: {
                    street: user.address?.street || '',
                    altStreet: user.address?.altStreet || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    zipCode: user.address?.zipCode || '',
                    country: user.address?.country || 'India',
                },
                altAddress: {
                    street: user.altAddress?.street || '',
                    altStreet: user.altAddress?.altStreet || '',
                    city: user.altAddress?.city || '',
                    state: user.altAddress?.state || '',
                    zipCode: user.altAddress?.zipCode || '',
                    country: user.altAddress?.country || 'India',
                },
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) return;

        try {
            await updateUserMutation.mutateAsync({ id, updatedData: formData });
            toast.success('User details updated successfully!');
            navigate(`/users/${id}`);
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update user. Try again.');
        }
    };

    if (isLoading)
        return (
            <div className="flex items-center justify-center py-20 text-blue-500">
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                <span>Loading user data...</span>
            </div>
        );

    if (isError)
        return (
            <div className="text-center text-red-600 py-10 text-lg">
                Failed to fetch user data. Please try again later.
            </div>
        );

    if (!formData) return null;

    const InputField = ({ label, name, type = 'text', required = false }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={name.includes('.') ? getNestedValue(formData, name) : formData[name]}
                onChange={handleChange}
                required={required}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

    const getNestedValue = (obj, path) =>
        path.split('.').reduce((acc, key) => (acc ? acc[key] : ''), obj);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Update User Details</h2>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Section: Basic Info */}
                <section>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="First Name" name="firstName" required />
                        <InputField label="Middle Name" name="middleName" />
                        <InputField label="Last Name" name="lastName" required />
                        <InputField label="Username" name="username" required />
                        <InputField label="Email" name="email" type="email" required />
                        <InputField label="Alternate Email" name="altEmail" type="email" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} required className="input-field">
                                <option value="">Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <InputField label="Date of Birth" name="dob" type="date" required />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="input-field">
                                <option>User</option>
                                <option>Admin</option>
                                <option>Moderator</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Section: Phone */}
                <section>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Phone Numbers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Phone Country Code" name="phone.countryCode" required />
                        <InputField label="Phone Number" name="phone.number" required />
                        <InputField label="Alternate Phone Country Code" name="altPhone.countryCode" />
                        <InputField label="Alternate Phone Number" name="altPhone.number" />
                    </div>
                </section>

                {/* Section: Permanent Address */}
                <section>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Permanent Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Street" name="address.street" required />
                        <InputField label="Alt Street" name="address.altStreet" />
                        <InputField label="City" name="address.city" required />
                        <InputField label="State" name="address.state" required />
                        <InputField label="ZIP Code" name="address.zipCode" required />
                        <InputField label="Country" name="address.country" />
                    </div>
                </section>

                {/* Section: Temporary Address */}
                <section>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Temporary Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Street" name="altAddress.street" required />
                        <InputField label="Alt Street" name="altAddress.altStreet" />
                        <InputField label="City" name="altAddress.city" required />
                        <InputField label="State" name="altAddress.state" required />
                        <InputField label="ZIP Code" name="altAddress.zipCode" required />
                        <InputField label="Country" name="altAddress.country" />
                    </div>
                </section>

                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        disabled={updateUserMutation.isPending}
                    >
                        {updateUserMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        {updateUserMutation.isPending ? 'Updating...' : 'Update User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserDetails;
