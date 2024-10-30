import { createRouter, createWebHistory } from 'vue-router';
import { useLoaderStore } from './stores/isLoading';

import NotFound from './views/handler/NotFound.vue';
import Home from './views/Home.vue';
import PostList from './views/PostList.vue';
import FilmList from './views/FilmList.vue';
import GuestBook from './views/GuestBook.vue';
import Login from './views/require-auth/Login.vue'
import Register from './views/require-auth/Register.vue'

const router = createRouter({ // 라우터 정의
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { // 404 에러
            path: '/:pathMatch(.*)*',
            redirect: '/404'
        },
        {
            path: '/404',
            component: NotFound
        },
        { // 홈 (Root)
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                breadcrumb: [
                    { name: 'Home' }
                ]
            }
        },
        { // 로그인
            path: '/login',
            component: Login,
            meta: {
                breadcrumb: [
                    { name: 'Login' }
                ]
            }
        },
        { // 회원가입
            path: '/register',
            component: Register,
            meta: {
                breadcrumb: [
                    { name: 'register' }
                ]
            }
        },
        { // 포스트
            path: '/posts',
            children: [
                { // 포스트 목록 (기본 경로)
                    path: '',
                    name: 'Posts',
                    component: PostList,
                    meta: {
                        breadcrumb: [
                            { name: 'Posts' }
                        ]
                    }
                },
                { // 개별 포스트 자세히 보기
                    path: ':postID',
                    component: () => import('./views/PostDetail.vue'),
                    meta: {
                        breadcrumb: [
                            { name: 'Article' }
                        ]
                    }
                },
                { // 포스트 작성
                    path: 'write',
                    component: () => import('./views/require-auth/PostWrite.vue'),
                    meta: {
                        breadcrumb: [
                            { name: 'Write' }
                        ]
                    }
                },
                { // 포스트 수정
                    path: 'edit/:postID',
                    component: () => import('./views/PostEdit.vue'),
                    meta: {
                        breadcrumb: [
                            { name: 'Edit' }
                        ]
                    }
                }
            ]
        },
        { // 리뷰한 영화
            path: '/movies',
            name: 'Movies',
            component: FilmList,
            meta: {
                breadcrumb: [
                    { name: 'Movies' }
                ]
            }
        },
        { // 방명록
            path: '/guestbook',
            name: 'Guestbook',
            component: GuestBook,
            meta: {
                breadcrumb: [
                    { name: 'Guestbook' }
                ]
            }
        },
        { // 관리자 설정
            path: '/settings',
            name: 'Settings',
            component: () => import('./views/admin/Dashboard.vue'),
            meta: {
                breadCrumb: [
                    { name: 'Dashboard' }
                ]
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) { // 라우트 이동시 페이지 최상단으로 이동
        return { top: 0 }
    }
});

router.beforeEach((from, to, next) => { // 네비게이션 가드 - 이동 전
    const isLoading = useLoaderStore();

    isLoading.setLoadTrue();

    next();
});

router.afterEach((from, to, failure) => { // 네비게이션 가드 - 이동 후
    const isLoading = useLoaderStore();

    isLoading.setLoadFalse();
});

export default router;