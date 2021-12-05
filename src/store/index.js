import Vue from "vue";
import Vuex from "vuex";

//Modules imports
import moduleBase from "./module";
import moduleAuth from "./auth/auth.module";
import moduleUser from "./users/users.module";
import moduleAnimal from "./animals/animals.module";
import moduleQuizz from "./quizzes/quizzes.module";
import moduleQuestion from "./questions/questions.module";

Vue.use(Vuex);

//Store instanciation
export default new Vuex.Store({
  getters: moduleBase.getters,
  state: moduleBase.state,
  mutations: moduleBase.mutations,
  actions: moduleBase.actions,
  modules: {
    auth: moduleAuth,
    user: moduleUser,
    animal: moduleAnimal,
    quizz: moduleQuizz,
    question: moduleQuestion
  }
});
