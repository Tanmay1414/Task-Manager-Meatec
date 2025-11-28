import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function withCorsHeaders<T extends NextResponse>(response: T): T {
    Object.entries(corsHeaders).forEach(([key, value]) => response.headers.set(key, value));
    return response;
}

export function corsOptionsResponse(): NextResponse<null> {
    return withCorsHeaders(new NextResponse(null, { status: 204 }));
}

export function successResponse<T>(
    data: T,
    message?: string,
    status: number = 200
): NextResponse<ApiResponse<T>> {
    return withCorsHeaders(
        NextResponse.json(
            {
                success: true,
                data,
                message,
            },
            { status }
        )
    );
}

export function errorResponse(
    error: string,
    status: number = 400
): NextResponse<ApiResponse> {
    return withCorsHeaders(
        NextResponse.json(
            {
                success: false,
                error,
            },
            { status }
        )
    );
}

export const ErrorResponses = {
    badRequest: (message: string = 'Bad request') => errorResponse(message, 400),
    invalidInput: (message: string = 'Invalid input provided') => errorResponse(message, 400),
    missingFields: (fields: string[]) =>
        errorResponse(`Missing required fields: ${fields.join(', ')}`, 400),

    unauthorized: (message: string = 'Unauthorized - Please login') =>
        errorResponse(message, 401),
    invalidToken: () => errorResponse('Invalid or expired token', 401),
    missingToken: () => errorResponse('No authorization token provided', 401),

    forbidden: (message: string = 'Forbidden - You do not have permission') =>
        errorResponse(message, 403),

    notFound: (resource: string = 'Resource') =>
        errorResponse(`${resource} not found`, 404),

    conflict: (message: string = 'Resource already exists') =>
        errorResponse(message, 409),

    serverError: (message: string = 'Internal server error') =>
        errorResponse(message, 500),
};