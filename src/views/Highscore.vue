<template>
  <div class="about">
    <div class="highscore">
      <div class="highscore__header">
        <div class="highscore__header__rank">Rank</div>
        <div class="highscore__header__name">Name</div>
        <div class="highscore__header__score">Time</div>
      </div>
      <div class="highscore__list">
        <div class="highscore__list__item" v-for="(result, index) in sortedResults" :key="result.name">
          <div class="highscore__list__item__rank">{{ index + 1 }}</div>
          <div class="highscore__list__item__name">{{ result.name }}</div>
          <div class="highscore__list__item__score">{{ result.time / 1000 }} s</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHighscoreStore } from './../stores/highscore';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const highscoreStore = useHighscoreStore();
    const results = ref([...highscoreStore.getResults(), {
      name: 'Jan',
      time: 1000,
    }]);

    const sortResults = () => {
      // Use slice to create a new array, then sort it based on the time property
      results.value = [...results.value].sort((a, b) => a.time - b.time);
    };

    onMounted(() => {
      setInterval(() => {
        // Update results and then sort
        //results.value = [...highscoreStore.getResults()];
        sortResults();
      }, 1000);
    });

    return { results, sortResults };
  },
  computed: {
    sortedResults() {
      // Ensure that results are sorted before rendering
      return [...this.results].sort((a, b) => a.time - b.time);
    },
  },
};
</script>


<style>

.about {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.highscore {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
}

.highscore__header {
  background-color: #45a049;
  display: flex;
  padding: 10px;
}

.highscore__header__name,
.highscore__header__score,
.highscore__header__rank {
  flex: 1;
  color: #fff;
  font-weight: bold;
}

.highscore__list__item {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.highscore__list__item__name,
.highscore__list__item__score,
.highscore__list__item__rank {
  flex: 1;
}


</style>