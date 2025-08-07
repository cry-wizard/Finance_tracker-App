import { useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { styles } from "../assets/styles/home.styles.js";


export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    // try {
    //   await signOut()
    //   // Redirect to your desired page
    //   Linking.openURL(Linking.createURL('/'))
    // } catch (err) {
    //   // See https://clerk.com/docs/custom-flows/error-handling
    //   // for more info on error handling
    //   console.error(JSON.stringify(err, null, 2))
    // }
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout", style: "destructive",
        // Call the signOut function when the user confirms
        onPress: async () => {await signOut()},
      },
    ])
  }
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={24} color="black" />
    </TouchableOpacity>
  )
}