export function onError(error) {
    let message = error.toString();
    let serverMessage = error.response?.data;
    // Auth errors
    if (!(error instanceof Error) && error.message) {
        message = error.message;
    }
    alert(message+'\n'+serverMessage);
}