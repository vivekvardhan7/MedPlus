// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2/promise');
// const cors = require("cors");
// const { OAuth2Client } = require('google-auth-library');
// const twilio = require('twilio');  // Twilio SDK
// const cron = require('node-cron'); // Cron Job Scheduler

// const app = express();
// app.use(express.json());
// // const cors = require('cors');

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );




// const pool = mysql.createPool({
//   host: '103.21.58.5',
//   user: 'stepcone2024',
//   password: 'Curie@1867',
//   database: 'stepcone',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// const client = new OAuth2Client("342329070589-db41eq9jsjcsk3u0tab4jfbe56q4msp5.apps.googleusercontent.com");

// // Twilio Credentials
// const twilioClient = twilio("AC663e91fa7a61c76f19edac1701ca308f", "673f49c1596bfad48e68bde7144909bf");
// const TWILIO_PHONE_NUMBER = "+19782051991";

// let activeCronJobs = {}; // Stores all active cron jobs

// //fn to send sms
// const sendSMS = async (numbers, message) => {
//   try {
//     for (const number of numbers) {
//       console.log(`Attempting to send SMS to +91${number}: ${message}`);
//       const result = await twilioClient.messages.create({
//         body: message,
//         from: TWILIO_PHONE_NUMBER,
//         to: `+91${number}` // Prepend +91 to the 10-digit mobile number
//       });
//       console.log(`SMS sent successfully to +91${number}. Message SID: ${result.sid}`);
//     }
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }
// };

// const reloadSchedules = async () => {
//   // Clear existing cron jobs
//   for (const job of Object.values(activeCronJobs)) {
//     job.stop(); // Stop the cron job
//   }
//   activeCronJobs = {}; // Reset the object

//   // Fetch and schedule all medications
//   const [medications] = await pool.query('SELECT * FROM medications');

//   for (const medication of medications) {
//     const [schedules] = await pool.query(
//       'SELECT * FROM medication_schedules WHERE medication_id = ?',
//       [medication.id]
//     );

//     const [user] = await pool.query('SELECT mobile, family_member_number FROM users1 WHERE id = ?', [medication.user_id]);

//     if (user.length > 0 && user[0].mobile && schedules.length > 0) {
//       const mobile = user[0].mobile;
//       const familyMemberNumber = user[0].family_member_number;
//       const medicationName = medication.name;

//       if (/^\d{10}$/.test(mobile)) {
//         const numbersToNotify = [mobile];
//         if (familyMemberNumber && /^\d{10}$/.test(familyMemberNumber)) {
//           numbersToNotify.push(familyMemberNumber);
//         }

//         schedules.forEach(schedule => {
//           const [hour, minute] = schedule.exact_time.split(':');
//           const cronExpression = `${minute} ${hour} * * *`;

//           const job = cron.schedule(
//             cronExpression,
//             () => {
//               console.log(`Triggering reminder for medication "${medicationName}" at ${hour}:${minute}`);
//               const message = `Reminder: Take your medication "${medicationName}" now.`;
//               sendSMS(numbersToNotify, message);
//             },
//             {
//               timezone: 'Asia/Kolkata', // Set to Indian timezone
//             }
//           );

//           // Store the cron job in memory
//           activeCronJobs[`${medication.id}_${schedule.id}`] = job;
//         });
//       }
//     }
//   }

//   console.log('Schedules reloaded successfully');
// };

// const scheduleMedicationReminders = async () => {
//   try {
//     console.log('Fetching medications and schedules...');
//     const [medications] = await pool.query('SELECT * FROM medications');

//     for (const medication of medications) {
//       console.log(`Processing medication ID ${medication.id}: ${medication.name}`);
//       const [schedules] = await pool.query(
//         'SELECT * FROM medication_schedules WHERE medication_id = ?',
//         [medication.id]
//       );

//       const [user] = await pool.query('SELECT mobile, family_member_number FROM users1 WHERE id = ?', [medication.user_id]);

//       if (user.length > 0 && user[0].mobile && schedules.length > 0) {
//         const mobile = user[0].mobile;
//         const familyMemberNumber = user[0].family_member_number;
//         const medicationName = medication.name;

//         if (/^\d{10}$/.test(mobile)) {
//           const numbersToNotify = [mobile];
//           if (familyMemberNumber && /^\d{10}$/.test(familyMemberNumber)) {
//             numbersToNotify.push(familyMemberNumber);
//           }

//           schedules.forEach(schedule => {
//             const [hour, minute] = schedule.exact_time.split(':');
//             const cronExpression = `${minute} ${hour} * * *`;

//             console.log(`Scheduling reminder for medication "${medicationName}" at ${hour}:${minute}`);
//             cron.schedule(
//               cronExpression,
//               () => {
//                 console.log(`Triggering reminder for medication "${medicationName}" at ${hour}:${minute}`);
//                 const message = `Reminder: Take your medication "${medicationName}" now.`;
//                 sendSMS(numbersToNotify, message);
//               },
//               {
//                 timezone: 'Asia/Kolkata', // Set to Indian timezone
//               }
//             );
//           });
//         } else {
//           console.error(`Invalid mobile number for user ID ${medication.user_id}: ${mobile}`);
//         }
//       } else {
//         console.error(`No mobile number or schedules found for user ID ${medication.user_id}`);
//       }
//     }
//   } catch (error) {
//     console.error('Error scheduling medication reminders:', error);
//   }
// };

// // Start scheduling reminders when the server starts
// scheduleMedicationReminders();


// app.get('/medications/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const [medications] = await pool.query(
//       'SELECT * FROM medications WHERE user_id = ?',
//       [userId]
//     );

//     for (const medication of medications) {
//       const [schedules] = await pool.query(
//         'SELECT * FROM medication_schedules WHERE medication_id = ?',
//         [medication.id]
//       );
//       medication.schedules = schedules;
//     }

//     res.status(200).json(medications);
//   } catch (error) {
//     console.error('Error fetching medications:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.post('/medications', async (req, res) => {
//   const { userId, name, frequency, startDate, endDate, schedules } = req.body;

//   if (!userId || !name || !frequency || !startDate || !endDate || !schedules) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const connection = await pool.getConnection();
//     await connection.beginTransaction();

//     try {
//       // Insert into medications table
//       const [medicationResult] = await connection.query(
//         'INSERT INTO medications (user_id, name, frequency, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
//         [userId, name, frequency, startDate, endDate]
//       );

//       const medicationId = medicationResult.insertId;

//       // Insert into medication_schedules table
//       for (const schedule of schedules) {
//         await connection.query(
//           'INSERT INTO medication_schedules (medication_id, exact_time) VALUES (?, ?)',
//           [medicationId, schedule.exactTime]
//         );
//       }

//       await connection.commit();

//       // Reload schedules after adding a new medication
//       await reloadSchedules();

//       res.status(201).json({ message: 'Medication saved successfully' });
//     } catch (error) {
//       await connection.rollback();
//       throw error;
//     } finally {
//       connection.release();
//     }
//   } catch (error) {
//     console.error('Error saving medication:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// //delete endpoint
// app.delete('/medications/:medicationId', async (req, res) => {
//   const { medicationId } = req.params;

//   try {
//     const connection = await pool.getConnection();
//     await connection.beginTransaction();

//     try {
//       // Delete medication schedules first
//       await connection.query(
//         'DELETE FROM medication_schedules WHERE medication_id = ?',
//         [medicationId]
//       );

//       // Delete the medication
//       await connection.query(
//         'DELETE FROM medications WHERE id = ?',
//         [medicationId]
//       );

//       await connection.commit();
//       res.status(200).json({ message: 'Medication deleted successfully' });
//     } catch (error) {
//       await connection.rollback();
//       throw error;
//     } finally {
//       connection.release();
//     }
//   } catch (error) {
//     console.error('Error deleting medication:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// //edit end point
// app.put('/medications/:medicationId', async (req, res) => {
//   const { medicationId } = req.params;
//   const { userId, name, frequency, startDate, endDate, schedules } = req.body;

//   if (!userId || !name || !frequency || !startDate || !endDate || !schedules) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const connection = await pool.getConnection();
//     await connection.beginTransaction();

//     try {
//       // Update the medication
//       await connection.query(
//         'UPDATE medications SET name = ?, frequency = ?, start_date = ?, end_date = ? WHERE id = ?',
//         [name, frequency, startDate, endDate, medicationId]
//       );

//       // Delete existing schedules for the medication
//       await connection.query(
//         'DELETE FROM medication_schedules WHERE medication_id = ?',
//         [medicationId]
//       );

//       // Insert new schedules
//       for (const schedule of schedules) {
//         await connection.query(
//           'INSERT INTO medication_schedules (medication_id, exact_time) VALUES (?, ?)',
//           [medicationId, schedule.exactTime]
//         );
//       }

//       await connection.commit();
//       res.status(200).json({ message: 'Medication updated successfully' });
//     } catch (error) {
//       await connection.rollback();
//       throw error;
//     } finally {
//       connection.release();
//     }
//   } catch (error) {
//     console.error('Error updating medication:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Sign-up endpoint
// app.post("/signup", async (req, res) => {
//   const { mobile,fullname, email, password } = req.body;

//   try {
//     const [existingUser] = await pool.query("SELECT * FROM users1 WHERE email = ?", [email]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await pool.query("INSERT INTO users1 (fullname, email, password,mobile) VALUES (?, ?, ?,?)", [
//       fullname,
//       email,
//       hashedPassword,
//       mobile,
//     ]);

//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Sign-in endpoint
// app.post('/signin', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).send({ error: 'Email and password are required' });
//   }

//   try {
//     const [users] = await pool.query('SELECT * FROM users1 WHERE email = ?', [email]);
//     if (users.length > 0) {
//       const user = users[0];
//       const validPassword = await bcrypt.compare(password, user.password);
//       if (validPassword) {
//         const token = jwt.sign({ userId: user.id }, 'yourSecretKey', { expiresIn: '1h' });
//         res.send({ token, userId: user.id }); // Include userId in response
//       }
//        else {
//         res.status(400).send({ error: 'Invalid Password' });
//       }
//     } else {
//       res.status(404).send({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).send({ error: 'Error logging in' });
//   }
// });

// // Google OAuth endpoint
// app.post('/google-auth', async (req, res) => {
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: "342329070589-db41eq9jsjcsk3u0tab4jfbe56q4msp5.apps.googleusercontent.com",
//     });

//     const payload = ticket.getPayload();
//     const { email, name } = payload;

//     const [existingUser] = await pool.query("SELECT * FROM users1 WHERE email = ?", [email]);

//     if (existingUser.length > 0) {
//         const token = jwt.sign({ userId: existingUser[0].id }, 'yourSecretKey', { expiresIn: '1h' });
//         return res.send({ token, userId: existingUser[0].id });
//       }

//     await pool.query("INSERT INTO users1 (fullname, email) VALUES (?, ?)", [name, email]);

//     const [newUser] = await pool.query("SELECT * FROM users1 WHERE email = ?", [email]);
//     const newToken = jwt.sign({ userId: newUser[0].id }, 'yourSecretKey', { expiresIn: '1h' });

//     res.send({ token: newToken, userId: newUser[0].id });
//   } catch (error) {
//     console.error("Error verifying Google token:", error);
//     res.status(500).send({ error: "Internal server error" });
//   }
// });

// //emergency api
// app.get("/userem/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const [user] = await pool.query("SELECT fullname, family_doctor_number FROM users1 WHERE id = ?", [userId]);
//     if (user.length > 0) {
//       res.status(200).json({ fullname: user[0].fullname, familyDoctorNumber: user[0].family_doctor_number });
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/user/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const [user] = await pool.query("SELECT fullname FROM users1 WHERE id = ?", [userId]);
//     if (user.length > 0) {
//       res.status(200).json({ fullname: user[0].fullname });
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// //logout
// // app.post('/logout', (req, res) => {
// //   req.session.destroy((err) => {
// //       if (err) return res.status(500).json({ message: "Logout failed" });
// //       res.clearCookie("connect.sid"); // Clears the session cookie
// //       res.status(200).json({ message: "Logged out successfully" });
// //   });
// // });

// //family and doctor no. api
// // Endpoint to save contacts
// // API Route
// app.post('/api/save-contacts', (req, res) => {
//   const { familyDoctor, familyMember, userId } = req.body;

//   if (!familyDoctor || !familyMember || !userId) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   const updateQuery = `
//     UPDATE users1 
//     SET family_doctor_number = ?, family_member_number = ?
//     WHERE id = ?
//   `;

//   db.query(updateQuery, [familyDoctor, familyMember, userId], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ message: 'Contacts saved successfully' });
//   });
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
//   // await reloadSchedules(); // Load schedules on server start
// });