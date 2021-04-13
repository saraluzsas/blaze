import axios from "axios"

export async function listUser() {
    try {
        const res = await axios.get("/user")
        return Array.isArray(res.data) ? res.data : []
    }

    catch (err) {
        console.error(err)
        return []
    }
}

export async function editUser(id: string, user: object) {
    await axios.put(`/user/${id}`, user)
}

export async function findUserById(id: string) {
    try {
        const res = await axios.get(`/user/${id}`)
        
        if (res.data.error) {
            return undefined
        }

        else {
            return res.data
        }
    }

    catch (err) {
        console.error(err)
        return undefined
    }
}

export async function removeUser(id: string) {
    await axios.delete(`/user/${id}`)
}