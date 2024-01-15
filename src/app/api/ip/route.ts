import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // The IP address is often in the headers, under 'x-forwarded-for' in many server environments.
    // If it's not there, you might need to use 'request.socket.remoteAddress' instead.
    const ip = request.headers.get('x-forwarded-for') || request.socket.remoteAddress;

    return NextResponse.json({ ip });
}