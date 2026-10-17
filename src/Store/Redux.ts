import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../API/API'
import type { Data } from './Types'

const initialState:Data = {
    data: [],
    loading: false
}

export const getData = createAsyncThunk("data/getData", async(search) => {
    try {
        const {data} = await axios.get(API, {
            params: {
                search: search
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }
})


export const deleteRedux = createAsyncThunk("data/deleteRedux", async(id, {dispatch}) => {
    try {
        await axios.delete(`${API}/${id}`)
        dispatch(getData())
    } catch (error) {
        console.log(error)
    }
})


export const addUserRedux = createAsyncThunk("data/addUserRedux", async(newUser, {dispatch}) => {
    try {
        await axios.post(API, newUser)
        dispatch(getData())
    } catch (error) {
        console.log(error)
    }
})


export const editUserRedux = createAsyncThunk("data/editUserRedux", async({ id, user }, {dispatch}) => {
    try {
        await axios.put(`${API}/${id}`, user)
        dispatch(getData())
    } catch (error) {
        console.log(error)
    }
})


export const Redux = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getData.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getData.rejected, (state) => {
            state.loading = false
        })
    }
})

export default Redux.reducer