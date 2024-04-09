console.log(process.env)

//const { url } = process.env;

const url = "http://localhost:8080"

export const postImageRequest = async (formData: FormData) => {
    return fetch(`${url}/api/image`, {
        method: "POST",
        body: formData,

    });
}

export const getImageIdsRequest = async (tags: number[]) => {
    return fetch(`${url}/api/images?tags=${tags.join(",")}`)
}

export const getImageRequest = async (imageId: number) => {
    return fetch(`${url}/api/image?imageId=${imageId}`)
}

export const getTagsRequest = async () => {
    return fetch(`${url}/api/tags`)
}