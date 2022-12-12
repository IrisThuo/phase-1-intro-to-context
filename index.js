// Your code here
function createEmployeeRecord(Employeeinfo){
    let obj = {
     firstName: Employeeinfo[0],
     familyName: Employeeinfo[1],
     title: Employeeinfo[2],
     payPerHour: Employeeinfo[3],
     timeInEvents: [] ,
     timeOutEvents: []
    }
    return obj
 }
 
 function createEmployeeRecords(Arr){
    let arg = []
    
    Arr.forEach((array) => {
       let newValues = createEmployeeRecord(array)
       arg.push(newValues)
    });
    return arg
 }
 
 function createTimeInEvent(objToPopulate, date){
    let timing = date.split(' ')[1]
    let dateinfo = date.split(' ')[0] 
 
    const timeInInfo = {
       type : "TimeIn",
       hour : Number(timing),
       date : dateinfo
    }
    let k = objToPopulate.timeInEvents
    k.push(timeInInfo)
    return objToPopulate
 }
 
 function createTimeOutEvent(EmployeeCard, date){
    let timing = date.split(' ')[1]
    let dateinfo = date.split(' ')[0] 
    let timeOutInfo = {
       type : "TimeOut",
       hour : Number(timing),
       date : dateinfo
    }
    let k = EmployeeCard.timeOutEvents
    k.push(timeOutInfo)
    return EmployeeCard
 
 }
 function hoursWorkedOnDate(EmployeeCard, dateInQuestion){
    let timeIn = EmployeeCard.timeInEvents
    let timeOut = EmployeeCard.timeOutEvents
    let entryHour;
    let exitHour;
 
    for (const timeInInfo of timeIn){
       if (timeInInfo.date === dateInQuestion){
          entryHour = timeInInfo.hour
       }      
    }
 
    for (const timeOutInfo of timeOut){
       if (timeOutInfo.date === dateInQuestion){
          exitHour = timeOutInfo.hour
       }
    }

    // divide by 100 cause time in 24hrs
    return(exitHour - entryHour)/100
 
 }
 
 function wagesEarnedOnDate(EmployeeCard, dateInQuestion){
    let shiftTime =   hoursWorkedOnDate(EmployeeCard, dateInQuestion)
    let salary = shiftTime * EmployeeCard.payPerHour
    return salary
 }
 
 function allWagesFor(EmployeeCard){ 
    let datesOnShift = EmployeeCard.timeInEvents.map(dataCollection => {
       let dateWorked = dataCollection.date
       return wagesEarnedOnDate(EmployeeCard,dateWorked)
    })
    const totalSalary = datesOnShift.reduce((previousValue, currentValue) => {
       return previousValue+currentValue
    })
    return totalSalary
 }
 
 function calculatePayroll(EmployeeCard){
    let employeeSalaries = EmployeeCard.map(dataCollection => {
       return allWagesFor(dataCollection)
    }) 
    let totalEmployeSalaries = employeeSalaries.reduce((previousValue, currentValue) => {
       return previousValue+currentValue
    })
    return totalEmployeSalaries
 }
