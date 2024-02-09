function doPost(e) {
  // Add your Google Sheet ID
  var sheet = SpreadsheetApp.openById('1hokhcPJ1lS48-ZxcEERrX8cmxBN-qC_e1X10AVB-9zM').getActiveSheet();

  // Generate a random complaint number between 1 and 9999
  var sequentialNumber = 0;

function generateSerialNumber() {
  var today = new Date();
  var year = today.getFullYear().toString();
  var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because January is 0
  var date = today.getDate().toString().padStart(2, '0');
  
  sequentialNumber++; // Increment the sequential number
  var sequentialNumber = PropertiesService.getScriptProperties().getProperty('sequentialNumber');
  sequentialNumber = (sequentialNumber !== null) ? Number(sequentialNumber) + 1 : 1;
  PropertiesService.getScriptProperties().setProperty('sequentialNumber', sequentialNumber);

  var sequentialString = sequentialNumber.toString().padStart(2, '0'); // Convert sequential number to string and pad with leading zero if necessary
  
  // Concatenate components with leading zeros if necessary
  var serialNumber = date + month + year.substr(-2) + sequentialString; // Taking last two digits of the year
  return serialNumber;
}

var complaintNumber = generateSerialNumber();


  // Add timestamp, complaint number, and all form data to the data
  var rowData = [
    new Date(),
    e.parameter['Full Name'] || '',
    e.parameter['Phone Number'] || '',
    e.parameter['Email'] || '',
    e.parameter['Building Name'] || '',
    e.parameter['Flat Number'] || '',
    e.parameter['Issue Description'] || '',
    e.parameter['UploadcareUrl'] || '', // Include Uploadcare URL in the data
    complaintNumber
  ];

  sheet.appendRow(rowData);

  return ContentService.createTextOutput(JSON.stringify({ 'status': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
