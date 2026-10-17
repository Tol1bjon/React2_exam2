import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRedux, getData } from './Store/Redux';
import AddDialog from './Components/AddDialog';
import EditDialog from './Components/EditDialog';
import InfoRedux from './Components/InfoRedux';

const App = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.data)
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(null)
  const [infoOpen, setInfoOpen] = useState(null)
  const [search, setSearch] = useState("")
  const [select, setSelect] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getData(search))
    }, 500)
    return () => clearTimeout(timer)
  }, [search]);



  return (
    <div style={{maxWidth: "1000px", margin: "auto", display: "flex", flexDirection: "column", gap: "20px"}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
        <h1>USERS</h1>
        <div style={{display: "flex", gap: "10px"}}>
          <button style={{padding: "8px 15px", fontSize: "20px", fontWeight: "bold", cursor: "pointer", outline: "none", border: "none", borderRadius: "10px", backgroundColor: "green", color: "white"}} onClick={() => setAddOpen(true)}>ADD USERS</button>
          <input style={{padding: "8px 15px", fontSize: "20px", fontWeight: "bold", outline: "none", border: "1px solid black", borderRadius: "10px"}} type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
          <select style={{padding: "8px 15px", fontSize: "20px", fontWeight: "bold", cursor: "pointer", outline: "none", border: "1px solid black", borderRadius: "10px"}} onChange={(e) => setSelect(e.target.value)}>
            <option value="">ALL</option>
            <option value="active">ACTIVE</option>
            <option value="inactive">INACTIVE</option>
         </select>
      </div>
      </div>


      <AddDialog open={addOpen} close={() => setAddOpen(false)} />
      <EditDialog user={editOpen} close={() => setEditOpen(null)}/>
      <InfoRedux user={infoOpen} close={() => setInfoOpen(null)}/>


      <table style={{border: "1px solid black", width: "100%", borderCollapse: "collapse"}}>
        <thead>
          <th style={{border: "1px solid black", padding: "8px 15px"}}>AVATAR</th>
          <th style={{border: "1px solid black", padding: "8px 15px"}}>NAME</th>
          <th style={{border: "1px solid black", padding: "8px 15px"}}>AGE</th>
          <th style={{border: "1px solid black", padding: "8px 15px"}}>EMAIL</th>
          <th style={{border: "1px solid black", padding: "8px 15px"}}>JOB</th>
          <th style={{border: "1px solid black", padding: "8px 15px"}}>STATUS</th>
          <th style={{border: "1px solid black", padding: "8px 15px"}}></th>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td style={{border: "1px solid black", textAlign: "center"}}><img style={{width: "50px", height: "50px", borderRadius: "50%"}} src={user.avatar} alt="" /></td>
              <td style={{border: "1px solid black", textAlign: "center"}}>{user.name}</td>
              <td style={{border: "1px solid black", textAlign: "center"}}>{user.age}</td>
              <td style={{border: "1px solid black", textAlign: "center"}}>{user.email}</td>
              <td style={{border: "1px solid black", textAlign: "center"}}>{user.job}</td>
              <td style={{border: "1px solid black", textAlign: "center", color: user.status ? "green" : "red"}}>{user.status ? "ACTIVE" : "INACTIVE"}</td>
              <td style={{border: "1px solid black", textAlign: "center", padding: "8px 0px"}}>
                <button onClick={() => dispatch(deleteRedux(user.id))} style={{backgroundColor: "red", color: "white", width: "100px", height: "30px", cursor: "pointer", margin: "5px", border: "none", fontWeight: "bold", borderRadius: "5px"}}>DELETE</button>
                <button onClick={() => setEditOpen(user)} style={{backgroundColor: "blue", color: "white", width: "100px", height: "30px", cursor: "pointer", margin: "5px", border: "none", fontWeight: "bold", borderRadius: "5px"}}>EDIT</button>
                <button onClick={() => setInfoOpen(user)} style={{backgroundColor: "green", color: "white", width: "100px", height: "30px", cursor: "pointer", margin: "5px", border: "none", fontWeight: "bold", borderRadius: "5px"}}>VIEW</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.map((user) => (
        <div key={user.id}>
          <img src={user.ava} alt="" />
        </div>
      ))}
    </div>
  );
}

export default App;
