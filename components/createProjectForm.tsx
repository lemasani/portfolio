// components/createProjectForm.tsx
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

type ProjectFormValues = {
  name: string;
  description: string;
  githubUrl: string;
  imageUrl: string;
  livePreviewUrl: string;
};

type CreateProjectFormProps = {
  onSubmit: (values: ProjectFormValues, formikHelpers: any) => void;
};

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onSubmit }) => {
  const initialValues: ProjectFormValues = {
    name: '',
    description: '',
    githubUrl: '',
    imageUrl: '',
    livePreviewUrl: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    githubUrl: Yup.string().url('Invalid URL').required('Required'),
    imageUrl: Yup.string().url('Invalid URL').required('Required'),
    livePreviewUrl: Yup.string().url('Invalid URL').required('Required'),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 w-[1/2]">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold">Name</label>
            <Field type="text" name="name" className="p-2 border rounded" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 font-semibold">Description</label>
            <Field type="text" name="description" className="p-2 border rounded" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="githubUrl" className="mb-1 font-semibold">GitHub URL</label>
            <Field type="text" name="githubUrl" className="p-2 border rounded" />
            <ErrorMessage name="githubUrl" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="mb-1 font-semibold">Image URL</label>
            <Field type="text" name="imageUrl" className="p-2 border rounded" />
            <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="livePreviewUrl" className="mb-1 font-semibold">Live Preview URL</label>
            <Field type="text" name="livePreviewUrl" className="p-2 border rounded" />
            <ErrorMessage name="livePreviewUrl" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default CreateProjectForm