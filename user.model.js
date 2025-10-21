const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [3, 'First name must be at least 3 characters long'],
        maxlength: [20, 'First name must not exceed 20 characters']
    },
    middleName: {
        type: String,
        trim: true,
        // minlength: [3, 'Middle name must be at least 3 characters long'],
        maxlength: [20, 'Middle name must not exceed 20 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [3, 'Last name must be at least 3 characters long'],
        maxlength: [20, 'Last name must not exceed 20 characters']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must not exceed 30 characters'],
        match: [/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    altEmail: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid alternate email address']
    },
    phone: {
        type: {
            countryCode: {
                type: String,
                required: [true, 'Country code is required'],
                match: [/^\+\d{1,4}$/, 'Invalid country code format']
            },
            number: {
                type: String,
                required: [true, 'Phone number is required'],
                match: [/^[6-9]\d{9}$/, 'Invalid phone number format']
            }
        },
        required: [true, 'Phone is required']
    },
    altPhone: {
        type: {
            countryCode: {
                type: String,
                // required: [true, 'Country code is required'],
                match: [/^\+\d{1,4}$/, 'Invalid country code format']
            },
            number: {
                type: String,
                // required: [true, 'Phone number is required'],
                match: [/^[6-9]\d{9}$/, 'Invalid phone number format']
            }
        },
        required: false,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Gender is required']
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Moderator'],
        default: 'User'
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    address: {
        type: {
            street: {
                type: String,
                required: [true, 'Street is required'],
                trim: true,
                maxlength: 100
            },
            altStreet: {
                type: String,
                trim: true,
                maxlength: 100
            },
            city: {
                type: String,
                required: [true, 'City is required'],
                trim: true,
                maxlength: 50
            },
            state: {
                type: String,
                required: [true, 'State is required'],
                trim: true,
                maxlength: 50
            },
            zipCode: {
                type: String,
                required: [true, 'ZIP code is required'],
                match: [/^\d{6}$/, 'Please enter a valid 6-digit ZIP code']
            },
            country: {
                type: String,
                default: 'India',
                trim: true
            }
        },
        required: [true, 'Permanent address is required'],
    },
    altAddress: {
        type: {
            street: {
                type: String,
                required: [true, 'Street is required'],
                trim: true,
                maxlength: 100
            },
            altStreet: {
                type: String,
                trim: true,
                maxlength: 100
            },
            city: {
                type: String,
                required: [true, 'City is required'],
                trim: true,
                maxlength: 50
            },
            state: {
                type: String,
                required: [true, 'State is required'],
                trim: true,
                maxlength: 50
            },
            zipCode: {
                type: String,
                required: [true, 'ZIP code is required'],
                match: [/^\d{6}$/, 'Please enter a valid 6-digit ZIP code']
            },
            country: {
                type: String,
                default: 'India',
                trim: true
            }
        },
        required: [true, 'Temporary address is required'],
    },
}, {
    timestamps: true,
    // versionKey: true,
});

module.exports = mongoose.model('User', userSchema);
