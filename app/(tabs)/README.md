### Chat \& Go - Assistant Conversationnel

### 

##### Table des matières



1. Présentation du projet
2. Fonctionnalités principales
3. Architecture technique
4. Structure des fichiers
5. Explication détaillée du code

Gestion des messages

Communication API

Détection intelligente

Animations et UX

Onboarding utilisateur

6. Styles et design
7. Gestion des erreurs
8. Dépendances principales
9. Installation et configuration
10. Contribution





\## 🎯 Présentation du projet



\*\*Chat \& Go\*\* est une application mobile développée avec \*\*React Native\*\* (via Expo) qui propose un assistant conversationnel intelligent. L'application permet aux utilisateurs d'interagir avec une IA pour trouver des services et être mis en relation avec des prestataires adaptés à leurs besoins.



\### Objectifs



\- Offrir une interface de chat fluide et intuitive

\- Permettre à l'IA de comprendre les besoins des utilisateurs

\- Détecter automatiquement les informations de contact (téléphone, email, URL)

\- Proposer des actions contextuelles (appel, WhatsApp, email)

\- Guider l'utilisateur via un onboarding en 3 étapes



\---



\## ✨ Fonctionnalités principales



\### Interface utilisateur



\- ✅ \*\*Onboarding interactif\*\* en 3 étapes avec navigation

\- ✅ \*\*Chat en temps réel\*\* avec assistant IA

\- ✅ \*\*Détection automatique\*\* des :

&#x20; - URLs (cliquables)

&#x20; - Numéros de téléphone (appel direct ou WhatsApp)

&#x20; - Adresses email (envoi de mail)

\- ✅ \*\*Indicateur de frappe\*\* (TypingIndicator)

\- ✅ \*\*Animations fluides\*\* avec React Native Reanimated

\- ✅ \*\*Scroll automatique\*\* vers le bas des messages

\- ✅ \*\*Design responsive\*\* avec `react-native-responsive-screen`



\### Backend



\- 🔗 Intégration avec API externe (FastAPI/Ngrok)

\- 📡 Communication via requêtes POST en JSON

\- 🔄 Gestion des sessions utilisateur



\---



\## 🏗️ Architecture technique



\### Stack technologique

|Technologie|Version|Rôle|
|-|-|-|
|React Native|0.72+|Framework modile|
|Expo|54(ios)|Plateforme de dévelopement|
|Type Script|5.0+|Typage statique|
|React Native Reanimated|-|Animations|
|React Native Parsed Text|-|Indicateur de frappe|
|React Native Responsive screen|-|Design adaptatif|





\### esquisse du flux de données





|Utilisateur Saisie|Question State|chat.tsx envoyer()|API Call FastAPI]|Réponse Bot]|Message State|Affichage FlatList]|
|-|-|-|-|-|-|-|



\###Explication du Code

```



interface Message {

\\\\\\\\\\\\\\\&#x20;   id: string;          // Identifiant unique (généré avec Date.now())

\\\\\\\\\\\\\\\&#x20;   text: string;        // Contenu du message

\\\\\\\\\\\\\\\&#x20;   sender?: 'user' | 'bot';  // Expéditeur

}





\\\\\\\\\\\\\\\\###Etats principaux



// Liste des messages affichés dans le chat

const \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[response, setResponse] = useState<Message\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[]>(\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[

\\\\\\\\\\\\\\\&#x20;   {

\\\\\\\\\\\\\\\&#x20;       id: "intro",

\\\\\\\\\\\\\\\&#x20;       text: "Bienvenue sur Chat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\& Go ton assistant conversationnel, j'ai pour mission de t'aider à trouver les services de ton choix en te mettant en relation avec les différents prestataires",

\\\\\\\\\\\\\\\&#x20;       sender: 'bot',

\\\\\\\\\\\\\\\&#x20;   }

]);



// Champ de saisie utilisateur

const \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[question, setQuestion] = useState('');



// Indicateur de frappe (pour le message "en train d'écrire")

const \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[isTyping, setIsTyping] = useState(false);



// Référence vers la FlatList pour le défilement automatique

const flatListRef = useRef<FlatList>(null);

\\\\\\\\\\\\\\\\###fonction d'envoi (envoyer)



const envoyer = async () => {

\\\\\\\\\\\\\\\&#x20;   // 1️⃣ Validation du champ de saisie

\\\\\\\\\\\\\\\&#x20;   if (!question.trim()) {

\\\\\\\\\\\\\\\&#x20;       Alert.alert('veuillez saisir une chaine de caractère');

\\\\\\\\\\\\\\\&#x20;       return;

\\\\\\\\\\\\\\\&#x20;   }



\\\\\\\\\\\\\\\&#x20;   // 2️⃣ Ajout du message de l'utilisateur dans l'état

\\\\\\\\\\\\\\\&#x20;   const userMsg: Message = {

\\\\\\\\\\\\\\\&#x20;       id: Date.now().toString(),

\\\\\\\\\\\\\\\&#x20;       text: question,

\\\\\\\\\\\\\\\&#x20;       sender: 'user',

\\\\\\\\\\\\\\\&#x20;   };

\\\\\\\\\\\\\\\&#x20;   setResponse((prev) => \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[...prev, userMsg]);

\\\\\\\\\\\\\\\&#x20;   setQuestion(''); // Réinitialisation du champ

\\\\\\\\\\\\\\\&#x20;   

\\\\\\\\\\\\\\\&#x20;   // 3️⃣ Affichage de l'indicateur de frappe

\\\\\\\\\\\\\\\&#x20;   setIsTyping(true);



\\\\\\\\\\\\\\\&#x20;   // 4️⃣ Appel à l'API pour obtenir la réponse

\\\\\\\\\\\\\\\&#x20;   const reponse = await CallAPI(question);

\\\\\\\\\\\\\\\&#x20;   setIsTyping(false); // Masquer l'indicateur



\\\\\\\\\\\\\\\&#x20;   // 5️⃣ Ajout de la réponse du bot dans l'état

\\\\\\\\\\\\\\\&#x20;   if (reponse) {

\\\\\\\\\\\\\\\&#x20;       const botMsg: Message = {

\\\\\\\\\\\\\\\&#x20;           id: (Date.now() + 1).toString(),

\\\\\\\\\\\\\\\&#x20;           text: reponse,

\\\\\\\\\\\\\\\&#x20;           sender: 'bot',

\\\\\\\\\\\\\\\&#x20;       };

\\\\\\\\\\\\\\\&#x20;       setResponse((prev) => \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[...prev, botMsg]);

\\\\\\\\\\\\\\\&#x20;   }

};



\\\\\\\\\\\\\\\\###Défilement automatique



useEffect(() => {

\\\\\\\\\\\\\\\&#x20;   // Scroll vers le bas à chaque nouveau message ou changement d'état de frappe

\\\\\\\\\\\\\\\&#x20;   flatListRef.current?.scrollToEnd({ animated: true });

}, \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[response, isTyping]);





\\\\\\\\\\\\\\\\#Communication API



async function CallAPI(question: string) {

\\\\\\\\\\\\\\\&#x20;   // L'API est exposée via Ngrok pour le développement

\\\\\\\\\\\\\\\&#x20;   const url\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_post = 'https://october-gumminess-maybe.ngrok-free.dev/webhook/saisie/ask';

\\\\\\\\\\\\\\\&#x20;   

\\\\\\\\\\\\\\\&#x20;   try {

\\\\\\\\\\\\\\\&#x20;       const response = await fetch(url\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_post, {

\\\\\\\\\\\\\\\&#x20;           method: 'POST',

\\\\\\\\\\\\\\\&#x20;           headers: {

\\\\\\\\\\\\\\\&#x20;               'Content-Type': 'application/json'

\\\\\\\\\\\\\\\&#x20;           },

\\\\\\\\\\\\\\\&#x20;           body: JSON.stringify({

\\\\\\\\\\\\\\\&#x20;               ask: question,          // La question posée par l'utilisateur

\\\\\\\\\\\\\\\&#x20;               sessionId: 7633136791    // Identifiant de session (persistance)

\\\\\\\\\\\\\\\&#x20;           })

\\\\\\\\\\\\\\\&#x20;       });

\\\\\\\\\\\\\\\&#x20;       

\\\\\\\\\\\\\\\&#x20;       const data = await response.json();

\\\\\\\\\\\\\\\&#x20;       // Extraction de la réponse du bot

\\\\\\\\\\\\\\\&#x20;       const reponse = data\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\['output'];

\\\\\\\\\\\\\\\&#x20;       

\\\\\\\\\\\\\\\&#x20;       // Fallback si la réponse est vide

\\\\\\\\\\\\\\\&#x20;       return reponse || 'Désolé, je n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ai pas compris votre question, pouvez-vous la reformuler ?';

\\\\\\\\\\\\\\\&#x20;   } catch (error) {

\\\\\\\\\\\\\\\&#x20;       // Gestion des erreurs de communication

\\\\\\\\\\\\\\\&#x20;       return 'Erreur de communication avec le serveur' + error;

\\\\\\\\\\\\\\\&#x20;   }

}

```

Points importants :



Méthode : POST avec Content-Type: application/json



Corps : { ask: string, sessionId: number }



Réponse : Tableau contenant le champ output



Ngrok : Tunnel HTTPS pour les tests locaux(servant de serveur pour n8n car héberger en local)





\###Détection intelligente



Composant ParsedText

Le composant ParsedText détecte automatiquement les entités dans le texte :

```

<ParsedText

\\\\\\\\\\\\\\\&#x20;   parse={\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[

\\\\\\\\\\\\\\\&#x20;       // 1️⃣ Détection des URLs

\\\\\\\\\\\\\\\&#x20;       {

\\\\\\\\\\\\\\\&#x20;           type: 'url',

\\\\\\\\\\\\\\\&#x20;           style: styles.url,

\\\\\\\\\\\\\\\&#x20;           onPress: handlUrlPress,  // Ouvre le lien dans le navigateur

\\\\\\\\\\\\\\\&#x20;       },

\\\\\\\\\\\\\\\&#x20;       // 2️⃣ Détection des numéros de téléphone

\\\\\\\\\\\\\\\&#x20;       {

\\\\\\\\\\\\\\\&#x20;           type: 'phone',

\\\\\\\\\\\\\\\&#x20;           style: styles.phone,

\\\\\\\\\\\\\\\&#x20;           onPress: createThreeButtonAlert,  // Menu contextuel

\\\\\\\\\\\\\\\&#x20;       },

\\\\\\\\\\\\\\\&#x20;       // 3️⃣ Détection des emails

\\\\\\\\\\\\\\\&#x20;       {

\\\\\\\\\\\\\\\&#x20;           type: 'email',

\\\\\\\\\\\\\\\&#x20;           style: styles.email,

\\\\\\\\\\\\\\\&#x20;           onPress: handlEmailPress,  // Ouvre le client mail

\\\\\\\\\\\\\\\&#x20;       },

\\\\\\\\\\\\\\\&#x20;   ]}

\\\\\\\\\\\\\\\&#x20;   childrenProps={{ allowFontScaling: false }}

>

\\\\\\\\\\\\\\\&#x20;   {item.text}

</ParsedText>



\\\\\\\\\\\\\\\\#Actions contextuelles pour les numéros



const createThreeButtonAlert = (phone: string) =>

\\\\\\\\\\\\\\\&#x20;   Alert.alert(

\\\\\\\\\\\\\\\&#x20;       'Alert Title',

\\\\\\\\\\\\\\\&#x20;       'Quel action souhaitez-vous effectuer ?',

\\\\\\\\\\\\\\\&#x20;       \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[

\\\\\\\\\\\\\\\&#x20;           {

\\\\\\\\\\\\\\\&#x20;               text: 'Continuer la discussion',

\\\\\\\\\\\\\\\&#x20;               onPress: () => console.log("Continue"),

\\\\\\\\\\\\\\\&#x20;           },

\\\\\\\\\\\\\\\&#x20;           {

\\\\\\\\\\\\\\\&#x20;               text: 'Discutons sur Whatsapp',

\\\\\\\\\\\\\\\&#x20;               onPress: () => chatWhatsapp(phone), // Redirection vers WhatsApp

\\\\\\\\\\\\\\\&#x20;           },

\\\\\\\\\\\\\\\&#x20;           {

\\\\\\\\\\\\\\\&#x20;               text: 'Appel',

\\\\\\\\\\\\\\\&#x20;               onPress: () => handlPhonePress(phone),

\\\\\\\\\\\\\\\&#x20;               style: 'cancel',

\\\\\\\\\\\\\\\&#x20;           },

\\\\\\\\\\\\\\\&#x20;       ]

\\\\\\\\\\\\\\\&#x20;   );



\\\\\\\\\\\\\\\\#Fonctions utilitaires pour les actions



// 1️⃣ Appel téléphonique

const handlPhonePress = (phone: string) => {

\\\\\\\\\\\\\\\&#x20;   Linking.openURL(`telprompt:${phone}`);

};



// 2️⃣ WhatsApp

const chatWhatsapp = (phone: string) => {

\\\\\\\\\\\\\\\&#x20;   const numero = phone.replace(/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\D/g, ''); // Nettoie le numéro

\\\\\\\\\\\\\\\&#x20;   Linking.openURL(`https://wa.me/${numero}`);

};



// 3️⃣ Email

const handlEmailPress = (email: string) => {

\\\\\\\\\\\\\\\&#x20;   Linking.openURL(`mailto:${email}`);

};



// 4️⃣ URL

const handlUrlPress = (url: string) => {

\\\\\\\\\\\\\\\&#x20;   Linking.openURL(url);

};





\\\\\\\\\\\\\\\\#Animations et UX



Animation d'entrée des messages



<Animated.View

\\\\\\\\\\\\\\\&#x20;   key={'uniqueKey'}

\\\\\\\\\\\\\\\&#x20;   entering={FadeInDown.duration(400)}  // Animation de 400ms

\\\\\\\\\\\\\\\&#x20;   style={\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[

\\\\\\\\\\\\\\\&#x20;       styles.messageContainer,

\\\\\\\\\\\\\\\&#x20;       item.sender === 'user' ? styles.userBubble : styles.botBubble

\\\\\\\\\\\\\\\&#x20;   ]}

>

\\\\\\\\\\\\\\\&#x20;   <ParsedText>...</ParsedText>

</Animated.View>



\\\\\\\\\\\\\\\\#Indicateur de Frappe



<ListFooterComponent={

\\\\\\\\\\\\\\\&#x20;   isTyping ? (

\\\\\\\\\\\\\\\&#x20;       <Animated.View

\\\\\\\\\\\\\\\&#x20;           entering={FadeInDown.duration(300)}

\\\\\\\\\\\\\\\&#x20;           style={\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[styles.messageContainer, styles.botBubble]}

\\\\\\\\\\\\\\\&#x20;       >

\\\\\\\\\\\\\\\&#x20;           <TypingIndicator

\\\\\\\\\\\\\\\&#x20;               dotColor="#666666"

\\\\\\\\\\\\\\\&#x20;               dotRadius={4}

\\\\\\\\\\\\\\\&#x20;               dotMargin={4}

\\\\\\\\\\\\\\\&#x20;               animationPreset="wave"  // Effet de vague

\\\\\\\\\\\\\\\&#x20;           />

\\\\\\\\\\\\\\\&#x20;       </Animated.View>

\\\\\\\\\\\\\\\&#x20;   ) : null

}

/>



Effet de pression sur le bouton



<Pressable 

\\\\\\\\\\\\\\\&#x20;   style={({ pressed }) => ({

\\\\\\\\\\\\\\\&#x20;       opacity: pressed ? 0.5 : 1  // Réduction de l'opacité quand pressé

\\\\\\\\\\\\\\\&#x20;   })} 

\\\\\\\\\\\\\\\&#x20;   onPress={envoyer}

>

\\\\\\\\\\\\\\\&#x20;   <Image source={require('../../assets/images/send.png')} />

</Pressable>

```





5.Onboarding utilisateur



Les fichiers index1.tsx, index2.tsx, index3.tsx forment un tutoriel en 3 étapes pour présenter l'application.



Structure d'une étape

```

const Home = () => {

\\\\\\\\\\\\\\\&#x20;   return (

\\\\\\\\\\\\\\\&#x20;       <View style={{flex:1, backgroundColor:'#075E54'}}>

\\\\\\\\\\\\\\\&#x20;           <View style={styles.container}>

\\\\\\\\\\\\\\\&#x20;               {/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 1️⃣ Titre de l'étape \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

\\\\\\\\\\\\\\\&#x20;               <Text style={styles.title}>Bienvenue sur Chat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\& Go</Text>

\\\\\\\\\\\\\\\&#x20;               

\\\\\\\\\\\\\\\&#x20;               {/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 2️⃣ Contenu : image + description \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

\\\\\\\\\\\\\\\&#x20;               <View style={styles.step\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_container}>

\\\\\\\\\\\\\\\&#x20;                   <Image source={require('...')} style={styles.img} />

\\\\\\\\\\\\\\\&#x20;                   <Text style={styles.step}>

\\\\\\\\\\\\\\\&#x20;                       Exprimez votre besoin simplement, gagnez du temps...

\\\\\\\\\\\\\\\&#x20;                   </Text>

\\\\\\\\\\\\\\\&#x20;               </View>

\\\\\\\\\\\\\\\&#x20;               

\\\\\\\\\\\\\\\&#x20;               {/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 3️⃣ Navigation \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

\\\\\\\\\\\\\\\&#x20;               <View style={styles.box\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_btn}>

\\\\\\\\\\\\\\\&#x20;                   <Link href={'/index1'}>

\\\\\\\\\\\\\\\&#x20;                       <Text style={styles.arrow}>{'<'}</Text>

\\\\\\\\\\\\\\\&#x20;                   </Link>

\\\\\\\\\\\\\\\&#x20;                   <Text>1/3</Text>

\\\\\\\\\\\\\\\&#x20;                   <Link href={'/index2'}>

\\\\\\\\\\\\\\\&#x20;                       <Text style={styles.arrow}>{'>'}</Text>

\\\\\\\\\\\\\\\&#x20;                   </Link>

\\\\\\\\\\\\\\\&#x20;               </View>

\\\\\\\\\\\\\\\&#x20;           </View>

\\\\\\\\\\\\\\\&#x20;       </View>

\\\\\\\\\\\\\\\&#x20;   );

};

```



Navigation entre les étapes



```

// Navigation basée sur Expo Router

<Link href={'/index1'}>  {/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Retour \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

<Link href={'/index2'}>  {/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Suivant \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

<Link href={'/index3'}>  {/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Suivant \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

<Link href={'/chat'}>    {/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Dernière étape vers le chat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

```



🎨 Styles et design

Système de couleurs (thème WhatsApp)

```



// Couleurs principales

'#128C7E'  // Vert WhatsApp (header)

'#075E54'  // Vert foncé (fond des pages d'onboarding)

'#ece5dd'  // Beige clair (fond des containers)

'#25D366'  // Vert clair (bulle utilisateur)

'#E5E5EA'  // Gris (bulle bot)

'#222'     // Gris foncé (champ de saisie)



const styles = StyleSheet.create({

\\\\\\\\\\\\\\\&#x20;   // Bulle utilisateur (à droite)

\\\\\\\\\\\\\\\&#x20;   userBubble: {

\\\\\\\\\\\\\\\&#x20;       alignSelf: 'flex-end',

\\\\\\\\\\\\\\\&#x20;       backgroundColor: '#25D366',

\\\\\\\\\\\\\\\&#x20;       marginRight: 10,

\\\\\\\\\\\\\\\&#x20;       borderBottomRightRadius: 0,  // Effet "queue" de chat

\\\\\\\\\\\\\\\&#x20;   },

\\\\\\\\\\\\\\\&#x20;   // Bulle bot (à gauche)

\\\\\\\\\\\\\\\&#x20;   botBubble: {

\\\\\\\\\\\\\\\&#x20;       alignSelf: 'flex-start',

\\\\\\\\\\\\\\\&#x20;       backgroundColor: '#E5E5EA',

\\\\\\\\\\\\\\\&#x20;       marginLeft: 10,

\\\\\\\\\\\\\\\&#x20;       borderBottomLeftRadius: 0,   // Effet "queue" de chat

\\\\\\\\\\\\\\\&#x20;   },

});



import { 

\\\\\\\\\\\\\\\&#x20;   heightPercentageToDP as hp,   // Pourcentages de hauteur

\\\\\\\\\\\\\\\&#x20;   widthPercentageToDP as wp     // Pourcentages de largeur

} from 'react-native-responsive-screen';



// Utilisation

width: wp('85%')    // 85% de la largeur de l'écran

height: hp('4%')    // 4% de la hauteur de l'écran

marginTop: hp('2%')

```



|Type d'erreur|Gestion|
|-|-|
|Champs de saisie VIDE|Alert.alert() avec message d'erreur|
|Erreur réseau|Try/catch avec message utilisateur|
|Réponse API vide|Fallback avec message par défaut|
|Erreur de parsing JSON|Catch et message d'erreur|





Exemples d'implémentation

```

// 1️⃣ Validation du champ de saisie

if (!question.trim()) {

\\\\\\\\\\\\\\\&#x20;   Alert.alert('veuillez saisir une chaine de caractère');

\\\\\\\\\\\\\\\&#x20;   return;

}



// 2️⃣ Gestion de l'appel API

try {

\\\\\\\\\\\\\\\&#x20;   const response = await fetch(...);

\\\\\\\\\\\\\\\&#x20;   const data = await response.json();

\\\\\\\\\\\\\\\&#x20;   return data\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\['output'] || 'Message par défaut';

} catch (error) {

\\\\\\\\\\\\\\\&#x20;   return 'Erreur de communication avec le serveur' + error;

}

```

🚀 Installation et configuration

Prérequis

* Node.js 16+



* npm ou yarn



* Expo CLI



* Simulateur iOS (Xcode) ou Android (Android Studio)

