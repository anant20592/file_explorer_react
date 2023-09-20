import React from 'react';
import folderIcon from './assets/images/folder.svg';
import collapseIcon from './assets/images/collapse.svg';
import expandIcon from './assets/images/expand.svg';
import newfileIcon from './assets/images/newfile.svg';
import deleteIcon from './assets/images/delete.svg';
import editIcon from './assets/images/edit.svg';

export interface FileExplorer {
  id: string;
  label: string;
  files: Array<{ id: string | number; fileName: string }>;
  folder: Array<FileExplorer>;
}
interface AddProps {
  items: FileExplorer;
  onDelete?: (id: string, action: string) => void;
  onEdit?: (id: string) => void;
  addFolder?: (id: string, folderName: string) => void;
  addFile?: (id: string) => void;
}

const Add = ({ items, onDelete, onEdit, addFolder, addFile }: AddProps) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const [folderName, setFolderName] = React.useState<string>('');

  const handleDelete = (id: string, action: string) => {
    onDelete?.(id, action);
  };

  const handleEdit = (id: string) => {
    onEdit?.(id);
  };

  const handleFolder = (id: string) => {
    console.log('fgfgf- ', id);
    addFolder?.(id, folderName);
    setExpand(false);
  };

  const handleFile = (id: string) => {
    addFile?.(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        key={items.id}
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
            onClick={() => setExpand(true)}
          />
          {/* <img
            src={newfileIcon}
            style={{ marginRight: '4px' }}
            width={'12px'}
            onClick={() => handleFile(items.id)}
          /> */}
          <img
            src={deleteIcon}
            style={{ marginRight: '4px' }}
            width={'12px'}
            onClick={() => handleDelete(items.id, 'folder')}
          />
          {/* <img
            src={editIcon}
            style={{ marginRight: '4px' }}
            width={'12px'}
            onClick={() => handleEdit(items.id)}
          /> */}
        </div>
      </div>
      {expand && (
        <>
          <div>
            <img
              src={collapseIcon}
              style={{ marginRight: '4px' }}
              width={'8px'}
            />
            <img
              src={folderIcon}
              style={{ marginRight: '4px' }}
              width={'14px'}
            />
            <input
              type={'text'}
              onChange={handleChange}
              onBlur={() => handleFolder(items.id)}
            />
          </div>
          {items.folder.map((f) => (
            <div style={{ marginLeft: '8px' }} key={`folder_${f.id}`}>
              {
                <Add
                  items={f}
                  addFolder={() => handleFolder(f.id)}
                  onDelete={() => handleDelete(f.id, 'folder')}
                  key={`folder_${f.id}`}
                />
              }
            </div>
          ))}
        </>
      )}
      {expand &&
        items.files.map((file) => (
          <div
            style={{ display: 'flex', justifyContent: 'space-between' }}
            key={`files_${file.id}`}
          >
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
                onClick={() => handleDelete(items.id, 'file')}
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
