export function toCurrency(value: number) {
    const constraints: Intl.NumberFormatOptions = {
        currency: "COP",
        style: "currency",
        minimumFractionDigits: 0
    }

    return value.toLocaleString("es-CO", constraints)
}

export function toTimeAgo(date: string) {
    const formatter = new Intl.RelativeTimeFormat("es", { style: "long" })

    try {
        const timestamp = Date.parse(date)
        const elapsed = (Date.now() - timestamp) / 1_000

        const days = Math.floor(elapsed / 86_400)

        if (days >= 5) return date

        switch (days) {
            case 0:
                return "hoy"

            case 1:
                return "ayer"

            default:
                return formatter.format(-days, "days")
        }
    }

    catch (err) {
        console.error(err)
        return date
    }
}