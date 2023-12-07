const userService = require("../../services/userDBservice");

    module.exports = {
        getAllUsers: async (req,res)=>{
            try{
                const {count, rows} = await userService.getAllUsersAndCount()
                res.json({
                    meta: {
                        status: 200,
                        total: count, 
                        url: req.originalUrl /* guarda la url desde donde se hizo el pedido http */
                    },
                    users: rows
                })

            } catch (error){
                console.log(error)
            }
        }
    }