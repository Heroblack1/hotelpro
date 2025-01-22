import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const nav = document.getElementById('navbar');

if(nav){
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 50){
        nav.classList.add('scrolled');
    }else {
        nav.classList.remove('scrolled');
      }    
})
}

const firebaseConfig = {
  apiKey: "AIzaSyDL6mJzQvE2KSiFCCf3tmFqjxKllZkv4G4",
  authDomain: "final-7d713.firebaseapp.com",
  projectId: "final-7d713",
  storageBucket: "final-7d713.firebasestorage.app",
  messagingSenderId: "230856344182",
  appId: "1:230856344182:web:e521051c44999d4c615557"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);


const button = document.getElementById("button");
const button2 = document.getElementById("button2");
const add = document.getElementById("add");


// admin signin
// admin signin
// admin signin
if(button){
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("user signed in successfully");
      window.location.href = 'dashboard';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  });
}

// admin signout
// admin signout
// admin signout
// admin signout
if(button2){
  button2.addEventListener("click", (e)=>{
    e.preventDefault();
    signOut(auth)
    .then(()=>{
      console.log('signout succ');
      
    })
  })
}
  
if(window.location.pathname.includes("/dashboard" || "/dashboard.html")){
   console.log('inside dassh');
   onAuthStateChanged(auth, (user) => {
     if (!user) {
      console.log('no user');
      window.location.href = "/adminForm"
    }else{
       console.log('user present');
      
     }
   });
 }

//  addmore rooms
//  addmore rooms
//  addmore rooms
//  addmore rooms
if(add){ 
  add.addEventListener('click', (e)=>{
    e.preventDefault();
    const pictures = document.getElementById('pictures');
    const typeOfRoom = document.getElementById('typeOfRoom').value;
    const shortDesc = document.getElementById('shortDesc').value;
    const longDesc = document.getElementById('longDesc').value;
    const deve = document.getElementById('deve');
    console.log('clickedddd');
const file = pictures.files[0];
const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.addEventListener('load', (event) => {
  console.log(event.target.result); // logs the file contents
  deve.src = event.target.result;
  try {
    const docRef = addDoc(collection(db, "users"), {
      pictures: event.target.result,
      typeOfRoom: typeOfRoom,
      shortDesc: shortDesc,
      longDesc: longDesc
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

});   
    

  }


// when the room page loads
// when the room page loads
// when the room page loads
if(window.location.pathname.includes("/rooms")){
  console.log('jjjoiller');
  const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

}



  

