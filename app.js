var connection = require("./connection/connection.js");

var inquirer = require("inquirer");
var colors = require("colors");

//select options
function optionSelect() {
    inquirer
        .prompt({
            name: "select",
            type: "list",
            message: "Select option: ",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update employee role",
                "Exit"
            ]
            //switch from repsonse 
        }).then(function (response) {
            switch (response.select) {
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "Exit":
                    console.log("Exiting application and closing connection to DB".red);
                    connection.end();
                    break;

            }
        })
};
//display all departments
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Departments: ".green)
        console.table(res);
        optionSelect();
    });
};
//display all roles
function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Roles: ".green)
        console.table(res);
        optionSelect();
    });
};
//display all employees
function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Employees: ".green)
        console.table(res);
        optionSelect();
    });
};
//add department
function addDepartment() {
    inquirer
        .prompt({
            message: "Enter new department name: ",
            type: "input",
            name: "newDepartment"
        }).then(function (response) {
            connection.query(`INSERT INTO department (name) VALUES ("${response.newDepartment}")`, function (err, res) {
                if (err) throw err;
                console.log(`${response.newDepartment} added to table`.green);
                optionSelect();
            })
        })
};
//add roles
function addRole() {
    //pull department list for new role assignment 
    connection.query("SELECT * from department", function (req, res) {
        inquirer
            .prompt([{
                message: "Enter new role name: ",
                type: "input",
                name: "newRole"
            },
            {
                message: "Enter salary for new role: ",
                type: "input",
                name: "newSalary"
            },
            {
                message: "Assign department: ",
                type: "list",
                choices: res.map(depList => ({ name: depList.name, value: depList.id })),
                name: "roleDepartment"
            }

            ]).then(function (response) {
                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.newRole}', '${response.newSalary}','${response.roleDepartment}')`, function (err, res) {
                    if (err) throw err;
                    console.log(`${response.newRole} added to table`.green);
                    optionSelect();
                });
            });
    });


};
//add empployee
function addEmployee() {
    //pull managers to assign new employee manager
    connection.query(`SELECT CONCAT(first_name, " " ,last_name) AS Manager, id FROM employees`, function (err, res) {
        //pull roles to assign new employee a role
        connection.query("SELECT title, id FROM role", function (err, roleList) {
            inquirer.prompt([{
                message: "Enter new employee's first name: ",
                type: "input",
                name: "first_name"
            },
            {
                message: "Enter new employee's last name: ",
                type: "input",
                name: "last_name"
            },
            {
                message: "Select role for new employee: ",
                type: "list",
                choices: roleList.map(currentRoles => ({ name: currentRoles.title, value: currentRoles.id })),
                name: "newRole"

            },
            {
                message: "Assign manager: ",
                type: "list",
                choices: res.map(managers => ({ name: managers.Manager, value: managers.id })),
                name: "newManager"
            }

            ]).then(function (response) {
                connection.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}','${response.last_name}','${response.newRole}','${response.newManager}')`, function (err, res) {
                    if (err) throw err;
                    console.log(`${response.first_name} ${response.last_name} as been assigned as new employee`.green);
                });
            });
        });
    });

};
//update employee
function updateEmployee() {
    connection.query(`SELECT CONCAT(first_name, " " ,last_name) AS Employee, id FROM employees`, function (err, res) {
        console.log("response: " + JSON.stringify(res));

        connection.query("SELECT title, id FROM role", function (err, roleList) {

            inquirer
                .prompt([
                    {
                        message: "Select employee to update: ",
                        type: "list",
                        choices: res.map(employeeList => ({ name: employeeList.Employee, value: employeeList.id })),
                        name: "changeEmployee"
                    },
                    {
                        message: "Select new role: ",
                        type: "list",
                        choices: roleList.map(roles => ({ name: roles.title, value: roles.id })),
                        name: "changeRole"
                    }
                ]).then(function (response) {
                    console.log(response)
                    connection.query(`UPDATE employees SET role_id="${response.changeRole}" WHERE id="${response.changeEmployee}" `, function (err, res) {
                        if (err) throw err;
                        // console.log(`${response.changeEmployee}'s role has been changed to ${response.title}`.green); 
                        console.log("Employee updated!".green)
                        optionSelect();
                    });
                });
        });
    });

};

optionSelect();

