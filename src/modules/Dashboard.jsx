import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"

const Dashboard = () => {
    const name = localStorage.getItem("username")
    const API_URL = import.meta.env.VITE_API_URL;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editedId, setEditedId] = useState(null);
    const [editUsername, setEditUsername] = useState("");
    console.log("editedId :::", editedId)

    console.log("users :::", users)

    const fetchUsers = async () => {
        setLoading(true);
        const response = await axios.get(`${API_URL}/users`);
        console.log("Users:", response.data);
        if (response.status == 200) {
            setUsers(response.data.users)
            setLoading(false);
        }
    }

    const handleEdit = (userId, username) => {
        setEditedId(userId);
        setEditUsername(username);
    }

    const handleDelete = async (userId) => {
        await axios.delete(`${API_URL}/users/delete/${userId}` ).then((response) => {
            console.log("response :", response)
            if (response.status == 200) {
                alert(response.data.message);
                fetchUsers()
            }
        }).catch((error) => {
            console.log("Error =>", error)
            alert("Failed to delete user")
        })
    }

    const handleUpdate = async () => {
        const payload = {
            id: editedId,
            username: editUsername
        }
         await axios.put(`${API_URL}/users/update`, payload).then((response) => {
      console.log("response :", response)
      if (response.status == 200) {
        alert(response.data.message);
        setEditUsername("");
        setEditedId(null);
        fetchUsers()
      }
    }).catch((error)=>{
      console.log("Error =>",error)
      alert("User Invalid")
    })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <Box sx={{ mt: 2 }}>

            <Typography variant="h5">Welcome to {name}</Typography>
            <Typography variant="h6">Users List</Typography>
            {loading ?
                <Typography variant="h6">Loading...</Typography>
                : users.length == 0
                    ?
                    <Typography variant="h6">No users found</Typography>
                    :
                    users.length > 0 && <Box sx={{ mt: 2 }}>
                        {users.map((user) => (
                            <Card key={user._id} sx={{ mb: 2 }}>
                                <CardContent>
                                    {editedId == user._id ?
                                        <TextField
                                            value={editUsername}
                                            onChange={(e) => setEditUsername(e.target.value)}
                                        />
                                        :
                                        <Typography variant="h6">{user.username}</Typography>
                                    }
                                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                                    {editedId == user._id ?

                                        <Button size="small" variant="contained" onClick={handleUpdate}>Update</Button>
                                        :
                                        <Button size="small" variant="contained" onClick={() => handleEdit(user._id, user.username)}>Edit</Button>
                                    }
                                    <Button size="small" color="error" variant="contained" onClick={() => handleDelete(user._id)}>Delete</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>}
        </Box>
    )
}

export default Dashboard;