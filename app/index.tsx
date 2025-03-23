import { Redirect} from "expo-router";
import  useAuth  from "@/app/lib/hooks/useAuth";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const { user, isLoading } = useAuth();
  if(isLoading){
    return <ActivityIndicator size="large" />;

  }

  if(user){
    return <Redirect href={"/(root)/(tabs)/home"}  />;
  }else{
    return <Redirect href={"/(auth)/welcome"}  />;
  }

}
