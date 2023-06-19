class AuthSuccessResponse {
  constructor(token, user) {
    this.token = token;
    this.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }
  success = true;
  expiresIn = 36000;
  message = 'Authentication successful';
}




module.exports = {
  AuthSuccessResponse,
}