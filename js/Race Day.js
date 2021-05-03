let raceNumber = Math.floor(Math.random() * 1000);
let registeredEarly = true;
let runnerAge = 18;
if (runnerAge > 18 && registeredEarly === true) {
    raceNumber += 1000;
    console.log("9:30am " + raceNumber);
} else if (runnerAge > 18 && registeredEarly === false) {
    raceNumber += 1000;
    console.log("11:00am " + raceNumber);
} else if (runnerAge < 18) {
    raceNumber += 1000;
    console.log("12:30am " + raceNumber);
} else {
    console.log("see the registration desk")
}