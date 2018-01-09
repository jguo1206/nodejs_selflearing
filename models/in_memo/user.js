class User {
    constructor(firstname, lastname, age){
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        User.id += 1;
        this.id = user.id;
    }

    getName(){
        return `${this.firstname} ${this.lastname}`
    };

    static insert(firstname, lastname, age){
        const u = new User(firstname, lastname, age);
        User.users.push(u);
        return u;
    }

    static getOneByName(firstname, lastname){
        return User.users.find(u => u.firstname === firstname && u.lastname === lastname);
    }

    static getOneById(userId){
        return User.users.find(u => u.id === userId);
    }

    static list(query){
        return User.users;
    }
}

User.users = [];
User.id = 0;

module.exports = User;