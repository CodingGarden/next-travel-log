'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLog, TravelLogProperty } from '@/models/TravelLog/TravelLog';

const travelLogInputs: Record<
  TravelLogProperty,
  {
    label?: string;
    type: 'text' | 'url' | 'textarea' | 'number' | 'date';
  }
> = {
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
  latitude: {
    type: 'number',
  },
  longitude: {
    type: 'number',
  },
  visitDate: {
    label: 'Visit Date',
    type: 'date',
  },
};

const now = new Date();
const padNum = (input: number) => input.toString().padStart(2, '0');
const nowString = `${now.getFullYear()}-${padNum(now.getMonth() + 1)}-${padNum(
  now.getDate()
)}`;

export default function TravelLogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
    defaultValues: {
      title: '',
      description: '',
      rating: 5,
      latitude: 90,
      longitude: 180,
      // @ts-ignore
      visitDate: nowString,
    },
  });
  const onSubmit: SubmitHandler<TravelLog> = async (data) => {
    const response = await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    // TODO: refresh list of travel logs
    // TODO: handle form submission errors
  };
  return (
    <form
      className="mx-auto max-w-md flex gap-4 flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      {Object.entries(travelLogInputs).map(([name, value]) => {
        const property = name as TravelLogProperty;
        return (
          <div key={name} className="form-control w-full">
            <label className="label">
              <span className="label-text">{name}</span>
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
      <button className="btn btn-success">Create</button>
    </form>
  );
}
