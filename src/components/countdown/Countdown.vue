<template>
  <div v-if="now.getTime() < end.getTime()" id="container">
    <div id="timer">
      <div class="days">
        <div class="numbers">{{ interval.days }}</div>
        jours
      </div>
      <div class="hours">
        <div class="numbers">{{ interval.hours }}</div>
        heures
      </div>
      <div class="minutes">
        <div class="numbers">{{ interval.min }}</div>
        min
      </div>
      <div class="seconds">
        <div class="numbers">{{ interval.sec }}</div>
        sec
      </div>
    </div>
  </div>
  <div v-else id="container-else">
    <div id="timer-else">
      <div class="days">
        <div class="numbers">00</div>
        jours
      </div>
      <div class="hours">
        <div class="numbers">00</div>
        heures
      </div>
      <div class="minutes">
        <div class="numbers">00</div>
        min
      </div>
      <div class="seconds">
        <div class="numbers">00</div>
        sec
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export interface Interval {
  days: string;
  hours: string;
  min: string;
  sec: string;
}

export default defineComponent({
  props: {
    end: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      now: new Date(),
      timer: null as any,
    };
  },
  computed: {
    interval(): Interval {
      const d = Math.trunc(
        (this.end.getTime() - this.now.getTime()) / 1000 / 3600 / 24
      );
      const h =
        Math.trunc((this.end.getTime() - this.now.getTime()) / 1000 / 3600) %
        24;
      const m =
        Math.trunc((this.end.getTime() - this.now.getTime()) / 1000 / 60) % 60;
      const s =
        Math.trunc((this.end.getTime() - this.now.getTime()) / 1000) % 60;
      return {
        days: d + "",
        hours: (h > 9 ? "" : "0") + h,
        min: (m > 9 ? "" : "0") + m,
        sec: (s > 9 ? "" : "0") + s,
      };
    },
  },
  mounted() {
    this.timer = setInterval(() => (this.now = new Date()), 1000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
});
</script>

<style>
.container {
  position: relative;
  margin: auto;
  overflow: hidden;
}

#timer {
  color: gray;
  text-align: center;
  text-transform: uppercase;
  font-size: 1em;
}

.days,
.hours,
.minutes,
.seconds {
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
}

.days {
  border-radius: 5px;
  border: solid 1px;
}

.hours {
  border-radius: 5px;
  border: solid 1px;
}

.minutes {
  border-radius: 5px;
  border: solid 1px;
}

.seconds {
  border-radius: 5px;
  border: solid 1px;
}

.numbers {
  color: darkblue;
  font-size: 2em;
}
</style>
