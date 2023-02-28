'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import formatDate from 'date-fns/format';
import {
  TravelLogRequest,
  TravelLogProperty,
  TravelLogPropertyWithoutLocation,
} from '@/models/TravelLog/TravelLog';
import { useContext, useEffect, useState } from 'react';
import TravelLogContext from '@/TravelLogContext';
import { TravelLogActionType } from '@/types/TravelLogProviderTypes';

const travelLogInputs: Record<
  TravelLogPropertyWithoutLocation,
  {
    label?: string;
    type: 'text' | 'url' | 'textarea' | 'number' | 'date' | 'password';
  }
> = {
  apiKey: {
    label: 'API Key',
    type: 'password',
  },
  title: {
    type: 'text',
  },
  description: {
    type: 'textarea',
  },
  image: {
    type: 'url',
  },
  rating: {
    type: 'number',
  },
  visitDate: {
    label: 'Visit Date',
    type: 'date',
  },
};

const nowString = formatDate(new Date(), 'yyyy-MM-dd');

interface TravelLogFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function TravelLogForm({
  onCancel,
  onComplete,
}: TravelLogFormProps) {
  const [formError, setFormError] = useState('');
  const { state, dispatch } = useContext(TravelLogContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TravelLogRequest>({
    resolver: zodResolver(TravelLogRequest),
    defaultValues: {
      title: '',
      description: '',
      rating: 5,
      latitude: state.currentMarkerLocation?.lat,
      longitude: state.currentMarkerLocation?.lng,
      visitDate: nowString,
      apiKey: localStorage.getItem('apiKey') ?? '',
    },
  });
  useEffect(() => {
    setValue('latitude', state.currentMarkerLocation?.lat ?? 90);
    setValue('longitude', state.currentMarkerLocation?.lng ?? 180);
  }, [state.currentMarkerLocation, setValue]);
  const onSubmit: SubmitHandler<TravelLogRequest> = async (data) => {
    try {
      setFormError('');
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        localStorage.setItem('apiKey', data.apiKey);
        router.push('/');
        dispatch({
          type: TravelLogActionType.SET_CURRENT_MARKER_LOCATION,
          data: null,
        });
        reset();
        onComplete();
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      // TODO: cleanup zod error message
      setFormError(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => {
            dispatch({
              type: TravelLogActionType.SET_CURRENT_MARKER_LOCATION,
              data: null,
            });
            onCancel();
            reset();
          }}
          className="btn btn-secondary"
        >
          CANCEL
        </button>
      </div>
      <form
        className="mx-auto max-w-md flex gap-4 flex-col my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formError && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formError}</span>
            </div>
          </div>
        )}
        {Object.entries(travelLogInputs).map(([name, value]) => {
          const property = name as TravelLogProperty;
          return (
            <div key={name} className="form-control w-full">
              <label className="label">
                <span className="label-text capitalize">
                  {value.label || name}
                </span>
              </label>
              {value.type === 'textarea' ? (
                <textarea
                  className={`textarea textarea-bordered w-full ${
                    errors.description ? 'textarea-error' : ''
                  }`}
                  {...register(property)}
                />
              ) : (
                <input
                  type={value.type}
                  step="any"
                  className={`input input-bordered w-full ${
                    errors[property] ? 'input-error' : ''
                  }`}
                  {...register(property)}
                />
              )}
              {errors[property] && <span>{errors[property]?.message}</span>}
            </div>
          );
        })}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text capitalize">Latitude, Longitude</span>
          </label>
          <input
            value={[
              state.currentMarkerLocation?.lat.toFixed(6),
              state.currentMarkerLocation?.lng.toFixed(6),
            ].join(', ')}
            className="input input-bordered w-full disabled"
            disabled
          />
        </div>
        <button className="btn btn-success">Create</button>
      </form>
    </>
  );
}
