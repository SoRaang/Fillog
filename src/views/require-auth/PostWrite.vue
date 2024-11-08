<template>
    <div id="frmPostWrite">
        <h1 class="page-title">포스트 작성</h1>

        <section id="writeUpperArea" class="labeled-row-section">
            <div class="row-section-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-list-radio"></use>
                </svg>

                <span>카테고리</span>
            </div>

            <div class="row-section-container">
                <select name="category" id="slctCategory" class="exclude write-form-inputs" v-model="postFormData.category">
                    <option value="0" disabled>카테고리 선택</option>

                    <option v-for="(category, value) in articleCategory" :key="value" :value="value">
                        {{ category }}
                    </option>
                </select>
            </div>
        </section> <!-- #writeUpperArea -->

        <section id="writeTitleArea" class="labeled-row-section">
            <div class="row-section-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-text-block"></use>
                </svg>

                <span>글 제목</span>
            </div>

            <div class="row-section-container">
                <input type="text" name="title" id="txtArticleTitle" class="exclude write-form-inputs" placeholder="포스트 제목" v-model="postFormData.title">
            </div>
        </section> <!-- #writeTitleArea -->

        <section id="writeTextArea" class="labeled-row-section">
            <div class="row-section-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-menu-2-line"></use>
                </svg>

                <span>내용</span>
            </div>

            <div class="row-section-container">
                <textarea name="content" id="txtArticleContent" class="exclude" placeholder="포스트 내용 입력..." v-model="postFormData.text"></textarea>
            </div>
        </section> <!-- #writeTextArea -->

        <section id="writeLowerArea" class="labeled-row-section">
            <div class="row-section-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-image-2-line"></use>
                </svg>

                <span>이미지</span>
            </div>

            <div class="row-section-container">
                <div class="write-file-upload-container">
                    <ButtonWithIcon element-id="btnUploadImages" icon-position="front" icon-name="image-add-line" tool-tip="이미지 업로드" :disabled="postFormData.images.length === 3" @click="fileUploader.click()">
                        이미지 추가
                    </ButtonWithIcon>

                    <span>최대 3장을 첨부할 수 있어요.</span>

                    <input type="file" name="file-post-image-uploader" id="filePostImages" accept="image/*" ref="fileUploader" @change="changeImage">
                </div>

                <div class="write-file-preview-container">
                    <div class="write-preview-image-container" v-for="(imageObject, index) in postFormData.images" :key="index">
                        <img class="write-preview-image" :src="imageObject.imageURL" />

                        <div class="write-preview-image-overlay">
                            <button type="button" class="button-remove-preview-item" title="이 이미지 제거" @click="console.log(index + '번 이미지')">
                                <svg class="remix">
                                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-close-circle-fill"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section> <!-- #writeLowerArea -->

        <section id="writeFilmArea" class="labeled-row-section">
            <div class="row-section-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-movie-2-line"></use>
                </svg>

                <span>영화 선택</span>
            </div>

            <MovieFinder class="row-section-container" @send-movie-object="getMovieData" />
        </section>

        <div id="writePostControls">
            <ButtonWithIcon element-id="btnCancelWrite" icon-position="front" icon-name="close-line" tool-tip="작성 취소" style="--button-surface-color: transparent; --button-outline-color: var(--clr-alert); --button-text-color: var(--clr-alert);" @click="router.go(-1)">
                작성 취소
            </ButtonWithIcon>

            <ButtonWithIcon element-id="btnUploadPost" icon-position="front" icon-name="upload-line" tool-tip="포스트 작성 완료" @click="submitPost">
                포스트 작성 완료
            </ButtonWithIcon>
        </div>
    </div> <!-- #frmPostWrite -->
</template> <!-- Template Ends -->

<script setup>
    import { ref, useTemplateRef } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { getAdminInfo } from '../../utilities/dataQueries';
    import MovieFinder from '../../components/commons/MovieFinder.vue';
    import articleCategory from '../../datas/articleCategory.json';

    const router = useRouter();
    const blogAdmin = await getAdminInfo();
    const fileUploader = useTemplateRef('fileUploader'); // input:file 이벤트 추가를 위한 템플릿 레퍼런스
    const postFormData = ref({
        title: '',
        category: 0,
        movieID: null,
        movieGenres: [],
        text: '',
        images: [],
        author: blogAdmin.adminID
    });

    const changeImage = (e) => {
        if (postFormData.value.images.length >= 3) {
            alert('이미지는 최대 3장까지 업로드 가능합니다.');

            return;
        }

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            postFormData.value.images.push(
                { imageURL: e.target.result, alt: '' }
            );
        }

        reader.readAsDataURL(file);
    }

    const submitPost = async () => {
        console.log(postFormData.value);

        try {
            const response = await axios.post('http://localhost:3000/post', postFormData.value);

            alert('게시글이 등록되었습니다.');
            router.push('/posts');
        } catch(error) {
            console.error('Error post:', error);
            alert('게시글 등록에 실패했습니다.');
        }
    }

    const getMovieData = (data) => {
        postFormData.value.movieID = data.id;
        postFormData.value.movieGenres = data.genre_ids;
    }
</script> <!-- Logic Ends -->