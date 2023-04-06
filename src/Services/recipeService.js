import { requestFactory } from './requester';

const baseUrl = `http://localhost:3030/data/recipes`;

export const recipeServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        return result;
    }

    const create = async (data) => {
        console.log(data)
        const result = await request.post(baseUrl, data);
        console.log(result)
        return result;
    }

    return {
        getAll,
        create
    }

}