import React from 'react';
import folderIcon from './assets/images/folder.svg';
import collapseIcon from './assets/images/collapse.svg';
import expandIcon from './assets/images/expand.svg';
import newfileIcon from './assets/images/newfile.svg';
import deleteIcon from './assets/images/delete.svg';
import editIcon from './assets/images/edit.svg';

export interface FileExplorer {
  id: string | number;
  label: string;
  files: Array<{ id: string | number; fileName: string }>;
  folder: Array<FileExplorer>;
}
interface AddProps {
  items: FileExplorer;
  onDelete: (id: string | number) => void;
  onEdit: (id: string | number) => void;
  addFolder: (id: string | number) => void;
  addFile: (id: string | number) => void;
}

const Add = ({ items, onDelete, onEdit, addFolder, addFile }: AddProps) => {
  const [expand, setExpand] = React.useState<boolean>(false);

  const handleDelete = (id: string | number) => {
    onDelete?.(id);
  };

  const handleEdit = (id: string | number) => {
    onEdit?.(id);
  };

  const handleFolder = (id: string | number) => {
    addFolder?.(id);
  };

  const handleFile = (id: string | number) => {
    addFile?.(id);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img
            src={expand ? expandIcon : collapseIcon}
            onClick={() => setExpand(!expand)}
            style={{ marginRight: '4px' }}
            width={'8px'}
          />
          <img src={folderIcon} style={{ marginRight: '4px' }} width={'14px'} />
          {items.label}
        </div>
        <div>
          <img
            src={folderIcon}
            style={{ marginRight: '4px' }}
            width={'14px'}
            onClick={() => handleFolder(items.id)}
          />
          <img
            src={newfileIcon}
            style={{ marginRight: '4px' }}
            width={'12px'}
            onClick={() => handleFile(items.id)}
          />
          <img
            src={deleteIcon}
            style={{ marginRight: '4px' }}
            width={'12px'}
            onClick={() => handleDelete(items.id)}
          />
          <img
            src={editIcon}
            style={{ marginRight: '4px' }}
            width={'12px'}
            onClick={() => handleEdit(items.id)}
          />
        </div>
      </div>
      {expand &&
        items.folder.map((f) => (
          <div style={{ marginLeft: '8px' }}>
            <div style={{ marginLeft: '8px' }}>{<Add items={f} />}</div>
          </div>
        ))}
      {expand &&
        items.files.map((file) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div key={file.id} style={{ marginLeft: '16px' }}>
              <img
                src={newfileIcon}
                style={{ marginRight: '4px' }}
                width={'12px'}
              />
              {file.fileName}
            </div>
            <div>
              <img
                src={deleteIcon}
                style={{ marginRight: '4px' }}
                width={'12px'}
                onClick={() => handleDelete(items.id)}
              />
              <img
                src={editIcon}
                style={{ marginRight: '4px' }}
                width={'12px'}
                onClick={() => handleEdit(items.id)}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default Add;
