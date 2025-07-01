export const errorMessage = (messsage: string) => {
    return Promise.reject(new Error(messsage));
};
