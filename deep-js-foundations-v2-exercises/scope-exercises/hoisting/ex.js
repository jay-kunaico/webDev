// move executable code to top
var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: 'Frank', paid: true },
  { id: 410, name: 'Suzy', paid: true },
  { id: 709, name: 'Brian', paid: false },
  { id: 105, name: 'Henry', paid: false },
  { id: 502, name: 'Mary', paid: true },
  { id: 664, name: 'Bob', paid: false },
  { id: 250, name: 'Peter', paid: true },
  { id: 375, name: 'Sarah', paid: true },
  { id: 867, name: 'Greg', paid: false },
];

printRecords(currentEnrollment);
console.log('----');
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log('----');
remindUnpaid(currentEnrollment);

// function getStudentFromId(studentId) {
// 	return studentRecords.find(function matchId(record){
// 		return (record.id == studentId);
// 	});
// }
function getStudentFromId(studentId) {
  return studentRecords.find(matchId);

  // reads cleaner to find student record by id

  function matchId(record) {
    return record.id == studentId;
  }
}

// function printRecords(recordIds) {
//   var records = recordIds.map(getStudentFromId);

//   records.sort(function sortByNameAsc(record1, record2) {
//     if (record1.name < record2.name) return -1;
//     else if (record1.name > record2.name) return 1;
//     else return 0;
//   });

//   records.forEach(function printRecord(record) {
//     console.log(
//       `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`
//     );
//   });
// }
function printRecords(recordIds) {
  var records = recordIds.map(getStudentFromId);

  records.sort(sortByNameAsc);

  records.forEach(printRecord);
}
// pulled out to be its only stand alone function
function sortByNameAsc(record1, record2) {
  if (record1.name < record2.name) return -1;
  else if (record1.name > record2.name) return 1;
  else return 0;
}
// pulled out to be its only stand alone function
function printRecord(record) {
  console.log(
    `${record.name} (${record.id}): ${record.paid ? 'Paid' : 'Not Paid'}`
  );
}

// function paidStudentsToEnroll() {
// inline filter function is not using any of the internal vars so pull it out
//   var recordsToEnroll = studentRecords.filter(function needToEnroll(record) {
//     return record.paid && !currentEnrollment.includes(record.id);
//   });

// not refering to anything internally
//   var idsToEnroll = recordsToEnroll.map(function getStudentId(record) {
//     return record.id;
//   });

//   return [...currentEnrollment, ...idsToEnroll];
// }

function paidStudentsToEnroll() {
  var recordsToEnroll = studentRecords.filter(needToEnroll);

  var idsToEnroll = recordsToEnroll.map(getStudentId);

  return [...currentEnrollment, ...idsToEnroll];
}

// moved to outer scope to make a simpler scope model
function needToEnroll(record) {
  return record.paid && !currentEnrollment.includes(record.id);
}
// moved out
function getStudentId(record) {
  return record.id;
}

// function remindUnpaid(recordIds) {
// notYetPaid not using internal
//   var unpaidIds = recordIds.filter(function notYetPaid(studentId) {
//     var record = getStudentFromId(studentId);
//     return !record.paid;
//   });

//   printRecords(unpaidIds);
// }

function remindUnpaid(recordIds) {
  var unpaidIds = recordIds.filter(notYetPaid);

  printRecords(unpaidIds);
}
// moved out
function notYetPaid(studentId) {
  var record = getStudentFromId(studentId);
  return !record.paid;
}

// ********************************

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
