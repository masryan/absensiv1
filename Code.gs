// Google Apps Script file for handling spreadsheet operations

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

function doGet(e) {
  const action = e.parameter.action;
  
  switch(action) {
    case 'login':
      return handleLogin(e);
    case 'attendance':
      return handleAttendance(e);
    case 'leave':
      return handleLeave(e);
    case 'asset':
      return handleAsset(e);
    default:
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Invalid action'
      })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  return doGet(e);
}

function handleLogin(e) {
  const username = e.parameter.username;
  const password = e.parameter.password;
  
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const userSheet = ss.getSheetByName('User');
  const users = userSheet.getDataRange().getValues();
  
  for (let i = 1; i < users.length; i++) {
    if (users[i][2] === username && users[i][3] === password) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        data: {
          idPPNPN: users[i][0],
          name: users[i][1],
          role: users[i][4],
          job: users[i][5]
        }
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'Invalid credentials'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleAttendance(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Absensi');
  
  if (e.parameter.type === 'check') {
    // Implementation for checking attendance
  } else if (e.parameter.type === 'record') {
    // Implementation for recording attendance
  }
}

function handleLeave(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Ijin');
  
  if (e.parameter.type === 'request') {
    // Implementation for leave request
  } else if (e.parameter.type === 'approve') {
    // Implementation for leave approval
  }
}

function handleAsset(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Asset');
  
  switch(e.parameter.type) {
    case 'list':
      // Implementation for listing assets
      break;
    case 'borrow':
      // Implementation for borrowing assets
      break;
    case 'return':
      // Implementation for returning assets
      break;
  }
}