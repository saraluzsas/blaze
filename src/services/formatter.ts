export function toCurrency(value: string | number) {
    const number = parseInt(value.toString())

    const constraints: Intl.NumberFormatOptions = {
        currency: "COP",
        style: "currency",
        minimumFractionDigits: 0
    }

    return number.toLocaleString("es-CO", constraints)
}

export function toTimeAgo(date: string) {
    const formatter = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric" })

    try {
        const timestamp = Date.parse(date)
        const elapsed = (Date.now() - timestamp) / 1_000

        const days = Math.floor(elapsed / 86_400)

        switch (days) {
            case 0:
                return "hoy"

            case 1:
                return "ayer"

            default:
                return formatter.format(timestamp)
        }
    }

    catch (err) {
        console.error(err)
        return date
    }
}