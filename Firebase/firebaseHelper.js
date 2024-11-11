import { collection, addDoc, deleteDoc, updateDoc, getDocs, query, onSnapshot, doc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { id } from "date-fns/locale";

// Function to write a doc into a certain collection
export async function writeToDB(data, collectionName) {
	try {
	    const docRef = await addDoc(collection(database, collectionName), data);
	  }
	catch (err) {
	    console.log(err)
	  }
    }

// Function to delete a doc from a certain collection
export async function deleteFromDB(id, collectionName) {
    try {
        await deleteDoc(doc(database, collectionName, id));
    } catch (err) {
        console.error(err);
    }
}

// Function to update a doc in a certain collection
export async function updateDB(id, updatedItem, collectionName) {
    try {
        const docRef = doc(database, collectionName, id);
        await updateDoc(docRef, updatedItem);
    } catch (err) {
        console.error(err);
    }
}

// Function to read all docs from a certain collection with a listener
export function readAllFromDBWithListener(collectionName, handleItems) {
    try {
        const q = query(collection(database, collectionName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {   
            const data = []; 
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                // Check if the date field is a Timestamp
                if (docData.date && typeof docData.date.toDate === 'function') {
                    docData.date = docData.date.toDate(); // Convert Timestamp to Date
                }
            data.push({...docData, id: doc.id});
            });
            handleItems(data);
            console.log(data);
        });
        return unsubscribe;
    } catch (err) {
        console.log(err);
    }
}


