import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";

const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
});

export default function AddPost() {
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);

	const history = useHistory();
	const http = useAxios();

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);

		data.status = "publish";

		console.log(data);

		try {
			const response = await http.post("/wp/v2/posts", data);
			console.log("response", response.data);
			history.push("/admin");
		} catch (error) {
			console.log("error", error);
			setServerError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<Heading content="Add post" />
			<form onSubmit={handleSubmit(onSubmit)}>
				{serverError && <FormError>{serverError}</FormError>}
				<fieldset disabled={submitting}>
					<div>
						<input name="title" placeholder="Title" ref={register} />
						{errors.title && <FormError>{errors.title.message}</FormError>}
					</div>

					<div>
						<textarea name="content" placeholder="Content" ref={register} />
					</div>

					<button className="btn btn-primary">{submitting ? "Submitting..." : "Submit"}</button>
				</fieldset>
			</form>
		</>
	);
}
