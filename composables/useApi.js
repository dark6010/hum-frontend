export const useApi = () => {
    const store = useGlobalStore();
    
    const fetchData = async (url, options = {}) => {
      try {
        store.setLoading(true);
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('API Error:', error);
        store.setError(error.message || 'Error al cargar los datos');
        throw error;
      } finally {
        store.setLoading(false);
      }
    };
    
    return {
      fetchData
    };
  };