<template>
    <div class="start-container">
        <label for="startName">Enter Your Name:</label>
        <input :value="name" @input="updateName" id="startName" />
        <button v-if="clickButtonEnabled" @click="startGameFunction">Start</button>
    </div>
</template>
  
<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const { name, gameStarted, clickButtonEnabled } = defineProps(['name', 'gameStarted', 'clickButtonEnabled']);
const emit = defineEmits();

const updateName = (event) => {
    emit('set-name', event.target.value);
};

const startGameFunction = () => {
    if (!gameStarted) {
        // Emit an event to notify the parent to start the game
        emit('startGame');

        const inputElement = document.getElementById('binaryInputCell4');
        if (inputElement === null) {
            console.log('binaryInputCell4 is null');
        } else {
            inputElement.focus();
        }
    }
};
</script>
  
<style scoped>
.start-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

#startName {
    width: 200px;
    margin-top: 10px;
    padding: 8px;
    font-size: 16px;
    appearance: none;
    -moz-appearance: textfield;
}

button {
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
}
</style>
  