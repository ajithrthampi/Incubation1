import  {db} from "../firebase"
import { collection, getDocs, 
  addDoc, updateDoc, deleteDoc, doc ,getDoc } from "firebase/firestore"

const companyCollectionRef = collection(db, "companies")
class CompanyCollection {
   addCompany = (newCompany) => {
     return addDoc(companyCollectionRef, newCompany);
   };
     
   updateCompany = (id, updateCompany) => {
    const companyDoc = doc(db, "companies", id);
    return updateDoc(companyDoc, updateCompany);
   };

   deleteCompany = (id) => {
    const companyDoc = doc(db, "companies", id);
    return deleteDoc(companyDoc)
   };

   getAllCompany = () => {
    return getDocs(companyCollectionRef);
   }

   getcompany = (id) => {
     const user = doc(db, "companies", id);
     return getDoc(user);
   }


}
export default new CompanyCollection();







    

