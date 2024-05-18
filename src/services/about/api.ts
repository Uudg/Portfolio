import axios from "axios";

const get_info = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}about/info`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}

const get_social = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}about/socials`)
    .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}

export {
    get_info,
    get_social,
}