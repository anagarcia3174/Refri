import { useState } from 'react';
import { useContext } from 'react';
import  AuthContext  from '@/app/lib/context/authContext';
import { SignInCredentials, SignUpCredentials } from '../firebase/types/auth';
import { AUTH_ERROR_CODES } from '../firebase/types/auth';
import { createUserDocument } from '../firebase/firestore';
import { deleteUser } from 'firebase/auth';

 const useAuth = () => {
    const context = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, isInitializing, signIn, signUp, signOut, ...authMethods } = context;

    const getErrorMessage = (code: string): string => {
        switch (code) {
            case AUTH_ERROR_CODES.INVALID_CREDENTIALS:
                return 'The email or password is incorrect.';
            case AUTH_ERROR_CODES.EMAIL_IN_USE:
                return 'This email is already registered.';
            case AUTH_ERROR_CODES.INVALID_EMAIL:
                return 'Please enter a valid email address.';
            case AUTH_ERROR_CODES.WEAK_PASSWORD:
                return 'Password should be at least 6 characters.';
            case AUTH_ERROR_CODES.USER_NOT_FOUND:
                return 'No account found with this email.';
            case AUTH_ERROR_CODES.WRONG_PASSWORD:
                return 'Incorrect password.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    const handleSignIn = async (credentials: SignInCredentials) => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await signIn(credentials);
            if (!response.success) {
                const errorMessage = response.error.code ? getErrorMessage(response.error.code) : response.error.message;
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async (credentials: SignUpCredentials) => {
        try {
            setError(null);
            setIsLoading(true);
            
            const response = await signUp(credentials);
            
            if (response.success && response.user) {
                try {
                    await createUserDocument(
                        response.user.uid,
                        credentials.email,
                        credentials.displayName
                    );
                } catch (firestoreError: any) {
                    try {
                        await deleteUser(response.user);
                        setError("Failed to create user profile. Please try again.");
                    } catch (deleteError) {
                        setError("An error occurred during sign up. Please contact support.");
                    }
                }
            } else {
                const errorMessage = response.error.code ? getErrorMessage(response.error.code) : response.error.message;
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await signOut();
            if (!response.success) {
                const errorMessage = response.error.code ? getErrorMessage(response.error.code) : response.error.message;
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        isLoading: isLoading || isInitializing,
        error,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        ...authMethods,
    };
};


export default useAuth;
