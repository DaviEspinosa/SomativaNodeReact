import { getBiblioteca, createBiblioteca } from '@/controllers/BibliotecaController';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const biblioteca = await getBiblioteca();
    return NextResponse.json({ success: true, data: biblioteca });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}


export async function POST(req) {
  try {
    const data = await req.json();
    const biblioteca = await createBiblioteca(data);
    return NextResponse.json({ success: true, data: biblioteca });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}