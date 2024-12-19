const UserModel = require("../Models/User.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
class User {
    async create(req, res) {
        try {
          const { name, email, phone, password } = req.body;
      
          if (!name || !email || !phone || !password) {
            return res.status(400).send({ message: "Please fill all the fields" });
          }
      
          if (!/^\d{10}$/.test(phone)) {
            return res.status(400).send({ message: "Phone number must be 10 digits long" });
          }
      
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "Invalid email format" });
          }
      
          if (password.length < 6) {
            return res.status(400).send({ message: "Password must be at least 6 characters long" });
          }
      
          const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
          if (!passwordStrengthRegex.test(password)) {
            return res.status(400).send({ message: "Password must contain at least one letter, one number, and one special character" });
          }
      
          const existingUserByEmail = await UserModel.findOne({ email: email });
          if (existingUserByEmail) {
            return res.status(400).send({ message: "Email already exists" });
          }
      
          const existingUserByPhone = await UserModel.findOne({ phone: phone });
          if (existingUserByPhone) {
            return res.status(400).send({ message: "Phone number already exists" });
          }
      
          const userData = new UserModel({
            name,
            email,
            phone,
            password
          });
      
          await userData.save();
          return res.status(201).send({ message: "User created successfully" });
      
        } catch (error) {
          console.log(error);
          return res.status(500).send({ message: "Internal Server Error" });
        }
      }
      
      async Update(req, res) {
        try {
          const { name, email, phone, password } = req.body;
          const { id } = req.params;
      
          if (!name || !email || !phone || !password) {
            return res.status(400).send({ message: "Please fill all the fields" });
          }
      
          if (!/^\d{10}$/.test(phone)) {
            return res.status(400).send({ message: "Phone number must be 10 digits long" });
          }
      
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "Invalid email format" });
          }
      
          if (password.length < 6) {
            return res.status(400).send({ message: "Password must be at least 6 characters long" });
          }
      
          const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
          if (!passwordStrengthRegex.test(password)) {
            return res.status(400).send({ message: "Password must contain at least one letter, one number, and one special character" });
          }
      
          if (!id) {
            return res.status(400).send({ message: "Please provide id" });
          }
      
          const existingUserByEmail = await UserModel.findOne({ email: email, _id: { $ne: id } });
          if (existingUserByEmail) {
            return res.status(400).send({ message: "Email already exists" });
          }
      
          const existingUserByPhone = await UserModel.findOne({ phone: phone, _id: { $ne: id } });
          if (existingUserByPhone) {
            return res.status(400).send({ message: "Phone number already exists" });
          }
      
          const user = await UserModel.updateOne(
            { _id: id },
            { name, email, phone, password },
            { new: true }
          );
      
          if (user.modifiedCount === 0) {
            return res.status(400).send({ message: "No changes made to the user" });
          }
      
          return res.status(200).send({ message: "User updated successfully" });
      
        } catch (error) {
          console.log(error);
          return res.status(500).send({ message: "Internal Server Error" });
        }
      }
      
  async DeleteApi(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: "Please provide id" });
      }
      const user = await UserModel.findByIdAndDelete(id);
      res.status(201).send({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
  async getApi(req, res) {
    try {
      const user = await UserModel.find();
      res
        .status(201)
        .send({ message: "User fetched successfully", data: user });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ error: "Please provide id" });
      }
      const user = await UserModel.findById(id);
      res
        .status(201)
        .send({ message: "User fetched successfully", data: user });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }

  async Search(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).send({ error: "Please provide name" });
      }
      const user = await UserModel.find({
        name: { $regex: name, $options: "i" },
      });
      res
        .status(201)
        .send({ message: "User fetched successfully", data: user });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
}
module.exports = new User();
