//Define our own object
// copy the functions into an object litteral
// we do not need factory function anymore
var deepJS = {
  // add empty arrays
  currentEnrollment: [],
  studentRecords: [],

  // remove "function" from below functions
  // add this. to reference
  addStudent(id, name, paid) {
    this.studentRecords.push({ id, name, paid });
  },

  enrollStudent(id) {
    if (!this.currentEnrollment.includes(id)) {
      this.currentEnrollment.push(id);
    }
  },
  printCurrentEnrollment() {
    this.printRecords(this.currentEnrollment);
  },
  enrollPaidStudents() {
    this.currentEnrollment = this.paidStudentsToEnroll();
    this.printCurrentEnrollment();
  },
  remindUnpaidStudents() {
    this.remindUnpaid(this.currentEnrollment);
  },
  getStudentFromId(studentId) {
    return this.studentRecords.find(matchId);

    function matchId(record) {
      return record.id == studentId;
    }
  },
  printRecords(recordIds) {
    // take care of method references that are hard bound and add bind
    // because it will lose this reference because its a method
    var records = recordIds.map(this.getStudentFromId.bind(this));
    records.sort(this.sortByNameAsc.bind(this)); // need binding?
    records.forEach(this.printRecord.bind(this));
  },
  sortByNameAsc(record1, record2) {
    if (record1.name < record2.name) return -1;
    else if (record1.name > record2.name) return 1;
    else return 0;
  },
  printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? 'Paid' : 'Not Paid'}`
    );
  },
  paidStudentsToEnroll() {
    var recordsToEnroll = this.studentRecords.filter(
      this.needToEnroll.bind(this)
    );

    var idsToEnroll = recordsToEnroll.map(this.getStudentId.bind(this)); // needs binding?

    return [...this.currentEnrollment, ...idsToEnroll];
  },
  needToEnroll(record) {
    return record.paid && !this.currentEnrollment.includes(record.id);
  },
  getStudentId(record) {
    return record.id;
  },
  remindUnpaid(recordIds) {
    // take care of method references that are hard bound and add bind
    // because it will lose this reference because its a method
    var unpaidIds = recordIds.filter(this.notYetPaid.bind(this));

    this.printRecords(unpaidIds);
  },
  notYetPaid(studentId) {
    var record = this.getStudentFromId(studentId);
    return !record.paid;
  },
};

deepJS.addStudent(311, 'Frank', /*paid=*/ true);
deepJS.addStudent(410, 'Suzy', /*paid=*/ true);
deepJS.addStudent(709, 'Brian', /*paid=*/ false);
deepJS.addStudent(105, 'Henry', /*paid=*/ false);
deepJS.addStudent(502, 'Mary', /*paid=*/ true);
deepJS.addStudent(664, 'Bob', /*paid=*/ false);
deepJS.addStudent(250, 'Peter', /*paid=*/ true);
deepJS.addStudent(375, 'Sarah', /*paid=*/ true);
deepJS.addStudent(867, 'Greg', /*paid=*/ false);

deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);

deepJS.printCurrentEnrollment();
console.log('----');
deepJS.enrollPaidStudents();
console.log('----');
deepJS.remindUnpaidStudents();

// expected output
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
