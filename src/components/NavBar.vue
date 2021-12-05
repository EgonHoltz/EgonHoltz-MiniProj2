<template>
    <div>
        <b-nav-item :to="{name: 'animals'}" :disabled=!isUserLoggedIn>
            ANIMAIS
        </b-nav-item>
        <b-nav-item :to="{name: 'quizzes'}" :disabled=!isUserLoggedIn>
            QUIZZES
        </b-nav-item>
        <b-nav-item :to="{name: 'contactos'}">
            CONTACTOS
        </b-nav-item>
        <b-nav-item :to="{name: 'login'}">
            LOGIN
        </b-nav-item>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", [
      "isUserLoggedIn",
      "getProfileName",
      "getUserType",
      "getProfile"
    ])
  }
};
</script>