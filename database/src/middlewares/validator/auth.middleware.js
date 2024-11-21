const { Request, Response, NextFunction } = require('express');
const jwt = require('jsonwebtoken');

 const verifyToken = (req, res, next) =>{
  const SECRET_KEY = process.env.SECRET_KEY || 'Quamtum';
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Agrega los datos del usuario al objeto `request`
    req.body.user = decoded;
    req.tokenData = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
}


const authorize = (role) => {
    return async (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1];
      const SECRET_KEY = process.env.SECRET_KEY || 'Quamtum';
  
      if (!token) {
        return res.status(401).json({ message: 'No token was provided' });
      }
  
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.userId;
  
        const populatedUser = await User.findById(userId).populate('role');
  
        if (populatedUser.role.access.includes(role)) {
          // If the user has the necessary role to access the route, access is allowed
          req.body.user = populatedUser;
          return next();
        } else {
          // If the user does not have the necessary role to access the route
          return res.status(403).json({ message: 'You have no permissions to access this route' });
        }
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
      }
    };
}

module.exports = {
  verifyToken,
  authorize
};