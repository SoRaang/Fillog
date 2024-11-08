<template>
    <aside id="sideBarMain">
        <div id="sideBlogInfoContainer">
            <div class="blog-owner-image-container">
                <img v-if="blogAdmin?.adminImage" :src="`http://localhost:3000/${ blogAdmin.adminImage }`" alt="블로그 관리자 프로파일 이미지">

                <svg class="remix" v-else>
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-fill"></use>
                </svg>

                <button type="button" id="btnShowInfo" title="블로그 소개">
                    <span>블로그 소개</span>
                </button>
            </div>

            <div class="blog-info-container sidebar-hidden">
                <h6 class="blog-info-blog-name">{{ blogAdmin.blogInfo.blogName }}</h6>

                <p>{{ blogAdmin.adminName }}</p>

                <div class="blog-info-tag-container" v-if="blogAdmin.blogInfo.favoriteGenres?.length > 0">
                    <p class="blog-info-tags" v-for="genre in blogAdmin.blogInfo.favoriteGenres">
                        {{ genreList.find(item => item.id === genre).name }}
                    </p>
                </div>
            </div>
        </div> <!-- #sideBlogInfoContainer -->

        <div id="sideBlogControls">
            <button type="button" class="buttons-blog-control" @click="router.push(`/user-info/${ blogAdmin.adminID }`);">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-search-fill"></use>
                </svg>

                <span>글쓴이 정보</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="currentUser?.state.userID === blogAdmin.adminID" @click="router.push('/posts/write')">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-quill-pen-fill"></use>
                </svg>

                <span>글쓰기</span>
            </button>

            <button type="button" class="buttons-blog-control" v-else @click="console.log(blogAdmin.adminID)">
                <svg class="remix">
                    <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ didIFollowed ? 'dislike-fill' : 'heart-add-fill' }`"></use>
                </svg>

                <span>{{ didIFollowed ? '언팔로우' : '팔로우' }}</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="currentUser?.state.userID === blogAdmin.adminID">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-settings-4-fill"></use>
                </svg>

                <span>블로그 관리</span>
            </button>

            <button type="button" class="buttons-blog-control" v-else @click="router.push('/blog-info')">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-information-2-fill"></use>
                </svg>

                <span>블로그 정보</span>
            </button>
        </div> <!-- #sideBlogControls -->

        <div id="sideCategory" class="rounded sidebar-hidden">
            <h6 class="sidebar-section-title">포스트 카테고리</h6>

            <ul class="sidebar-category-container">
                <li class="sidebar-category-item" v-for="(menuItem, index) in articleCategory" :key="index">
                    <p>{{ menuItem }}</p> <span>{{ postData.filter(post => post.category === index).length.toLocaleString('ko-KR') }}</span>
                </li>
            </ul>
        </div>

        <div id="sideLatest" class="rounded sidebar-hidden">
            <h6 class="sidebar-section-title">최근 게시물</h6>

            <ul class="sidebar-category-container">
                <li class="sidebar-latest-item" v-for="(article, index) in postData.slice(0, 5)" :key="index">
                    <RouterLink class="latest-item-titlebar" :to="`/posts/${ article._id }`">
                        <p>{{ article.title }}</p>

                        <span>[{{ article.comments.length.toLocaleString('ko-KR') }}]</span>
                    </RouterLink>

                    <span class="latest-item-date">{{ dateFormat(article.createdAt) }}</span>
                </li>
            </ul>
        </div>
    </aside> <!-- #sideBarMain -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { useRouter, RouterLink } from 'vue-router';
    import { getAdminInfo, getTotalPosts, movieCategories, getArticleRepliesAll } from '../utilities/dataQueries';
    import { useUserStore } from '../stores/userInfo';
    import dateFormat from '../utilities/dateFormat';
    import articleCategory from '../datas/articleCategory.json';

    const router = useRouter();
    const currentUser = useUserStore();
    const blogAdmin = ref(await getAdminInfo()); // 블로그 관리자 정보 가져오기
    const postData = ref(await getTotalPosts()); // 최근 게시물 출력을 위한 게시물 가져오기
    const genreList = await movieCategories(); // 선호 장르 태그 출력을 위한 영화 장르 목록 가져오기
    const didIFollowed = ref(false); // 임시 팔로우 정보

    postData.value.map(async item => { // 각 포스트의 전체 댓글 갯수 가져오기
        const replies = await getArticleRepliesAll(item._id);

        item.comments = replies;

        return item;
    });
</script> <!-- Logic Ends -->