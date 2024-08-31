import React from 'react';
import { FaFileAlt, FaFilePdf, FaFileImage } from 'react-icons/fa';
import { Popup } from '../Common/Popup/main';

type Document = {
  type: string;
  name: string;
  url: string;
};

interface DocumentPopupProps {
  documents?: Document[];
  setDocumentPopup: (value: boolean) => void;
}

const getIcon = (url: string) => {
  if (url.endsWith('.pdf')) return <FaFilePdf className="w-12 h-12 text-red-500 mr-2" />;
  if (url.endsWith('.jpg') || url.endsWith('.png')) return <FaFileImage className="w-12 h-12 text-green-500 mr-2" />;
  return <FaFileAlt className="w-12 h-12 text-primary mr-2" />;
};

const DocumentPopup: React.FC<DocumentPopupProps> = ({ documents, setDocumentPopup }) => {
  return (
    <Popup closeButton={true} onClose={() => setDocumentPopup(false)}>
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Documents</h2>
        {documents?.map((document) => (
          <a
            key={document.name}
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mb-2 p-2 bg-gray-100 rounded hover:bg-hoverLight transition duration-200 ease-in-out"
          >
            <div className="flex items-center justify-center h-24 w-24 bg-gray-100 mr-2">
              {document.type.startsWith("image/") ? (
                <img src={document.url} alt={document.name} className="object-cover h-full w-full" />
              ) : (
                getIcon(document.url)
              )}
            </div>
            <span className="text-black hover:text-primary">{document.name}</span>
          </a>
        ))}
      </div>
    </Popup>
  );
};

export default DocumentPopup;
