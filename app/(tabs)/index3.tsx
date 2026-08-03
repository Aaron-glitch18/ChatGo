import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const arrow_back="<";
const arrow_next=">";
const Home =()=>{
  return(
    
<View style={{flex:1,backgroundColor:'#075E54',}}>

      <View style={styles.container}>

        <Text  style={styles.title}>Consultez vos suggestions</Text>

        <View style={styles.step_container}>

              <Image
                source={require('../../assets/images/third_step.jpg')}
                style={styles.img} 
              />

              <View>

                    <Text style={styles.step}>
                       l’IA s’occupe  de vous faire des suggestion  et vous connecte instantanément au bon prestataire.
                    </Text>

              </View>
              
          </View>
          
          <View style={styles.box_btn}>

            <Link href={'/index2'}>
                  <Text style={styles.arrow}>{arrow_back}</Text>
            </Link>
            <Text style={{fontWeight:'semibold'}}>3/3</Text>

            <Link href={'/chat'}>
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
