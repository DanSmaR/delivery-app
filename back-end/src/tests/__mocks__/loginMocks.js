const mockOutput = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkdydXBvIEFsZWdyaWEiLCJlbWFpbCI6ImdydXBvYWxlZ3JpYUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzUxMjA4MTIsImV4cCI6MTY3NTEyNjgxMn0.Qxj4tFeY_-pOVK_XySKAt0drOMcWSJOhp6ERsLO9UxU',
    id: 3,
    name: 'Grupo Alegria',
    email: 'grupoalegria@gmail.com',
    password: 'senhamock',
    role: 'customer'
};


  const mockUser = { 
    dataValues: {
          id: 3,
          name: 'Grupo Alegria',
          email: 'grupoalegria@gmail.com',
          password: 'senhamock',
          role: 'customer'
  }   
  };

  mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkdydXBvIEFsZWdyaWEiLCJlbWFpbCI6ImdydXBvYWxlZ3JpYUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzUxMjA4MTIsImV4cCI6MTY3NTEyNjgxMn0.Qxj4tFeY_-pOVK_XySKAt0drOMcWSJOhp6ERsLO9UxU";

  module.exports = { mockOutput, mockUser, mockToken }