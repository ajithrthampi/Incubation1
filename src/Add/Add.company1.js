import  {db} from "../firebase"
import { collection, getDocs, 
  addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore"

  const company1CollectionRef = collection(db, "companies1")
  class Company1Collection {
    addCompany1 = (newCompany1) => {
        return addDoc(company1CollectionRef, newCompany1);
    };

    updateCompany1 = (id, updateCompany1) => {
        const company1Doc = doc(db, "companies1", id);
        return updateDoc(company1Doc, updateCompany1);
    };

    deleteCompany1 = (id) => {
        const company1Doc = doc(db, "companies1", id);
        return deleteDoc(company1Doc)
    };

    getAllCompany1 = () => {
        return getDocs(company1CollectionRef);
    };

    getcompany1 = (id) => {
        const company1Doc = doc(db, "companies1", id);
        return getDoc(company1Doc);
    }
  }

  export default new Company1Collection()