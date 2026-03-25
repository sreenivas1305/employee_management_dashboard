import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search   = searchParams.get('search')   || '';
  const state    = searchParams.get('state')    || '';
  const gender   = searchParams.get('gender')   || '';
  const isActive = searchParams.get('isActive');
  const page     = parseInt(searchParams.get('page')  || '1');
  const limit    = parseInt(searchParams.get('limit') || '20');
  const offset   = (page - 1) * limit;

  let query = supabase.from('employees').select('*', { count: 'exact' });

  if (search)            query = query.ilike('"fullName"', `%${search}%`);
  if (state)             query = query.eq('state', state);
  if (gender)            query = query.eq('gender', gender);
  if (isActive !== null) query = query.eq('"isActive"', isActive === 'true');

  const { data, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('"fullName"');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    employees:  data,
    total:      count,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase
    .from('employees')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}