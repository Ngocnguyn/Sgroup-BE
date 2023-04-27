const db = require("./connection");

db.query(  `
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL unique,
  password VARCHAR(255) NOT NULL,
  salt varchar(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INT unsigned NOT NULL,
  gender BOOLEAN NOT NULL,
  email VARCHAR(255) NOT NULL
)
  `,(err,result) => {
    if (err) {
      console.error('Error creating table: ' + err.stack);
      return;
    }
    db.query('INSERT INTO user (fullname, gender, age) VALUES (?, ?, ?)', ['Ngoc', true, 21], (err, result) => {
      if (err) {
        console.error('Error inserting data: ' + err.stack);
        return;
      }
      console.log('Data inserted successfully');
    });
  }
);
