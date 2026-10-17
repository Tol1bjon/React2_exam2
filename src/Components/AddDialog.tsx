import React from 'react';
import { useForm } from 'react-hook-form';
import { Schemas } from '../Schemas/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { addUserRedux } from '../Store/Redux';

const AddDialog = ({ open, close }) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(Schemas),
        defaultValues: {
            name: "",
            avatar: "",
            age: "",
            email: "",
            job: "",
            status: true
        }
    })

    const Onsubmit = (newUser) => {
        dispatch(addUserRedux(newUser))
        close()
        reset()
    }

    return (
        <dialog style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-100%, -50%)", width: "500px"}} open={open}>
            <form style={{display: "flex", flexDirection: "column", gap: "10px"}} onSubmit={handleSubmit(Onsubmit)}>
                <h1>ADD</h1>
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("name")} type="text" placeholder='Name' />
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("avatar")} type="text" placeholder='Avatar' />
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("age")} type="number" placeholder='Age' />
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("email")} type="text" placeholder='Email' />
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("job")} type="text" placeholder='Job' />
                <select {...register("status")}>
                    <option value={"true"}>ACTIVE</option>
                    <option value={"false"}>INACTIVE</option>
                </select>
                <button style={{backgroundColor: "green", color: "white", width: "100%", height: "40px", cursor: "pointer", outline: "none", border: "none", borderRadius: "10px", padding: "10px 0px", fontSize: "20px", fontWeight: "bold"}} type='submit'>ADD</button>
                <button style={{backgroundColor: "red", color: "white", width: "100%", height: "40px", cursor: "pointer", outline: "none", border: "none", borderRadius: "10px", padding: "10px 0px", fontSize: "20px", fontWeight: "bold"}} type='button' onClick={close}>CANCEL</button>
            </form>
        </dialog>
    );
}

export default AddDialog;
