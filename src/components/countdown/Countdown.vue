<template>
  <div v-if="now.getTime() < end.getTime()" id="container">
    <div id="timer">
      <div class="days">
        <div class="numbers">{{ day }}</div>
        jours
      </div>
      <div class="hours">
        <div class="numbers">{{ hour }}</div>
        heures
      </div>
      <div class="minutes">
        <div class="numbers">{{ min }}</div>
        min
      </div>
      <div class="seconds">
        <div class="numbers">{{ sec }}</div>
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
export default {
  props: {
    end: {
      type: Date,
      default() {
        return new Date();
      },
    },
  },
  data() {
    return {
      now: new Date(),
      timer: null as any,
    };
  },
  computed: {
    day() {
      const d = Math.trunc(
        (this.$props.end.getTime() - this.$data.now.getTime()) /
          1000 /
          3600 /
          24
      );
      return d;
    },
    hour() {
      const h =
        Math.trunc(
          (this.$props.end.getTime() - this.$data.now.getTime()) / 1000 / 3600
        ) % 24;
      return h > 9 ? h : "0" + h;
    },
    min() {
      const m =
        Math.trunc(
          (this.$props.end.getTime() - this.$data.now.getTime()) / 1000 / 60
        ) % 60;
      return m > 9 ? m : "0" + m;
    },
    sec() {
      const s =
        Math.trunc(
          (this.$props.end.getTime() - this.$data.now.getTime()) / 1000
        ) % 60;
      return s > 9 ? s : "0" + s;
    },
  },
  mounted() {
    this.timer = setInterval(() => (this.now = new Date()), 1000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
};
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
