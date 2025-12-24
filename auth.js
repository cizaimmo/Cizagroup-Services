import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

async function registerUser(email, password, name) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // 🔥 AJOUT FIRESTORE (COLLE ICI)
  await setDoc(doc(db, "users", user.uid), {
    role: "client", // ou "driver"
    name: name,
    email: user.email,
    createdAt: serverTimestamp(),
    status: "active"
  });

  console.log("Utilisateur créé + Firestore OK");
}
