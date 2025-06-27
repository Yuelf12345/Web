import { defineComponent, ref, onMounted } from "vue";
import Com from './Com.tsx'
interface ComProps {
  val: number
  a?: number  // 可选属性
}
const tsx =  defineComponent({
  setup() {
    const ComRef = ref<InstanceType<typeof Com>>();

    onMounted(() => {
      console.log(ComRef.value);
    });

    return () => (
      <div>
        <Com {...{ val: 100, a: 1 } as ComProps} ref={ComRef}>
          <div>插槽</div>
          <template v-slots={{slot1:() => <div>插槽1</div>}}></template>
        </Com>
      </div>
    );
  },
});

export default tsx;