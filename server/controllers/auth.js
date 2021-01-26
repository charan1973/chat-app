const User = require("../models").User
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");


const {signinValidation, signupValidation} = require("../validators/auth.validator")

exports.registerUser = async (req, res) => {
    const {username, email, password} = req.body
    
    const { error } = signupValidation(req.body);
    if (error) return res.json({ error: error.details[0].message });

    const findUser = await User.findAll({
        where: {
            [Op.or]: [
                {email},
                {username}
            ]
        }
    });

    if (findUser.length > 0)
        return res.json({ error: "User already exists! How about signing in?" });
    
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    try{
        const newUser = await User.create({...req.body, password: hashedPassword})

        const token = await jwt.sign(
            { id: newUser._id, username: newUser.username, email: newUser.email },
            process.env.SECRET
          );
        
        res.cookie("token", token, { httpOnly: true });

        return res.json({
            user: {
              name: newUser.username,
              email: newUser.email,
              id: newUser.id,
            },
          });

    }catch(err){
        console.log(err);
        return res.json({error: "Error registering user"})
    }
}

exports.signInUser = async (req, res) => {
    const { email, password } = req.body;
    const { error } = signinValidation(req.body);
  
    if (error) return res.json({ error: error.details[0].message });
  
    try{
      const findUser = await User.findOne({ where: {email} });
      if (!findUser) return res.json({ error: "Email/Password is wrong" });
    
      const checkPassword = bcrypt.compareSync(password, findUser.password);
      if (!checkPassword) return res.json({ error: "Email/Password is wrong" });
    
      const token = await jwt.sign(
        { id: findUser.id, username: findUser.username, email: findUser.email },
        process.env.SECRET
      );
    
    res.cookie("token", token, { httpOnly: true });

    return res.json({
        user: {
          name: findUser.username,
          email: findUser.email,
          id: findUser.id,
        },
      });
    }catch(err){
      return res.json({error: "Error logging in"})
    }
}

exports.signOutUser = (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "Signout successfully" });
  };