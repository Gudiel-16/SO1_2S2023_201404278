import { Form, Formik } from "formik";
import { createRequest } from '../api/biblioteca.api';
import { useNavigate } from 'react-router-dom';

function BIbliotecaFormPage() {

    const navigate = useNavigate();

    return (
      <div>
        <Formik 
            initialValues={{
                title: "",
                artist: "",
                year: "",
                genre: ""
            }}
            onSubmit={ async (values, actions) => {
                try {
                    const response = await createRequest(values);
                    console.log(response);
                    actions.resetForm();
                    navigate("/");
                } catch (error) {
                    console.log(error)
                }                
            }}
        >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
                <label className="block">Title</label>
                <input type="text" name='title' className="px-2 py-1 rounded-sm w-full" onChange={handleChange} value={values.title} />

                <label className="block">Artist</label>
                <input type="text" name='artist' className="px-2 py-1 rounded-sm w-full" onChange={handleChange} value={values.artist}  />

                <label className="block">Year</label>
                <input type="text" name='year' className="px-2 py-1 rounded-sm w-full" onChange={handleChange} value={values.year}  />

                <label className="block">Genre</label>
                <input type="text" name='genre' className="px-2 py-1 rounded-sm w-full" onChange={handleChange} value={values.genre}  />

                <button type="submit" disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-2">
                    { isSubmitting ? "Saving..." : "Save" }
                </button>
            </Form>
        )}
        </Formik>

      </div>
    )
  }
  
  export default BIbliotecaFormPage
