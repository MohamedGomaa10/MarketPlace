// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// React Toastify
import { toast } from 'react-toastify';

// Master Store
import { RootState } from "../MasterStore";

// Actions
import { GetAllLanguagesAction, GetAllLanguagesGlobalAction,
         SelectLanguageGlobalAction, SelectLanguageAction,
         SelectLanguageCoursesAction, SelectLanguageMentorsAction,
         CreateLanguageInterface, CreateLanguageAction, UpdateLanguageInterface,
         UpdateLanguageAction, DeleteLanguageAction } from '../Actions/LanguageAction';

// Interface
interface ILanguages {
    loading?: boolean;
    languages?: any;
    language?: any;
    courses?: any;
    error?: any;
}

// Initial State
const initialState: ILanguages = {
    loading: false,
    languages: [],
    language: {},
    courses: [],
    error: ''
}

// Get All Languages
export const GetAllLanguages = createAsyncThunk(
    'Languages',
    async () => {
        return await GetAllLanguagesAction();
    }
)

// Get All Languages Globally
export const GetAllLanguagesGlobal = createAsyncThunk(
    'Languages/Global',
    async () => {
        return await GetAllLanguagesGlobalAction();
    }
)

// Select Language
export const SelectLanguage = createAsyncThunk(
    'Languages/Select',
    async (Payload: number) => {
        return await SelectLanguageAction(Payload);
    }
)

// Select Language Globally
export const SelectLanguageGlobal = createAsyncThunk(
    'Languages/Select/Global',
    async (Payload: number) => {
        return await SelectLanguageGlobalAction(Payload);
    }
)

// Select Language Courses
export const SelectLanguageCourses = createAsyncThunk(
    'Languages/Select/Courses',
    async (Payload: number) => {
        return await SelectLanguageCoursesAction(Payload);
    }
)

// Select Language Mentors
export const SelectLanguageMentors = createAsyncThunk(
    'Languages/Select/Mentors',
    async (Payload: number) => {
        return await SelectLanguageMentorsAction(Payload);
    }
)

// Create Language
export const CreateLanguage = createAsyncThunk(
    'Languages/Create',
    async (Payload: CreateLanguageInterface) => {
        return await CreateLanguageAction(Payload);
    }
)

// Update Language
export const UpdateLanguage = createAsyncThunk(
    'Languages/Update',
    async (Payload: UpdateLanguageInterface) => {
        return await UpdateLanguageAction(Payload);
    }
)

// Delete Language
export const DeleteLanguage = createAsyncThunk(
    'Languages/Delete',
    async (Payload: number) => {
        return await DeleteLanguageAction(Payload);
    }
)

const LanguageSlice = createSlice({
    name: 'Languages',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // Get All Languages
        Builder.addCase( GetAllLanguages.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetAllLanguages.fulfilled, ( State, Action) => {
            State.loading = false;
            State.languages = Action.payload?.data;
            State.error = '';
        })
        Builder.addCase( GetAllLanguages.rejected ,( State, Action) => {
            State.loading = false;
            State.languages = [];
            State.error = Action.error?.message;
        })

        // Get All Languages Globally
        Builder.addCase( GetAllLanguagesGlobal.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetAllLanguagesGlobal.fulfilled, ( State, Action) => {
            State.loading = false;
            State.languages = Action.payload?.data;
            State.error = '';
        })
        Builder.addCase( GetAllLanguagesGlobal.rejected ,( State, Action) => {
            State.loading = false;
            State.languages = [];
            State.error = Action.error?.message;
        })

        // Select Language
        Builder.addCase( SelectLanguage.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectLanguage.fulfilled, ( State, Action) => {
            State.loading = false;
            State.language = Action.payload?.data;
            State.error = '';
        })
        Builder.addCase( SelectLanguage.rejected ,( State, Action) => {
            State.loading = false;
            State.language = {};
            State.error = Action.error?.message;
        })

        // Select Language Globally
        Builder.addCase( SelectLanguageGlobal.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectLanguageGlobal.fulfilled, ( State, Action) => {
            State.loading = false;
            State.language = Action.payload?.data;
            State.error = '';
        })
        Builder.addCase( SelectLanguageGlobal.rejected ,( State, Action) => {
            State.loading = false;
            State.language = {};
            State.error = Action.error?.message;
        })

        // Select Language Courses
        Builder.addCase( SelectLanguageCourses.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectLanguageCourses.fulfilled, ( State, Action) => {
            State.loading = false;
            State.courses = Action.payload?.data?.courses;
            State.error = '';
        })
        Builder.addCase( SelectLanguageCourses.rejected ,( State, Action) => {
            State.loading = false;
            State.courses = [];
            State.error = Action.error?.message;
        })

        // Select Language Mentors
        Builder.addCase( SelectLanguageMentors.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectLanguageMentors.fulfilled, ( State, Action) => {
            State.loading = false;
            State.courses = Action.payload?.data?.courses;
            State.error = '';
        })
        Builder.addCase( SelectLanguageMentors.rejected ,( State, Action) => {
            State.loading = false;
            State.courses = [];
            State.error = Action.error?.message;
        })

        // Create Language
        Builder.addCase( CreateLanguage.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreateLanguage.fulfilled, ( State, Action) => {
            State.loading = false;
            State.language = Action.payload?.data;
            State.error = '';
            toast.success(Action.payload?.message, { position: "top-right", toastId: 'uniqueId' });
        })
        Builder.addCase( CreateLanguage.rejected ,( State, Action) => {
            State.loading = false;
            State.language = {};
            State.error = Action.error?.message;
        })

        // Update Language
        Builder.addCase( UpdateLanguage.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( UpdateLanguage.fulfilled, ( State, Action) => {
            State.loading = false;
            State.language = Action.payload?.data;
            State.error = '';
            toast.success(Action.payload?.message, { position: "top-right", toastId: 'uniqueId' });
        })
        Builder.addCase( UpdateLanguage.rejected ,( State, Action) => {
            State.loading = false;
            State.language = {};
            State.error = Action.error?.message;
        })

        // Delete Language
        Builder.addCase( DeleteLanguage.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( DeleteLanguage.fulfilled, ( State, Action) => {
            State.loading = false;
            State.language = {};
            State.error = '';
            toast.success(Action.payload?.message, { position: "top-right", toastId: 'uniqueId' });
        })
        Builder.addCase( DeleteLanguage.rejected ,( State, Action) => {
            State.loading = false;
            State.error = Action.error?.message;
        })

    },
});

export const SelectLanguages = ( State: RootState ) => State.Language;
export default LanguageSlice.reducer;