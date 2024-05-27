import { getToken } from "next-auth/jwt";

export const fetchData = async (url: string, context: any) => {
    const session = await getToken({req: context.req, secret: process.env.NEXT_SECRET }) as any

    try {
        const response = await fetch(process.env.API_ENDPOINT + url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session["accessToken"]}`,
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};