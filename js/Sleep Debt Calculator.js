function getSleepHours(day) {
    if (day === "monday") {
        return 8;
    }
    if (day === "tuesday") {
        return 8;
    }
    if (day === "wednesday") {
        return 8;
    }
    if (day === "thursday") {
        return 8;
    }
    if (day === "friday") {
        return 8;
    }
    if (day === "saturday") {
        return 8;
    }
    if (day === "sunday") {
        return 8;
    }

}
console.log(getSleepHours("monday"))

function getActualSleepHours() {
    return getSleepHours("monday") + getSleepHours("tuesday") + getSleepHours("wednesday") + getSleepHours("thursday") + getSleepHours("friday") + getSleepHours("saturday") + getSleepHours("sunday")
}
console.log(getActualSleepHours())

function getIdealSleepHours() {
    const idealHours = 10;
    return idealHours * 7;
}

function calculateSleepDebt() {
    const actualSleepHours = getActualSleepHours()
    const idealSleepHours = getIdealSleepHours()
    if (actualSleepHours === idealSleepHours) {
        console.log("pefect amount of sleep")
    } else if (actualSleepHours > idealSleepHours) {
        console.log("you got " + (actualSleepHours - idealSleepHours) + " more sleep than needed")
    } else if (actualSleepHours < idealSleepHours) {
        console.log("you got " + (idealSleepHours - actualSleepHours) + " less sleep than needed")

    }
}
calculateSleepDebt()