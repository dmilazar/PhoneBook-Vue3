<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type Contact from "../../interfaces/contact";
import useContact from "../../stores/contact";

const contactStore = useContact();
const contactId = ref();
const router = useRouter();

const contact = ref<Contact>();

onMounted(async () => {
  contactId.value = router.currentRoute.value.params.id;

  contactStore.getContact(contactId.value);
  contact.value = contactStore.$state;
});

const showEditView = (id?: string) => {
  router.push({ name: "ContactEdit", params: { id: id } });
};

const handleFavorites = (contactId?: string) => {
  if (contact.value) {
    contact.value.isFavorite = !contact.value.isFavorite;
    contactStore.updateFavorite(contactId, contact.value.isFavorite);
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="img-wrap col-md-6 col-12">
        <img
          :src="contact?.image"
          alt="image"
          title="image"
          class="img-fluid"
        />

        <div class="favorite">
          <span class="contact-name d-block">{{ contact?.name }}</span>
          <span class="email">{{ contact?.email }}</span>
          <span class="heart"
            ><font-awesome-icon
              icon="fa-regular fa-heart"
              v-show="!contact?.isFavorite"
              @click="handleFavorites(contact?.id)"
            />
            <font-awesome-icon
              icon="fa-solid fa-heart-circle-check"
              v-show="contact?.isFavorite"
              @click="handleFavorites(contact?.id)"
            />
          </span>
        </div>
      </div>

      <div class="actions-wrap col-6">
        <div class="actions">
          <button
            type="button"
            class="btn btn-light"
            @click="showEditView(contact?.id)"
          >
            Edit
          </button>
        </div>
      </div>
      <div class="col-6 heart-wrap-mobile">
        <span class="heart"
          ><font-awesome-icon
            icon="fa-regular fa-heart"
            v-show="!contact?.isFavorite"
            @click="handleFavorites(contact?.id)" />
          <font-awesome-icon
            icon="fa-solid fa-heart-circle-check"
            v-show="contact?.isFavorite"
            @click="handleFavorites(contact?.id)"
        /></span>
      </div>

      <div class="col-xl-6 col-md-12 contact-email">
        <span class="label d-block">E-mail address</span>
        <span class="email d-block">{{ contact?.email }}</span>
      </div>
    </div>

    <div class="row section-title-wrap">
      <div class="col-md-12 col-6 numbers-title">
        <h3>Numbers</h3>
      </div>
      <div class="col-6 label-title">
        <h3>Label</h3>
      </div>
    </div>

    <div class="container-fluid numbers">
      <div class="row align-items-center" v-for="numb in contact?.numbers">
        <div class="number col-6">{{ numb.number }}</div>
        <div class="details col-6">{{ numb.details }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles.scss";

.img-wrap {
  padding: 30px;
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 45px;
  }

  @media screen and (max-width: 767px) {
    justify-content: left;
  }

  .favorite {
    padding: 20px;

    .contact-name {
      font-size: 30px;
      color: black;
    }

    .email {
      font-size: 25px;
      display: none;

      @media screen and (max-width: 575px) {
        display: block;
      }
    }

    .heart {
      @media screen and (max-width: 575px) {
        display: none;
      }
    }
  }
}

.contact-email {
  font-size: 18px;
  margin-bottom: 20px;

  .email {
    color: black;
  }

  @media screen and (max-width: 575px) {
    display: none;
  }
}
.actions-wrap {
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 20px;

  .btn {
    font-size: 22px;
    padding: 5px 25px;
  }

  @media screen and (max-width: 767px) {
    justify-content: left;
  }
}

.heart-wrap-mobile {
  text-align: right;
  position: relative;
  display: none;
  top: 5px;

  @media screen and (max-width: 575px) {
    display: block;
  }
}

.numbers {
  margin: 0;
  border: 1px solid $borderColor;
  border-radius: 5px;
  margin: 0 0 12px;
  font-size: 20px;

  .row {
    border-bottom: 1px solid $borderColor;
    padding: 10px;

    .number {
      color: black;
    }

    .details {
      text-align: right;
      font-weight: 500;
      color: $primary;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }

  @media screen and (max-width: 767px) {
    border: none;
  }
}

.section-title-wrap {
  h3 {
    font-size: 22px;
  }
  .numbers-title {
    @media screen and (max-width: 767px) {
      position: relative;
      left: 23px;

      text-transform: uppercase;
    }
  }

  .label-title {
    display: none;
    text-align: right;

    @media screen and (max-width: 575px) {
      display: block;
      position: relative;

      right: 15px;
      text-transform: uppercase;
    }
  }
}

svg {
  color: $primary;
  font-size: 28px;
  cursor: pointer;
}
</style>
