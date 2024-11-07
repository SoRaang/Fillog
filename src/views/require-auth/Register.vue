<template>
    <div class="container">
        <h1 class="page-title">회원가입</h1>

        <form @submit.prevent="register" class="registerForm">
            <div>
                <label for="account">account</label>
                <input v-model="form.account" id="account" type="email" required />
            </div>

            <div>
                <label for="password">password</label>
                <input v-model="form.password" id="password" type="password" required />
            </div>

            <div>
                <label for="verifyPassword">verify-password</label>
                <input v-model="form.verifyPassword" id="verifyPassword" type="password" required />
            </div>

            <div>
                <label for="userName">username</label>
                <input v-model="form.userName" id="userName" type="text" required />
            </div>

            <div class="imgContainer">
                <p class="imgText">userImage</p>
                <label for="userImage" class="imgLabel"></label>
                <input @change="imgUplod"  type="file" id="userImage" accept="image/jpeg, image/png, image/webp" class="imgInput">
                <img v-if="previewImageUrl" :src="previewImageUrl || ''" alt="" class="imgView" />
            </div>

            <button type="submit" class="registerBtn">Register</button>

            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <div v-if="successMessage" class="success">{{ successMessage }}</div>
        </form>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { useBlogSettingStore } from '../../stores/blogSettings';

    const blogSettings = useBlogSettingStore();

    blogSettings.setOptions('showSideBar', false); // 회원 가입 화면에서 사이드바 숨기기

    // 에러 메시지, 성공 메시지 저장
    const errorMessage = ref('');
    const successMessage = ref('');

    const previewImageUrl = ref(null);

    // 비밀번호가 8자 이상 12자 이하인지 확인
    const isValidPasswordLength = (password) => {
    return password.length >= 8 && password.length <= 12;
    };
    const router = useRouter();

    // 상태 관리
    const form = reactive({
        type:'user',
        account: '',
        password: '',
        verifyPassword: '',
        userName: '',
        userImage: null,
    });


    // password 와 verifyPassword 일치하는지 확인
    const passwordCheck = (password, verifyPassword) => {
        return password == verifyPassword;
    }

    // 이미지 처리
    const imgUplod = (event) => {
        const file = event.target.files[0];

        form.userImage = file;

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                previewImageUrl.value = e.target.result;
            }

            reader.readAsDataURL(file);
        }
    }

    const register = async () => {
        //비밀번호 길이 체크
        if (!isValidPasswordLength(form.password)) {
            errorMessage.value = '비밀번호는 8자 이상 12자 이하로 입력해 주세요.'; // 비밀번호 길이 오류 시 메시지 설정
            successMessage.value = '';

            return;
        }

    // password 와 verifyPassword 일치하는지 확인
    if (!passwordCheck(form.password, form.verifyPassword)) {
        errorMessage.value = '비밀번호가 일치하지 않습니다.';
        successMessage.value = '';
        return;
    }

    try {
        const formData = new FormData();
        formData.append('type', form.type);
        formData.append('account', form.account);
        formData.append('password', form.password);
        formData.append('userName', form.userName);
        formData.append('userImage', form.userImage);

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // 서버로 회원가입 요청을 보냅니다.
            const response = await axios.post('http://localhost:3000/register', formData, {
                headers: {
                'Content-Type': 'multipart/form-data', // 파일 업로드 시 multipart/form-data 설정 필요
                },
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            successMessage.value = '회원가입에 성공했습니다!';

            // 회원가입 성공이라는 메시지 볼 수 있게 2초뒤 로그인 페이지로 이동
            setTimeout(() => {
                router.push('/login');   // 회원가입 성공 -> 로그인 페이지로 이동
            }, 2000);

        } catch (err) {
            // 서버 요청 중 에러 발생 시 처리
            console.error("Error response:", err.response);
            errorMessage.value = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'; // 에러 메시지를 서버 응답에 따라 설정
            successMessage.value = '';
        }
    }
</script> <!-- Logic Ends -->