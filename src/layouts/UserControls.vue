<template>
    <aside id="userControls">
        <div class="user-info-container" v-if="!!currentUser.state.userID === false">
            <ButtonWithIcon element-id="btnLogin" icon-position="back" icon-name="key-fill" @click="router.push('/login')" >
                로그인
            </ButtonWithIcon>
        </div>

        <div class="user-info-container" v-else>
            <ButtonWithIcon element-id="btnConfig" icon-position="only" icon-name="user-fill" @click="router.push('/my-page')">
                사용자 설정
            </ButtonWithIcon>

            <ButtonWithIcon element-id="btnLogout" icon-position="back" icon-name="logout-box-r-line" @click="logoutAction" style="--button-surface-color: 0 0 0 / 0; --button-outline-color: var(--clr-theme) / .5; --button-text-color: var(--clr-theme);">
                로그아웃
            </ButtonWithIcon>
        </div>
    </aside> <!-- #userColtrols -->
</template> <!-- Template Ends -->

<script setup>
    import { useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userInfo';

    const router = useRouter();
    const currentUser = useUserStore(); // 로그인 사용자 스토어

    // 로그아웃
    const logoutAction = () => {
        currentUser.removeUser(); // 로그아웃 상태로 전환하여 로그인 상태를 false로 설정
        localStorage.removeItem('token'); // 저장된 토큰 삭제
        router.push('/login');
    };
</script> <!-- Logic Ends -->