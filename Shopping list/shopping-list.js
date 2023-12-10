document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('newItem').focus();
  addToLog('Page Loaded');
  populateCommonItems(['Milk', 'Eggs', 'Bread', 'Chicken', 'Tomatoes']);
});

function populateCommonItems(items) {
  const commonItemsElement = document.getElementById('commonItems');
  items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      const addBtn = document.createElement('button');
      addBtn.textContent = '+';
      addBtn.onclick = function() { addItem(item); }; // Use a function to prevent immediate invocation
      li.appendChild(addBtn);
      commonItemsElement.appendChild(li);
  });
}

function addItem(item) {
  // Check if item already exists in active list
  const activeListItems = document.querySelectorAll('#activeList li');
  for (let li of activeListItems) {
      if (li.textContent.replace('-', '').trim() === item) {
          return; // Item already exists, so don't add it again
      }
  }
  // Create list item for active list
  const li = document.createElement('li');
  li.textContent = item;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = '-';
  removeBtn.onclick = function() { removeItem(li, item); }; // Use a function to prevent immediate invocation
  li.appendChild(removeBtn);
  document.getElementById('activeList').appendChild(li);
  addToLog(`${item} added.`);
}

function removeItem(listItem, item) {
  listItem.parentNode.removeChild(listItem);
  addToLog(`${item} removed.`);
}

function addItemFromInput() {
  const inputElement = document.getElementById('newItem');
  const item = inputElement.value;
  if (item.trim() === '') {
      // Don't add empty items
      return;
  }
  addItem(item);
  inputElement.value = ''; // Clear the input field
  inputElement.focus(); // Put focus back to the input field
}

function addToLog(message) {
  const time = new Date().toLocaleTimeString();
  const logEntry = document.createElement('div');
  logEntry.textContent = `${time}: ${message}`;
  document.getElementById('logList').appendChild(logEntry);
}

// Prevent the default form submission and add the item when Enter is pressed
document.getElementById('grocery').addEventListener('submit', function(event) {
  event.preventDefault();
  addItemFromInput();
});
