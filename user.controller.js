// Import necessary modules
const User = require('../models/user.model');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

// @desc   Get all users
// @route  GET /api/users
// @access Public
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(StatusCodes.OK).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR
        });
    }
};

/**
 * @desc Get a user by ID
 * @route GET /api/users/:id
 */
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    } catch (error) {
        console.error(`GET_USER_BY_ID_ERROR: ${error.message}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// @desc   Create a new user
// @route  POST /api/users
// @access Public
const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Create user document
        const newUser = await User.create(userData);

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error.message);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Validation failed',
                errors: messages
            });
        }

        // Handle duplicate key error (unique fields)
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: `Duplicate field: ${duplicateField} already exists`
            });
        }

        // Fallback server error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR
        });
    }
};

/**
 * @desc Update user by ID
 * @route PATCH /api/users/:id
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        console.error(`UPDATE_USER_ERROR: ${error.message}`);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid update request',
            error: error.message,
        });
    }
};

/**
 * @desc Delete user by ID
 * @route DELETE /api/users/:id
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error(`DELETE_USER_ERROR: ${error.message}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message,
        });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, };
