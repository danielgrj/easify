exports.getPrivateProfile = (req, res) => {
  const dummyData = {
    avatar: 'https://i.pinimg.com/originals/43/c2/77/43c277aab54dc0e862bf89dd17e82a97.png',
    name: 'Ranma Saotome',
    type: 'Caretaker',
    email: 'ranma@rumikoworld.com',
    appoiments: [
      {
        client: {
          avatar: 'https://pbs.twimg.com/profile_images/1487236214/akane_400x400.jpg',
          name: 'Akane Tendo'
        },
        date: 'Tomorrow',
        active: false,
        address: 'Dojo Tendo'
      },
      {
        client: {
          avatar: 'http://img3.wikia.nocookie.net/__cb20130526165031/ranma/images/2/22/Ryoga_moping_-_Ep._16.png',
          name: 'Ryoga Hibiki'
        },
        date: '25 September 2019',
        active: true,
        address: 'Unkown'
      }
    ]
  }
  res.render('employee/private-perfil.hbs', dummyData)
}
