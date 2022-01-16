<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar PATROCINADOR" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="sponsor.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtSponsorContact"
                class="form-control form-control-lg"
                placeholder="escreve contacto telefonico ou email"
                cols="30"
                rows="3"
                v-model="sponsor.contact"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <select id="sltGroup" class="form-control form-control-lg" v-model="sponsor.group">
                <option value>-- SELECIONA GRUPO --</option>
                <option value="anfibio">ANFÍBIO</option>
                <option value="ave">AVE</option>
                <option value="mamifero">MAMÍFERO</option>
                <option value="peixe">PEIXE</option>
                <option value="reptil">RÉPTIL</option>
              </select>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="sponsor.activeSponsor"
                  type="checkbox"
                  class="form-control"
                  id="chkActiveSponsor"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="sponsor.valueCampaign"
                  type="number"
                  min="1"
                  class="form-control form-control-lg"
                  id="txtValueCampaign"
                  placeholder="escreve o valor da campanha em €"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="sponsor.activationDate"
                  type="datetime"
                  class="form-control form-control-lg"
                  id="dtActivitation"
                  format="yyyy-MM-dd"
                  readonly
                />
              </div>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="sponsor.endDate"
                  type="datetime"
                  class="form-control form-control-lg"
                  id="dtEndSponsor"
                  format="yyyy-MM-dd"
                  readonly
                />
              </div>
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i>  ADICIONAR</button>
            <router-link
              :to="{name: 'listSponsors'}"
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
import { ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      contact: "",
      group: "",
      activeSponsor: false,
      valueCampaign: 0,
      activationDate: "1900-01-01T00:00:00.000Z",
      endDate: "1900-01-01T00:00:00.000Z"
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Patrocinador adicionado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
