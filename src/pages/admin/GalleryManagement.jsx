import React, { useState } from 'react';
import { Plus, Image as ImageIcon, Edit2, Trash2, Tag } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function GalleryManagement() {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdmin();
  const [filterCat, setFilterCat] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Team');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const filtered = galleryItems.filter(
    (g) => filterCat === 'All' || g.category.toLowerCase() === filterCat.toLowerCase()
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Team');
    setImageUrl('');
    setDescription('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setDescription(item.description || '');
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      updateGalleryItem(editingId, { title, category, imageUrl, description });
    } else {
      addGalleryItem({ title, category, imageUrl, description });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Gallery Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Manage corporate team photographs, branch events, and community initiatives.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004085] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Image</span>
        </button>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-1.5">
        {['All', 'Team', 'Office', 'Events', 'Community'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCat(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterCat === cat
                ? 'bg-[#004085] text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#0B1528]/80 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2">{item.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
                <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-slate-100 transition-colors"
                    title="Edit Caption"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteGalleryItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-8 w-[calc(100%-24px)] max-w-lg max-h-[85vh] overflow-y-auto space-y-5 animate-fade-in text-left">
            <h3 className="text-lg font-black text-slate-900">
              {editingId ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Title / Caption</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Executive Board Meeting 2026"
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  <option value="Team">Team</option>
                  <option value="Office">Office</option>
                  <option value="Events">Events</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short details..."
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryManagement;
