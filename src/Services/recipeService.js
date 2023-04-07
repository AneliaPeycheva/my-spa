import { requestFactory } from './requester';

const baseUrl = `http://localhost:3030/data/recipes`;

export const recipeServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        return result;
    }

    const getOne = async (recipeId) => {
        const result = await request.get(`${baseUrl}/${recipeId}`);
        return result;
    }

    const create = async (data) => {     
        const result = await request.post(baseUrl, data);        
        return result;
    }

    const edit = (recipeId, data) => request.put(`${baseUrl}/${recipeId}`, data);

    const deleteRecipe = (recipeId) => request.delete(`${baseUrl}/${recipeId}`);

    return {
        getAll,
        getOne,
        create,
        edit,
        delete:deleteRecipe
    }

}