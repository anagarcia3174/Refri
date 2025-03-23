import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import  {auth}  from '../firebase/config';
import auth_service from '../firebase/auth';

interface AuthContextType {
    user: User | null;
    isInitializing: boolean;
    signIn: typeof auth_service.signIn;
    signUp: typeof auth_service.signUp;
    signOut: typeof auth_service.signOut;
    resetPassword: typeof auth_service.resetPassword;
    updateProfile: typeof auth_service.updateUserProfile;
    updateEmail: typeof auth_service.updateEmail;
    updatePassword: typeof auth_service.updatePassword;
    deleteAccount: typeof auth_service.deleteAccount;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsInitializing(false);
        });

        return () => unsubscribe(); // Unsubscribe on unmount
    }, []);

    const value = {
        user,
        isInitializing,
        signIn: auth_service.signIn,
        signUp: auth_service.signUp,
        signOut: auth_service.signOut,
        resetPassword: auth_service.resetPassword,
        updateProfile: auth_service.updateUserProfile,
        updateEmail: auth_service.updateEmail,
        updatePassword: auth_service.updatePassword,
        deleteAccount: auth_service.deleteAccount,
    };

    // Show a loading state while initializing
    if (isInitializing) {
        return null; // Or return a loading spinner component
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;