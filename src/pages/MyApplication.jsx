import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  PlusCircle,
  User,
  Shield,
  CreditCard,
  Printer
} from 'lucide-react';
import { getUserApplications, getCurrentUser } from '../utils/storage';
import { StatusBadge } from '../components/admin/StatusBadge';
import { SubmissionSuccess } from '../components/registration/SubmissionSuccess';

export function MyApplication() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userApps, setUserApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setUserApps(getUserApplications());
    }
  }, []);

  // Poll or refresh on window focus to ensure cross-tab synchronization
  useEffect(() => {
    const handleFocus = () => {
      if (currentUser) {
        setUserApps(getUserApplications());
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 px-4 text-center space-y-4 select-none">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl space-y-4 max-w-md mx-auto">
          <User className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-extrabold text-slate-900">Sign In Required</h2>
          <p className="text-xs text-slate-500">Please sign in to your user account to view your statutory applications.</p>
          <div className="pt-2 flex gap-3 justify-center">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-[#004085] hover:bg-blue-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
            >
              New Registration
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (selectedApp) {
    return (
      <div className="space-y-4 py-4">
        <div className="max-w-[1020px] mx-auto px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSelectedApp(null)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer border border-slate-200"
          >
            ← Back to My Applications
          </button>
        </div>

        <SubmissionSuccess
          referenceNo={selectedApp.refId || selectedApp.id}
          formData={selectedApp}
          onReset={() => setSelectedApp(null)}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 px-4 font-sans select-none space-y-6 text-left animate-fade-in">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Membership Dossier</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Track real-time statutory approval status, payment clearance, and member details for <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.email}).
          </p>
        </div>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C853] hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span>New Application</span>
        </Link>
      </div>

      {/* APPLICATIONS TABLE / LIST */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-blue-700" />
            <span>SUBMITTED STATUTORY APPLICATIONS ({userApps.length})</span>
          </div>
        </div>

        {userApps.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200/90 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">APPLICATION ID</th>
                  <th className="py-3.5 px-5">APPLICANT NAME</th>
                  <th className="py-3.5 px-5">SUBMISSION DATE</th>
                  <th className="py-3.5 px-5">PAYMENT AMOUNT</th>
                  <th className="py-3.5 px-5">APPLICATION STATUS</th>
                  <th className="py-3.5 px-5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {userApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-mono font-extrabold text-blue-700">{app.id}</td>
                    <td className="py-4 px-5 font-bold text-slate-900">{app.applicantName}</td>
                    <td className="py-4 px-5 text-slate-500">{app.date}</td>
                    <td className="py-4 px-5 font-black text-slate-900 font-mono">₹{app.totalPaid || 200}.00</td>
                    <td className="py-4 px-5">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Application</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-800">No applications submitted yet.</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You have not submitted any statutory membership applications yet. Click below to start your application.
            </p>
            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#004085] hover:bg-blue-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
              >
                <span>Start 9-Step Application</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplication;
