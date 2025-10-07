import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { generateBlockchainHash, issueCertificate, Certificate } from '../utils/blockchain';
import CertificateCard from '../components/CertificateCard';
import { FileCheck, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

const IssueCertificate: React.FC = () => {
  const { user } = useAuth();
  const [learnerName, setLearnerName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [issuedCertificate, setIssuedCertificate] = useState<Certificate | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setShowSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const blockchainHash = await generateBlockchainHash(
        learnerName,
        courseName,
        instituteName,
        completionDate
      );

      const certificate = issueCertificate(
        learnerName,
        courseName,
        instituteName,
        completionDate,
        user.id,
        blockchainHash
      );

      setIssuedCertificate(certificate);
      setShowSuccess(true);

      setLearnerName('');
      setCourseName('');
      setInstituteName('');
      setCompletionDate('');
    } catch (error) {
      console.error('Error issuing certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-4">
            <FileCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Issue Certificate</h1>
          <p className="text-lg text-gray-600">Create a new blockchain-verified vocational certificate</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Certificate Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="learnerName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Learner Name
                </label>
                <input
                  id="learnerName"
                  type="text"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Rahul Kumar"
                  required
                />
              </div>

              <div>
                <label htmlFor="courseName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Name
                </label>
                <input
                  id="courseName"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Advanced Web Development"
                  required
                />
              </div>

              <div>
                <label htmlFor="instituteName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Institute Name
                </label>
                <input
                  id="instituteName"
                  type="text"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., National Skill Development Corporation"
                  required
                />
              </div>

              <div>
                <label htmlFor="completionDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Completion Date
                </label>
                <input
                  id="completionDate"
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating on Blockchain...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="h-5 w-5" />
                    <span>Issue Certificate</span>
                  </>
                )}
              </button>
            </form>

            {loading && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                  <div>
                    <p className="text-blue-900 font-semibold">Processing blockchain transaction...</p>
                    <p className="text-blue-700 text-sm">Generating cryptographic hash and storing on blockchain</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            {showSuccess && issuedCertificate && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-900 font-semibold text-lg">Certificate Issued Successfully!</p>
                    <p className="text-green-700 text-sm mt-1">
                      The certificate has been registered on the blockchain and is now tamper-proof and verifiable.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {issuedCertificate ? (
              <div className="animate-slide-up">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Issued Certificate</h3>
                <CertificateCard certificate={issuedCertificate} />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-md">
                    <FileCheck className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Preview Area</h3>
                  <p className="text-gray-600 max-w-sm">
                    Fill in the certificate details and click "Issue Certificate" to generate a blockchain-verified certificate
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCertificate;
