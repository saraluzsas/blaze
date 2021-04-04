import { computed, Ref } from "vue"

export function toCurrency(value: string) {
    const options = { style: "currency", currency: "COP", minimumFractionDigits: 0 }
    const formatter = new Intl.NumberFormat("es-CO", options)

    return formatter.format(parseFloat(value) || 0)
}

export function useCurrency<T = number | string>(number: Ref<T>) {
    return computed(() => toCurrency(number.value.toString()))
}