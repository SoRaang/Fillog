<template>
    <li class="article-item">
        <div class="article-item-image-container">
            <RouterLink :to="`/posts/${ thisArticle._id }`">
                <img class="article-item-thumbnail" v-if="thisArticle.images.length > 0" :src="thisArticle.images.find((item, index) => index === thisArticle.thumbIndex)?.imageURL" alt="이미지 미리보기">
            </RouterLink>

            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-gallery-line"></use>
            </svg>
        </div>

        <dl class="article-item-descriptions">
            <dt class="article-item-titlebar" :title="thisArticle.title">
                <p class="article-item-title">
                    <RouterLink :to="`/posts/${ thisArticle._id }`">
                        {{ thisArticle.title }}
                    </RouterLink>
                </p>

                <span>[{{ thisReplies.length }}]</span>
            </dt>

            <dd class="article-item-info">
                <RouterLink :to="`/posts/${ thisArticle._id }`">
                    {{ postCategory[thisArticle.category] }}
                </RouterLink>

                <span>·</span>

                <RouterLink :to="`/posts/${ thisArticle._id }`">
                    {{ dateFormat(thisArticle.createdAt) }}
                </RouterLink>

                <span>·</span>

                <RouterLink class="article-item-info-likes" :to="`/posts/${ thisArticle._id }`">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-fill"></use>
                    </svg>

                    {{ thisArticle.likes.length.toLocaleString('ko-KR') }}
                </RouterLink>
            </dd>

            <dd class="article-item-text-summary">
                <RouterLink :to="`/posts/${ thisArticle._id }`">
                    {{ thisArticle.text.replace(/<[^>]*>?/g, ' ') }}
                </RouterLink>
            </dd>
        </dl>
    </li>
</template> <!-- Template Ends -->

<script setup>
    import { RouterLink } from 'vue-router';
    import { getArticleRepliesAll } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';
    import postCategory from '../datas/articleCategory.json'; // 임시 카테고리

    const props = defineProps([ 'postObject' ]);
    const thisArticle = props.postObject;
    const thisReplies = await getArticleRepliesAll(props.postObject._id);
</script> <!-- Logic Ends -->