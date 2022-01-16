<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Especialista" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtSpecialistContact"
                class="form-control form-control-lg"
                placeholder="escreve contacto telefonico ou email"
                cols="30"
                rows="3"
                v-model="contact"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="birthDate"
                  type="text"
                  onmouseenter="(this.type='date')"
                  onmouseleave="(this.type='text')"
                  class="form-control form-control-lg"
                  id="birthDate"
                  placeholder="escreve a data de nascimento"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="yearSpecializationStart"
                  type="number"
                  min="1"
                  max="2999"
                  class="form-control form-control-lg"
                  id="yearSpecializationStart"
                  placeholder="escreve o ano de inicio da especialização"
                  required
                />
              </div>
            </div>
           <div v-for="(animal, index) in animals" :key="animal">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-7">
                    <input
                      v-model.lazy="animal.animal"
                      type="text"
                      class="form-control"
                      id='txtAnimal'
                      :placeholder="setPlaceHolder(index+1)"
                    />
                  </div>
                  <div class="col-md-3">
                    <button
                      @click="removeAnimal(index)"
                      type="button"
                      class="btn btn-outline-danger mr-2"
                    ><i class="fas fa-trash"></i> REMOVER</button>
                  </div>
                </div>
              </div>
            </div>
            <button
              @click="addAnimal"
              type="button"
              class="btn btn-outline-success mr-2"
            ><i class="fas fa-plus-square"></i> ADICIONAR ANIMAL</button>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i>  ADICIONAR</button>
            <router-link
              :to="{name: 'listSpecialists'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            ><i class="fas fa-window-close"></i>  CANCELAR</router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_SPECIALIST } from "@/store/specialists/specialist.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSpecialist",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      contact: "",
      birthDate: "",
      yearSpecializationStart: null,
      animals: [],
    };
  },
  computed: {
    ...mapGetters("specialist", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`specialist/${ADD_SPECIALIST}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Especialista adicionado!", "success");
          router.push({ name: "listSpecialists" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    setPlaceHolder: index => {
      return `selecione o ${index}º animal`;
    },
    addAnimal(){
      this.animals.push({animal:""})
    },
    removeAnimal(index){
      this.animals.splice(index,1);
    }
  }
};
</script>
