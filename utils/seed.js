const { faker} = require('faker');

const userArray = [];
for(let i = 0; i < 10; i++) {
    const user = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        thoughts: [],
        friends: []
    };
    userArray.push(user);
    await user.save();
}