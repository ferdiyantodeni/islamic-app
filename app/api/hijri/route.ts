import { NextRequest, NextResponse } from 'next/server';

// Disable SSL verification for development
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const date = searchParams.get('date');

        if (!date) {
            return NextResponse.json(
                { error: 'Missing required parameter: date' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://api.aladhan.com/v1/gToHijri?date=${encodeURIComponent(date)}`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `External API error: ${response.statusText}` },
                { status: 502 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: 'Failed to fetch hijri date', details: errorMessage },
            { status: 500 }
        );
    }
}
