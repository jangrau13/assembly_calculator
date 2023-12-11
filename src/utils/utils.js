export const generateRandomBinaryNumber = () => {
    return Math.floor(Math.random() * 8).toString(2); // Generate a random number between 0 and 7 and convert to binary
};

export function generateFullBinaryNumber() {
    let binaryNumber = '1'; // Start with '1' to ensure the number is 18 digits long
    for (let i = 1; i < 6; i++) {
        binaryNumber += Math.floor(Math.random() * 2); // Append random 0 or 1
    }
    return binaryNumber;
}

export function add(string1, string2) {
    const maxLength = Math.max(string1.length, string2.length);
    const paddedString1 = string1.padStart(maxLength, '0');
    const paddedString2 = string2.padStart(maxLength, '0');

    let carry = 0;
    let sum = '';

    for (let i = maxLength - 1; i >= 0; i--) {
        const digit1 = parseInt(paddedString1[i], 10);
        const digit2 = parseInt(paddedString2[i], 10);

        const total = digit1 + digit2 + carry;
        const currentDigit = total % 2;
        carry = Math.floor(total / 2);

        sum = currentDigit.toString() + sum;
    }

    if (carry > 0) {
        sum = carry.toString() + sum;
    }

    return sum;
}

export function sub(string1, string2) {
    const maxLength = Math.max(string1.length, string2.length);
    const paddedString1 = string1.padStart(maxLength, '0');
    const paddedString2 = string2.padStart(maxLength, '0');

    let borrow = 0;
    let difference = '';

    for (let i = maxLength - 1; i >= 0; i--) {
        const digit1 = parseInt(paddedString1[i], 2); // Parse binary digit
        const digit2 = parseInt(paddedString2[i], 2); // Parse binary digit

        const total = digit1 - digit2 - borrow;
        const currentDigit = (total < 0 ? 2 : 0) + total; // Adjusted for 4 digits
        borrow = total < 0 ? 1 : 0;

        difference = currentDigit.toString(2) + difference; // Convert back to binary
    }

    // Include any remaining borrow as the most significant digit
    if (borrow > 0) {
        difference = borrow.toString(2) + difference; // Convert back to binary
    }

    // Pad with zeros to ensure a 4-digit result
    difference = difference.padStart(4, '0');

    return difference;
}

export function carry(string) {
    // Convert the 4-digit string to an array of digits
    const digits = string.split('').map(Number);

    // Return the first element in the array (most significant digit)
    return digits[0].toString();
}

export function and(string1, string2) {
    // Convert the input strings to arrays of digits
    const digits1 = string1.split('').map(Number);
    const digits2 = string2.split('').map(Number);

    // Perform bitwise AND operation on corresponding digits
    const resultDigits = digits1.map((digit, index) => digit & digits2[index]);

    // Return the result as a 3-digit string
    return resultDigits.slice(0, 3).join('');
}

export function mul(string1, string2) {
    let product = binaryToInt(string1) * binaryToInt(string2);
    let binaryProduct = intToBinary(product).toString(2).padStart(6, '0');
    // Take only the upper 3 bits of the product
    let lower3 = binaryProduct.slice(3, 6);
    return lower3;
}

export function mulh(string1, string2) {
    let product = binaryToInt(string1) * binaryToInt(string2);
    let binaryProduct = intToBinary(product).toString(2).padStart(6, '0');
    // Take only the upper 3 bits of the product
    let upper3 = binaryProduct.slice(0, 3);
    return upper3;

}

function intToBinary(num) {
    // Use toString(2) to convert the number to binary
    return num.toString(2);
}

function binaryToInt(binaryString) {
    // Use parseInt with base 2 to convert binary string to integer
    return parseInt(binaryString, 2);
}


export function transformToString(value) {
    return value.toString();
}

export function fillWithZeros(value, length) {
    // Convert the value to a string (if it's not already)
    const stringValue = String(value);

    // Use padStart to add zeros to the beginning of the string
    const filledString = stringValue.padStart(length, '0');

    return filledString;
}

