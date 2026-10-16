//  Start from 1 up to a given number like 100.
// • Multiples of 3: Print or say "Fizz".
// • Multiples of 5: Print or say "Buzz".
// • Multiples of both 3 and 5: Print or say "FizzBuzz" (divisible by 15).
// • Other numbers: Print the number itself.

//ask the recruiter questions( whole numbers or decimal places as well? negative numbers or only positive? from which number to which?)
// PREP = parameters, Returns, Examples, pseudocode
// number put through the loop -- return outputted -- 9,20,15,
// a number goes through, check for divisibility and see if it fits the requirements, so 1 through 10 , display 1,2,fizz,4,buzz,
//1,2,fizz,4,buzz,fizz,7,8,fizz,,buzz
//amd if the number is divisible by both, return fizzBuzz. examples, 15, 30, 45, 60, 75, 90. and the logic would return a string in all cases


//function that runs the logic

function fizzBuzz(num) {
    let result = [];
    for (let i = 1; i <= num ; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
             result.push('FizzBuzz');

        } else if (i % 3 === 0) {
             result.push('fizz')
        } else if (i % 5 === 0) {
            result.push('buzz')
        } else {
            result.push(i);
        }
    }
    return result;

}
console.log(fizzBuzz(30))

//inside the function have a for loop that goes through a set amount of numbers and checks for
//divsibility by three and five and both at the same time, else return the nubmer (4 outputs, returning from a array of numbers,
//in the case that its fizz,buzz or fizzbuzz, its a string otherwise return the integer itself.)

// within the function use conditional logic, maybe ternary operators
// for loop logic