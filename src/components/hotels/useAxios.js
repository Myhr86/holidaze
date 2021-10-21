import axios from "axios";

const url = "http://skjaerseth.net/wpress/wp-json/";

export default function useAxios() {
	const apiClient = axios.create({
		baseURL: url,
	});

	return apiClient;
}
