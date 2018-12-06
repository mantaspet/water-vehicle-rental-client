<template>
  <div>
    <div class="header-wrapper">
      <h1 class="mdc-typography--headline4">{{ title }}</h1>
      <div style="display: flex">
        <div v-show="$userRole('admin')" id="client" class="mdc-select">
          <i class="mdc-select__dropdown-icon"></i>
          <select
            v-model="selectedClient"
            class="mdc-select__native-control"
            @change="getClientReservations"
          >
            <option :value="null"></option>
            <option
              v-for="client in $store.getters.clients"
              :key="client.userId"
              :value="client"
            >{{ `${client.firstName} ${client.lastName}` }}</option>
          </select>
          <label class="mdc-floating-label">Klientas</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <div id="date-from" class="mdc-text-field mdc-text-field--box">
          <input
            v-model="dateFrom"
            type="date"
            class="mdc-text-field__input"
            @input="filterReservations"
          >
          <label class="mdc-floating-label" for="email-input">Data nuo</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <div id="date-to" class="mdc-text-field mdc-text-field--box">
          <input
            v-model="dateTo"
            type="date"
            class="mdc-text-field__input"
            @input="filterReservations"
          >
          <label class="mdc-floating-label" for="email-input">Data iki</label>
          <div class="mdc-line-ripple"></div>
        </div>
      </div>
    </div>
    <DataTable :items="$store.getters.reservations">
      <template slot="headers">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </template>
      <template slot="items">
        <tr v-for="reservation in $store.getters.reservations" :key="reservation.id">
          <td>{{ reservation.vehicle }}</td>
          <td>{{ reservation.route }}</td>
          <td>{{ $getFormattedDate(reservation.time) }}</td>
          <td class="mdc-menu-surface--anchor">
            <button
              class="material-icons mdc-icon-button"
              title="Peržiūrėti kliento info"
              @click.stop="viewReservationCreator(reservation)"
            >person</button>

            <button
              v-if="!reservation.wasReviewed"
              class="material-icons mdc-icon-button"
              title="Palikti įvertinimą"
              @click.stop="openReviewMenu(reservation)"
            >rate_review</button>

            <div :id="`menu-${reservation.id}`" class="mdc-menu mdc-menu-surface" tabindex="-1">
              <ul class="mdc-list mdc-list--non-interactive" role="menu" aria-hidden="true" aria-orientation="vertical">
                <li class="mdc-list-item" role="menuitem">
                  <button class="mdc-icon-button" type="button" role="menuitem" @click="openReviewDialog(5)">
                    <img src="../assets/heart-emoji.png" class="mdc-icon-button__icon">
                  </button>
                </li>
                <li class="mdc-list-item" role="menuitem">
                  <button class="mdc-icon-button" type="button" role="menuitem" @click="openReviewDialog(4)">
                    <img src="../assets/face-with-heart-eyes-emoji.png" class="mdc-icon-button__icon">
                  </button>
                </li>
                <li class="mdc-list-item" role="menuitem">
                  <button class="mdc-icon-button" type="button" role="menuitem" @click="openReviewDialog(3)">
                    <img src="../assets/thinking-emoji.png" class="mdc-icon-button__icon">
                  </button>
                </li>
                <li class="mdc-list-item" role="menuitem">
                  <button class="mdc-icon-button" type="button" role="menuitem" @click="openReviewDialog(2)">
                    <img src="../assets/tear-emoji.png" class="mdc-icon-button__icon">
                  </button>
                </li>
                <li class="mdc-list-item" role="menuitem">
                  <button class="mdc-icon-button" type="button" role="menuitem" @click="openReviewDialog(1)">
                    <img src="../assets/crying-emoji.png" class="mdc-icon-button__icon">
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </template>
    </DataTable>
    <ReviewDialog :points="reviewPoints" :reservation="selectedReservation" @closeDialog="reviewDialog.close()"/>
    <ClientInfoDialog :client="createdBy"/>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";
import ReviewDialog from "../components/ReviewDialog";
import ClientInfoDialog from "../components/ClientInfoDialog";
import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";
import { MDCMenu } from "@material/menu";

export default {
  name: "Reservations",

  components: {
    DataTable,
    ReviewDialog,
    ClientInfoDialog
  },

  data() {
    return {
      clientDialog: null,
      reviewDialog: null,
      createdBy: {},
      dateFrom: "",
      dateTo: "",
      timer: null,
      menus: {},
      selectedClient: null,
      selectedReservation: null,
      reviewPoints: null,
      headers: ["Transporto priemonė", "Maršrutas", "Data", "Veiksmai"]
    };
  },

  computed: {
    title() {
      return this.$store.getters.currentUser.role === "admin"
        ? "Rezervacijų sąrašas"
        : "Jūsų rezervacijos";
    }
  },

  created() {
    if (this.$userRole(["admin", "employee"])) {
      this.$store.dispatch("getAllReservations");
      this.$store.dispatch("getClients");
    } else {
      this.$store.dispatch(
        "getClientReservations",
        this.$store.currentUser.userId
      );
    }
  },

  mounted() {
    this.clientDialog = new MDCDialog(
      document.querySelector("#client-info-dialog")
    );
    this.reviewDialog = new MDCDialog(document.querySelector("#review-dialog"));
    new MDCTextField(document.querySelector("#date-from"));
    new MDCTextField(document.querySelector("#date-to"));
    new MDCSelect(document.querySelector("#client"));
  },

  methods: {
    viewReservationCreator(reservation) {
      this.$store.dispatch("getClient", reservation.userId).then(client => {
        this.createdBy = client;
        this.clientDialog.open();
      });
    },

    filterReservations() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const timeFrom = new Date(this.dateFrom).getTime();
        const timeTo = new Date(this.dateTo).getTime();
        this.$store.commit("filterReservations", {
          timeFrom,
          timeTo
        });
      }, 500);
    },

    getClientReservations() {
      if (this.selectedClient) {
        this.$store.dispatch(
          "getClientReservations",
          this.selectedClient.userId
        );
      } else {
        this.$store.dispatch("getAllReservations");
      }
    },

    openReviewMenu(reservation) {
      this.selectedReservation = reservation;
      Object.values(this.menus).forEach(menu => {
        menu.open = false;
      });
      const menuId = `#menu-${reservation.id}`;
      if (this.menus.hasOwnProperty(menuId)) {
        this.menus[menuId].open = true;
      } else {
        this.menus[menuId] = new MDCMenu(
          document.querySelector(`#menu-${reservation.id}`)
        );
        this.menus[menuId].open = true;
      }
      
    },

    openReviewDialog(points) {
      this.reviewPoints = points;
      this.reviewDialog.open();
    },
  }
};
</script>

<style lang="scss" scoped>
.mdc-text-field {
  margin-left: 12px;
}

.mdc-select {
  min-width: 192px;
}

.mdc-menu {
  min-width: unset;
}
</style>
