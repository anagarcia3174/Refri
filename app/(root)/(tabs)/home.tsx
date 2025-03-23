import  useAuth  from "@/app/lib/hooks/useAuth";
import CustomButton from "@/components/CustomButton";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Home = () => {
    const { signOut } = useAuth();
    return (
        <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
            <Text>Home</Text>
            <CustomButton title="Sign Out" onPress={() => signOut()} />
        </SafeAreaView>
    );
};

export default Home;