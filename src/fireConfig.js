
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAK704XQMC8HwxDO6uu2qskBU28SkAJVNw",
  authDomain: "webkart-6fcf3.firebaseapp.com",
  projectId: "webkart-6fcf3",
  storageBucket: "webkart-6fcf3.appspot.com",
  messagingSenderId: "353190503310",
  appId: "1:353190503310:web:6aca8e893d4d757e907adf"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

export default fireDB