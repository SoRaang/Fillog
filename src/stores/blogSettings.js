import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useBlogSettingStore = defineStore('blogSettings', () => {
    const state = ref({
        colorTheme: 'default',
        showSideBar: true
    });

    const setOptions = (key, value) => {
        state.value[key] = value;
    }

    return { state, setOptions }
});

/**
 * ===== 1. 스토어 설명 =====
 *
 * 블로그 설정
 *
 * ===== 2. 스토어 반환 객체 =====
 *
 * (블로그 설정 객체)
 *
 * ===== 3. 세터 메소드 =====
 *
 * setOptions(< key >, < value >) : 로그인 한 사용자 객체를 스토어에 저장
 *
 * ===== 4. 게터 메소드 =====
 *
 * (없음)
 */