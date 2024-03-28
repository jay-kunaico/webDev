// function getStudentId(studentId) {
//   return studentRecords.find(function matchedId(record) {
//     return record.id == studentId;
//   });
// }
// AS an Arrow function
const getStudentId = (studentId) =>
  studentRecords.find((record) => record.id == studentId);

// function printRecords(recordIds) {
//   const records = recordIds.map(getStudentId);
//   records.sort(function sortByNameAsc(record1, record2) {
//     if (record1.name < record2.name) {
//       return -1;
//     } else if (record1.name > record2.name) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
//   records.forEach(function printRecord(record) {
//     console.log(
//       `${record.name} (${record.id}): ${record.pad ? "Paid" : "Not Paid"} `
//     );
//   });
// }
// AS an Arrow function
const printRecords = (recordIds) =>
  recordIds
    .map(getStudentId)
    .sort((record1, record2) =>
      record1.name < record2.name ? -1 : record1.name > record2.name ? 1 : 0
    )
    .forEach((record) =>
      console.log(
        `${record.name} (${record.id}): ${record.paid ? 'Paid' : 'Not Paid'}`
      )
    );

// function paidStudentsToEnroll() {
//   const idsToEnroll = studentRecords
//     .filter(function needsToEnroll(record) {
//       return record.paid && !currentEnrollment.includes(record.id);
//     })
//     .map(function getStudentId(record) {
//       return record.id;
//     });
//   return [...currentEnrollment, ...idsToEnroll];
// }
// As an Arrow function
var paidStudentsToEnroll = () =>
  // just return the array
  [
    ...currentEnrollment,
    ...studentRecords
      .filter((record) => record.paid && !currentEnrollment.includes(record.id))
      .map((record) => record.id),
  ];

// function remindUnpaid(recordIds) {
//   var unpaidIds = recordIds.filter(function notYetPaid(studentId) {
//     var record = getStudentId(studentId);
//     return !record.paid;
//   });

//   printRecords(unpaidIds);
// }
// As an Arrow function
var remindUnpaid = (recordIds) =>
  printRecords(recordIds.filter((studentId) => !getStudentId(studentId).paid));

// ********************************

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
