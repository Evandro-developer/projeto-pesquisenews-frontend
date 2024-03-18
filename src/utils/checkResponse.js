export async function checkResponse(res) {
  if (!res.ok) {
    let errorMessage = `Error: ${res.statusText}`;

    try {
      const errorData = await res.json();
      if (errorData && errorData.message) {
        errorMessage += ` - ${errorData.message}`;
      }
    } catch (err) {
      console.error("Error while analyzing error response:", err);
    }

    throw new Error(errorMessage);
  }
  return res.json();
}
