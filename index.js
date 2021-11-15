function createEmployeeRecord(employee) {
    let record = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
} 

function createEmployeeRecords(employees) {
    return employees.map(records => createEmployeeRecord(records))
}

const createTimeInEvent = function (dateStamp) {
    let [date, hours] = dateStamp.split(" ")
    hours = parseInt(hours, 10)
    
    let updateTimeEmployee = {
        type: 'TimeIn',
        hour: hours,
        date: date
    }

    this.timeInEvents.push(updateTimeEmployee)
    return this
}

const createTimeOutEvent = function (dateStamp) {
    let [date, hours] = dateStamp.split(" ")
    hours = parseInt(hours, 10)
    
    let updateTimeEmployee = {
        type: 'TimeOut',
        hour: hours,
        date: date
    }

    this.timeOutEvents.push(updateTimeEmployee)
    return this
}

function hoursWorkedOnDate(hourDate) {
    let inHours = this.timeInEvents.find(inEvent => inEvent.date === hourDate)

    let outHours = this.timeOutEvents.find(outEvent => outEvent.date === hourDate)
    let hoursWorked = (outHours.hour - inHours.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(payDate) {
    return hoursWorkedOnDate.call(this, payDate) * this.payPerHour
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (array, Name) {
    let findEmployee = array.find(record => record.firstName === Name)
    return findEmployee
}

const calculatePayroll = function (array) {
    return array.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}
