import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal';
import { register } from 'swiper/element/bundle';
import VueDOMPurifyHTML from 'vue-dompurify-html'; // v-html 디렉티브에서 해로운 요소 제거

// Import --- System

import router from './router';
import 'vue-final-modal/style.css';
import './assets/stylesheets/style.css';

// Import --- Defaults

import App from './App.vue';

const myProject = createApp(App);
const pinia = createPinia();
const vfm = createVfm();

register(); // Swiper Element 등록

import ButtonWithIcon from './components/elements/ButtonWithIcon.vue'; // 아이콘이 있는 버튼 (버튼 기본형)
import UserNameTag from './components/elements/UserNameTag.vue'; // 사용자 네임 태그
import StarPoints from './components/elements/StarPoints.vue'; // 영화 별점 표시
import PageFilter from './components/commons/PageFilter.vue'; // 페이지 필터
import SpinLoader from './components/commons/SpinLoader.vue'; // 로딩 표시기
import EmptyList from './components/commons/EmptyList.vue'; // 빈 목록 표시기
import CustomAlert from './components/CustomAlert.vue'; // 커스텀 얼럿
import ImageViewer from './components/ImageViewer.vue'; // 슬라이더 이미지 뷰어
import PostItem from './components/PostItem.vue' // 포스트 카드 아이템
import ArticleReply from './components/ArticleReply.vue'; // 포스트 댓글 아이템
import MovieItem from './components/MovieItem.vue'; // 영화 정보 카드 아이템
import GuestbookItem from './components/GuestbookItem.vue'; // 방명록 글 아이템
import GuestbookReplyItem from './components/GuestbookReplyItem.vue'; // 방명록 글의 답글 아이템

// Import - Global Components (mount 이전에 선언되어야 함)

myProject.component('ButtonWithIcon', ButtonWithIcon);
myProject.component('UserNameTag', UserNameTag);
myProject.component('StarPoints', StarPoints);
myProject.component('PageFilter', PageFilter);
myProject.component('SpinLoader', SpinLoader);
myProject.component('EmptyList', EmptyList);
myProject.component('CustomAlert', CustomAlert);
myProject.component('ImageViewer', ImageViewer);
myProject.component('PostItem', PostItem);
myProject.component('ArticleReply', ArticleReply);
myProject.component('MovieItem', MovieItem);
myProject.component('GuestbookItem', GuestbookItem);
myProject.component('GuestbookReplyItem', GuestbookReplyItem);

// 앱 정의

if (!!localStorage.getItem('fillogLocalSettings') === false) localStorage.setItem('fillogLocalSettings', JSON.stringify({ useDarkTheme: true }));

const fillogSettings = JSON.parse(localStorage.getItem('fillogLocalSettings'));

if (!!fillogSettings === true && fillogSettings.useDarkTheme === true) { // 다크 테마 체크
    document.querySelector('html').classList.add('dark');
} else {
    document.querySelector('html').classList.add('light');
}

myProject
    .use(pinia)
    .use(vfm)
    .use(router)
    .use(VueDOMPurifyHTML)
    .mount('#app')