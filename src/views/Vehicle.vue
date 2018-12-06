<template>
  <div>
    <template v-if="vehicle.id">
      <h1 class="mdc-typography--headline4">
        <div>Pasirinkta transporto priemonė:</div>
        <div>{{ vehicle.brand }} {{ vehicle.model }} ({{ vehicle.year }})</div>
      </h1>
      <div v-if="vehicle.imageUrl" class="mdc-card image-container">
        <img :src="vehicle.imageUrl">
      </div>
      <TimeTable
        :selectedTime="selectedTimeString"
        @nextWeekClick="getNextWeek"
        @lastWeekClick="getLastWeek"
      >
        <template slot="headers">
          <th/>
          <th v-for="(day, i) in days" :key="day">
            {{ day }}
            <br>
            {{ weekdayNames[i + 1].short }}
          </th>
        </template>
        <template slot="items">
          <tr v-for="(time, i) in times" :key="time">
            <td>{{ time }}</td>
            <td
              v-for="(day, j) in days"
              :key="day"
              :class="{'taken-time': vehicle.reservations.includes(availableTimes[i][j]), 'selected-time': availableTimes[i][j] === selectedTime}"
              @click="selectTime(availableTimes[i][j])"
            ></td>
          </tr>
        </template>
      </TimeTable>
      <RouteSelector v-if="selectedTime" @routeSelected="selectRoute"/>
    </template>
    <button v-show="selectedRoute && selectedTime" class="mdc-fab mdc-fab--extended" @click="createReservation">
      <span class="material-icons mdc-fab__icon">event</span>
      <span class="mdc-fab__label">Rezervuoti</span>
    </button>
  </div>
</template>

<script>
import TimeTable from "../components/TimeTable";
import RouteSelector from "../components/RouteSelector";
import { MDCRipple } from "@material/ripple";

export default {
  name: "Vehicle",

  components: {
    TimeTable,
    RouteSelector
  },

  data() {
    return {
      vehicle: {},
      days: [],
      times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
      weekdayNames: [
        { long: "Sekmadienis", short: "S" },
        { long: "Pirmadienis", short: "Pr" },
        { long: "Antradienis", short: "A" },
        { long: "Trečiadienis", short: "T" },
        { long: "Ketvirtadienis", short: "K" },
        { long: "Penktadienis", short: "Pn" },
        { long: "Šeštadienis", short: "Š" }
      ],
      availableTimes: [[]],
      selectedTimeString: "",
      selectedTime: 0,
      selectedRoute: ""
    };
  },

  created() {
    this.getCurrentWeek();
    this.vehicle = JSON.parse(
      JSON.stringify(this.$store.state.vehicles.selectedVehicle)
    );
    this.$store.dispatch("getVehicle", this.$route.params.id).then(res => {
      this.vehicle = res;
    });
    this.availableTimes = this.setAvailableTimes(this.days, this.times);
  },

  mounted() {
    const fabRipple = new MDCRipple(document.querySelector(".mdc-fab"));
  },

  methods: {
    createReservation() {
      const newReservation = {
        time: this.selectedTime,
        route: this.selectedRoute,
        vehicle: `${this.vehicle.brand} ${this.vehicle.model} (${this.vehicle.year})`,
        vehicleId: this.vehicle.id,
        userId: this.$store.getters.currentUser.userId,
      };
      this.$store.dispatch('createReservation', newReservation).then(() => {
        this.vehicle.reservations.push(this.selectedTime);
        this.$store.dispatch('updateVehicle', this.vehicle);
      });
    },

    selectRoute(event) {
      this.selectedRoute = event;
    },

    setAvailableTimes(days, times) {
      let rows = [];
      let cols = [];
      times.forEach(time => {
        cols = [];
        days.forEach(day => {
          cols.push(new Date(`${day} ${time}`).getTime());
        });
        rows.push(cols);
      });
      return rows;
    },

    selectTime(time) {
      if (!this.vehicle.reservations.includes(time)) {
        this.selectedTimeString = this.$getFormattedDate(time);
        this.selectedTime = time;
      }
    },

    getCurrentWeek() {
      let d = new Date();
      d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7));
      const nextMonday = new Date(d).toISOString().slice(0, 10);
      let days = [nextMonday];
      for (let i = 1; i < 5; i++) {
        let date = new Date(nextMonday);
        let day = date.setDate(date.getDate() + i);
        days.push(new Date(day).toISOString().slice(0, 10));
      }
      this.days = days;
    },

    getNextWeek() {
      let newDays = this.days.map(day => {
        let date = new Date(day);
        return new Date(date.setDate(date.getDate() + 7))
          .toISOString()
          .slice(0, 10);
      });
      this.days = newDays;
      this.availableTimes = this.setAvailableTimes(this.days, this.times);
    },

    getLastWeek() {
      let newDays = this.days.map(day => {
        let date = new Date(day);
        return new Date(date.setDate(date.getDate() - 7))
          .toISOString()
          .slice(0, 10);
      });
      this.days = newDays;
      this.availableTimes = this.setAvailableTimes(this.days, this.times);
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.image-container {
  padding-top: 6px;
  margin: 12px 0;
  display: block;
  text-align: center;
}
</style>
