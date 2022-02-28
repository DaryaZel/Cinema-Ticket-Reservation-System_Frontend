export async function handleResponse(response, onError, onSuccess) {
    if (response.status >= 500 && response.status < 600) {
        throw new Error("Oops, something went wrong");
    }
    else if (response.status >= 400 && response.status < 500) {
        const error = await response.json()
        onError(error)
    }
    else {
        const result = await response.json()
        onSuccess(result)
    }
}
