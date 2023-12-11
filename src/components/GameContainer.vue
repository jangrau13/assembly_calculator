<template>
    <div>
        <div class="instruction" v-show="gameStarted">{{ instruction }}</div>
        <div class="grid-container" v-show="gameStarted">
            <div v-for="(item, index) in split_number1" :key="index" class="grid-item">
                {{ item }}
            </div>
            <div v-for="(item, index) in split_number2" :key="index" class="grid-item">
                {{ item }}
            </div>
        </div>
        <label for="userResult" class="result-line" v-show="gameStarted">
            Enter the Result:
        </label>
        <div class="grid-container" v-show="gameStarted" v-if="four">
            <input v-for="index in 4" :key="index" :id="'binaryInputCell' + index" :ref="'binaryInput' + index"
                @input="handleInput(index)" maxlength="1" class="grid2-item" />
        </div>
        <div class="grid-container-3" v-show="gameStarted" v-if="!four">
            <input v-for="index in 3" :key="index" :id="'binaryInputCell' + index" :ref="'binaryInput' + index"
                @input="handleInput(index)" maxlength="1" class="grid2-item" />
        </div>

    </div>
</template>
  
<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const { number1, number2, gameStarted, binaryInput, instruction } = defineProps(['number1', 'number2', 'gameStarted', 'binaryInput', 'instruction']);
const emit = defineEmits();
const four = ref(true);

let split_number1 = splitBinaryString(number1);
let split_number2 = splitBinaryString(number2);

if (instruction === 'add' || instruction === 'sub') {
    four.value = true;
} else {
    four.value = false;
}

function splitBinaryString(binaryString) {
    // Use Array.from and map to create an array of individual digits
    const binaryArray = Array.from(binaryString, bit => parseInt(bit, 10));

    // Ensure that the array has four items
    while (binaryArray.length < 4) {
        binaryArray.unshift(0); // Add a leading zero
    }

    // Convert each digit to a string and handle the fourth digit separately
    const resultArray = binaryArray.map((bit, index) => (index === 0 ? '' : bit.toString()));

    return resultArray;
}

const handleInput = (currentIndex) => {
    emit('setBinaryInput', document.getElementById(`binaryInputCell${currentIndex}`).value, currentIndex - 1);
    if (currentIndex > 1) {
        const nextInputRef = `binaryInputCell${currentIndex - 1}`;
        const nextInput = document.getElementById(nextInputRef);
        if (nextInput) {
            nextInput.focus();
        }
    } else {
        emit('checkResult');
    }
};

const checkAndFocus = () => {
    const inputElement = document.getElementById('binaryInputCell4');
    if (inputElement === null) {
        var binaryInputCell4 = document.getElementById('binaryInputCell3');
    } else {
        var binaryInputCell4 = document.getElementById('binaryInputCell4');
    }

    if (binaryInputCell4) {
        var allEmpty = Array.from(document.querySelectorAll('[id^="binaryInputCell"]')).every(input => input.value === '');
        if (allEmpty) {
            binaryInputCell4.focus();
        }
    }
};

setInterval(checkAndFocus, 100);


</script>
  
<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

.grid-container-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.grid-item {
    width: 20px;
    padding-right: 10px;
}

.grid2-item {

    text-align: right;
    width: 25px;
}

.result-line {
    padding: 16px;
    text-align: left;
    align-self: start;
}

.result {
    font-size: 18px;
    color: #333;
    margin-top: 10px;
}

.notification {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    transition: opacity 0.3s ease;
}

.success {
    background-color: #aaffaa;
    color: #006600;
}

.error {
    background-color: #ffaaaa;
    color: #990000;
}
</style>
  