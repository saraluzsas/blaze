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

export async function listConsignment(constraints: any = undefined) {
    try {
        const res = await axios.get("/consignment", { params: constraints })

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