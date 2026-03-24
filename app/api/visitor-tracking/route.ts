import { NextResponse } from 'next/server';
import { logVisitorToGoogleSheet } from '@/lib/google-sheets';

export async function POST(request: Request) {
  try {
    const visitorData = await request.json();

    if (!visitorData || typeof visitorData !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid visitor data' },
        { status: 400 }
      );
    }

    const result = await logVisitorToGoogleSheet(visitorData);
    
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || result.reason }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Visitor data logged successfully',
    });
  } catch (error: any) {
    console.error('Error logging visitor:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to log visitor data',
      },
      { status: 500 }
    );
  }
}
