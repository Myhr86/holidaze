import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import useAxios from "../../hooks/useAxios";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  slug: yup.string("_").required("_")
});

export default function AddPost() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [, setSelectedFile] = useState();
  const [, setIsFilePicked] = useState(false);

  const history = useHistory();
  const http = useAxios();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const changeHandler = event => {
    setSelectedFile(event.target.files[0].name);
    setIsFilePicked(true);
  };


  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    console.log(data);

    try {
      var newData = data.title + "|" + data.subject + "|" + data.message;
      data = { content: newData, title: data.subject, status: "publish" };
      const response = await http.post("/wp/v2/pages", data);
      history.push("/admin");
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  const [hotels, setHotels] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  console.log(hotels);
  useEffect(function() {
    async function getHotels() {
      try {
        const response = await http.get("wp/v2/pages");
        setHotels(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a href="https://skjaerseth.net/wpress/wp-admin/post-new.php?post_type=page">Create a new Hotel</a>
  );
}
