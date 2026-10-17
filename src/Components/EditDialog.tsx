import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Schemas } from '../Schemas/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { editUserRedux } from '../Store/Redux';

const EditDialog = ({ user, close }) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm({
            resolver: zodResolver(Schemas),
            defaultValues: {
                name: user?.name,
                avatar: user?.avatar,
                age: user?.age,
                email: user?.email,
                job: user?.job,
                status: user?.status
            }
        })

        const onsubmit = (editUser) => {
            dispatch(editUserRedux({ id: user.id, user: editUser}))
            close()
            reset()
        }

        useEffect(() => {
            if(user) {
                reset(user)
            }
        }, [user])

    return (
        <dialog style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-100%, -50%)", width: "500px"}} open={user}>
            <form style={{display: "flex", flexDirection: "column", gap: "10px"}} key={user?.id} onSubmit={handleSubmit(onsubmit)}>
                <h1>EDIT USER</h1>
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("name")} type="text" placeholder='Name' />
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("avatar")} type="text" placeholder='Avatar' />
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("age")} type="number" placeholder='Age' />
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("email")} type="text" placeholder='Email' />
                <input style={{padding: "10px", borderRadius: "10px", outline: "none", border: "1px solid black"}} {...register("job")} type="text" placeholder='Job' />
                <select style={{padding: "10px",}} {...register("status")}>
                    <option value={"true"}>ACTIVE</option>
                    <option value={"false"}>INACTIVE</option>
                </select>
                <button style={{backgroundColor: "green", color: "white", width: "100%", height: "40px", cursor: "pointer", outline: "none", border: "none", borderRadius: "10px", padding: "10px 0px", fontSize: "20px", fontWeight: "bold"}} type='submit'>ADD</button>
                <button style={{backgroundColor: "red", color: "white", width: "100%", height: "40px", cursor: "pointer", outline: "none", border: "none", borderRadius: "10px", padding: "10px 0px", fontSize: "20px", fontWeight: "bold"}} type='button' onClick={close}>CANCEL</button>
            </form>
        </dialog>
    );
}

export default EditDialog;
