<template>
    <div id="myPage">
        <h1 class="page-title">마이페이지</h1>

        <div class="section-title-bar">
            내 프로필
        </div>

        <div class="infoContent imgContainer">
            <img v-if="imageState" :src="previewImageUrl" alt="설정한 이미지 없음" />
            <img v-else alt="설정한 이미지 없음" />
        </div>

        <div class="infoList">
            <p class="infoContent">{{ userInfo.userName ?? '(알 수 없음)' }}</p>
            <p class="infoContent">{{ userInfo.account ?? 'example@email.com' }}</p>

            <ButtonWithIcon @click="openModal">
                프로필 관리
            </ButtonWithIcon>
        </div>

        <!-- 모달 부분, 프로필 관리 버튼 클릭시 표시 -->
        <div class="modal-wrap" v-show="modalState">
            <div class="modal-container">
                <div class="modal-header">
                    <span>정보 수정</span>
                    <span class="close-button" @click="closeModal">&times;</span>
                </div>

                <form class="editInfoList">
                    <div class="imgContainer">
                        <p class="imgText">프로필 이미지</p>
                        <label for="userImage" class="imgLabel" @click="chooseImg">이미지 선택</label>
                        <input @change="imgUplod" type="file" id="userImage" accept="image/jpeg, image/png, image/webp" class="imgInput">
                        <img v-if="previewImageUrl" :src="previewImageUrl || ''" alt="Profile Image Preview" class="imgView" />
                    </div>

                    <label>닉네임:</label>
                    <input class="editContent" v-model="editUserInfo.userName" />

                    <label>이메일:</label>
                    <input class="editContent" v-model="editUserInfo.account" />
                </form>

                <div class="modal-btn">
                    <button @click="saveEditContent">확인</button>
                </div>
            </div>
        </div>

        <hr>

        <div class="section-title-bar">
            관심 포스트
        </div>

        <PageFilter id="filmGenres" label-icon="article-fill" label-text="글 분류" :filter-array="postFilterArray" :origin-value="'all'" @current-filter="console.log(data)" />
    </div> <!-- #myPage -->
</template> <!-- Template Ends -->

<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { useUserStore } from '../../stores/userInfo'; // userInfo 스토어 가져오기

    const router = useRouter();
    const userStore = useUserStore();  // userInfo 스토어 사용
    const postFilterArray = [ // 임시 필터 리스트 데이터
        { name: '전체', value: 'all' },
        { name: '좋아요', value: 'likedArticles' },
        { name: '댓글', value: 'commentedArticles' }
    ]

    const userInfo = reactive({
        userImage: null,
        account: '',
        userName: '',
        commentedArticles: ''
    });

    const editUserInfo = reactive({
        userName: '',
        account: '',
        userImage: null,
    });

    const modalState = ref(false);
    const imageState = ref(false);
    const previewImageUrl = ref(null);

    const chooseImg = () => {
        imageState.value = true;
    }

    // 프로필 관리 버튼 : 클릭시 정보 수정 모달창 열림
    const openModal = () =>{
        Object.assign(editUserInfo, {
            userName: userInfo.userName,
            account: userInfo.account,
            userImage: userInfo.userImage,
        });

        modalState.value = true;
    }

    // 이미지 업로드 핸들러
    const imgUplod = (event) => {
        const file = event.target.files[0];

        editUserInfo.userImage = file;

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImageUrl.value = e.target.result;
                userInfo.userImage = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    // 모달창 - X 버튼
    const closeModal = ()=>{
        modalState.value = false;
        previewImageUrl.value = false;
        imageState.value = false;
    }

    // 모달창 - 확인 버튼
    const saveEditContent = (e)=>{
        modalState.value = false;
        console.log('입력값:', editUserInfo);
        changeUserInfo(editUserInfo)
    }

    // 입력한 값으로 DB 정보 수정하기
    const changeUserInfo = async ({ userName, account, userImage }) => {
        try {
            const formData = new FormData();

            formData.append('_id', userStore.state.userID);
            formData.append('userName', userName);
            formData.append('account', account);

            if (userImage) {
                formData.append('userImage', userImage);
            }

            const response = await axios.post(`http://localhost:3000/user-info/edit`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });

            console.log('응답 데이터: ', response.data);
            Object.assign(userInfo, response.data); // DB 정보 수정
            userStore.setUser(response.data); // 스토어 정보 수정
            console.log('DB, userInfo store 수정 완료');
        } catch(error) {
            console.error(error);
        }
    }
</script> <!-- Logic Ends -->