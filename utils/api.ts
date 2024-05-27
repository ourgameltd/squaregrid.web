import { getToken } from "next-auth/jwt";

export const fetchData = async <T>(url: string, context: any): Promise<T> => {
    const token = await getToken({ req: context.req, secret: process.env.NEXT_SECRET }) as any
    
    try {
        const response = await fetch(process.env.API_ENDPOINT + url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token["accessToken"]}`,
                'Accept': 'application/json',
            }
        });
        const data: T = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};