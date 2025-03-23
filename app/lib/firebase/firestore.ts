import { db } from './config';
import { 
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove,
    Timestamp,
    DocumentReference,
    serverTimestamp,
} from 'firebase/firestore';
import { UserDocument, defaultUserDocument } from './types/firestore';

// Collection references
const USERS_COLLECTION = 'users';

export class FirestoreError extends Error {
    constructor(message: string, public code?: string) {
        super(message);
        this.name = 'FirestoreError';
    }
}

/**
 * Creates a new user document in Firestore
 * @param uid User's ID from Firebase Auth
 * @param email User's email
 * @param username User's chosen username
 * @returns Promise<void>
 */
export const createUserDocument = async (
    uid: string,
    email: string,
    username: string,
): Promise<void> => {
    try {
        const userRef = doc(db, USERS_COLLECTION, uid);
        
        // Create the user document with default values
        await setDoc(userRef, {
            ...defaultUserDocument,
            uid,
            email,
            displayName: username, // Initially set displayName to username
            dateJoined: Timestamp.now(),
            lastActive: Timestamp.now(),
            isEmailVerified: false,
        });
    } catch (error: any) {
        throw new FirestoreError(
            'Failed to create user profile',
            error?.code
        );
    }
};

/**
 * Retrieves a user document from Firestore
 * @param uid User's ID
 * @returns Promise<UserDocument | null>
 */
export const getUserDocument = async (uid: string): Promise<UserDocument | null> => {
    try {
        const userRef = doc(db, USERS_COLLECTION, uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return userSnap.data() as UserDocument;
        }
        
        return null;
    } catch (error: any) {
        throw new FirestoreError(
            'Failed to fetch user profile',
            error?.code
        );
    }
};

/**
 * Updates specific fields in a user's document
 * @param uid User's ID
 * @param data Partial user document data to update
 * @returns Promise<void>
 */
export const updateUserDocument = async (
    uid: string,
    data: Partial<UserDocument>
): Promise<void> => {
    try {
        const userRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(userRef, {
            ...data,
            lastActive: serverTimestamp(),
        });
    } catch (error: any) {
        throw new FirestoreError(
            'Failed to update user profile',
            error?.code
        );
    }
};

/**
 * Updates the user's last active timestamp
 * @param uid User's ID
 * @returns Promise<void>
 */
export const updateLastActive = async (uid: string): Promise<void> => {
    try {
        const userRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(userRef, {
            lastActive: serverTimestamp(),
        });
    } catch (error: any) {
        throw new FirestoreError(
            'Failed to update last active timestamp',
            error?.code
        );
    }
};

/**
 * Checks if a username is already taken
 * @param username Username to check
 * @returns Promise<boolean>
 */
export const isUsernameTaken = async (username: string): Promise<boolean> => {
    try {
        const usersRef = collection(db, USERS_COLLECTION);
        const querySnapshot = await getDoc(doc(usersRef, username));
        return querySnapshot.exists();
    } catch (error: any) {
        throw new FirestoreError(
            'Failed to check username availability',
            error?.code
        );
    }
};

/**
 * Updates social stats when a user follows/unfollows another user
 * @param followerId ID of the user who is following
 * @param followedId ID of the user being followed
 * @param isFollowing Whether the user is following (true) or unfollowing (false)
 * @returns Promise<void>
 */
export const updateFollowStatus = async (
    followerId: string,
    followedId: string,
    isFollowing: boolean
): Promise<void> => {
    try {
        const followerRef = doc(db, USERS_COLLECTION, followerId);
        const followedRef = doc(db, USERS_COLLECTION, followedId);
        
        if (isFollowing) {
            // Update follower's document
            await updateDoc(followerRef, {
                following: arrayUnion(followedId),
                'socialStats.following': increment(1),
            });
            
            // Update followed user's document
            await updateDoc(followedRef, {
                followers: arrayUnion(followerId),
                'socialStats.followers': increment(1),
            });
        } else {
            // Update follower's document
            await updateDoc(followerRef, {
                following: arrayRemove(followedId),
                'socialStats.following': increment(-1),
            });
            
            // Update followed user's document
            await updateDoc(followedRef, {
                followers: arrayRemove(followerId),
                'socialStats.followers': increment(-1),
            });
        }
    } catch (error: any) {
        throw new FirestoreError(
            isFollowing ? 'Failed to follow user' : 'Failed to unfollow user',
            error?.code
        );
    }
};

/**
 * Updates a user's recipe stats
 * @param uid User's ID
 * @param recipeId ID of the recipe
 * @param isNewRecipe Whether this is a new recipe (true) or deleting a recipe (false)
 * @returns Promise<void>
 */
export const updateUserRecipeStats = async (
    uid: string,
    recipeId: string,
    isNewRecipe: boolean
): Promise<void> => {
    try {
        const userRef = doc(db, USERS_COLLECTION, uid);
        
        await updateDoc(userRef, {
            'socialStats.totalRecipes': increment(isNewRecipe ? 1 : -1),
            savedRecipes: isNewRecipe ? arrayUnion(recipeId) : arrayRemove(recipeId),
        });
    } catch (error: any) {
        throw new FirestoreError(
            isNewRecipe ? 'Failed to save recipe' : 'Failed to unsave recipe',
            error?.code
        );
    }
};

export default () => null;
