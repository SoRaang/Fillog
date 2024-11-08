<template>
    <div id="landingPage">
        <section id="secHero">
            <div class="section-title-bar">
                최근 작성한 포스트
            </div>

            <div id="heroSliderContainer">
                <swiper-container id="heroSlider" v-bind="swiperParams">
                    <swiper-slide class="hero-slide" v-for="article in latestPosts" :key="article._id" :data-article-date="dateFormat(article.createdAt)">
                        <RouterLink :to="`posts/${ article._id }`">
                            <img class="latest-article-thumbnail" v-if="article.images.length > 0" :src="article.images[article.thumbIndex].imageURL" alt="포스트 미리보기 이미지">

                            <div class="latest-article-thumbnail no-image" v-else></div>

                            <div class="latest-article-text">
                                <p class="latest-article-title">{{ article.title }}</p>

                                <UserNameTag :user-id="article.author" />
                            </div>
                        </RouterLink>
                    </swiper-slide>
                </swiper-container> <!-- #heroSlider -->

                <div class="hero-slider-pagination"></div>
            </div> <!-- #heroSliderContainer -->
        </section> <!-- #secHero -->

        <section id="secLatestMovies">
            <div class="section-title-bar">
                최근 리뷰한 영화
            </div>

            <div id="filmItemList">
                <MovieItem v-for="(movie, index) in featuredMovies" :key="index" :movie-id="movie.movieID" :article-id="movie.articleID" />
            </div> <!-- 임시 영화 정보 아이템 컨테이너 -->
        </section> <!-- #secLatestMovies -->
    </div> <!-- #landingPage -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { useModal } from 'vue-final-modal';
    import { getTotalPosts } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';
    import CustomAlert from '../components/CustomAlert.vue';

    const postData = await getTotalPosts();
    const latestPosts = postData.slice(0, 5); // 가장 최근 글
    const featuredMovies = ref(postData.filter(item => !!item.movieID).map(item => { return { movieID: item.movieID, genres: item.movieGenres, articleID: item._id } }).slice(0, 12));
    const swiperParams = {
        effect: 'coverflow',
        direction: 'vertical',
        spaceBetween: 24,
        loop: true,
        autoplay: {
            speed: 250,
            delay: 6000
        },
        pagination: {
            enabled: true,
            type: 'bullets',
            el: '.hero-slider-pagination',
        }
    };

    const { open, close } = useModal({
        component: CustomAlert,
        attrs: {
            onConfirm(data) {
                console.log(data);

                close();
            }
        }
    });
</script> <!-- Logic Ends -->