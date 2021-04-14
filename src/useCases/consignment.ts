import axios from "axios"

interface Detail {
    amount: string,
    date: string
}

export async function createConsignment(photo: string, details: Detail[], note: string) {
    const total = details.reduce((val, curr) => val += parseInt(curr.amount), 0)
    
    const consignment = {
        note: note,
        details: details,
        photo: photo,
        total: total
    }

    await axios.post("/consignment", consignment)
}

export async function listConsignment(from: string = "", to: string = "") {
    try {
        const query = { from, to }
        const res = await axios.get("/consignment", { data: query })

        if (res.data.error) {
            console.error(res.data.message)
            return []
        }

        else {
            return res.data
        }
    }

    catch (err) {
        console.error(err)
    }
}