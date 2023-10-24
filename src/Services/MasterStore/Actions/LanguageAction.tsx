// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

// Get All Languages
export const GetAllLanguagesAction = async () => {
    const response = await Request.get( '/languages' );
    return response.data;
}

// Get All Languages Globally
export const GetAllLanguagesGlobalAction = async () => {
    const response = await Request.get( '/languages/global' );
    return response.data;
}

// Select Language
export const SelectLanguageAction = async ( Payload: number ) => {
    const response = await Request.get( `/languages/${Payload}` );
    return response.data;
}

// Select Language Globally
export const SelectLanguageGlobalAction = async ( Payload: number ) => {
    const response = await Request.get( `/languages/${Payload}/global` );
    return response.data;
}

// Select Language Courses
export const SelectLanguageCoursesAction = async ( Payload: number ) => {
    const response = await Request.get( `/languages/${Payload}/courses` );
    return response.data;
}

// Select Language Mentors
export const SelectLanguageMentorsAction = async ( Payload: number ) => {
    const response = await Request.get( `/languages/${Payload}/mentors` );
    return response.data;
}

// Create Language Interface
export interface CreateLanguageInterface {
    name: string;
}

// Create Language
export const CreateLanguageAction = async ( Payload: CreateLanguageInterface ) => {
    const response = await Request.post( '/languages', Payload );
    return response.data;
}

// Update Language Interface
export interface UpdateLanguageInterface {
    id: number;
    name: string;
}

// Update Language
export const UpdateLanguageAction = async ( Payload: UpdateLanguageInterface ) => {
    const response = await Request.post( `/languages/${Payload.id}`, Payload );
    return response.data;
}

// Delete Language
export const DeleteLanguageAction = async ( Payload: number ) => {
    const response = await Request.delete( `/languages/${Payload}` );
    return response.data;
}