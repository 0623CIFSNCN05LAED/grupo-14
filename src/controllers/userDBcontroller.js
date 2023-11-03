const userDBservice = require("../services/userDBservice");
const bcrypt = require("bcryptjs");


module.exports = {
    viewLogin: (req,res)=>{
        res.render("users/login");
    },
    login: async (req,res)=>{
        try {
            const email = req.body.email
            const userToLogin = await userDBservice.userInDb(email);
            if(userToLogin){
                const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
                if(validPassword){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    return res.redirect("/users/profile");
                } else {
                    return res.render("users/login", {
                        errors: {
                            password: {msg: "Las credenciales son invalidas"}
                        }
                    })
                }
            } else {
                return res.render("users/login", {
                        errors: {
                            email: {msg: "No se encuentra este email en nuestra base de datos"}
                        }
                    })
            }

        } catch{
        }
    },
    profile: (req,res)=>{
        res.render("users/userProfile", {
            user: req.session.userLogged,
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect("/");
    },
    viewRegisterCf: (req,res)=>{
        res.render("users/registerCf")
    },
    
    registerCf: (req,res)=>{
        const dataUser = req;
        userDBservice.createCf(dataUser);
        res.redirect("login");
    },

    viewRegisterM: (req,res)=>{
        res.render("/users/registerMayorista")
    },

    registerM: (req,res)=>{
        const dataUser = req;
        userDBservice.createM(dataUser);
        res.redirect("login");       
    }
    
}