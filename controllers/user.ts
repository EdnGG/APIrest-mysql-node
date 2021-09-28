import { Request, Response } from 'express';
import User from "../models/user";


export const getUsers = async (req: Request, res: Response)=> {

    const users = await User.findAll();

    res.json({
        // ok: true,
        msg: 'getUsers',
        users
    });
}

export const getUser = async (req: Request, res: Response)=> {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if(user){
        res.json({ user });
    }
    res.status(404).json({
        msg: `User with id:${id} not found`
    });



}

export const postUser = async(req: Request, res: Response)=> {

    const { body } = req;

    try {

        const emailExist = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (emailExist) {
            return res.status(400).json({
                msg: `User with email: ${body.email} already exist!! `  
            });
        }

        // Pendiente
    
        const user = await User.create(body);
        await user.save();

        res.json( user );
    
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `Ask with Administrator: ${err}`
        });
    }
        
}
    

    


export const putUser = async(req: Request, res:Response)=> {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({
                msg: `User with id: ${id} not found`
            })
        }

        await user.update(body);

        res.json( user );
        
    
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `Please contact to your Administrator: ${err}`
        });
    }

    res.json({
        body,
        msg: 'putUser'
    });


}

export const deleteUser = async(req: Request, res:Response)=> {

    const { id } = req.params;

    try {

        const user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({
                msg: `User with id: ${id} not found`
            })
        }

        // Deleting phisically
        // await user.destroy();

        // Deleting logically
        await user.update({ state: false});


        res.json( user );
        
    
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `Please contact to your Administrator: ${err}`
        });
    }

}

