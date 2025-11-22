import { createSlice } from "@reduxjs/toolkit"

const jobSlice = createSlice({
    name: "job",
    initialState:{
        alljobs:[],
        singleJob: null,
        allAdminJobs: [],
        loading: false,
        searchJobByText: "",
    },
    reducers:{
        setAlljobs:(state, action) =>{
            state.alljobs = action.payload;
        },
        setSingleJob:(state, action) =>{
            state.singleJob = action.payload;
        },
        setAllAdminjobs:(state, action) => {
            state.allAdminJobs = action.payload;
        },
        setsearchJobByText:(state, action) => {
            state.searchJobByText = action.payload;
        }
    }
});

export const {setAlljobs, setSingleJob, setAllAdminjobs, setsearchJobByText} = jobSlice.actions;
export default jobSlice.reducer;