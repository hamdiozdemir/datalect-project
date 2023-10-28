// Reusable function to handle PUT requests
export const putRequest = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('PUT request failed');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };
  
  // Reusable function to handle PATCH requests
export const patchRequest = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('PATCH request failed');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error in PATCH request:', error);
      throw error;
    }
  };
  
  // Reusable function to handle DELETE requests
export const deleteRequest = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('DELETE request failed');
      }
  
      // If successful, you might not have a response body to return
    } catch (error) {
      console.error('Error in DELETE request:', error);
      throw error;
    }
  };
  
  // Example usage:
  const putUrl = 'https://example.com/api/resource/1';
  const putData = { key: 'new value' };
  
  putRequest(putUrl, putData)
    .then(result => {
      console.log('PUT success:', result);
    })
    .catch(error => {
      console.error('PUT error:', error);
    });
  