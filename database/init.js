const db = require("./connection");

db.query(  `
CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  gender BOOLEAN NOT NULL,
  age INT NOT NULL
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
