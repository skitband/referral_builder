import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ReferralFormData, referralSchema } from '../lib/schema';
import { useEffect } from 'react';

interface ReferralFormProps {
  editingReferral?: ReferralFormData & { id: string } | null;
  onCancelEdit?: () => void;
}

export function ReferralForm({ editingReferral, onCancelEdit }: ReferralFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editingReferral) {
      Object.entries(editingReferral).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'created_at') {
          setValue(key as keyof ReferralFormData, value);
        }
      });
    }
  }, [editingReferral, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: ReferralFormData) => {
      if (editingReferral) {
        const { error } = await supabase
          .from('referrals')
          .update(data)
          .eq('id', editingReferral.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('referrals').insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast.success(editingReferral ? 'Referral updated successfully!' : 'Referral created successfully!');
      reset();
      if (onCancelEdit) onCancelEdit();
    },
    onError: (error) => {
      toast.error(`Failed to ${editingReferral ? 'update' : 'create'} referral: ` + error.message);
    },
  });

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (editingReferral?.avatar_url) {
        const oldFileName = editingReferral.avatar_url.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('avatars')
            .remove([`avatars/${oldFileName}`]);
        }
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setValue('avatar_url', publicUrl);
      toast.success('Avatar uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload avatar: ' + (error as Error).message);
    }
  };

  const onSubmit = (data: ReferralFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">PERSONAL DETAILS</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('given_name')}
              placeholder="GIVEN NAME"
              className="w-full p-2 border rounded"
            />
            {errors.given_name && (
              <p className="text-red-500 text-sm">{errors.given_name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('surname')}
              placeholder="SURNAME"
              className="w-full p-2 border rounded"
            />
            {errors.surname && (
              <p className="text-red-500 text-sm">{errors.surname.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('email')}
              placeholder="EMAIL"
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('phone')}
              placeholder="PHONE"
              className="w-full p-2 border rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">ADDRESS</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register('home_no')}
            placeholder="HOME NAME OR #"
            className="w-full p-2 border rounded"
          />
          <input
            {...register('street')}
            placeholder="STREET"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register('suburb')}
            placeholder="SUBURB"
            className="w-full p-2 border rounded"
          />
          <input
            {...register('state')}
            placeholder="STATE"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register('postcode')}
            placeholder="POSTCODE"
            className="w-full p-2 border rounded"
          />
          <div>
            <input
              {...register('country')}
              placeholder="COUNTRY"
              className="w-full p-2 border rounded"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 px-6 py-2 border rounded text-gray-600 hover:bg-gray-50 cursor-pointer">
          <Upload size={20} />
          UPLOAD AVATAR
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </label>
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {editingReferral ? 'UPDATE REFERRAL' : 'CREATE REFERRAL'}
        </button>
        {editingReferral && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            CANCEL
          </button>
        )}
      </div>
    </form>
  );
}