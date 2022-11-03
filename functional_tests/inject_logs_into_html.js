

let logs = JSON.stringify(console.everything || ["empty"]);
let input = document.createElement("input");
input.id = "consoleLogs";
input.value = logs;
document.body.appendChild(input);
