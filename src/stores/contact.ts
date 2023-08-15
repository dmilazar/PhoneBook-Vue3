import { defineStore } from "pinia";
import type Contact from "../interfaces/contact";
import firebase from "../firebase/init";
import { useRouter } from "vue-router";

const db = firebase.firestore();
const router = useRouter();

export const useContact = defineStore("contact", {
  state: (): Contact => ({
    id: "",
    image: "",
    name: "",
    email: "",
    isFavorite: false,
    numbers: [],
  }),
  actions: {
    async getContact(contactId: string) {
      try {
        const contactRef = db.collection("contacts").doc(contactId);
        const snapshot = await contactRef.get();

        if (snapshot.exists) {
          this.$state = { id: snapshot.id, ...snapshot.data() } as Contact;
        } else {
          console.log("Contact not found");
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    },
    async deleteContact(contactId: string) {
      try {
        const contactRef = db.collection("contacts").doc(contactId);
        await contactRef.delete();

        router.push({ name: "Home" });
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    },
    async addContact(contact: Contact) {
      try {
        await db.collection("contacts").add(contact);

        window.location.reload();
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    async updateContact(contact: Contact) {
      try {
        const contactRef = db.collection("contacts").doc(contact.id);
        await contactRef.update(contact);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    },
    async updateFavorite(contactId?: string, isFavorite?: boolean) {
      try {
        const contactRef = db.collection("contacts").doc(contactId);
        await contactRef.update({
          isFavorite: isFavorite,
        });
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    },
  },
});

export default useContact;
