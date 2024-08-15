// models/UserModel.js
const dbConnection = require('../config/Database');
const bcrypt = require('bcryptjs');

class UserModel {
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM USER WHERE email = ?;`;
            dbConnection.query(query, [email], (err, results) => {
                if (err) reject(err);
                else {
                    console.log("results are: ", results);
                    resolve(results);
                }
                //resolve(results[0]);
            });
        });
    }

    static async createUser(userName, userEmail, userPassword) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(userPassword, salt);
                const query = `INSERT INTO USER (name, email, password) VALUES (?, ?, ?);`;
                dbConnection.query(query, [userName, userEmail, hashedPassword], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    static async authenticateUser(userEmail, userPassword) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM USER WHERE email = ?;`;
            dbConnection.query(query, [userEmail], async (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(false);
                
                const user = results[0];
                const isMatch = await bcrypt.compare(userPassword, user.password);
                if (isMatch) {
                    resolve(user);
                } else {
                    resolve(false);
                }
            });
        });
    }

    static async updateUserProfile(userID, {email, password, bio /*, profileImage*/}) {
        return new Promise(async (resolve, reject) => {
            let query = `UPDATE USER SET email = ?, userBio = ?`;
            const params = [email, bio];

            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                query += ', password = ?';
                params.push(hashedPassword);
            }

            query += ' WHERE userID = ?';
            params.push(userID);

            dbConnection.query(query, params, (err, results) => {
                if (err) return reject(err);
                else {
                    resolve(results);
                }
            });
        });
    }

    static async deleteUser(userID) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM USER WHERE userID = ?`;
            dbConnection.query(query, [userID], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
}

module.exports = UserModel;