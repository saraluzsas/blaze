export function toCurrency(value: string | number) {
    const number = parseInt(value.toString())

    const constraints: Intl.NumberFormatOptions = {
        currency: "COP",
        style: "currency",
        minimumFractionDigits: 0
    }

    return number.toLocaleString("es-CO", constraints)
}

export function toTimeAgo(text: string) {
    const formatter = new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" })

    try {
        const timestamp = Date.parse(text)
        const elapsed = Math.abs(Date.now() - timestamp) / 1_000

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
        return text
    }
}