<template>
    <div v-show="visible" class="modal" @click.stop="handleMaskClick">
        <div class="box">
            <div class="text">{{ title }}</div>
            <div class="actions">
                <Button @click.stop="handleAction('cancel')">取消</Button>
                <Button type="info" @click.stop="handleAction('confirm')">确定</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { ref, defineEmits, defineProps, withDefaults } from 'vue';
import { Action } from './message-box.type'
const emit = defineEmits(['action']);

interface Props {
    title: string;
    closeOnClickModal: boolean;
}

const prop = withDefaults(defineProps<Props>(), {
    closeOnClickModal: true,
});

const visible = ref<boolean>(true);

const handleAction = (action: Action) => {
    emit('action', action);
    doClose()
};

const doClose = () => {
    visible.value = false;
}
const handleMaskClick = () => {
    if (prop.closeOnClickModal) {
        handleAction('cancel')
    }
}
</script>

<style lang="scss">
.modal {
    text-align: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 16px;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);

    .box {
        display: inline-block;
        width: 100%;
        max-width: 420px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
        background-color: #fff;
        border-radius: 4px;
        padding: 16px;

        .actions {
            display: flex;
            justify-content: center;
            gap: 10px;
        }
    }

    &:after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
    }
}
</style>