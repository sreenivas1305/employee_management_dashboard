import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

// ← create client directly here, NOT from ../lib/supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado',
  'Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho',
  'Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana',
  'Maine','Maryland','Massachusetts','Michigan','Minnesota',
  'Mississippi','Missouri','Montana','Nebraska','Nevada',
  'New Hampshire','New Jersey','New Mexico','New York',
  'North Carolina','North Dakota','Ohio','Oklahoma','Oregon',
  'Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington',
  'West Virginia','Wisconsin','Wyoming'
];

const FIRST_NAMES_M = ['James','Robert','John','Michael','David','William','Richard','Joseph','Thomas','Charles','Daniel','Matthew','Anthony','Mark','Donald'];
const FIRST_NAMES_F = ['Mary','Patricia','Jennifer','Linda','Barbara','Elizabeth','Susan','Jessica','Sarah','Karen','Lisa','Nancy','Betty','Margaret','Sandra'];
const LAST_NAMES = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Taylor','Anderson','Thomas','Jackson','White','Harris'];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

async function seed() {
  const employees = Array.from({ length: 500 }, (_, i) => {
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const firstName = gender === 'Male' ? random(FIRST_NAMES_M) : random(FIRST_NAMES_F);
    const lastName = random(LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;
    const seed = `${firstName}${i}`;
   
    return {
    fullName:     fullName,
    gender:       gender,
    dateOfBirth:  randomDate(new Date('1970-01-01'), new Date('2000-12-31')),
    state:        random(STATES),
    profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
    isActive:     Math.random() > 0.2,
  };
  });

  // Insert in batches of 100
  for (let i = 0; i < employees.length; i += 100) {
    const batch = employees.slice(i, i + 100);
    const { error } = await supabase.from('employees').insert(batch);
    if (error) console.error('Batch error:', error);
    else console.log(`Inserted batch ${i / 100 + 1}`);
  }
  console.log('Done! 500 employees seeded.');
}

seed();