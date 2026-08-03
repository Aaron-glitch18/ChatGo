//---------------------------CODE DE BASE----------------------------//
// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// // import{StyleSheet,Text,View} from 'react-native'

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Wilkommen freund!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//               {/* <ThemedText>Hello, World!</ThemedText> */}

//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current
//           <ThemedText type="defaultSemiBold">app</ThemedText> to
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
//-------------------------------------------------------------------------------------//
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const arrow_back="<";
const arrow_next=">";
const Home =()=>{
  return(

    <View style={{flex:1,backgroundColor:'#075E54',}}>

      <View style={styles.container}>

        <Text style={styles.title}>Bienvenue sur Chat & Go</Text>

        <View style={styles.step_container}>

              <Image
                source={require('../../assets/images/first_step.png')}
                style={styles.img} 
              />

              <View>

                    <Text style={styles.step}>
                        Exprimez votre besoin simplement, gagnez du temps tous vos services sont au même endroit.
                    </Text>

              </View>
              
          </View>
          
          <View style={styles.box_btn}>

            <Link href={'/index2'}>
                  <Text style={styles.arrow}>{arrow_back}</Text>
            </Link>
            <Text style={{fontWeight:'semibold'}}>1/3</Text>

            <Link href={'/index2'}>
              {/* <Pressable style={({pressed}) => [styles.btn, pressed && styles.pressed]}> */}
                  <Text style={styles.arrow}>{arrow_next}</Text>
              {/* </Pressable> */}
            </Link>
                
          </View>
        
      </View>

    </View>
  )
}
export default Home 

const styles = StyleSheet.create({
  //utiiser pour modifier le corps de page un peu comme le body
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor:'#ece5dd',
    borderTopRightRadius:60,
    borderTopLeftRadius:60,
    // gap:70,
    marginTop:60,
    position:'relative',
  },
  //------------------------------------------------------------------//
  title:{

    backgroundColor:'#128C7E', 
    padding:10 ,
    borderRadius:30,
    color:'white',
    fontSize:18,
    fontFamily:'Source Serif Pro',
    fontWeight:'bold',
    marginTop:hp('2%'),
    position:'sticky',

  },
  step_container:{

    marginTop:-50,

  },
  img:{
    marginTop:hp('-1%'),
    width:370,
    height:350,
    marginVertical:100,

  },
  step:{

    margin:'auto',
    textAlign:'center',
    fontFamily:'Source Serif Pro',
    fontWeight:'bold',
    fontSize:20,
    width:wp('70%'),

  },
  arrow:{
      fontSize:45,
      textAlign:'center',
      // backgroundColor:'red',
  },
  btn:{
      backgroundColor:'#ccc',
      width:50,
      height:50,
      borderRadius:50,
  },
  box_btn:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    marginBottom:wp('5%'),
    gap:wp('30%'),
    // width:wp('10%'),
    // height:hp('5%'),
    // marginLeft:wp('95%'),//350,
    // position:'absolute',
    // marginTop:hp('80%'),//800,
    // marginRight:hp('5%'),
  },
  pressed:{
    backgroundColor:'#bbb',
      width:50,
      height:50,
      paddingTop:-10,
      borderRadius:50,
  }

})
