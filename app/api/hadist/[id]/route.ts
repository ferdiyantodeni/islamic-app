import { NextRequest, NextResponse } from 'next/server';

// Disable SSL verification for development
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const searchParams = request.nextUrl.searchParams;
        const range = searchParams.get('range') || '1-20';

        const response = await fetch(
            `https://api.hadith.gading.dev/books/${id}?range=${range}`
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
            { error: 'Failed to fetch hadist detail', details: errorMessage },
            { status: 500 }
        );
    }
}
