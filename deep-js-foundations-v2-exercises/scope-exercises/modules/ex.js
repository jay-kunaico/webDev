// instantiate workshop
var deepJS = defineWorkshop();

// takes place of array and make them function calls
deepJS.addStudent(311, 'Frank', /*paid=*/ true);
deepJS.addStudent(410, 'Suzy', /*paid=*/ true);
deepJS.addStudent(709, 'Brian', /*paid=*/ false);
deepJS.addStudent(105, 'Henry', /*paid=*/ false);
deepJS.addStudent(502, 'Mary', /*paid=*/ true);
deepJS.addStudent(664, 'Bob', /*paid=*/ false);
deepJS.addStudent(250, 'Peter', /*paid=*/ true);
deepJS.addStudent(375, 'Sarah', /*paid=*/ true);
deepJS.addStudent(867, 'Greg', /*paid=*/ false);

// similarly here call the enrollStudent function
deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);

// update the below calls to call the functions in the module
deepJS.printCurrentEnrollment();
console.log('----');
deepJS.enrollPaidStudents();
console.log('----');
deepJS.remindUnpaidStudents();

// expted output
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

// wrap everything in a module factor function
function defineWorkshop() {
  // need data to be closed over, add arrays
  var currentEnrollment = [];
  var studentRecords = [];
  //make a publicAPI and return it
  var publicAPI = {
    // need the below according to READMe
    // add them as function to hide them inside of Module
    // and epose them here keeping data and other methods private
    addStudent,
    enrollStudent,
    printCurrentEnrollment,
    enrollPaidStudents,
    remindUnpaidStudents,
  };
  return publicAPI;

  function addStudent(id, name, paid) {
    // push those values into the studentRecords array
    studentRecords.push({ id, name, paid });
  }

  function enrollStudent(id) {
    // check to make sure duplicate ids are not added
    if (!currentEnrollment.includes(id)) {
      // push the value into the currentEnrollment array
      currentEnrollment.push(id);
    }
  }
  // Essentially takes place of prtinCurrentEnrollment
  function printCurrentEnrollment() {
    printRecords(currentEnrollment);
  }

  function enrollPaidStudents() {
    currentEnrollment = paidStudentsToEnroll();
    printCurrentEnrollment();
  }

  // taking the place of calling remindUnpaid
  function remindUnpaidStudents() {
    remindUnpaid(currentEnrollment);
  }

  function getStudentFromId(studentId) {
    return studentRecords.find(matchId);

    function matchId(record) {
      return record.id == studentId;
    }
  }

  function printRecords(recordIds) {
    var records = recordIds.map(getStudentFromId);

    records.sort(sortByNameAsc);
    records.forEach(printRecord);
  }

  function sortByNameAsc(record1, record2) {
    if (record1.name < record2.name) return -1;
    else if (record1.name > record2.name) return 1;
    else return 0;
  }

  function printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? 'Paid' : 'Not Paid'}`
    );
  }

  function paidStudentsToEnroll() {
    var recordsToEnroll = studentRecords.filter(needToEnroll);
    var idsToEnroll = recordsToEnroll.map(getStudentId);

    return [...currentEnrollment, ...idsToEnroll];
  }

  function needToEnroll(record) {
    return record.paid && !currentEnrollment.includes(record.id);
  }

  function getStudentId(record) {
    return record.id;
  }

  function remindUnpaid(recordIds) {
    var unpaidIds = recordIds.filter(notYetPaid);

    printRecords(unpaidIds);
  }

  function notYetPaid(studentId) {
    var record = getStudentFromId(studentId);
    return !record.paid;
  }
}
