const userDBservice = require("../services/userDBservice");
const bcrypt = require("bcryptjs");

module.exports = {
    viewLogin: (req,res)=>{
        res.render("users/login");
    },
    login: async (req,res)=>{
        try {
            const email = req.body.email
            const userToLogin = await userDBservice.findByEmail(email);
            const dataUser = userToLogin
            if(dataUser){
                console.log(req.body.password)
                console.log(dataUser.password)
                const validPassword = await bcrypt.compare(req.body.password, dataUser.password)
                if(validPassword){
                    delete dataUser.password;
                    req.session.userLogged = dataUser;
                    if (req.body.rememberUser) {
                        res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 2 });
                    }
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
        res.clearCookie("email");
        return res.redirect("/");
    },
    
    viewRegister: (req,res)=>{
        res.render("users/register")
    },

    register: (req,res)=>{
        const dataUser = req.body;
        userDBservice.create(dataUser);
        res.redirect("/")

    },

    delete: (req,res)=>{
        const id = req.params.id;
        userDBservice.delete(id)
        res.redirect("/")
    },
    
    

    
}