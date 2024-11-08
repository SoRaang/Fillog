import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('stormCaller', () => {
    const state = ref({
        alertType: 'confirm', // info, alert, confirm
        urgentLevel: 'good', // good, low, medium, high
        alertMessage: `뭐시기 저시기가 요러조러해서 이러쿵 저러쿵 합니다.\n요렇게 조렇게 조치해야 합니다.\n뭐시기 뭐시기 하시겠습니까?`,
        vfmSettings: {
            hideOverlay: false,
            overlayClass: 'modal-overlay',
            overlayTransition: 'vfm-fade',
            contentTransition: 'vfm-fade'
        }
    });

    const setOptions = (key, value) => {
        state.value[key] = value;
    }

    const setVFMOptions = (vfmObject) => {
        state.value.vfmSettings = vfmObject;
    }

    return { state, setOptions, setVFMOptions }
});

/**
 * ===== 1. 스토어 설명 =====
 *
 * CustomAlert 컴포넌트의 작동을 위한 설정값
 *
 * ===== 2. 스토어 반환 객체 =====
 *
 * (종류, 긴급도, 메시지, VFM 설정)
 *
 * ===== 3. 세터 메소드 =====
 *
 * setOptions(< key >, < value >) : 해당 key 값의 설정 변경
 * setVFMOptions(< vfm object >) : vfm 옵션 변경
 *
 * ===== 4. 게터 메소드 =====
 *
 * (없음)
 */