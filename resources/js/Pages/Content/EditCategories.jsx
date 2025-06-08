import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { useData } from '@/Services/useData.js';

import { router } from '@inertiajs/react'

export default function Edit({ auth }) {

  const defaultNewId = 'newCategory';
  const [data, setData] = useState({});
  const [addCat, setAddCat] = useState(false);
  const [actionAdd, setActionAdd] = useState(false);
  const categories = useData('/api/categories');

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setData(data => ({
      ...data,
      [key]: value,
    }))
  }

  function handleChangeNewCat(e) {
    if (e.target.value) {
      setActionAdd(true);
    } else {
      setActionAdd(false);
    }
    handleChange(e);
  }

  function handleClickUpdate(e, selectedId) {
    e.preventDefault();
    if (data && data[selectedId]) {
      router.patch('/content/category/' + selectedId, {
        categoryId: selectedId,
        categoryName: data[selectedId]
      })
    }
  }

  function handleClickAdd(e) {
    e.preventDefault();
    if (data && data[defaultNewId]) {
      router.post('/content/category',
        {categoryName: data[defaultNewId]},
        { preserveState: false }
      )
    }
  }

  function handleClickDelete(e, selectedId) {
    e.preventDefault();
    if (selectedId) {
      router.post('/content/category/delete',
        {categoryId: selectedId},
        { preserveState: false}
      )
    }
  }

  function handleClickToggle() {
    const toggle = ! addCat;
    setAddCat(toggle);
    if (! addCat) {
      setActionAdd(false);
    }
  }

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categories update</h2>}
    title="Categories update"
    >

    <div className="py-8 lg:px-20 lg:pe-20  lg:mx-auto">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
    <div className="p-4 sm:p-8 min-w-full bg-white dark:bg-gray-800 shadow sm:rounded-lg">
    <form className="space-y-6">

      <ul>
        {categories.map(c => (
          <li key={c.categoryId}>
            <div className="row flex items-center gap-2">
              <div className="w-12">{c.categoryId}</div>
              <div className="grow">
                <TextInput
                id={c.categoryId}
                type="text"
                defaultValue={c.categoryName}
                onChange={handleChange}
                className="mt-1 block w-full"
                />
              </div>
              <div>
                <PrimaryButton
                className="w-24"
                onClick={(event)=> {
                  handleClickUpdate(event, c.categoryId)
                }}
              >Update</PrimaryButton>
              </div>
              <div>
                <DangerButton
                  onClick={(event)=> {
                    handleClickDelete(event, c.categoryId)
                  }}
                >delete</DangerButton>
              </div>
            </div>
          </li>
        ))}

        <li>
            <div className="row flex items-center gap-2 max-w-full">
              <div className='w-12 text-xl cursor-pointer' onClick={handleClickToggle}>
              +
              </div>
              {addCat ?
              <>
                <div className="grow">
                  <TextInput
                  id={defaultNewId}
                  type="text"
                  className="mt-1 block w-full"
                  onChange={(event)=>handleChangeNewCat(event)}
                  />
                </div>
                <div>
                <PrimaryButton
                  disabled={actionAdd?'':'disabled'}
                  className='w-24'
                  onClick={(event)=> handleClickAdd(event)}
                ><span className='pl-4'></span>Add</PrimaryButton>
                </div>
              </>
              :
              <div className='h-12'></div>
              }
            </div>
          </li>

      </ul>

    </form>

    </div>
    </div>
    </div>
    </AuthenticatedLayout>
  );
}
