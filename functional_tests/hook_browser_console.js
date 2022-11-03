
if (console.everything === undefined) {
  console.everything = [];
  function timeStamp(){
    return (new Date).toLocaleString('sv', { timeZone: 'UTC' }) + 'Z';
  }
  window.onerror = function (error, url, line) {
    console.everything.push({
      type: 'exception',
      timeStamp: timeStamp(),
      value: { error, url, line },
    });
    return false;
  };
  window.onunhandledrejection = function (e) {
    console.everything.push({
      type: 'promiseRejection',
      timeStamp: timeStamp(),
      value: e.reason,
    });
  };

  function hookLogType(logType) {
    const original= console[logType].bind(console);
    return function(){
      const raw_data = Array.from(arguments);
      const stringified_data = raw_data.map(data => data.toString());
      console.everything.push({
        type: logType,
        timeStamp: timeStamp(),
        value: stringified_data,
      });
      original.apply(console, arguments);
    }
  }

  ['log', 'error', 'warn', 'debug'].forEach(logType=>{
    console[logType] = hookLogType(logType);
  });
}