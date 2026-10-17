import React from 'react';

const InfoRedux = ({ user, close }) => {
    return (
        <dialog style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-100%, -50%)"}} open={user} key={user?.id}>
            <h1 style={{fontWeight: "bold"}}>Name: {user?.name}</h1>
            <p style={{fontWeight: "bold"}}>Age: {user?.age}</p>
            <p style={{fontWeight: "bold"}}>Email: {user?.email}</p>
            <p style={{fontWeight: "bold"}}>Job: {user?.job}</p>
            <p style={{fontWeight: "bold", color: user?.status ? "green" : "red"}}>Status: {user?.status ? "ACTIVE" : "INACTIVE"}</p>
            <button onClick={close}>CLOSE</button>
        </dialog>
    );
}

export default InfoRedux;
