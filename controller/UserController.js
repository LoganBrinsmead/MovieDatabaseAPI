const db = require('../database/connection');           // include the database connection
const bcrypt = require('bcryptjs');
class UserController {

    // add a user to the database
    static addUser(ctx) {
        return new Promise((resolve, reject) => {
            const user = ctx.request.body
            const query = `INSERT INTO User
            (firstName, lastName, username, password, signUpDate)
            VALUES (?, ?, ?, ?, ?);`;
            const salt = bcrypt.genSaltSync();                      // salt and hash user password
            const hash = bcrypt.hashSync(user.password, salt);
            db.query(
                {
                    sql: query,
                    values: [user.firstName, user.lastName, user.username, hash, user.signUpDate]
                }, (err, res) => {
                    if (err) {
                        ctx.status = 400;
                        ctx.body = err.sqlMessage ?? 'Unknown error!';
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    resolve(res);
                })
        });
    }

    // call function to get the number of years a user has been active
    static findYearsActive(ctx) {
        return new Promise((resolve, reject) => {
            const query =
                `
            SELECT fn_findYearsActive(table1.signUpDate) AS YearsActive FROM
            (SELECT signUpDate FROM User WHERE uID = ?) AS table1;
            `;
            db.query({
                sql: query,
                values: [ctx.params.uID]
            }, (err, res) => {
                if (err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            })
        });
    }

    // remove a user from the database
    // by their unique ID (uID)
    static deleteUserByID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM User
                WHERE uID = ?;`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.uID]
                }, (err, res) => {
                    if (err) {
                        ctx.status = 400;
                        ctx.body = err.sqlMessage ?? 'Unknown error!';
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 204;
                    resolve();
                });
        });
    }


    // update a user's username by their uID
    static updateUsernameByID(ctx) {
        return new Promise((resolve, reject) => {
            const usernameAndID = ctx.request.body;
            const query = `
            UPDATE User
            SET username = ?
            WHERE uID = ?;`;
            db.query({
                sql: query,
                values: [usernameAndID.username, usernameAndID.uID]
            }, (err, res) => {
                if (err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve(res);
            })
        });
    }

    // find a user in the database using their username
    static findUserWithUsername(ctx) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM User WHERE username = ?;";
            db.query(
                {
                    sql: query,
                    values: [ctx.params.username]
                }, (err, res) => {
                    if (err) {
                        ctx.status = 400;
                        ctx.body = err.sqlMessage ?? 'Unknown error!';
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve();
                });
        });
    }

    // find a user in the database using their uID
    static findUserWithID(ctx) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM User WHERE uID = ?;";
            db.query(
                {
                    sql: query,
                    values: [ctx.params.uID]
                }, (err, res) => {
                    if (err) {
                        ctx.status = 400;
                        ctx.body = err.sqlMessage ?? 'Unknown error!';
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve();
                });
        });
    }



}

// export the userController
module.exports = UserController;