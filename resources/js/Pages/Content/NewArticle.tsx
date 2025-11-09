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
import { useState } from 'react';
import { useData } from '@/Services/useData.js';

export default function NewArticle({ auth }) {
  // Hooks always first
  const { data, setData, post, errors, recentlySuccessful } = useForm({
    title: '',
    content: '',
    category: '',
  });
  const [preview, setPreview] = useState(false);

  // Fetch categories
  const categories = useData('/api/categories');

  // Early return only affects rendering
  if (!categories.length) {
    return <p>Loading...</p>;
  }

  const mapCategories = categories.map(({ categoryId: value, categoryName: label }) => ({
    value: value.toString(),
    label,
  }));

  // Handle preview toggle
  function handleClickPreview(e: React.MouseEvent, isPreview: boolean) {
    e.preventDefault();
    setPreview(isPreview);
  }

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const key = e.target.id;
    const value = e.target.value;
    setData(prev => ({ ...prev, [key]: value }));
  }

  // Submit form
  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('article.create'));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">New Article</h2>}
      title="New Article"
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <form onSubmit={submit} className="space-y-6">

              {/* Title */}
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

              {/* Category */}
              <div>
                <InputLabel htmlFor="category" value="Category" />
                <SelectMenu
                  id="category"
                  items={mapCategories}
                  defaultValue="0"
                  selectedValue={data.category}
                  className="mt-1 block w-full"
                  onChange={handleChange}
                />
                <InputError className="mt-2" message={errors.category} />
              </div>

              {/* Content & Preview */}
              <div>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <ActionButton active={!preview} id="contentInput" onClick={e => handleClickPreview(e, false)}>Content</ActionButton>
                    <ActionButton active={preview} id="contentPreview" onClick={e => handleClickPreview(e, true)}>Preview</ActionButton>
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

                {!preview ? (
                  <TextArea
                    id="content"
                    className="mt-1"
                    value={data.content}
                    onChange={handleChange}
                    required
                    autoComplete="content"
                    rows={15}
                    cols={15}
                  />
                ) : (
                  <div className="pt-3 pb-3 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm">
                    <hr />
                    <CodeHighlighter
                      id="content-preview"
                      codeToHighlight={data.content}
                    />
                  </div>
                )}

                <InputError className="mt-2" message={errors.content} />
              </div>

            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
