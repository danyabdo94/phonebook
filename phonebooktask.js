var ContactInfo = function () {
  this.name = name;
  this.phone = phone;
  this.email = email;
};
var Phonebook = function () {
  this.phonebook = [];

  function phoneValidation(inputtxt) { // xx-xxx-xxxxx
    return /^[0-9]{2}-[0-9]{3}-[0-9]{4}$/.test(inputtxt);
  }
  Phonebook.prototype.add = function (contactInfo) {
    if (contactInfo.name.length > 100) {
      console.log("The Maximum name length is 100 characters");
      return;
    } else if (!phoneValidation(contactInfo.phone)) {
      console.log("Enter a valid phone number");
      return;
    } else if (this.phonebook.length >= 10000) {
      console.log("You reached the maximum contacts numbers");
      return;
    }
    this.phonebook.push(contactInfo);
  };
  Phonebook.prototype.remove = function (index) {
    if (index && this.phonebook[index]) {
      this.phonebook.splice(index, 1);
    }
  };
  Phonebook.prototype.search = function (query) {
    var tempArray = this.phonebook.filter(function (contact) {
      return contact.name.includes(query);
    });
    tempArray.push.apply(
      tempArray,
      this.phonebook.filter(function (contact) {
        if (tempArray.indexOf(contact) == -1) {
          return contact.phone.includes(query);
        }
      })
    );
    return tempArray && tempArray.length > 0 ? tempArray : [];
  };
  Phonebook.prototype.list = function (contactsPerPage, page) {
    if (contactsPerPage) {
      var startPoint = contactsPerPage * page;
      var listPhonebook = [];
      if (this.phonebook.length > startPoint) {
        for (var phoneIterator = startPoint; phoneIterator < startPoint + contactsPerPage; phoneIterator++) {
          listPhonebook.push(this.phonebook[phoneIterator]);
        }
        return listPhonebook;
      }
    } else {
      return this.phonebook;
    }
  };
};

function pad(num, size) { // helper for testing 0001 instead of 1
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
var tester = function () { // main testing function
  var myPhoneBook = new Phonebook();
  for (var phoneIterate = 0; phoneIterate < 9999; phoneIterate++) {
    myPhoneBook.add({
      name: "John Smith9",
      phone: "02-234-" + pad(phoneIterate, 4),
      email: "j.smith@mail.com"
    });
  }
  console.log(myPhoneBook.list(10, 5));
  myPhoneBook.remove(2);
  console.log(myPhoneBook.search("9"));

};
var testInst = new tester(); // begin testing