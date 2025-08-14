import { Formik, Form, Field } from "formik";

function BookForm() {
  return (
    <Formik>
      <Form>
        <Field name="name">
          <label htmlFor=""></label>
        </Field>
      </Form>
      <Form>
        <Field name="email">
          <label htmlFor=""></label>
        </Field>
      </Form>
      <Form>
        <Field name="date">
          <label htmlFor=""></label>
        </Field>
      </Form>
      <Form>
        <Field name="comment">
          <label htmlFor=""></label>
        </Field>
      </Form>
    </Formik>
  );
}

export default BookForm;
