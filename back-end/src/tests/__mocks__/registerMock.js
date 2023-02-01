const mockRegister = {
    dataValues: {
        id: 6,
        name: 'Scooby Doo',
        email: 'scoobydoo@gmail.com',
        password: 'senhaforte123',
        role: 'customer'
    }
  };
  
  const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkdydXBvIEFsZWdyaWEiLCJlbWFpbCI6ImdydXBvYWxlZ3JpYUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzUxMjA4MTIsImV4cCI6MTY3NTEyNjgxMn0.Qxj4tFeY_-pOVK_XySKAt0drOMcWSJOhp6ERsLO9UxU"

  const mockUser = {
    id: 6,
    name: 'Scooby Doo',
    email: 'scoobydoo@gmail.com',
    role: 'customer'
  };

  const mockOutput = {
        id: 6,
        name: 'Scooby Doo',
        email: 'scoobydoo@gmail.com',
        token: mockToken,
        role: 'customer'
  };

  

module.exports = {
    mockRegister,
    mockToken,
    mockOutput,
    mockUser
}