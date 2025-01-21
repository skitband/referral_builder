import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2, UserCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabase';
import { ReferralFormData } from '../lib/schema';
import { useState } from 'react';
import { Modal } from './Modal';
import { ReferralForm } from './ReferralForm';

interface Referral extends ReferralFormData {
  id: string;
  created_at: string;
}

export function ReferralList() {
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const queryClient = useQueryClient();

  const { data: referrals, isLoading } = useQuery({
    queryKey: ['referrals', searchTerm, page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false })
        .ilike('given_name', `%${searchTerm}%`)
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) throw error;
      return data as Referral[];
    },
  });

  const { data: totalReferrals } = useQuery({
    queryKey: ['referralsCount', searchTerm],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .ilike('given_name', `%${searchTerm}%`);

      if (error) throw error;
      return count || 0;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data: referral } = await supabase
        .from('referrals')
        .select('avatar_url')
        .eq('id', id)
        .single();

      if (referral?.avatar_url) {
        const fileName = referral.avatar_url.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('avatars')
            .remove([`avatars/${fileName}`]);
        }
      }

      const { error } = await supabase
        .from('referrals')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast.success('Referral deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete referral: ' + error.message);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this referral?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  const totalPages = Math.ceil((totalReferrals || 0) / itemsPerPage);

  return (
    <>
      <div className="p-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search ..."
          className="w-full p-2 border rounded mb-4"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">AVATAR</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">GIVEN NAME</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">SURNAME</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">EMAIL</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">PHONE</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {referrals?.map((referral) => (
              <tr key={referral.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {referral.avatar_url ? (
                    <img
                      src={referral.avatar_url}
                      alt={`${referral.given_name}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-10 h-10 text-gray-400" />
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{referral.given_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{referral.surname}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{referral.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{referral.phone}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button 
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setEditingReferral(referral)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(referral.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={!!editingReferral}
        onClose={() => setEditingReferral(null)}
        title="Edit Referral"
      >
        <ReferralForm
          editingReferral={editingReferral}
          onCancelEdit={() => setEditingReferral(null)}
        />
      </Modal>
    </>
  );
}