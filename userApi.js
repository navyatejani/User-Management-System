// src/services/userApi.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './api';

// Fetch all users
export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await api.get('/users');
            return res.data.data;
        },
    });
};

// Fetch user by ID
export const useGetUserById = (id) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const res = await api.get(`/users/${id}`);
            return res.data.data;
        },
        enabled: !!id, // only run if ID is provided
    });
};

// Create a new user
export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userData) => {
            const res = await api.post('/users', userData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};

// Update user by ID
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const res = await api.patch(`/users/${id}`, updatedData);
            return res.data.data;
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries(['users']);
            queryClient.invalidateQueries(['user', id]);
        },
    });
};

// Delete user by ID
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            await api.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};
