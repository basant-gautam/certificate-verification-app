import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserCertificates, Certificate } from '../utils/blockchain';
import CertificateCard from '../components/CertificateCard';
import { List, Search, Filter, FileX } from 'lucide-react';

const ViewCertificates: React.FC = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      const userCerts = getUserCertificates(user.id);
      setCertificates(userCerts);
      setFilteredCertificates(userCerts);
    }
  }, [user]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCertificates(certificates);
    } else {
      const filtered = certificates.filter((cert) =>
        cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.instituteName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCertificates(filtered);
    }
  }, [searchTerm, certificates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-4">
            <List className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-lg text-gray-600">View and manage all your issued certificates</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-900 font-semibold">Total Certificates</p>
                <p className="text-gray-600 text-sm">{certificates.length} issued</p>
              </div>
            </div>

            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Search by course, learner, or institute..."
              />
            </div>
          </div>

          {searchTerm && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredCertificates.length} of {certificates.length} certificates
            </div>
          )}
        </div>

        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {filteredCertificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-100">
            <div className="text-center max-w-md mx-auto">
              <div className="bg-white rounded-full p-6 inline-block mb-6 shadow-md">
                <FileX className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Certificates Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't issued any certificates yet. Start by creating your first blockchain-verified certificate.
              </p>
              <a
                href="/issue"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span>Issue Your First Certificate</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-12 border border-amber-100">
            <div className="text-center max-w-md mx-auto">
              <div className="bg-white rounded-full p-6 inline-block mb-6 shadow-md">
                <Search className="h-16 w-16 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">
                No certificates match your search term "{searchTerm}". Try a different search query.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCertificates;
