import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDocs, getDoc, updateDoc} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { deleteDoc } from "firebase/firestore";
// import PaystackPop from '@paystack/inline-js'
import axios from 'axios';
// import { alerts } from "firebase-functions";


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
const add = document.getElementById("addroom");
const pay = document.getElementById("pay");
const verify = document.getElementById("verify");




// admin signin
// admin signin
// admin signin
if(button){
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    if(email === "" || password === ""){
      alert('Please fill in all fields!')
    }else{
      // console.log(email);
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log("user signed in successfully");
        window.location.href = 'dashboard';
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(error){
          const disblo = document.getElementById("disblo");
          disblo.style.display = "block"
        }
      });
    }
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
      // console.log('signout succ');
      
    })
  })
}
//  delete a room
//  delete a room
//  delete a room
//  delete a room
window.remop = async function(id) {
  // console.log(id);
  await deleteDoc(doc(db, "users", id));
  window.location.href = "/dashboard"
}



//  the dashboard 
//  the dashboard 
//  the dashboard 
//  the dashboard 
if(window.location.pathname.includes("/dashboard" || "/dashboard.html")){
  onAuthStateChanged(auth, (user) => {
    if (!user) {
    //  console.log('no user');
     window.location.href = "/adminForm"
   }else{
      // console.log('user present');
     
    }
  });
  //  console.log('inside dassh');
const avail = document.getElementById('availAndUna')
   const querySnapshot = await getDocs(collection(db, "users"));
   querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
   const newRoo = document.createElement('div');
   newRoo.id = 'convict';

   newRoo.innerHTML = `
       <div class="containe">
               <div class="ima11">
                   <img id="imagee" src="${doc.data().pictures}" alt="">
               </div>
   
               <div class="sec">
                   <P id="desc">${doc.data().desc}</P>
                   <span class="shortDesc">${doc.data().shortDesc}</span>
                   <span class="shortDesc">${doc.data().price}</span>
                   <div>
   
                       <button type="button" class="btn green" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Room Details
                       </button>
   
                       <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                           <div class="modal-dialog">
                             <div class="modal-content">
                               <div class="modal-header">
                                 <h1 class="modal-title fs-5" id="staticBackdropLabel">Classic One Queen Bed</h1>
                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                               </div>
                               <div class="modal-body">
                               ${doc.data().longDesc}
                               </div>
                               <div class="modal-footer">
                                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                   <button class="linked">BOOK NOW</button>
               </div>
           </div>
           <button onClick='remop("${doc.id}")' id="remove">Remove Room</button>`
           
           availAndUna.appendChild(newRoo)
    //  console.log(doc.id, " => ", doc.data());
      
   });
   
 }




//  addmore rooms
//  addmore rooms
//  addmore rooms
//  addmore rooms
if(add){ 
  onAuthStateChanged(auth, (user) => {
    if (!user) {
    //  console.log('no user');
     window.location.href = "/adminForm"
   }else{
      // console.log('user present');
     
    }
  });  
  add.addEventListener('click', async (e)=>{
    e.preventDefault();
    const desc = document.getElementById('desc').value;
    const pictures = document.getElementById('pictures').value;
    const shortDesc = document.getElementById('shortDesc').value;
    const longDesc = document.getElementById('longDesc').value;
    const price = document.getElementById('price').value;
    // const currentTime = new Date().getTime();
    console.log('clickedddd');
    if(desc === '' || shortDesc === '' || pictures === '' || longDesc === '' || price === ''){
      alert('Please fill in all fields!')
    }else{
      try {
        const docRef = await addDoc(collection(db, "users"), {
          desc: desc,
          pictures: pictures,
          shortDesc: shortDesc,
          longDesc: longDesc,
          price: price, 
          booked: ''
        });
        console.log("Document written with ID: ", docRef.id);
        window.location.href = "/dashboard"
           } catch (e) {
        console.error("Error adding document: ", e);
        }
    } 
  }); 
  
}


// when the room page loads
// when the room page loads
// when the room page loads
if(window.location.pathname.includes("/rooms")){
  const rooms = document.getElementById('rooms');
  const currentTime = new Date().getTime();
  // console.log('jjjoiller');
  const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
const newRoom = document.createElement('div');

newRoom.innerHTML = `
    <div class="containe">
            <div class="ima11">
                <img id="imagee" src="${doc.data().pictures}" alt="">
            </div>

            <div class="sec">
                <P id="desc">${doc.data().desc}</P>
                <span class="shortDesc">${doc.data().shortDesc}</span>
                <span class="shortDesc">${doc.data().price}</span>
                <div>

                    <button type="button" class="btn green" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                         Room Details
                    </button>

                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="staticBackdropLabel">Classic One Queen Bed</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            ${doc.data().longDesc}
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                <button class="linkedi" onClick='thre("${doc.id}")'>${currentTime - doc.data().booked >= 24 * 60 * 60 * 1000? "BOOK NOW" : "BOOKED" }</button>
            </div>
        </div>
`


rooms.appendChild(newRoom)
  // console.log(doc.id, " => ", doc.data());
});

}


// naigate to payment 
// naigate to payment 
// naigate to payment 


window.thre = async function(id){
  const currentTim = new Date().getTime();
  const querySnapshot = await getDoc(doc(db, "users", id));
  
  if (querySnapshot.exists) {
    if(currentTim - querySnapshot.data().booked >= 24 * 60 * 60 * 1000){
      // console.log("time stamp is:", querySnapshot.data().booked);
      window.location.href = `/pay?id=${id}`;
    }else{
      alert('This room has already been booked');
      
    }
   
  } else {
    // console.log("No such document!");
  } 

}


// removes the payment reference
// removes the payment reference
// removes the payment reference
window.addEventListener('load', function() {
  const url = new URL(window.location.href);
  url.searchParams.delete('trxref');
  url.searchParams.delete('reference');
  window.history.pushState({}, '', url.href);
});


// pay func to paystack
// pay func
// pay func      
if (pay) {

  pay.addEventListener('click', async (e) => {
    e.preventDefault();
    const urlId = new URLSearchParams(window.location.search);
    const firebaseId = urlId.get('id');

    // console.log(`your firebase id is ${firebaseId}`);
    
    const email = document.getElementById('email');
    const amount = document.getElementById('amount');
    const desc = document.getElementById('desc');
    const lastName = document.getElementById('lastName');
    const firstName = document.getElementById('firstName');
    if(email.value === "" || amount.value === "" || desc.value === "" || lastName.value === "" || firstName.value === ""){
        alert('Please fill in all fields');
    }else{
      const apiKey = 'sk_test_de2acf2d82e0526f9457f9a191f5e279fff7985b';
    const url = 'https://api.paystack.co/transaction/initialize';
    const data = {
      email: email.value,
      amount: amount.value * 100,
      callback_url: `https://final-7d713.web.app/pay?id=${firebaseId}`
    };
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
    try {
      const response = await axios.post(url, data, { headers });

   
      try {
        const transactionReference = response.data.data.reference;
        // console.log(transactionReference);
     
        const docRef = await addDoc(collection(db, "ref"), { transactionReference });
        console.log("Document written with ID: ", docRef.id);
        
  

} catch (error) {
        console.error("Error adding document: ", error);
      }
      // console.log(response.data);
      const authorizationUrl = response.data.data.authorization_url;
      window.location.href = authorizationUrl;
    } catch (error) {
      // console.error(error);
      
    }
    }
    
  });
}
    

// redirection to payment func
// redirection to payment func
// redirection to payment func
if(window.location.pathname.includes("/pay")){
    const indiv = document.getElementById('indiv');
    let amount = document.getElementById('amount');
    const desc = document.getElementById('desc');
    
 const urlParams = new URLSearchParams(window.location.search);
const idd = urlParams.get('id');
// console.log(idd);
// console.log(desc.value);

  


const docRe = doc(db, "users", idd);
const docSnap = await getDoc(docRe);
if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
  amount.value = docSnap.data().price;
} else {
  // console.log("No such document!");
}



  indiv.innerHTML =`
  <div class="containe">
            <div class="ima11">
                <img id="imagee" alt="" src="${docSnap.data().pictures}">
            </div>
            <div class="sec">
                <P id="desc">${docSnap.data().desc}</P>
                <span class="shortDesc">${docSnap.data().shortDesc}</span>
                <span class="shortDesc">₦ ${docSnap.data().price}</span>
                <div>

                    <button type="button" class="btn green" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                         Room Details
                    </button>

                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="staticBackdropLabel">Classic One Queen Bed</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            ${docSnap.data().longDesc}
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
  `
  desc.addEventListener('change', (e)=>{
    amount.value = docSnap.data().price;
    const ter = e.target.value;
    // console.log(ter);
   amount.value = amount.value * ter;
   
  })
}

  
    
  // verify payment
  // verify payment
  // verify payment
  // verify payment
  if(verify){
         verify.addEventListener('click', async (e) => {
    e.preventDefault();
    const reFromEmail = document.getElementById("reFromEmail").value;
    const red = document.getElementById("red");
    const green = document.getElementById("green");


  const querySnapshot = await getDocs(collection(db, "ref"));
const paymentDoc = querySnapshot.docs.find((doc) => {
  return reFromEmail === doc.data().transactionReference;
});

if (paymentDoc) {
  // console.log('payment successful');
                  // edit the room to show booked or otherwise using timestamp
                  const urlParams = new URLSearchParams(window.location.search);
                  const idd = urlParams.get('id');
                  // console.log(idd);
   const edit = doc(db, "users", `${idd}`);
    const currentTime = new Date().getTime();

      try {
          await updateDoc(edit, { 
            booked: currentTime,
               });
               red.innerText = "Congratulations! You payment is successful. Enjoy your stay."
                red.style.color = 'green'

               await deleteDoc(doc(db, "ref", paymentDoc.id));
              //  console.log("Transaction reference deleted successfully");
           
               } catch (error) {
              //  console.error("Error updating document: ", error);
               }
                
                    
} else {
  // console.log('payment failure');
  red.innerText = "Payment failure"
  red.style.color = 'red'
} 
})
  }
 



    
  