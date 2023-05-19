import { createSlice } from "@reduxjs/toolkit";

interface ITest{
    test:string;
}

const initialState:ITest ={
    test:"ShiShu"
}

const testSlice=createSlice({
    name:"test",
    initialState,
    reducers:{
        setTest:(state,action)=>{
            state.test= action.payload
        }
    }
})

export const {setTest} = testSlice.actions
export default testSlice.reducer