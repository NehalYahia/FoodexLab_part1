import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clintId: null,
    samoleDesc: null,
    sampleType: null,
    sampleCode: null,
    sampleResponsible: null,
    notes: null
};

const sampleInfoSlice = createSlice({
    name: "sampleInfo",
    initialState,
    reducers: {
        sampleInfo: (state, action) => {
            state.clintId = action.payload.clintId;
            state.samoleDesc = action.payload.samoleDesc;
            state.sampleType = action.payload.sampleType;
            state.sampleCode = action.payload.sampleCode;
            state.sampleResponsible = action.payload.sampleResponsible;
            state.notes = action.payload.notes;
        },
        deleteInfo: (state) => {
            state.clintId = null;
            state.samoleDesc = null;
            state.sampleType = null;
            state.sampleCode = null;
            state.sampleResponsible = null;
            state.notes =null;
        }
        
    }
});

export const { sampleInfo, deleteInfo } = sampleInfoSlice.actions;
export default sampleInfoSlice.reducer;