import React, { useState } from 'react';
import { verifyCertificate, Certificate } from '../utils/blockchain';
import CertificateCard from '../components/CertificateCard';
import { Search, Loader2, CheckCircle2, XCircle, Shield, AlertTriangle } from 'lucide-react';

const VerifyCertificate: React.FC = () => {
  const [hashOrId, setHashOrId] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCertificate(null);
    setVerified(null);
    setSearched(false);

    try {
      const result = await verifyCertificate(hashOrId);
      setCertificate(result);
      setVerified(result !== null);
      setSearched(true);
    } catch (error) {
      console.error('Error verifying certificate:', error);
      setVerified(false);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-4">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Verify Certificate</h1>
          <p className="text-lg text-gray-600">Instantly verify the authenticity of any certificate using blockchain</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="hashOrId" className="block text-sm font-semibold text-gray-700 mb-2">
                Certificate Hash or ID
              </label>
              <div className="relative">
                <input
                  id="hashOrId"
                  type="text"
                  value={hashOrId}
                  onChange={(e) => setHashOrId(e.target.value)}
                  className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                  placeholder="Enter blockchain hash or certificate ID"
                  required
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enter the complete blockchain hash or certificate ID to verify authenticity
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Verifying on Blockchain...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Verify Certificate</span>
                </>
              )}
            </button>
          </form>

          {loading && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6 animate-pulse">
              <div className="flex items-center space-x-3">
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                <div>
                  <p className="text-blue-900 font-semibold">Scanning blockchain network...</p>
                  <p className="text-blue-700 text-sm mt-1">Verifying certificate authenticity and integrity</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-700">Checking blockchain records...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
                  <span className="text-sm text-blue-700">Validating cryptographic signature...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-400"></div>
                  <span className="text-sm text-blue-700">Retrieving certificate data...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {searched && verified === true && certificate && (
          <div className="animate-slide-up">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-900 font-bold text-xl">Certificate Verified Successfully!</p>
                  <p className="text-green-700 mt-2">
                    This certificate is authentic and has been verified on the blockchain. The certificate details are shown below.
                  </p>
                </div>
              </div>
            </div>
            <CertificateCard certificate={certificate} />
          </div>
        )}

        {searched && verified === false && (
          <div className="animate-slide-up">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="flex items-start space-x-3 mb-6">
                <XCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900 font-bold text-xl">Certificate Not Found</p>
                  <p className="text-red-700 mt-2">
                    This certificate could not be verified on the blockchain. It may be invalid, fake, or the hash/ID entered is incorrect.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-red-100">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">What this means:</p>
                    <ul className="text-gray-700 space-y-1 text-sm list-disc list-inside">
                      <li>The certificate hash or ID does not exist in the blockchain</li>
                      <li>The certificate may be forged or tampered with</li>
                      <li>Double-check the hash/ID for any typing errors</li>
                      <li>Contact the issuing institution for verification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!searched && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-100">
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-white rounded-full p-6 inline-block mb-6 shadow-md">
                <Shield className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How Verification Works</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">
                    1
                  </div>
                  <p className="text-gray-700">
                    Enter the blockchain hash or certificate ID from the certificate you want to verify
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">
                    2
                  </div>
                  <p className="text-gray-700">
                    Our system searches the blockchain network to locate the certificate record
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">
                    3
                  </div>
                  <p className="text-gray-700">
                    If found, the complete certificate details are displayed with verification confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
