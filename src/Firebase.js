// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAWQXM0Rc0HR-pU4qiODX8ZwGWQzmqwJR0",
    authDomain: "notex-12759.firebaseapp.com",
    projectId: "notex-12759",
    storageBucket: "notex-12759.appspot.com",
    messagingSenderId: "334641565943",
    appId: "1:334641565943:web:bd0cd92b6cf512fea543f2",
    measurementId: "G-V793FPP6WH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
        console.log(result)

        const name = result.user.displayName;
        const email = result.user.email;
        const uid = result.user.uid;
        const profileImageURL = result.user.photoURL;

        localStorage.setItem("notex-google-name", name);
        localStorage.setItem("notex-google-email", email);
        localStorage.setItem("notex-google-uid", uid);
        localStorage.setItem("notex-google-profileImageURL", profileImageURL);

    }).catch((error) => {
        console.log("error");
    });
}

