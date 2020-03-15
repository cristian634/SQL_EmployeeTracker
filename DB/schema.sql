DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL, 
    department_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
); 

 CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name  VARCHAR(30),
  last_name VARCHAR(30),
  role_id  INT,
  manager_id INT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role (id)
);

INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Development"); 

INSERT INTO role (title, salary, department_id) VALUES ("Graphic Designer", 75000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Intern",40000,1);
INSERT INTO role (title, salary, department_id) VALUES ("Leads",650000,2);
INSERT INTO role (title, salary, department_id) VALUES ("Salesman",70000,2);
INSERT INTO role (title, salary, department_id) VALUES ("Payroll", 100000,3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant",75000,3);
INSERT INTO role (title, salary, department_id) VALUES ("Manager",150000,4);
INSERT INTO role (title, salary, department_id) VALUES ("Programmer",120000,4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("John","Smith",1,8); 
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("Gabby","Knutson",1,8); 
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("Nicole","Smith",2,8); 
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("Greg","Corvis",2,8); 
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("Gabriel","Newport",3,8); 
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("Andrew","Ludgate",3,8); 
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("Trey","Cartman",4,8); 
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("Anthony","Cormier",4,null); 