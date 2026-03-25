import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from('employees')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ success: true });
}