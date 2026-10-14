// import { Tabs } from 'expo-router';
// import React from 'react';

// import { HapticTab } from '@/components/haptic-tab';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Acceuil',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
//----------------------code-de-base----------------------------------------------//
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    />
  );
}
// 
// import { Link, Slot } from "expo-router";
// import { StyleSheet, Text, View } from "react-native";

// const footer=()=>{
//   return(
//     <View style={styles.footer}>
//       <Slot />
//       <Link href="/index3">
//         <Text style={styles.text_footer}>1/3</Text>
//       </Link>
//     </View>
// )

// }
// export default footer
// const styles = StyleSheet.create({
//   footer:{
//     flex:1,
//     backgroundColor:'#ece5dd',
//     paddingBottom:30,
//     textAlign:'center',
//   },
//   text_footer:{
//     textAlign:'center',
//   }

// })