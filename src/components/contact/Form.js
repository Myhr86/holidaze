import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(3),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(4),
  email: yup
    .string()
    .email()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  subject: yup.string().required("Please choose a subject"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters")
});

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function onSubmit(data) {
    console.log(data);
  }

  const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="">choose..</option>
        <option value="cocktails">cocktails</option>
        <option value="other">other</option>
      </select>
    </>
  ));

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name:
          <input name="firstName" ref={register} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>

        <label>
          Last Name:
          <input name="lastName" ref={register} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </label>

        <label>
          Email:
          <input name="email" ref={register} />
          {errors.email && <span>{errors.email.message}</span>}
        </label>

        <label>
          <Select
            label="Subject"
            name="subject"
            ref={register({ required: true })}
          />
          {errors.subject && <span>{errors.subject.message}</span>}
        </label>

        <label>
          Message:
          <input name="message" ref={register} />
          {errors.message && <span>{errors.message.message}</span>}
        </label>

        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}

export default ContactForm;
