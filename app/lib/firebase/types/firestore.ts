import { Timestamp } from "firebase/firestore";

// User's macro goals
export interface MacroGoals {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

// User's dietary preferences
export interface DietaryPreferences {
    isVegetarian: boolean;
    isVegan: boolean;
    isKeto: boolean;
    isPaleo: boolean;
    isGlutenFree: boolean;
    isDairyFree: boolean;
    allergies: string[];
    excludedIngredients: string[];
}

// User's social stats
export interface SocialStats {
    followers: number;
    following: number;
    totalRecipes: number;
    totalLikes: number;
}

// User's notification preferences
export interface NotificationPreferences {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    expiringIngredients: boolean;
    newRecipesFromFollowing: boolean;
    weeklyRecipeDigest: boolean;
}

// User's privacy settings
export interface PrivacySettings {
    isPrivateProfile: boolean;
    showEmail: boolean;
    showMacros: boolean;
    blockedUsers: string[]; // Array of user IDs
}

// Main user document structure
export interface UserDocument {
    // Basic Info
    uid: string;
    email: string;
    displayName: string;
    photoURL: string | null;
    bio: string;

    // Profile Details
    height?: number; // in cm
    weight?: number; // in kg
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
    fitnessGoal?: 'maintain' | 'lose' | 'gain';

    // Important Dates
    dateJoined: Timestamp;
    lastActive: Timestamp;
    birthDate?: Timestamp;

    // Goals and Preferences
    macroGoals: MacroGoals;
    dietaryPreferences: DietaryPreferences;

    // Social
    socialStats: SocialStats;
    savedRecipes: string[]; // Array of recipe IDs
    following: string[]; // Array of user IDs
    followers: string[]; // Array of user IDs

    // Settings
    notificationPreferences: NotificationPreferences;
    privacySettings: PrivacySettings;
    
    // Premium Features
    isPremium: boolean;
    premiumExpiryDate?: Timestamp;

    // Metadata
    isOnboarded: boolean;
    isEmailVerified: boolean;
}

// Default values for new users
export const defaultUserDocument: Omit<UserDocument, 'uid' | 'email' | 'displayName' > = {
    photoURL: null,
    bio: '',
    dateJoined: Timestamp.now(),
    lastActive: Timestamp.now(),
    
    macroGoals: {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fat: 65,
    },
    
    dietaryPreferences: {
        isVegetarian: false,
        isVegan: false,
        isKeto: false,
        isPaleo: false,
        isGlutenFree: false,
        isDairyFree: false,
        allergies: [],
        excludedIngredients: [],
    },
    
    socialStats: {
        followers: 0,
        following: 0,
        totalRecipes: 0,
        totalLikes: 0,
    },
    
    notificationPreferences: {
        likes: true,
        comments: true,
        follows: true,
        expiringIngredients: true,
        newRecipesFromFollowing: true,
        weeklyRecipeDigest: true,
    },
    
    privacySettings: {
        isPrivateProfile: false,
        showEmail: false,
        showMacros: true,
        blockedUsers: [],
    },
    
    savedRecipes: [],
    following: [],
    followers: [],
    
    isPremium: false,
    isOnboarded: false,
    isEmailVerified: false,
}; 


export default () => null;
