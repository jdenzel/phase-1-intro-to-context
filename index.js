// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    const records = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };

    return records;
}

function createEmployeeRecords(array) {
  const employeeRecords = [];

  array.forEach(function(arr) {
    const record = createEmployeeRecord(arr);
    employeeRecords.push(record);
  });

  return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateStamp){
    const stringHour = dateStamp.slice(11)
    const numberHour = Number(stringHour)
    const employeeRecordTime = {
        type: "TimeIn",
        hour: numberHour,
        date: `${dateStamp.slice(0, 10)}`
    };
    employeeRecord.timeInEvents.push(employeeRecordTime)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const stringHour = dateStamp.slice(11)
    const numberHour = Number(stringHour)
    const employeeRecordTime = {
        type: "TimeOut",
        hour: numberHour,
        date: `${dateStamp.slice(0, 10)}`
    };
    employeeRecord.timeOutEvents.push(employeeRecordTime)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    const timeIn = employeeRecord.timeInEvents.find(record => record.date === date)
    const timeOut = employeeRecord.timeOutEvents.find(record => record.date === date)
    const hoursWorked = Math.abs((timeIn.hour - timeOut.hour)/100)
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date){   
    const wage = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    return wage
}

function allWagesFor(employeeRecord){
    const allDates = []
    for (let i = 0, l = employeeRecord.timeInEvents.length; i < l; i++) {
        allDates.push(employeeRecord.timeInEvents[i].date);
    }
    let total = 0
    for(let i = 0; i < allDates.length; i++){
        total += wagesEarnedOnDate(employeeRecord, allDates[i])
    }
    return total
}

function calculatePayroll(employeeRecord){
    let total = 0;
    for(let i = 0; i < employeeRecord.length; i++){
        total += allWagesFor(employeeRecord[i])
    }
    return total;
}



