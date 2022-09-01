import  {db} from "../firebase"
import { collection, getDocs, 
  addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

  const declinedCollectionRef = collection(db, "declined")

  class DeclinedCollection {
    addDeclined = (newDeclined) => {
        return addDoc(declinedCollectionRef, newDeclined);
    }

    updateDeclined = (id, updateDeclined) => {
        const declinedDoc = doc(db, "declined", id);
        return updateDoc(declinedDoc, updateDeclined);
    };

    deleteDeclined = (id) => {
        const declinedDoc = doc(db, "declined", id);
        return deleteDoc(declinedDoc)
    };

    getAllDeclined = () => {
        return getDocs(declinedCollectionRef);
    };

    getDeclined = (id) => {
        const declinedDoc = doc(db, "declined", id);
        return getDocs(declinedDoc);
    }
  }

  export default new DeclinedCollection()