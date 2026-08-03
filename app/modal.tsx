import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
//---------------------Code de base--------------------------------6--------------//
// import {
//     Alert,
//     FlatList,
//     Image,
//     ImageBackground,
//     KeyboardAvoidingView,
//     Pressable,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
// } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// // Type pour les messages
// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'bot';
// }

// const Home = () => {
//   const [question, setQuestion] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);

//   const envoyer = async () => {
//     const trimmed = question.trim();
//     if (!trimmed) {
//       Alert.alert('Veuillez saisir une question');
//       return;
//     }

//     // Ajouter le message de l'utilisateur
//     const userMsg: Message = {
//       id: Date.now().toString(),
//       text: trimmed,
//       sender: 'user',
//     };
//     setMessages((prev) => [...prev, userMsg]);
//     setQuestion(''); // vider le champ

//     // Appeler l'API et attendre la réponse
//     const reply = await CallAPI(trimmed);
//     if (reply) {
//       const botMsg: Message = {
//         id: (Date.now() + 1).toString(),
//         text: reply,
//         sender: 'bot',
//       };
//       setMessages((prev) => [...prev, botMsg]);
//     }
//   };

//   async function CallAPI(question: string): Promise<string | null> {
//     const url = 'https://october-gumminess-maybe.ngrok-free.dev/webhook-test/saisie/ask';
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ask: question,
//           sessionId: 'user123', // session fixe pour le test
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error ${response.status}`);
//       }

//       const data = await response.json();
//       // La réponse peut être un tableau avec un output, ou un objet direct
//       const reply = data[0]?.output || data.output || 'Désolé, je n’ai pas compris.';
//       return reply;
//     } catch (error) {
//       console.error('Erreur CallAPI:', error);
//       return 'Erreur de communication avec le serveur.';
//     }
//   }

//   return (
//     <KeyboardAvoidingView behavior="padding" style={styles.container}>
//       {/* Image d'arrière-plan + zone de chat */}
//       <View style={{ flex: 1 }}>
//         <ImageBackground
//           source={require('../../assets/images/font_chat.jpg')}
//           style={{ flex: 1, marginTop: 60, borderRadius: 60 }}
//         >
//           {/* Liste des messages */}
//           <FlatList
//             data={messages}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View
//                 style={[
//                   styles.messageBubble,
//                   item.sender === 'user' ? styles.userBubble : styles.botBubble,
//                 ]}
//               >
//                 <Text style={styles.messageText}>{item.text}</Text>
//               </View>
//             )}
//             contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
//             style={{ flex: 1 }}
//           />
//         </ImageBackground>
//       </View>

//       {/* Zone de saisie en bas */}
//       <View style={styles.saisi}>
//         <TextInput
//           style={styles.input}
//           placeholder="Comment puis-je vous aider..."
//           placeholderTextColor="grey"
//           value={question}
//           onChangeText={setQuestion}
//         />
//         <Pressable
//           style={({ pressed }) => ({
//             opacity: pressed ? 0.5 : 1,
//           })}
//           onPress={envoyer}
//         >
//           <Image source={require('../../assets/images/send.png')} style={{ marginRight: 10 }} />
//         </Pressable>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#128C7E',
//     justifyContent: 'flex-end',
//   },
//   saisi: {
//     height: hp('9%'),
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     marginBottom: 0, // Suppression des marges négatives pour éviter les décalages
//   },
//   input: {
//     height: hp('5%'),
//     width: wp('80%'),
//     borderWidth: 1,
//     backgroundColor: '#222',
//     borderRadius: 15,
//     color: 'white',
//     paddingLeft: 15,
//     fontSize: 17,
//     marginRight: 10,
//   },
//   messageBubble: {
//     maxWidth: '80%',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 4,
//   },
//   userBubble: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#25D366',
//   },
//   botBubble: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#E5E5EA',
//   },
//   messageText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });