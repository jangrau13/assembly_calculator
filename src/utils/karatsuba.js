import { add, mul, mulh, carry, and, sub } from './utils.js';


export default class KaratsubaImpl {
    constructor(string1, string2) {
        this.name = 'karatsuba';
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
        this.step1 = mul(this.a, this.c).toString(2).padStart(3, '0');
        if (logIt) console.log('step1', this.step1);
        // step 2
        this.step2 = mulh(this.a, this.c).toString(2).padStart(3, '0');
        if (logIt) console.log('step2', this.step2);
        // step 3
        this.step3 = mul(this.b, this.d).toString(2).padStart(3, '0');
        if (logIt) console.log('step3', this.step3);
        // step 4
        this.step4 = mul(this.b, this.d).toString(2).padStart(3, '0');
        if (logIt) console.log('step4', this.step4);
        // step 5 
        this.step5 = add(this.a, this.b).toString(2).padStart(4, '0');
        this.carry5 = carry(this.step5);
        this.carry5 = this.carry5.slice(-1);
        this.step5 = this.step5.slice(-3).padStart(3, '0');
        if (logIt) console.log('step5', this.step5);
        if (logIt) console.log('carry5', this.carry5);
        // step 6
        this.step6 = add(this.c, this.d).toString(2).padStart(4, '0');
        this.carry6 = (parseInt(carry(this.step6))).toString(2)
        this.carry6 = this.carry6.slice(-1);
        this.step6 = this.step6.slice(-3).padStart(3, '0');
        if (logIt) console.log('step6', this.step6);
        if (logIt) console.log('carry6', this.carry6);
        // step 7
        this.step7 = mul(this.step5, this.step6).toString(2).padStart(3, '0');
        if (logIt) console.log('step7', this.step7);
        // step 8
        this.step8 = mulh(this.step5, this.step6).toString(2).padStart(3, '0');
        if (logIt) console.log('step8', this.step8);
        // step 9
        this.step9 = and(this.carry5, this.carry6).toString(2).padStart(3, '0');
        if (logIt) console.log('step9', this.step9);
        // step 10
        this.step10 = sub('000', this.step9).toString(2).padStart(4, '0');
        this.carry10 = carry(this.step10);
        this.carry10 = this.carry10.slice(-1);
        this.step10 = this.step10.slice(-3).padStart(3, '0');
        if (logIt) console.log('step10', this.step10);
        if (logIt) console.log('carry10', this.carry10);
        // step 11
        this.step11 = and(this.step10, this.c).toString(2).padStart(3, '0');
        if (logIt) console.log('step11', this.step11);
        // step 12
        this.step12 = and(this.step10, this.d).toString(2).padStart(3, '0');
        if (logIt) console.log('step12', this.step12);
        // step 13
        this.step13 = add(this.step9, this.step12).toString(2).padStart(4, '0');
        this.carry13 = carry(this.step13);
        this.carry13 = this.carry13.slice(-1);
        this.step13 = this.step13.slice(-3).padStart(3, '0');
        if (logIt) console.log('step13', this.step13);
        if (logIt) console.log('carry13', this.carry13);
        // step 14
        this.step14 = add(this.step9, this.step12).toString(2).padStart(4, '0');
        this.carry14 = carry(this.step14);
        this.carry14 = this.carry14.slice(-1);
        this.step14 = this.step14.slice(-3).padStart(3, '0');
        if (logIt) console.log('step14', this.step14);
        if (logIt) console.log('carry14', this.carry14);
        // step 15
        this.step15 = sub(this.step7, this.step1).toString(2).padStart(4, '0');
        this.carry15 = carry(this.step15);
        this.carry15 = this.carry15.slice(-1);
        this.step15 = this.step15.slice(-3).padStart(3, '0');
        if (logIt) console.log('step15', this.step15);
        if (logIt) console.log('carry15', this.carry15);
        // step 16
        this.step16 = add(this.step8, this.step3).toString(2).padStart(4, '0');
        this.carry16 = carry(this.step16);
        this.carry16 = this.carry16.slice(-1);
        this.step16 = this.step16.slice(-3).padStart(3, '0');
        if (logIt) console.log('step16', this.step16);
        if (logIt) console.log('carry16', this.carry16);
        // step 17
        this.step17 = sub(this.step13, this.step2).toString(2).padStart(4, '0');
        this.carry17 = carry(this.step17);
        this.carry17 = this.carry17.slice(-1);
        this.step17 = this.step17.slice(-3).padStart(3, '0');
        if (logIt) console.log('step17', this.step17);
        if (logIt) console.log('carry17', this.carry17);
        // step 18
        this.step18 = sub(this.step14, this.step4).toString(2).padStart(4, '0');
        this.carry18 = carry(this.step18);
        this.carry18 = this.carry18.slice(-1);
        this.step18 = this.step18.slice(-3).padStart(3, '0');
        if (logIt) console.log('step18', this.step18);
        if (logIt) console.log('carry18', this.carry18);
        // step 19
        this.step19 = and(this.step4, this.step12).toString(2).padStart(4, '0');
        this.carry19 = carry(this.step19);
        this.carry19 = this.carry19.slice(-1);
        this.step19 = this.step19.slice(-3).padStart(3, '0');
        if (logIt) console.log('step19', this.step19);
        if (logIt) console.log('carry19', this.carry19);
        // step 20
        this.step20 = add(this.step3, this.step13).toString(2).padStart(4, '0');
        this.carry20 = carry(this.step20);
        this.carry20 = this.carry20.slice(-1);
        this.step20 = this.step20.slice(-3).padStart(3, '0');
        if (logIt) console.log('step20', this.step20);
        if (logIt) console.log('carry20', this.carry20);
        
    }


    getNextStep() {
        let number1 = this.b
        let number2 = this.d
        let instruction = 'mul'
        let hasNext = true
        if (this.step == 1) {
            this.startTime = new Date().getTime();
            number1 = this.a
            number2 = this.c
            instruction = 'mul'
        } else if (this.step == 2) {
            number1 = this.a
            number2 = this.c
            instruction = 'mulh'
        } else if (this.step == 3) {
            number1 = this.b
            number2 = this.d
            instruction = 'mul'
        } else if (this.step == 4) {
            number1 = this.b
            number2 = this.d
            instruction = 'mulh'
        } else if (this.step == 5) {
            number1 = this.a
            number2 = this.b
            instruction = 'add'
        } else if (this.step == 6) {
            number1 = this.c
            number2 = this.d
            instruction = 'add'
        } else if (this.step == 7) {
            number1 = this.step5
            number2 = this.step6
            instruction = 'mul'
        } else if (this.step == 8) {
            number1 = this.step5
            number2 = this.step6
            instruction = 'mulh'
        } else if (this.step == 9) {
            number1 = this.carry5
            number2 = this.carry6
            instruction = 'and'
        } else if (this.step == 10) {
            number1 = '000'
            number2 = this.step9
            instruction = 'sub'
        } else if (this.step == 11) {
            number1 = this.step10
            number2 = this.c
            instruction = 'and'
        } else if (this.step == 12) {
            number1 = this.step10
            number2 = this.d
            instruction = 'and'
        } else if (this.step == 13) {
            number1 = this.step9
            number2 = this.step12
            instruction = 'add'
        } else if (this.step == 14) {
            number1 = this.step9
            number2 = this.step12
            instruction = 'add'
        } else if (this.step == 15) {
            number1 = this.step7
            number2 = this.step1
            instruction = 'sub'
        } else if (this.step == 16) {
            number1 = this.step8
            number2 = this.step3
            instruction = 'add'
        } else if (this.step == 17) {
            number1 = this.step13
            number2 = this.step2
            instruction = 'sub'
        } else if (this.step == 18) {
            number1 = this.step14
            number2 = this.step4
            instruction = 'sub'
        } else if (this.step == 19) {
            number1 = this.step4
            number2 = this.step12
            instruction = 'and'
        } else if (this.step == 20) {
            number1 = this.step3
            number2 = this.step13
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
