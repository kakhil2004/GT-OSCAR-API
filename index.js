import Lecture from './src/Lecture.js' 

const subject = "MATH"
const classNumber = 1554



let test = new Lecture(subject,classNumber)
test.Init().then(value=>{
    console.log("index.js ran")
})

