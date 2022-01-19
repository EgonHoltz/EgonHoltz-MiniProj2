<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Patrocinadores" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col>
          <router-link
            :to="{name:'addSponsor'}"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR PATROCINADOR
          </router-link>
          <router-link :to="{name:'admin'}" tag="button" class="btn btn-outline-info mr-2 mt-2">
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <!--TABLE-->
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i class="fas fa-arrow-up" v-if="sortType===1" @click="sort()"></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">ESPÉCIE - ANIMAL</th>
                <th scope="col">DATA DE CRIAÇÃO</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sponsor of sponsors" :key="sponsor._id">
                <td class="pt-4">{{sponsor.name}}</td>
                <td class="pt-4">{{sponsor.group}}</td>
                <td class="pt-4">{{sponsor.dtRegister | formatDate}}</td>
                <td>
                  <router-link
                    :to="{name:'editSponsor', params:{sponsorId: sponsor._id}}"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2">
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <button
                    @click="viewSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2">
                    <i class="fas fa-check"></i> VER
                  </button>
                  <button
                    v-if="sponsor.activeSponsor == true"
                    @click="deactivateSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-warning mr-2 mt-2">
                    <i class="fas fa-eye-slash"></i> DESATIVAR
                  </button>
                  <button
                    v-else
                    @click="activateSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-warning mr-2 mt-2">
                    <i class="fas fa-search"></i> ATIVAR
                  </button>
                  <button
                    @click="removeSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2">
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>

import { FETCH_SPONSORS, REMOVE_SPONSOR, ACTIVATE_SPONSOR, DEACTIVATE_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import moment from 'moment';

export default {
  name: "ManageSponsors",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      sponsors: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsors", "getMessage"])
  },
  methods: {
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
        () => {
          this.sponsors = this.getSponsors;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.sponsors.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },

    viewSponsor(id) {
      const sponsor = this.sponsors.find(sponsor => sponsor._id === id);

      this.$fire({
        title: sponsor.name,
        html: this.generateTemplate(sponsor)
      });
    },

    generateTemplate(sponsor) {
      let dtRegister = moment(sponsor.dtRegister).format('DD/MM/YYYY hh:mm');
      let endDate = moment(sponsor.endDate).format('DD/MM/YYYY hh:mm');
      let activationDate = moment(sponsor.activationDate).format('DD/MM/YYYY hh:mm');
      let formatter = new Intl.NumberFormat('pt-PT', {style: 'currency',currency: 'EUR'});
      let valueCampaignFormatted = formatter.format(sponsor.valueCampaign)
      let response = `
          <p>Contacto: ${sponsor.contact}</p>
          <h4>Grupo:</b> ${sponsor.group}</h4>
          <p>Valor da campanha: ${valueCampaignFormatted} </p>
          <p>Data de criação: ${dtRegister} </p>
          <p>Data de inicio da campanha: ${activationDate} </p>`
          if (!sponsor.activeSponsor){
            response += `<p>Data de fim da campanha: ${endDate} </p>`;
          }
        ;
      return response;
    },
    removeSponsor(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o patrocinador?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, id).then(() => {
            this.$alert(this.getMessage, "Patrocinador removido!", "success");
            this.fetchSponsors();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    },
    deactivateSponsor(id){
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo desativar o patrocinador?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${DEACTIVATE_SPONSOR}`, id).then(() => {
            this.$alert(this.getMessage, "Patrocinador desativado!", "success");
            this.fetchSponsors();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    },
    activateSponsor(id){
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo ativar o patrocinador?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${ACTIVATE_SPONSOR}`, id).then(() => {
            this.$alert(this.getMessage, "Patrocinador ativado!", "success");
            this.fetchSponsors();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchSponsors();
  }
};
</script>