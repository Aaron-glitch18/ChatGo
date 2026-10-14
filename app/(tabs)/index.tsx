import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const Home = () =>{
    return(
        <View style={style.container}>
            <View style={{marginTop:hp('-15%')}}>
                <Link href={'/index1'}>
                    <Image style={style.img} source={require('../../assets/images/Gemini_Generated_Image_9y3sz99y3sz99y3s.png')}/>
                </Link>
                <Text style={{textAlign:"center",fontSize:15,fontWeight:'bold'}}>Tout vos besoins en un endroit</Text>
            </View>
        </View>
    )
}
export default Home

const style=StyleSheet.create({
    img:{

        marginTop:-150,
        // marginHorizontal:30,
        width:wp('60%'),
        height:hp('25%'),
        // borderRadius:80,

    },
    container:{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        backgroundColor:"#ece5d5",
    }

})