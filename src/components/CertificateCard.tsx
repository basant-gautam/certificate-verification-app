import React from 'react';
import { Certificate } from '../utils/blockchain';
import { Award, Calendar, GraduationCap, Building2, Hash, CheckCircle2 } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 overflow-hidden group">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{certificate.courseName}</h3>
              <p className="text-blue-100 text-sm">{certificate.instituteName}</p>
            </div>
          </div>
          <div className="bg-green-400/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
            <CheckCircle2 className="h-4 w-4 text-green-300" />
            <span className="text-green-100 text-xs font-medium">Verified</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">Learner Name</p>
            <p className="text-gray-900 font-semibold">{certificate.learnerName}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">Institute</p>
            <p className="text-gray-900 font-semibold">{certificate.instituteName}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">Completion Date</p>
            <p className="text-gray-900 font-semibold">
              {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <Hash className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-1">Blockchain Hash</p>
              <p className="text-gray-900 font-mono text-xs break-all leading-relaxed">
                {certificate.blockchainHash}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Certificate ID: {certificate.id.slice(0, 8)}...
          </span>
          <div className="flex items-center space-x-1 text-xs text-green-600 font-medium">
            <CheckCircle2 className="h-4 w-4" />
            <span>Stored on Blockchain</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
