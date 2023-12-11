import { add, mul, mulh, carry } from './utils.js';


export default class SchoolBookImpl {
    constructor(string1, string2) {
        this.name = 'schoolbook';
        this.string1 = string1;
        this.string2 = string2;
        this.step = 1;
        this.b = this.string1.toString(2).padStart(3, '0').slice(-3);
        this.a = this.string1.toString(2).padStart(3, '0').slice(0, 3);
        this.d = this.string2.toString(2).padStart(3, '0').slice(-3);
        this.c = this.string2.toString(2).padStart(3, '0').slice(0, 3);
    }

    getTime() {
        return this.totalTime;
    }

    executeAndSaveSteps() {
        console.log('executeAndSaveSteps', this.string1, this.string2);
        let logIt = false
        // step 1
        this.step1 = mul(this.b, this.d).toString(2).padStart(3, '0');
        if (logIt) console.log('step1', this.step1);
        // step 2
        this.step2 = mulh(this.b, this.d).toString(2).padStart(3, '0');
        if (logIt) console.log('step2', this.step2);
        // step 3
        this.step3 = mul(this.b, this.c).toString(2).padStart(3, '0');
        if (logIt) console.log('step3', this.step3);
        // step 4
        this.step4 = mul(this.a, this.d).toString(2).padStart(3, '0');
        if (logIt) console.log('step4', this.step4);
        // step 5 
        this.step5 = add(this.step2, this.step3).toString(2).padStart(4, '0');
        this.carry1 = carry(this.step5);
        this.carry1 = this.carry1.slice(-1);
        this.step5 = this.step5.slice(-3).padStart(3, '0');
        if (logIt) console.log('step5', this.step5);
        if (logIt) console.log('carry1', this.carry1);
        // step 6
        this.step6 = add(this.step5, this.step4).toString(2).padStart(4, '0');
        this.carry1 = (parseInt(carry(this.step6)) + parseInt(this.carry1)).toString(2)
        this.carry1 = this.carry1.slice(-1);
        this.step6 = this.step6.slice(-3).padStart(3, '0');
        if (logIt) console.log('step6', this.step6);
        if (logIt) console.log('carry1', this.carry1);
        // step 7
        this.step7 = mulh(this.b, this.c).toString(2).padStart(3, '0');
        if (logIt) console.log('step7', this.step7);
        // step 8
        this.step8 = mulh(this.a, this.d).toString(2).padStart(3, '0');
        if (logIt) console.log('step8', this.step8);
        // step 9
        this.step9 = mul(this.a, this.c).toString(2).padStart(3, '0');
        if (logIt) console.log('step9', this.step9);
        // step 10
        this.step10 = add(this.step7, this.step8).toString(2).padStart(4, '0');
        this.carry2 = carry(this.step10);
        this.carry2 = this.carry2.slice(-1);
        this.step10 = this.step10.slice(-3).padStart(3, '0');
        if (logIt) console.log('step10', this.step10);
        if (logIt) console.log('carry2', this.carry2);
        // step 11
        this.step11 = add(this.step10, this.step9).toString(2).padStart(4, '0');
        console.log('step11 before carry', this.step11); 
        console.log('step 11 inputs', this.step10, this.step9);
        this.carry2 = (parseInt(carry(this.step11)) + parseInt(this.carry2)).toString(2)
        this.carry2 = this.carry2;
        this.step11 = this.step11.slice(-3).padStart(3, '0');
        if (logIt) console.log('step11', this.step11);
        if (logIt) console.log('carry2', this.carry2);
        // step 12
        this.step12 = add(this.carry1, this.step11).toString(2).padStart(4, '0');
        this.carry2 = (parseInt(carry(this.step12)) + parseInt(this.carry2)).toString(2)
        this.carry2 = this.carry2.slice(-1);
        this.step12 = this.step12.slice(-3).padStart(3, '0');
        if (logIt) console.log('step12', this.step12);
        if (logIt) console.log('carry2', this.carry2);
        // step 13
        this.step13 = mulh(this.a, this.c).toString(2).padStart(3, '0');
        if (logIt) console.log('step13', this.step13);
        // step 14
        this.step14 = add(this.step13, this.carry2).toString(2).padStart(4, '0');
        this.carry3 = carry(this.step14).padStart(3, '0');
        this.step14 = this.step14.slice(-3).padStart(3, '0');
        if (logIt) console.log('step14', this.step14);
        if (logIt) console.log('carry3', this.carry3);
        if (logIt) console.log('final result', this.carry3 + this.step14 +this.step12 + this.step6 + this.step1);
    }


    getNextStep() {
        let number1 = this.b
        let number2 = this.d
        let instruction = 'mul'
        let hasNext = true
        if (this.step == 1) {
            this.startTime = new Date().getTime();
            number1 = this.b
            number2 = this.d
            instruction = 'mul'
        } else if (this.step == 2) {
            number1 = this.b
            number2 = this.d
            instruction = 'mulh'
        } else if (this.step == 3) {
            number1 = this.b
            number2 = this.c
            instruction = 'mul'
        }
        else if (this.step == 4) {
            number1 = this.a
            number2 = this.d
            instruction = 'mul'
        }
        else if (this.step == 5) {
            number1 = this.step2
            number2 = this.step3
            instruction = 'add'
        }
        else if (this.step == 6) {
            number1 = this.step5
            number2 = this.step4
            instruction = 'add'
        }
        else if (this.step == 7) {
            number1 = this.b
            number2 = this.c
            instruction = 'mulh'
        }
        else if (this.step == 8) {
            number1 = this.a
            number2 = this.d
            instruction = 'mulh'
        }
        else if (this.step == 9) {
            number1 = this.a
            number2 = this.c
            instruction = 'mul'
        }
        else if (this.step == 10) {
            number1 = this.step7
            number2 = this.step8
            instruction = 'add'
        }
        else if (this.step == 11) {
            number1 = this.step10
            number2 = this.step9
            instruction = 'add'
        }
        else if (this.step == 12) {
            number1 = this.carry1
            number2 = this.step11
            instruction = 'add'
        }
        else if (this.step == 13) {
            number1 = this.a
            number2 = this.c
            instruction = 'mulh'
        }
        else if (this.step == 14) {
            number1 = this.step13
            number2 = this.carry2
            instruction = 'add'
        }
        else {
            this.endTime = new Date().getTime();
            this.totalTime = this.endTime - this.startTime;
            hasNext = false
        }
        this.step++;
        return [hasNext, number1, number2, instruction]
    }




}
