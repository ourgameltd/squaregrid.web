import FormData from 'form-data';
import fetch from 'node-fetch';
import { getToken } from "next-auth/jwt";
import { Response } from 'node-fetch';

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
        const data = await response.json() as T;
        return data;
    } catch (error) {
        throw error;
    }
};

export const postFormData = async (url: string, formdata: FormData, req: any): Promise<Response> => {
    const token = await getToken({ req: req, secret: process.env.NEXT_SECRET }) as any
    try {
        const response = await fetch(process.env.API_ENDPOINT + url, {
            method: 'POST',
            body: formdata,
            headers: {
                'Authorization': `Bearer ${token["accessToken"]}`,
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const postData = async <T>(url: string, body: T, req: any): Promise<Response> => {
    const token = await getToken({ req: req, secret: process.env.NEXT_SECRET }) as any

    try {
        const response = await fetch(process.env.API_ENDPOINT + url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${token["accessToken"]}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};