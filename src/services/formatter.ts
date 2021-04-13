export function toCurrency(value: number) {
    const constraints: Intl.NumberFormatOptions = {
        currency: "COP",
        style: "currency",
        minimumFractionDigits: 0
    }

    return value.toLocaleString("es-CO", constraints)
}