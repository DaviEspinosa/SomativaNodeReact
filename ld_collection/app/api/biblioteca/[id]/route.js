import { updateBiblioteca, deleteBiblioteca } from '@/controllers/BibliotecaController';
import { NextResponse } from 'next/server';


export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const biblioteca = await updateTodo(params.id, data);
    if (!biblioteca) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: biblioteca });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}


export async function DELETE(req, { params }) {
  try {
    const deletedBiblioteca = await deleteBiblioteca(params.id);
    if (!deletedBiblioteca) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
