import { useState } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

export default function Uploader() {
  const LibraryId = '89898172-d32bxxsdfasfsfsl';
  const ClientId = '92f9d000-5051-4339xxssss';
  const ApiKey = 'pEBPYVUNMbP7uDsb0W2h3oTjpEqrxxx';

  // AUTH HEADERS
  const headers = {
    'X-Auth-ClientId': ClientId,
    'X-Auth-LibraryId': LibraryId,
    'X-Auth-ApiKey': ApiKey,
  };

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true,
      debug: false,
      allowMultipleUploads: false,
      allowMultipleUploadBatches: true,
      proudlyDisplayPoweredByUppy: false,
    }).use(AwsS3, {
      shouldUseMultipart: true,
      companionUrl: 'https://apistream.gotipath.com/v1/uploads/',
      companionHeaders: {
        'uppy-auth-token': JSON.stringify(headers),
      },
    })
  );

  uppy.on('before-request', (request) => {
    console.log('request', request);
  });

  uppy.on('file-added', (file) => {
    uppy.setFileMeta(file.id, {
      video_id: '8b4d2ae2-63ec-4830-b506-19be1ee2d2c3',
      library_id: LibraryId,
      collection_id: '',
    });
  });

  return <Dashboard uppy={uppy} />;
}
