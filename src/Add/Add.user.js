import  {db} from "../firebase"
import { collection, getDocs, 
  addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

const userCollectionRef = collection(db, "users")
class UserCollection {
  
   addUsers = (newUser) => {
     return addDoc(userCollectionRef, newUser);
   };
     
   updateUser = (id, updateUser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updateUser);
   };

   deleteUser = (id) => {
    const userDoc = doc(db, "users", id);
    return deleteDoc(userDoc)
   };

   getAllUsers = () => {
    return getDocs(userCollectionRef);
   }

   getUser = (id) => {
     const userDoc = doc(db, "user", id);
     return getDocs(userDoc);
   }


}
export default new UserCollection();







    

