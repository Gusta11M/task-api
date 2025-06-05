const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    try{
        // Check if user already exists
        let user = await User.findOne({ email });
        if(user)
        {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({name, email, password});

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Save user to database
        await user.save();

        // Generate token payload
        const payload = {
            user: {
                id: user.id
            }
        };

        // Create token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err,token) => {
                if(err) throw err;
                // Return token in response
                res.json({token, user: { id: user.id, name: user.name, email: user.email } });
            }
        );
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        // Check if user exists
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        bcryptjs.compare(password, user.password, (err, isMatch) => {

            if(err) throw err;
            if(!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate token payload 
            const payload = {
                user: {
                    id: user.id
                }
            };

            // Create token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if(err) throw err;
                    // Return token in response
                    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
                }
            );
        });
            
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
    