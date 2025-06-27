import { defineComponent, ref, computed } from 'vue'

const Com = defineComponent({
  name: 'Com',
  props: {
    val: {
      type: Number,
      required: true
    }
  },
  setup(props, { attrs, slots, emit, expose }) {
    const message = ref('Hello from TSX!');
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    const handleClick = () => {
      count.value += 1
      emit("increment", {
        count: count.value,
        isEven: count.value % 2 === 0
      })
      console.log('props:', props)
      console.log('attrs:', attrs)
      console.log('slots:', slots)
    }
    expose({
      doubleCount
    })
    return () => (
      <div>
        <h5>{message.value}</h5>
         {/* 使用 v-model 语法糖 (需要插件支持) */}
        <input type="text" v-model={message.value} />
        {props.val}
        <button onClick={handleClick}>Increment</button>
        <div>{count.value}</div>
        <div>{doubleCount.value}</div>
        <div>{slots.default?.()}</div>
        <div>{slots.slot1?.()}</div>
      </div>
    )
  }
})

export default Com