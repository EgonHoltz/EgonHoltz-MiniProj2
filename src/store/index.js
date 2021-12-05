import Vue from "vue";
import Vuex from "vuex";

//Modules imports
import moduleBase from "./module";
import moduleAuth from "./auth/auth.module";
import moduleUser from "./user/user.module";
import moduleAnimal from "./animals/animal.module";
import moduleQuizz from "./quizzes/quizz.module";
import moduleQuestion from "./questions/question.module";

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
