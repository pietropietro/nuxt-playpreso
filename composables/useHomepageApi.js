import { watch } from 'vue';
export default function useHomepageApi(store, key, apiCall) {
    // Function to handle the API call with loading state management.
    const fetchData = async () => {
        store.commit('homepageApi/setLoadingKey', { key, isLoading: true });
        try {
            await apiCall();
        } finally {
            store.commit('homepageApi/setLoadingKey', { key, isLoading: false });
        }
    };

    // Watch for changes in the specific loading key.
    watch(() => store.state.homepageApi.loadingDict[key],
        async (isLoading) => {
            if (isLoading) {
                await fetchData();
            }
        }
    );

    return {
        fetchData,
    };
}
