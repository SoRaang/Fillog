<template>
    <VueFinalModal v-bind="alertSetting.state.vfmSettings">
        <div id="stormCaller" :class="alertSetting.state.urgentLevel">
            <div class="modal-title-bar">
                <p>{{ alertSetting.state.alertType ?? '타입 없음' }}</p>
            </div>

            <div class="modal-message-container">
                <div class="modal-message-icon">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-error-warning-fill"></use>
                    </svg>
                </div>

                <p class="modal-message-text" v-dompurify-html="messageToString ?? '메시지 없음'"></p>
            </div>

            <div class="modal-controls">
                <button @click="emits('confirm')">컨펌</button>
            </div>
        </div>
    </VueFinalModal> <!-- #stormCaller -->
</template> <!-- Template Ends -->

<script setup>
    import { VueFinalModal } from 'vue-final-modal';
    import { useModalStore } from '../stores/customAlert';

    const emits = defineEmits([ 'confirm' ]);
    const alertSetting = useModalStore();
    const messageToString = alertSetting.state.alertMessage.replaceAll('\n', '<br />')
</script> <!-- Logic Ends -->