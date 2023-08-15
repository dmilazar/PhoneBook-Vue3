<script setup lang="ts">
import type Contact from "../interfaces/contact";
import firebase from "../firebase/init";
import { onMounted, ref, watch, reactive } from "vue";
import useModal from "@/stores/modal";
import useContact from "@/stores/contact";
import BaseDelete from "../components/BaseDelete.vue";
import { useRouter } from "vue-router";
import BaseInput from "@/components/BaseInput.vue";
import useFavorite from "@/stores/favorite";

const db = firebase.firestore();
const modalStore = useModal();
const contactStore = useContact();
const favoriteStore = useFavorite();
const router = useRouter();

const contacts = reactive<Contact[]>([]);
const searchContacts = ref<Contact[]>();

// Watches if current route is /favorites
// favoriteStore state is changed in navigation guards
watch(
  () => favoriteStore.$state.isFavorite,
  () => {
    fetchContacts();
  }
);

onMounted(() => {
  fetchContacts();
});

const deleteContact = async (id?: string) => {
  const modalState = await modalStore.open(BaseDelete);
  const isConfirmed = modalState.isConfirmed;

  if (isConfirmed && id) {
    contactStore.deleteContact(id);
  }
};

const showDetailView = (id?: string) => {
  router.push({ name: "ContactDetail", params: { id: id } });
};
const showEditView = (id?: string) => {
  router.push({ name: "ContactEdit", params: { id: id } });
};

const handleFavorite = (contactId?: string, index?: number) => {
  if (index !== undefined) {
    contacts[index].isFavorite = !contacts[index].isFavorite;
    contactStore.updateFavorite(contactId, contacts[index].isFavorite);
  }
};

// Search
const search = ref("");

watch(search, () => {
  searchContacts.value = contacts.filter((contact) => {
    const searchLowerCase = search.value.toLowerCase();
    const nameMatch = contact.name.toLowerCase().includes(searchLowerCase);
    const emailMatch = contact.email.toLowerCase().includes(searchLowerCase);
    const numberMatch = contact.numbers.some((number) =>
      number.number.includes(search.value)
    );

    return nameMatch || emailMatch || numberMatch;
  });
});

const fetchContacts = async () => {
  try {
    // Making sure arrays are empty to avoid duplication
    contacts.splice(0, contacts.length);
    searchContacts.value = [];

    let snapshot;
    if (favoriteStore.$state.isFavorite) {
      snapshot = await db
        .collection("contacts")
        .where("isFavorite", "==", true)
        .get();
    } else {
      snapshot = await db.collection("contacts").get();
    }

    const contactsData = snapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { ...data, id };
    }) as Contact[];

    contacts.push(...contactsData);
    searchContacts.value = contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
</script>

<template>
  <div class="row content-wrap search-bar-wrap">
    <div class="col-10 p-0 search-bar">
      <BaseInput
        type="input"
        class="form-control mb-3"
        placeholder="&#x1F50D;  Search"
        v-model.trim="search"
      />
    </div>
  </div>
  <div class="row content-wrap">
    <div class="col-md-10 content">
      <div class="row">
        <div class="col-12 name-wrap"><h3 class="name">Name</h3></div>

        <div
          class="row data"
          v-for="(contact, index) in searchContacts"
          :key="contact.id"
        >
          <div class="col-md-2 col-3" @click="showDetailView(contact.id)">
            <img
              :src="contact.image"
              alt="image"
              title="img"
              class="img-fluid"
            />
          </div>
          <div class="col-md-7 col-8" @click="showDetailView(contact.id)">
            <span class="d-block">{{ contact.name }}</span>
            <span class="d-block">{{ contact.email }}</span>
          </div>
          <div class="col-1 favorite">
            <span
              ><font-awesome-icon
                icon="fa-regular fa-heart"
                v-show="!contact.isFavorite"
                @click="handleFavorite(contact.id, index)" />
              <font-awesome-icon
                icon="fa-solid fa-heart-circle-check"
                v-show="contact.isFavorite"
                @click="handleFavorite(contact.id, index)"
            /></span>
          </div>
          <div class="col-1 edit">
            <button
              class="btn btn-link"
              type="button"
              @click="showEditView(contact.id)"
            >
              Edit
            </button>
          </div>
          <div class="col-1 del-contact">
            <button
              class="btn btn-link"
              type="button"
              @click="deleteContact(contact.id)"
            >
              Delete
            </button>
          </div>
          <div class="col-1 mobile-arrow">
            <span><font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles.scss";

.search-bar-wrap {
  margin-top: 50px;

  @media screen and (max-width: 1199px) {
    margin-top: 0;
  }
}
.content {
  @media screen and (max-width: 767px) {
    border: none !important;
  }
  .name-wrap {
    border-bottom: 1px solid $borderColor;
    padding: 10px;
    background-color: rgb(252, 253, 253);

    @media screen and (max-width: 767px) {
      display: none;
    }

    .name {
      font-size: 20px;
      position: relative;
      top: 5px;
    }
  }
}

.data {
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid $borderColor;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 45px;
  }

  .favorite,
  .edit,
  .del-contact {
    color: $primary;

    @media screen and (max-width: 767px) {
      display: none;
    }
  }

  .mobile-arrow {
    display: none;

    @media screen and (max-width: 767px) {
      display: block;
    }
  }
}
</style>
