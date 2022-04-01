import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios=async(req:Request,res:Response)=>{

    const usuarios= await Usuario.findAll()

    res.json({
        usuarios
    });
}

export const getUsuario=async(req:Request,res:Response)=>{

    const {id}=req.params;

    const usuario= await Usuario.findByPk(id);

    if(!usuario){
        return res.status(404).json({
            ok:false,
            mensaje:`usuario no encontrado con el id ${id}`
        });
    }

    res.json(
        usuario
    );
}

export const postUsuario=async(req:Request,res:Response)=>{

    const {body}=req;

    try {
        const existeEmail=await Usuario.findOne({
            where:{
                email:body.email
            }
        });
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'el email ya existe'+body.email
            });
        }

        const usuario = await Usuario.create(body);

        res.json({
            usuario
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
        })
    }
}

const CalculateDaysBetweenDates=        (startDate:Date,endDate:Date)=>{
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}


export const putUsuario=async(req:Request,res:Response)=>{

    const {id}=req.params;
    const {body}=req;

    try {

        const usuario=await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:`usuario no encontrado con el id ${id}`
            });
        }

        const existeEmail=await Usuario.findOne({
            where:{
                email:body.email
            }
        });
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'el email ya existe'+body.email
            });
        }

        await usuario.update(body);

        res.json({
            usuario
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
        })
    }
}

export const deleteUsuario=async(req:Request,res:Response)=>{

    const {id}=req.params;

    try {
        const usuario=await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:`usuario no encontrado con el id ${id}`
            });
        }

        // await usuario.destroy();
        await usuario.update({estado:false});

        res.json({
            msg:'usuaio eliminado',
            usuario
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
        })
    }
}
