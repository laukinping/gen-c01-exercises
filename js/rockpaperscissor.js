const getUserChoice = userInput => {userInput = userInput.toLowerCase();
if (userInput === 'rock'||userInput ==='paper' || userInput ==='scissors' || userInput ==='bomb') 
{
  return userInput
}
else {
  console.log('error');
}}



function getComputerChoice() {
let num = Math.floor(Math.random()*3);


  if (num === 0) {
    return "rock"
  }
  else if (num === 1){
    return "scissors"
  }
  else if (num === 2) {
    return "paper"
  }
}




let determineWinner = (userChoice,computerChoice) =>{ 
if (userChoice === computerChoice) {
  return "tie"
}
 else if (userChoice === "rock"){
   if (computerChoice === "paper") {
     return "computer won"
   }
   else {
     return "user won"
    
   } 
 }

else if (userChoice === 'paper'){
  if (computerChoice === "scissors") {
     return "computer won"
   }
   else {
     return "user won"
   } 
 }
else if (userChoice === 'scissors'){
  if (computerChoice === "rock") {
     return "computer won"
   }
   else {
     return "user won"
   } 
 } 
 else if (userChoice === 'bomb'){
     return "you won"
 } 
}
 const playGame = () => {
   const userchoice = getUserChoice('bomb')
   const computerchoice = getComputerChoice()
   console.log("You threw: " + userchoice)
   console.log("The computer threw: "+computerchoice)
   console.log(determineWinner(userchoice,computerchoice))
 }
playGame()