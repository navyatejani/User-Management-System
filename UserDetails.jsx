import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserById } from '../services/userApi';

const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-2 py-1">
        <dt className="font-medium text-gray-600">{label}</dt>
        <dd className="col-span-2 text-gray-800">{value || 'N/A'}</dd>
    </div>
);

const AddressBlock = ({ title, address }) => (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">{title}</h3>
        <p>{address.street}</p>
        {address.altStreet && <p>{address.altStreet}</p>}
        <p>{address.city}, {address.state} - {address.zipCode}</p>
        <p>{address.country}</p>
    </section>
);

const UserDetails = () => {
    const { id } = useParams();
    const { data: user, isLoading, isError, error } = useGetUserById(id);

    if (isLoading) return <p className="text-blue-500 text-center py-4">Loading user details...</p>;
    if (isError) return <p className="text-red-600 text-center py-4">Error: {error.message}</p>;
    if (!user) return <p className="text-gray-500 italic text-center py-4">User not found.</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">User Profile Overview</h2>

            {/* Basic Information */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Basic Information</h3>
                <dl className="divide-y divide-gray-200">
                    <InfoRow label="Full Name" value={`${user.firstName} ${user.middleName || ''} ${user.lastName}`} />
                    <InfoRow label="Username" value={user.username} />
                    <InfoRow label="Email" value={user.email} />
                    <InfoRow label="Alternate Email" value={user.altEmail} />
                    <InfoRow label="Gender" value={user.gender} />
                    <InfoRow label="Date of Birth" value={new Date(user.dob).toLocaleDateString()} />
                    <InfoRow label="Role" value={user.role} />
                    <InfoRow label="Email Verified" value={user.isEmailVerified ? 'Yes' : 'No'} />
                </dl>
            </section>

            {/* Contact Information */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Contact Details</h3>
                <dl className="divide-y divide-gray-200">
                    <InfoRow label="Phone" value={`${user.phone?.countryCode || ''} ${user.phone?.number || ''}`} />
                    <InfoRow label="Alternate Phone" value={user.altPhone ? `${user.altPhone.countryCode} ${user.altPhone.number}` : 'N/A'} />
                </dl>
            </section>

            {/* Addresses */}
            <AddressBlock title="Permanent Address" address={user.address} />
            <AddressBlock title="Temporary Address" address={user.altAddress} />
        </div>
    );
};

export default UserDetails;
