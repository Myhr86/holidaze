import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function DeletePostButton({ id }) {
	const [error, setError] = useState(null);

	const http = useAxios();
	const history = useHistory();

	const url = `/wp/v2/posts/${id}`;

	async function handleDelete() {
		try {
			await http.delete(url);
			history.push("/admin");
		} catch (error) {
			setError(error);
		}
	}

	return (
		<button type="button" className="delete btn btn-primary" onClick={handleDelete}>
			{error ? "Error" : "Delete"}
		</button>
	);
}

DeletePostButton.propTypes = {
	id: PropTypes.number.isRequired,
};
