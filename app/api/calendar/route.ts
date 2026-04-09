import { NextRequest, NextResponse } from 'next/server';

// Disable SSL verification for development
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const year = searchParams.get('year');
        const month = searchParams.get('month');
        const city = searchParams.get('city');
        const country = searchParams.get('country') || 'Indonesia';
        const method = searchParams.get('method') || '11';

        if (!year || !month || !city) {
            return NextResponse.json(
                { error: 'Missing required parameters: year, month, city' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`
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
            { error: 'Failed to fetch calendar data', details: errorMessage },
            { status: 500 }
        );
    }
}
