<template>
    <div class="app-container">
        <select v-model="selectedMethod" @change="runSelectedMethod" v-if="showSelection">
            <option value="" disabled selected>Select a Method</option>
            <option selected value="schoolbook">Schoolbook Method</option>
            <option value="karatsuba">Karatsuba Method</option>
        </select>
        <div class="instruction" v-show="!showSelection">Selected Method: {{ selectedMethod }}</div>
        <Greeting :name="name" :gameStarted="gameStarted" @startGame="startGame" />
        <StartContainer v-if="!gameStarted" :name="name" @setName="setName" @startGame="startGame" :key="clickButtonEnabled"
            :clickButtonEnabled="clickButtonEnabled" :gameStarted="gameStarted" />
        <div class="instruction" v-show="gameStarted">{{ overallNumber1 }} x {{ overallNumber2 }}</div>
        <GameContainer v-if="gameStarted" :number1="number1" :number2="number2" :gameStarted="gameStarted"
            :instruction="instruction" :binaryInput="binaryInput" :startTime="startTime" @checkResult="checkResult"
            @resetGame="updateGame" @setBinaryInput="setBinaryInput" :key="updates" />
        <p v-show="resultMessage" class="result">{{ resultMessage }}</p>
        <div v-show="showNotification" class="notification" :class="{ 'success': isCorrect, 'error': !isCorrect }">
            {{ notificationMessage }}
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import Greeting from './Greeting.vue';
import StartContainer from './StartContainer.vue';
import GameContainer from './GameContainer.vue';
import { add, fillWithZeros, generateRandomBinaryNumber, generateFullBinaryNumber, sub, mul, mulh, and } from './../utils/utils';
import SchoolbookImpl from './../utils/schoolbook';
import KaratsubaImpl from './../utils/karatsuba';
import { useHighscoreStore } from './../stores/highscore';


const name = ref('');
const gameStarted = ref(false);
const number1 = ref(0);
const number2 = ref(0);
const instruction = ref('')
const startTime = ref(Date.now());
const binaryInput = ref(['', '', '', '']);
const resultMessage = ref('');
const showNotification = ref(false);
const isCorrect = ref(false);
const notificationMessage = ref('');
const userResult = ref(null);
const currentInputIndex = ref(3);
const overallNumber1 = ref(0);
const overallNumber2 = ref(0);
const currentStep = ref(0);
const updates = ref(0);
const selectedMethod = ref('');
const showSelection = ref(true);
const clickButtonEnabled = ref(false);
const method = ref(null);

const highscoreStore = useHighscoreStore();


const setupMethod = () => {
    if (selectedMethod.value === 'schoolbook') {
        console.log('schoolbook: ');
        method.value = new SchoolbookImpl(overallNumber1.value, overallNumber2.value);
        method.value.executeAndSaveSteps();
    } else if (selectedMethod.value === 'karatsuba') {
        console.log('karatsuba: ');
        method.value = new KaratsubaImpl(overallNumber1.value, overallNumber2.value);
        method.value.executeAndSaveSteps();
    }
    showSelection.value = false;
    clickButtonEnabled.value = true;
};

const runSelectedMethod = () => {
    // You can choose to run the method immediately when the user selects it
    setupMethod();
};

function generateSetup() {
    overallNumber1.value = generateFullBinaryNumber();
    overallNumber2.value = generateFullBinaryNumber();
}

generateSetup();

function calculateNextStep() {
    const [hasNext, n1, n2, instr] = method.value.getNextStep();
    if (!hasNext) {
        showNotificationMessage('Finished!', true);
        highscoreStore.saveResult({
            name: name.value,
            time: method.value.getTime()
        })
        gameStarted.value = false;
        return [generateRandomBinaryNumber(), generateRandomBinaryNumber(), 'add']
    }
    return [n1, n2, instr]
}

function generateNumbers() {
    let [generatedNumber1, generatedNumber2, generatedInstruction] = calculateNextStep();
    number1.value = generatedNumber1;
    number2.value = generatedNumber2;
    instruction.value = generatedInstruction;
    updates.value = updates.value + 1;
}

const setName = (newName) => {
    name.value = newName;
};

const setBinaryInput = (newBinaryInput, index) => {
    binaryInput.value[index] = newBinaryInput;
};

const startGame = () => {
    gameStarted.value = true;

    generateNumbers();
    startTime.value = Date.now();
};


const calculateBinaryResult = (n1, n2) => {
    if (instruction.value === 'add') {
        return fillWithZeros(add(n1, n2), 4);
    } else if (instruction.value === 'sub') {
        return fillWithZeros(sub(n1, n2), 4);
    } else if (instruction.value === 'mul') {
        return fillWithZeros(mul(n1, n2), 3);
    } else if (instruction.value === 'mulh') {
        return fillWithZeros(mulh(n1, n2), 3);
    } else if (instruction.value === 'and') {
        return fillWithZeros(and(n1, n2), 3);
    }
};

const checkResult = () => {
    if (startTime.value === null) {
        startTime.value = Date.now();
    }
    resultMessage.value = '';
    console.log('binaryInput.value: ' + binaryInput.value)
    let userResultBinary = '0';
    if (instruction.value === 'add' || instruction.value === 'sub') {
        userResultBinary = binaryInput.value[0] + binaryInput.value[1] + binaryInput.value[2] + binaryInput.value[3];
        userResultBinary.padStart(4, '0');
    } else {
        userResultBinary = binaryInput.value[0] + binaryInput.value[1] + binaryInput.value[2];
        userResultBinary.padStart(3, '0');
    }

    console.log('userResultBinary: ' + userResultBinary)

    const correctResult = calculateBinaryResult(number1.value, number2.value);

    if (userResultBinary !== null && userResultBinary === correctResult) {
        const endTime = Date.now();
        const timeTaken = endTime - startTime.value;
        showNotificationMessage(`Correct! Time taken: ${timeTaken} ms`, true);
        updateGame(true);
    } else {
        setTimeout(() => {
            // Show the correct result after the delay
            showNotificationMessage('Incorrect. Try again!', false, correctResult, userResultBinary);
            updateGame(false);
        }, 1000);
    }
};


const updateGame = (correct) => {
    startTime.value = Date.now();
    userResult.value = null;
    binaryInput.value[3] = '';
    binaryInput.value[2] = '';
    binaryInput.value[1] = '';
    binaryInput.value[0] = '';
    currentInputIndex.value = 3;
    resultMessage.value = '';
    document.getElementById('binaryInputCell3').value = '';
    document.getElementById('binaryInputCell2').value = '';
    document.getElementById('binaryInputCell1').value = '';
    if (document.getElementById('binaryInputCell4') == null) {
        document.getElementById('binaryInputCell3').focus();
    } else {
        document.getElementById('binaryInputCell4').focus();
        document.getElementById('binaryInputCell4').value = '';
    }
    if (correct) {
        generateNumbers();
    }
    updates.value = updates.value + 1;
};

const showNotificationMessage = (message, success, correctResult, inputtedResult) => {
    showNotification.value = true;
    isCorrect.value = success;
    notificationMessage.value = message;

    if (!success && correctResult) {
        notificationMessage.value += ` The correct result was ${correctResult} you said ${inputtedResult}.`;
    }

    setTimeout(() => {
        showNotification.value = false;
    }, 5000);
};
</script>
  
<style>
.app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
  