import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import {
    getUserDocument,
    updateUserDocument,
    updateFollowStatus,
    updateUserRecipeStats,
    createUserDocument,
    FirestoreError
} from '../firebase/firestore';
import type { UserDocument } from '../firebase/types/firestore';
import { defaultUserDocument } from '../firebase/types/firestore';
import { Timestamp } from 'firebase/firestore';

export const useUser = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserDocument | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async () => {
        if (!user) return null;
        
        try {
            setIsLoading(true);
            setError(null);
            const data = await getUserDocument(user.uid);
            
            // If no document exists, create one
            if (!data) {
                const newUserData: UserDocument = {
                    ...defaultUserDocument,
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || '',
                    photoURL: user.photoURL,
                    dateJoined: Timestamp.now(),
                    lastActive: Timestamp.now(),
                };
                
                await createUserDocument(user.uid, newUserData.email, newUserData.displayName);
                setUserData(newUserData);
                return newUserData;
            }
            
            setUserData(data);
        } catch (err) {
            if (err instanceof FirestoreError) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while fetching user data');
            }
        } finally {
            setIsLoading(false);
        }
    };



    const updateUser = async (data: Partial<UserDocument>) => {
        if (!user) return false;
        
        setIsLoading(true);
        setError(null);
        
        try {
            await updateUserDocument(user.uid, data);
            await fetchUserData(); // Refresh user data
        } catch (err) {
            if (err instanceof FirestoreError) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while updating user data');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const followUser = async (targetUserId: string) => {
        if (!user) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            await updateFollowStatus(user.uid, targetUserId, true);
            await fetchUserData(); // Refresh user data
        } catch (err) {
            if (err instanceof FirestoreError) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while following user');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const unfollowUser = async (targetUserId: string) => {
        if (!user) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            await updateFollowStatus(user.uid, targetUserId, false);
            await fetchUserData(); // Refresh user data
        } catch (err) {
            if (err instanceof FirestoreError) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while unfollowing user');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const saveRecipe = async (recipeId: string) => {
        if (!user) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            await updateUserRecipeStats(user.uid, recipeId, true);
            await fetchUserData(); // Refresh user data
        } catch (err) {
            if (err instanceof FirestoreError) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while saving recipe');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const unsaveRecipe = async (recipeId: string) => {
        if (!user?.uid) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            await updateUserRecipeStats(user.uid, recipeId, false);
            await fetchUserData(); // Refresh user data
        } catch (err) {
            if (err instanceof FirestoreError) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while unsaving recipe');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserData();
        } else {
            setUserData(null);
        }
    }, [user?.uid]);

    return {
        userData,
        isLoading,
        error,
        updateUser,
        followUser,
        unfollowUser,
        saveRecipe,
        unsaveRecipe,
        refreshUserData: fetchUserData,
    };
};

export default useUser;