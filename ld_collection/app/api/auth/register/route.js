import { createUsuario } from "@/controllers/UsuarioController";
import Usuario from "@/models/Usuario";
import connectMongo from "@/utils/dbConnection";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      const data = await req.json();
      const usuario = await createUsuario(data);
      return NextResponse.json({ success: true, data: usuario });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  }