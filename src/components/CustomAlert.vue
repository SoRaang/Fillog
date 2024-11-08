<template>
    <VueFinalModal v-bind="alertSetting.state.vfmSettings">
        <div id="stormCaller" class="modal-main" :class="alertSetting.state.urgentLevel">
            <div class="modal-title-bar">
                <p>{{ alertSetting.state.alertType ?? '타입 없음' }}</p>

                <span>·</span>

                <p>{{ titleObject[alertSetting.state.alertType].name }}</p>
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
                <ButtonWithIcon style="--button-surface-color: var(--modal-urgent-color);" icon-position="front" icon-name="check-line" tooltip="확인" @click="emits('confirm')">
                    컨펌
                </ButtonWithIcon>

                <buttonWithIcon style="--button-surface-color: transparent; --button-outline-color: var(--modal-urgent-color); --button-text-color: var(--clr-text); --button-hover-color: var(--modal-urgent-color) / .25;" tooltip="취소">
                    취소
                </buttonWithIcon>
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
    const titleObject = {
        info: {
            name: '정보',
            icon: ''
        },
        alert: {
            name: '경고',
            icon: ''
        },
        confirm: {
            name: '확인',
            icon: ''
        }
    }
</script> <!-- Logic Ends -->