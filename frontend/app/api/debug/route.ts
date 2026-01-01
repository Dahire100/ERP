import { NextResponse } from 'next/server'

export async function POST() {
  console.log('✅ DEBUG ROUTE CALLED SUCCESSFULLY!')
  return NextResponse.json({ 
    success: true, 
    message: 'Debug route is working',
    timestamp: new Date().toISOString()
  })
}
