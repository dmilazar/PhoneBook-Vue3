<script setup lang="ts">
import BaseInput from "../BaseInput.vue";
import Numbers from "./Numbers.vue";
import { ref, computed } from "vue";
import type Contact from "../../interfaces/contact";
import router from "@/router";
import { useModal } from "@/stores/modal";
import BaseDelete from "../BaseDelete.vue";
import useContact from "@/stores/contact";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, helpers, email } from "@vuelidate/validators";

const contactStore = useContact();
const modalStore = useModal();

const newContact = ref<Contact>({
  image: "",
  name: "",
  email: "",
  isFavorite: false,
  numbers: [],
});

// If there is "id" prop that means EDITING, else NEW CONTACT
const props = defineProps(["id"]);
const { id } = props;

if (!id) {
  contactStore.$reset;
  const randomNum = Math.floor(Math.random() * 5) + 1;
  newContact.value.image = `/../src/assets/images/image-${randomNum}.jpeg`;
  newContact.value.numbers.push(
    { number: "", details: "" },
    { number: "", details: "" }
  );
} else {
  contactStore.getContact(id);
  newContact.value = contactStore.$state;
}

function addNumber() {
  newContact.value.numbers.push({ number: "", details: "" });
}

const deleteNumber = (index: number) => {
  newContact.value.numbers.splice(index, 1);
};

const cancle = () => {
  window.history.back();
};

const deleteContact = async (id?: string) => {
  const modalState = await modalStore.open(BaseDelete);
  const isConfirmed = modalState.isConfirmed;

  if (isConfirmed) {
    if (id) {
      await contactStore.deleteContact(id);
    }
    router.push({ name: "Home" });
  }
};

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("Name value can't be empty!", required),
      maxLength: maxLength(50),
    },
    email: {
      required: helpers.withMessage("Email value can't be empty!", required),
      email,
    },
  };
});

const v$ = useVuelidate(rules, newContact);

const handleSave = async () => {
  const isValidated = await v$.value.$validate();

  if (isValidated) {
    if (!id) {
      await contactStore.addContact(newContact.value);
      return;
    }
    contactStore.updateContact(newContact.value);
  }
};
</script>

<template>
  <div class="row">
    <div class="img-wrap col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
      <img
        :src="newContact.image"
        alt="image"
        title="image"
        class="img-fluid"
      />
    </div>
    <div class="actions-wrap col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
      <div class="actions">
        <button type="button" class="btn btn-light" @click="handleSave">
          Save
        </button>
        <button type="button" class="btn btn-light" @click="cancle">
          Cancle
        </button>
        <button
          type="button"
          class="btn btn-light"
          @click="deleteContact(newContact.id)"
        >
          Delete
        </button>
      </div>
    </div>

    <div class="col-xl-6 col-md-12 form-group">
      <span
        class="error d-block"
        v-for="error in v$.name.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
      <BaseInput
        type="input"
        class="form-control mb-3"
        placeholder="Joe Doe"
        label="Full name"
        v-model="newContact.name"
      />
      <span
        class="error d-block"
        v-for="error in v$.email.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
      <BaseInput
        type="input"
        class="form-control"
        placeholder="you@example.com"
        label="Email address"
        v-model="newContact.email"
      />
    </div>
  </div>

  <span class="mb-2">Numbers</span>
  <div class="container-fluid numbers">
    <Numbers
      v-for="(number, index) in newContact.numbers"
      :key="index"
      :number="number"
      @deleteNumber="deleteNumber(index)"
    />

    <div class="col-12 add-numb-wrap">
      <button class="btn btn-link" @click="addNumber">Add Number</button>
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
    justify-content: center;
  }
}

.actions-wrap {
  display: flex;
  align-items: center;
  justify-content: right;

  @media screen and (max-width: 767px) {
    justify-content: center;
    margin-bottom: 20px;
  }
}

.form-group {
  margin-bottom: 20px;

  .error {
    color: red;
  }
}

.items-container {
  text-align: right;
}

.actions {
  text-align: right;
}

.numbers {
  margin: 0;
  border: 1px solid $borderColor;
  border-radius: 5px;
  margin: 10px 0 12px;

  .add-numb-wrap {
    padding: 10px;

    @media screen and (max-width: 767px) {
      text-align: center;
    }
  }
}
</style>
