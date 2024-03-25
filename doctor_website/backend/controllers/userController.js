const User = require('../models/User');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

  const signUp = async (req, res) => {
    try {
      const existingUser = await User.findOne({ username: req.body.username });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const newUser = await User.create({
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
      });
  
      res.status(200).json({newUser,message:"User created successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const signIn = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '30d' });
  
      res.status( 200 ).json({user,token,message:"Successfully signed with the token "});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { signUp, signIn };
