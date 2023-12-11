// src/store/highscore.js
import { defineStore } from 'pinia';

export const useHighscoreStore = defineStore('highscore', {
  state: () => ({
    results: [],
  }),

  actions: {
    saveResult(result) {
      const existingResult = this.results.find((entry) => entry.name === result.name);

      if (!existingResult || result.timeTaken < existingResult.timeTaken) {
        // If the user doesn't have an entry or the new time is smaller, update the result
        if (existingResult) {
          existingResult.result = result.result;
          existingResult.timeTaken = result.timeTaken;
        } else {
          this.results.push(result);
        }
      }
    },
    getResults() {
      // Return a copy of the results to avoid unintentional modifications
      return [...this.results];
    },
  },
});