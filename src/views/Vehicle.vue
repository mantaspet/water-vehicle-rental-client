<template>
  <div v-if="vehicle.id">
    <h1 class="mdc-typography--headline4">
      {{ vehicle.brand }} {{ vehicle.model }} ({{ vehicle.year }})
    </h1>
    <TimeTable
			:selectedTime="selectedTimeString"
			@nextWeekClick="getNextWeek" @lastWeekClick="getLastWeek"
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
  </div>
</template>

<script>
import TimeTable from "../components/TimeTable";

export default {
  name: "Vehicle",

  components: {
    TimeTable
  },

  data() {
    return {
      vehicle: {},
      days: [],
      times: [
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00"
      ],
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
      selectedTimeString: '',
			selectedTime: 0,
    };
  },

  created() {
		this.getCurrentWeek();
    this.vehicle = JSON.parse(
      JSON.stringify(this.$store.state.vehicles.selectedVehicle)
    );
    this.$store.dispatch("getVehicle", this.$route.params.id).then(res => {
      this.vehicle = res;
      this.vehicle.reservations = [
        1543820400000,
        1543910400000,
        1544000400000,
        1544191200000
      ];
    });
    this.availableTimes = this.setAvailableTimes(this.days, this.times);
    this.vehicle.reservations = [
      1543820400000,
      1543910400000,
      1544000400000,
      1544191200000
    ];
  },

  methods: {
    setAvailableTimes(days, times) {
      let rows = [];
      let cols = [];
      times.forEach(time => {
        cols = [];
        days.forEach(day => {
          cols.push(new Date(`${day} ${time.slice(0, 5)}`).getTime());
        });
        rows.push(cols);
      });
      return rows;
    },

    selectTime(time) {
      if (!this.vehicle.reservations.includes(time)) {
        const date = new Date(time);
        const timezoneOffset = date.getTimezoneOffset();
        const selectedDate = date.toISOString().slice(0, 10);
        const selectedWeekday = this.weekdayNames[date.getDay()].long;
        const selectedTime = new Date(date.getTime() - timezoneOffset * 60000)
          .toISOString()
					.slice(11, 16);
				this.selectedTimeString = `${selectedDate} (${selectedWeekday}) ${selectedTime}`;
				this.selectedTime = time;
      }
		},
		
		getCurrentWeek() {
			let d = new Date();
			d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
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
</style>
