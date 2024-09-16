import Usuario from "@/models/Usuario"
import connectMongo from "@/utils/dbConnection"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request){
    const {email, senha} = await request.json();
    await connectMongo();

    try{
        const usuario = await Usuario.findOne({email});

        if (usuario && (await usuario.compareSenha(senha))) {
            const token = jwt.sign({usuarioId: usuario._id},
                process.env.JWT_SECRET, {expiresIN: '1h'}
            );
            return NextResponse.json({token});
        }
        else{
            // erro de acesso
            return NextResponse.json({succes: false}, {status:400});
        }
    }catch(err){
        return NextResponse.json({success:false}, {status:404});
    }
}