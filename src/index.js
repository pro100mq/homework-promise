// 1

const delay = ms => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(ms);
    }, ms);
  });
};

const Firstlogger = time => console.log(`Resolved after ${time}ms`);

delay(2000).then(Firstlogger); // Resolved after 2000ms
delay(1000).then(Firstlogger); // Resolved after 1000ms
delay(1500).then(Firstlogger); // Resolved after 1500ms

// 2

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
  return new Promise((res, rej) => {
    const updatedUsers = allUsers.map(user =>
      user.name === userName ? { ...user, active: !user.active } : user
    );

    res(updatedUsers);
  });
};

const logger = (updatedUsers) => console.table(updatedUsers);

toggleUserState(users, 'Mango').then(logger);
toggleUserState(users, 'Lux').then(logger);

// 3

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  return new Promise((res, rej) => {
    const delay = randomIntegerFromInterval(200, 500);
    setTimeout(() => {
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
        res({id: transaction.id, time: delay});
      } else {
        rej(transaction.id);
      }
    }, delay);
  });
};

const logSuccess = ({id, time}) => {
  console.log(`Transaction ${id} processed in ${time} ms`);
};

const logError = (id) => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};


makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);
makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);
makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);
makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);
