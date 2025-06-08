import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ActionButton from '@/Components/ActionButton';
import TextArea from '@/Components/TextArea';
import SelectMenu from '@/Components/SelectMenu';
import CodeHighlighter from '@/Components/CodeHighlight';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState,useEffect } from 'react';
import { useData } from '@/Services/useData.js';

export default function Edit({ auth}) {

  const categories = useData(`/api/categories`);

  const mapCategories = categories.map(({ categoryId: value, categoryName: label }) => ({
      value,
      label,
    }));

  const { data, setData, post, errors, recentlySuccessful } = useForm({});

  const [preview, setPreview] = useState('');

  function handleClickPreview(e, isPreview) {
    e.preventDefault();
    if (isPreview && !preview) {
      setPreview('true');
    } else if (! isPreview && preview) {
      setPreview('');
    }
  }

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setData(data => ({
      ...data,
      [key]: value,
    }))
  }

  const submit = (e) => {
    e.preventDefault()
    post(route('article.create'));
  }

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">New article</h2>}
    title="New article"
    >
    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
    <form onSubmit={submit} className=" space-y-6">

      <div>
        <InputLabel htmlFor="title" value="Title" />
        <TextInput
        id="title"
        type="text"
        className="mt-1 block w-full"
        onChange={handleChange}
        isFocused
        autoComplete="title"
        />
        <InputError className="mt-2" message={errors.title} />
      </div>

      <div>
        <InputLabel htmlFor="category" value="Category" />
        <SelectMenu
          id="category"
          items={mapCategories}
          defaultValue='0'
          selectedValue={data && data.category}
          className="mt-1 block w-full"
          onChange={handleChange}
        />
        <InputError className="mt-2" message={errors.category} />
      </div>

      <div>
        <div className="flex justify-between">
          <div className="row flex">
            <div>
              <ActionButton
                active={!preview && 'true'}
                id="contentInput"
                onClick={(event)=> handleClickPreview(event, false)}
              >Content</ActionButton>
            </div>
            <div>
              <ActionButton
                active={preview && 'true'}
                id="contentPreview"
                onClick={(event)=> handleClickPreview(event, true)}
              >Preview</ActionButton>
            </div>
          </div>
          <div>
            <PrimaryButton>Save</PrimaryButton>
            <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
            >
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
            </Transition>
          </div>
        </div>

        {!preview && (
          <TextArea
          id="content"
          className="mt-1"
          defaultValue={data && data.content}
          onChange={handleChange}
          required
          autoComplete="content"
          rows="15"
          cols="15"
          />
        )}

        <InputError className="mt-2" message={errors.content} />

        {preview && (
          <div className="pt-3 pb-3 block w-full border-gray-300 dark:border-gray-700  rounded-md shadow-sm " >
            <hr></hr>
            <CodeHighlighter
              id="content-preview"
              codeToHighlight={data && data.content}
            />
          </div>
        )}
      </div>

    </form>
    </div>
    </div>
    </div>
    </AuthenticatedLayout>
  );
}
