'use client';

import { useForm } from 'react-hook-form';
import { useFlagStore, FeatureFlag } from '@/lib/store/useFlagStore';
import { useEffect } from 'react';

type FormData = {
  name: string;
  description: string;
};

const FlagForm = () => {
    const { addFlag, updateFlag, editingFlag, closeModal } = useFlagStore();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const isEditing = !!editingFlag;

    useEffect(() => {
        if (isEditing && editingFlag) {
            reset({ name: editingFlag.name, description: editingFlag.description });
        } else {
            reset({ name: '', description: '' });
        }
    }, [isEditing, editingFlag, reset]);

    const onSubmit = (data: FormData) => {
        if (isEditing && editingFlag) {
            updateFlag({ ...editingFlag, ...data });
        } else {
            addFlag({
                ...data,
                environments: {
                    development: { enabled: false },
                    staging: { enabled: false },
                    production: { enabled: false },
                },
            });
        }
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} automation-id="flag-form">
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        automation-id="form-input-name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        rows={3}
                        {...register('description', { required: 'Description is required' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        automation-id="form-input-description"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 -mx-6 -mb-4 mt-6">
                <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    automation-id="modal-save-button"
                >
                    {isEditing ? 'Save Changes' : 'Create Flag'}
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                    automation-id="modal-cancel-button"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default FlagForm;
