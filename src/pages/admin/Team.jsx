import React, { useState } from 'react';
import { Plus, UserCheck, Edit2, Trash2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function Team() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setPosition('');
    setDescription('');
    setModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditingId(member.id);
    setName(member.name);
    setPosition(member.position);
    setDescription(member.description || '');
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      updateTeamMember(editingId, { name, position, description });
    } else {
      addTeamMember({ name, position, description });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Team Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Manage executive leadership, branch managers, and operational officers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004085] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* TEAM CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4 hover:shadow-md transition-all"
          >
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-[#0B1528] text-white font-black text-2xl flex items-center justify-center shrink-0">
                {member.name.charAt(0)}
              </div>
            )}

            <div className="space-y-2 flex-1 w-full">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-slate-900">{member.name}</h3>
                  <p className="text-xs font-bold text-blue-700">{member.position}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(member)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-slate-100 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTeamMember(member.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{member.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-8 w-[calc(100%-24px)] max-w-lg max-h-[85vh] overflow-y-auto space-y-5 animate-fade-in text-left">
            <h3 className="text-lg font-black text-slate-900">
              {editingId ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pradeep Kumar Jena"
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Position / Role</label>
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Chief Operations Officer (COO)"
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Bio / Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short professional overview..."
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#004085] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;
