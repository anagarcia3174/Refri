import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail, updateProfile, EmailAuthProvider, reauthenticateWithCredential, updateEmail as firebaseUpdateEmail, updatePassword as firebaseUpdatePassword, deleteUser, fetchSignInMethodsForEmail, sendEmailVerification } from 'firebase/auth';
import { AuthResponse, SignUpCredentials, SignInCredentials, ProfileUpdateData } from './types/auth';
import { auth } from './config';
import  {createUserDocument} from './firestore';

export const signIn = async ({ email, password }: SignInCredentials): Promise<AuthResponse> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            user: userCredential.user,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error,
        };
    }
};

export const signUp = async ({ email, password, displayName }: SignUpCredentials): Promise<AuthResponse> => {
    try {
        // Create the authentication user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update the user's display name
        await updateProfile(userCredential.user, { displayName });
        
        // Create the user document in Firestore
        await createUserDocument(
            userCredential.user.uid,
            email,
            displayName
        );

        return {
            success: true,
            user: userCredential.user,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error,
        };
    }
};

export const signOut = async (): Promise<AuthResponse> => {
    try {
        await firebaseSignOut(auth);
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error,
        };
    }
};

export const resetPassword = async (email: string): Promise<AuthResponse> => {
    try {
        await sendPasswordResetEmail(auth, email);
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error,
        };
    }
};

export const updateUserProfile = async (data: ProfileUpdateData): Promise<AuthResponse> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user found');
        
        await updateProfile(user, data);
        return {
            success: true,
            user: user,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error,
        };
    }
};

// Utility functions for additional auth features
export const reauthenticate = async (password: string) => {
    const user = auth.currentUser;
    if (!user?.email) throw new Error('No user email found');
    
    const credentials = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user, credentials);
};

export const updateEmail = async (newEmail: string, password: string): Promise<AuthResponse> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user found');
        
        await reauthenticate(password);
        await firebaseUpdateEmail(user, newEmail);
        return {
            success: true,
            user: user,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error,
        };
    }
};

export const updatePassword = async (currentPassword: string, newPassword: string): Promise<AuthResponse> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user found');
        
        await reauthenticate(currentPassword);
        await firebaseUpdatePassword(user, newPassword);
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error,
        };
    }
};

export const deleteAccount = async (password: string): Promise<AuthResponse> => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user found');
        
        await reauthenticate(password);
        await deleteUser(user);
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error,
        };
    }
};

// Utility function to check if email exists
export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        return methods.length > 0;
    } catch (error) {
        return false;
    }
};

// Utility function to validate password strength
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one number' };
    }
    return { isValid: true, message: 'Password is strong' };
};

const auth_service = {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUserProfile,
    updateEmail,
    updatePassword,
    deleteAccount,
    checkEmailExists,
    validatePassword,
};

export default auth_service;