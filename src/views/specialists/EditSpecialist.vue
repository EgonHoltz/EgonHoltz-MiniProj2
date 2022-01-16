<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Especialista" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="specialist.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                v-model="specialist.contact"
                class="form-control form-control-lg"
                placeholder="escreve contacto telefonico ou email"
                cols="30"
                rows="3"
                id="txtSpecialistContact"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="specialist.birthDate"
                  type="date"
                  onmouseenter="(this.type='date')"
                  onmouseleave="(this.type='text')"
                  class="form-control form-control-lg"
                  id="txtBirthDate"
                  placeholder="escreve a data de nascimento"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="specialist.yearSpecializationStart"
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
           <div v-for="(animal, index) in specialist.animals" :key="animal.animal">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-7">
                    <input
                      v-model.lazy="animal.animal"
                      type="text"
                      class="form-control"
                      id='txtAnimal'
                      :placeholder="setPlaceHolder(index+1)"
                      required
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
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{name: 'listSpecialists'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_SPECIALIST } from "@/store/specialists/specialist.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditSpecialist",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      specialist: {}
    };
  },
  computed: {
    ...mapGetters("specialist", ["getSpecialistsById", "getMessage"])
  },
  methods: {
    update() {
      this.$store.dispatch(`specialist/${EDIT_SPECIALIST}`, this.$data.specialist).then(
        () => {
          this.$alert(this.getMessage, "Especialista atualizado!", "success");
          router.push({ name: "listSpecialists" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    setPlaceHolder(index){
      return `selecione o ${index}º animal`;
    },
    addAnimal(){
      this.specialist.animals.push({animal:""})
    },
    removeAnimal(index){
      this.specialist.animals.splice(index,1);
    },
  },
  created() {
      this.specialist = this.getSpecialistsById(this.$route.params.specialistId);
  },
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>