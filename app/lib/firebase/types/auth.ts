import { User } from 'firebase/auth';

export interface AuthUser extends Partial<User> {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
    emailVerified: boolean;
    metadata?: {
        creationTime?: string;
        lastSignInTime?: string;
    };
}

export interface AuthError {
    code: string;
    message: string;
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    error?: any;
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials extends SignInCredentials {
    displayName: string;
}

export interface ProfileUpdateData {
    displayName?: string;
    photoURL?: string;
}

export interface PasswordUpdateData {
    currentPassword: string;
    newPassword: string;
}

export interface EmailUpdateData {
    newEmail: string;
    password: string;
}

// Constants for Firebase error codes
export const AUTH_ERROR_CODES = {
    EMAIL_IN_USE: 'auth/email-already-in-use',
    INVALID_EMAIL: 'auth/invalid-email',
    WEAK_PASSWORD: 'auth/weak-password',
    USER_NOT_FOUND: 'auth/user-not-found',
    WRONG_PASSWORD: 'auth/wrong-password',
    REQUIRES_RECENT_LOGIN: 'auth/requires-recent-login',
    INVALID_CREDENTIALS: 'auth/invalid-credential',
    TOO_MANY_REQUESTS: 'auth/too-many-requests',
    NETWORK_ERROR: 'auth/network-request-failed',
} as const;

// Password validation rules
export const PASSWORD_RULES = {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
} as const;

const auth_types = {
    AUTH_ERROR_CODES,
    PASSWORD_RULES,
};

export default auth_types; 