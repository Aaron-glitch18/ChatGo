Chat & Go - Assistant Conversationnel	

Table des matières

Présentation du projet

Fonctionnalités principales

Architecture technique

Structure des fichiers

Explication détaillée du code

Gestion des messages

Communication API

Détection intelligente

Animations et UX

Onboarding utilisateur

Styles et design

Gestion des erreurs

Dépendances principales

Installation et configuration

Contribution


## 🎯 Présentation du projet

**Chat & Go** est une application mobile développée avec **React Native** (via Expo) qui propose un assistant conversationnel intelligent. L'application permet aux utilisateurs d'interagir avec une IA pour trouver des services et être mis en relation avec des prestataires adaptés à leurs besoins.

### Objectifs

- Offrir une interface de chat fluide et intuitive
- Permettre à l'IA de comprendre les besoins des utilisateurs
- Détecter automatiquement les informations de contact (téléphone, email, URL)
- Proposer des actions contextuelles (appel, WhatsApp, email)
- Guider l'utilisateur via un onboarding en 3 étapes

---

## ✨ Fonctionnalités principales

### Interface utilisateur

- ✅ **Onboarding interactif** en 3 étapes avec navigation
- ✅ **Chat en temps réel** avec assistant IA
- ✅ **Détection automatique** des :
  - URLs (cliquables)
  - Numéros de téléphone (appel direct ou WhatsApp)
  - Adresses email (envoi de mail)
- ✅ **Indicateur de frappe** (TypingIndicator)
- ✅ **Animations fluides** avec React Native Reanimated
- ✅ **Scroll automatique** vers le bas des messages
- ✅ **Design responsive** avec `react-native-responsive-screen`

### Backend

- 🔗 Intégration avec API externe (FastAPI/Ngrok)
- 📡 Communication via requêtes POST en JSON
- 🔄 Gestion des sessions utilisateur

---

## 🏗️ Architecture technique

### Stack technologique
Technologie	Version	Rôle
React Native	0.72+	Framework modile
Expo	54(ios)	Plateforme de dévelopement
Type Script	5.0+	Typage statique
React Native Reanimated	-	Animations
React Native Parsed Text	-	Indicateur de frappe
React Native Responsive screen	-	Design adaptatif


### esquisse du flux de données


Utilisateur Saisie	Question State	chat.tsx envoyer()	API Call FastAPI]	Réponse Bot]	Message State	Affichage FlatList]

###Explication du Code
```

interface Message {
    id: string;          // Identifiant unique (généré avec Date.now())
    text: string;        // Contenu du message
    sender?: 'user' | 'bot';  // Expéditeur
}


###Etats principaux

// Liste des messages affichés dans le chat
const [response, setResponse] = useState<Message[]>([
    {
        id: "intro",
        text: "Bienvenue sur Chat & Go ton assistant conversationnel, j'ai pour mission de t'aider à trouver les services de ton choix en te mettant en relation avec les différents prestataires",
        sender: 'bot',
    }
]);

// Champ de saisie utilisateur
const [question, setQuestion] = useState('');

// Indicateur de frappe (pour le message "en train d'écrire")
const [isTyping, setIsTyping] = useState(false);

// Référence vers la FlatList pour le défilement automatique
const flatListRef = useRef<FlatList>(null);
###fonction d'envoi (envoyer)

const envoyer = async () => {
    // 1️⃣ Validation du champ de saisie
    if (!question.trim()) {
        Alert.alert('veuillez saisir une chaine de caractère');
        return;
    }

    // 2️⃣ Ajout du message de l'utilisateur dans l'état
    const userMsg: Message = {
        id: Date.now().toString(),
        text: question,
        sender: 'user',
    };
    setResponse((prev) => [...prev, userMsg]);
    setQuestion(''); // Réinitialisation du champ
    
    // 3️⃣ Affichage de l'indicateur de frappe
    setIsTyping(true);

    // 4️⃣ Appel à l'API pour obtenir la réponse
    const reponse = await CallAPI(question);
    setIsTyping(false); // Masquer l'indicateur

    // 5️⃣ Ajout de la réponse du bot dans l'état
    if (reponse) {
        const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            text: reponse,
            sender: 'bot',
        };
        setResponse((prev) => [...prev, botMsg]);
    }
};

###Défilement automatique

useEffect(() => {
    // Scroll vers le bas à chaque nouveau message ou changement d'état de frappe
    flatListRef.current?.scrollToEnd({ animated: true });
}, [response, isTyping]);


#Communication API

async function CallAPI(question: string) {
    // L'API est exposée via Ngrok pour le développement
    const url_post = 'https://october-gumminess-maybe.ngrok-free.dev/webhook/saisie/ask';
    
    try {
        const response = await fetch(url_post, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ask: question,          // La question posée par l'utilisateur
                sessionId: 7633136791    // Identifiant de session (persistance)
            })
        });
        
        const data = await response.json();
        // Extraction de la réponse du bot
        const reponse = data[0]['output'];
        
        // Fallback si la réponse est vide
        return reponse || 'Désolé, je n\'ai pas compris votre question, pouvez-vous la reformuler ?';
    } catch (error) {
        // Gestion des erreurs de communication
        return 'Erreur de communication avec le serveur' + error;
    }
}
```
Points importants :

Méthode : POST avec Content-Type: application/json

Corps : { ask: string, sessionId: number }

Réponse : Tableau contenant le champ output

Ngrok : Tunnel HTTPS pour les tests locaux(servant de serveur pour n8n car héberger en local)


###Détection intelligente

Composant ParsedText
Le composant ParsedText détecte automatiquement les entités dans le texte :
```
<ParsedText
    parse={[
        // 1️⃣ Détection des URLs
        {
            type: 'url',
            style: styles.url,
            onPress: handlUrlPress,  // Ouvre le lien dans le navigateur
        },
        // 2️⃣ Détection des numéros de téléphone
        {
            type: 'phone',
            style: styles.phone,
            onPress: createThreeButtonAlert,  // Menu contextuel
        },
        // 3️⃣ Détection des emails
        {
            type: 'email',
            style: styles.email,
            onPress: handlEmailPress,  // Ouvre le client mail
        },
    ]}
    childrenProps={{ allowFontScaling: false }}
>
    {item.text}
</ParsedText>

#Actions contextuelles pour les numéros

const createThreeButtonAlert = (phone: string) =>
    Alert.alert(
        'Alert Title',
        'Quel action souhaitez-vous effectuer ?',
        [
            {
                text: 'Continuer la discussion',
                onPress: () => console.log("Continue"),
            },
            {
                text: 'Discutons sur Whatsapp',
                onPress: () => chatWhatsapp(phone), // Redirection vers WhatsApp
            },
            {
                text: 'Appel',
                onPress: () => handlPhonePress(phone),
                style: 'cancel',
            },
        ]
    );

#Fonctions utilitaires pour les actions

// 1️⃣ Appel téléphonique
const handlPhonePress = (phone: string) => {
    Linking.openURL(`telprompt:${phone}`);
};

// 2️⃣ WhatsApp
const chatWhatsapp = (phone: string) => {
    const numero = phone.replace(/\D/g, ''); // Nettoie le numéro
    Linking.openURL(`https://wa.me/${numero}`);
};

// 3️⃣ Email
const handlEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
};

// 4️⃣ URL
const handlUrlPress = (url: string) => {
    Linking.openURL(url);
};


#Animations et UX

Animation d'entrée des messages

<Animated.View
    key={'uniqueKey'}
    entering={FadeInDown.duration(400)}  // Animation de 400ms
    style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userBubble : styles.botBubble
    ]}
>
    <ParsedText>...</ParsedText>
</Animated.View>

#Indicateur de Frappe

<ListFooterComponent={
    isTyping ? (
        <Animated.View
            entering={FadeInDown.duration(300)}
            style={[styles.messageContainer, styles.botBubble]}
        >
            <TypingIndicator
                dotColor="#666666"
                dotRadius={4}
                dotMargin={4}
                animationPreset="wave"  // Effet de vague
            />
        </Animated.View>
    ) : null
}
/>

Effet de pression sur le bouton

<Pressable 
    style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1  // Réduction de l'opacité quand pressé
    })} 
    onPress={envoyer}
>
    <Image source={require('../../assets/images/send.png')} />
</Pressable>
```


5.Onboarding utilisateur

Les fichiers index1.tsx, index2.tsx, index3.tsx forment un tutoriel en 3 étapes pour présenter l'application.

Structure d'une étape
```
const Home = () => {
    return (
        <View style={{flex:1, backgroundColor:'#075E54'}}>
            <View style={styles.container}>
                {/* 1️⃣ Titre de l'étape */}
                <Text style={styles.title}>Bienvenue sur Chat & Go</Text>
                
                {/* 2️⃣ Contenu : image + description */}
                <View style={styles.step_container}>
                    <Image source={require('...')} style={styles.img} />
                    <Text style={styles.step}>
                        Exprimez votre besoin simplement, gagnez du temps...
                    </Text>
                </View>
                
                {/* 3️⃣ Navigation */}
                <View style={styles.box_btn}>
                    <Link href={'/index1'}>
                        <Text style={styles.arrow}>{'<'}</Text>
                    </Link>
                    <Text>1/3</Text>
                    <Link href={'/index2'}>
                        <Text style={styles.arrow}>{'>'}</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};
```

Navigation entre les étapes

```
// Navigation basée sur Expo Router
<Link href={'/index1'}>  {/* Retour */}
<Link href={'/index2'}>  {/* Suivant */}
<Link href={'/index3'}>  {/* Suivant */}
<Link href={'/chat'}>    {/* Dernière étape vers le chat */}
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
    // Bulle utilisateur (à droite)
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#25D366',
        marginRight: 10,
        borderBottomRightRadius: 0,  // Effet "queue" de chat
    },
    // Bulle bot (à gauche)
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
        marginLeft: 10,
        borderBottomLeftRadius: 0,   // Effet "queue" de chat
    },
});

import { 
    heightPercentageToDP as hp,   // Pourcentages de hauteur
    widthPercentageToDP as wp     // Pourcentages de largeur
} from 'react-native-responsive-screen';

// Utilisation
width: wp('85%')    // 85% de la largeur de l'écran
height: hp('4%')    // 4% de la hauteur de l'écran
marginTop: hp('2%')
```

Type d'erreur	Gestion
Champs de saisie VIDE	Alert.alert() avec message d'erreur
Erreur réseau	Try/catch avec message utilisateur
Réponse API vide	Fallback avec message par défaut
Erreur de parsing JSON	Catch et message d'erreur


Exemples d'implémentation 
```
// 1️⃣ Validation du champ de saisie
if (!question.trim()) {
    Alert.alert('veuillez saisir une chaine de caractère');
    return;
}

// 2️⃣ Gestion de l'appel API
try {
    const response = await fetch(...);
    const data = await response.json();
    return data[0]['output'] || 'Message par défaut';
} catch (error) {
    return 'Erreur de communication avec le serveur' + error;
}
```
🚀 Installation et configuration
Prérequis
Node.js 16+

npm ou yarn

Expo CLI

Simulateur iOS (Xcode) ou Android (Android Studio)



