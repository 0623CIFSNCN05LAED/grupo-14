const { User } = require("../database/models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    userInDb: async function(emailToCompare){
        try{
            const user = await User.findOne({
                where: {
                    email: emailToCompare
                }
            })
            return user
        } catch {
            return false /* ?? */
        }
    },
    createCf: function(dataUser){
        delete dataUser.body.confirmPassword;
        const user = {
            id: uuidv4(),
            ...dataUser.body,
            password: bcrypt.hashSync(dataUser.body.password, 10),
            image: dataUser.file ? dataUser.file.filename : "userDefault.png",
            category: "consumidorFinal",
        };
    },
    createUserM: function (dataUser) {
        delete dataUser.body.confirmPassword;
        const user = { 
            id: uuidv4(),
            ...dataUser.body,
            password: bcrypt.hashSync(dataUser.body.password, 10),
            image: dataUser.file ? dataUser.file.filename : "userDefault.png",
            category: "mayorista",
        };
  },
    
}

