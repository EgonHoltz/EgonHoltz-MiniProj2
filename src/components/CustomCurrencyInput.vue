<template>
  <input ref="inputRef" />
</template>

<script>
//import { watch } from 'vue' // Vue 2: import { watch } from '@vue/composition-api'
import { watch } from '@vue/composition-api'
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object
  },
  setup(props) {
    const { inputRef, setOptions, setValue } = useCurrencyInput(props.options)

    watch(
      () => props.value, // Vue 2: props.value
      (value) => {
        setValue(value)
      }
    )

    watch(
      () => props.options,
      (options) => {
        setOptions(options)
      }
    )

    return { inputRef }
  }
}
</script>