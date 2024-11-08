<template>
    <HeadPrimary />

    <div id="mainContainer" class="inner-wrapper">
        <Sidebar v-show="blogSettings.state.showSideBar" />

        <main id="contentView">
            <slot></slot>
        </main> <!-- #contentView -->
    </div> <!-- #mainContainer -->

    <FootPrimary />

    <SpinLoader :isLoading="isLoading.state" />
    <FloatingButton />
    <ModalsContainer />
    <ImageViewer />
</template> <!-- Template Ends -->

<script setup>
    import { ModalsContainer } from 'vue-final-modal';
    import { useLoaderStore } from '../stores/isLoading';
    import { useBlogSettingStore } from '../stores/blogSettings';
    import HeadPrimary from './HeadPrimary.vue';
    import FootPrimary from './FootPrimary.vue';
    import Sidebar from './Sidebar.vue';
    import SpinLoader from '../components/commons/SpinLoader.vue';
    import FloatingButton from './FloatingButton.vue';

    const isLoading = useLoaderStore();
    const blogSettings = useBlogSettingStore();
</script> <!-- Logic Ends -->