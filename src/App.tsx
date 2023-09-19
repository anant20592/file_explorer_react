import { FC } from 'react';
import { render } from 'react-dom';

import './style.css';

const obj11 = {
  id: 1,
  label: 'File',
  folder: [
    {
      id: 2,
      label: 'Folder 2',
      folder: [
        {
          id: 3,
          label: 'Folder 3',
          folder: [
            {
              id: 4,
              label: 'Folder 4',
              folder: [],
              files: [
                { id: 'file5', label: 'File 5' },
                { id: 'file6', label: 'File 6' },
              ],
            },
          ],
          files: [{ id: 'file4', label: 'File 4' }],
        },
      ],
      files: [{ id: 'file3', label: 'File 3' }],
    },
  ],
  files: [
    { id: 'file1', label: 'File 1' },
    { id: 'file2', label: 'File 2' },
  ],
};

const renderTree = (obj: any) => {
  return (
    <>
      {obj.folder.map((f) => (
        <>
          <div key={f.id}>
            <span>{'>'}</span>
            {f.label}
          </div>
          <div style={{ marginLeft: '8px' }}>
            {f.folder.length > 0 && renderTree(f)}
          </div>
        </>
      ))}
      {obj.files.map((file) => (
        <div key={file.id} style={{ marginLeft: '16px' }}>
          {file.label}
        </div>
      ))}
    </>
  );
};

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <h1>File Explorer</h1>
      {renderTree(obj11)}
    </div>
  );
};
