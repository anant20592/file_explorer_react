import { FC, useState } from 'react';
import Add, { FileExplorer } from './Add';
import { v4 as uuidv4 } from 'uuid';
import './style.css';

const obj11 = {
  id: "1",
  label: 'File',
  folder: [
    // {
    //   id: 2,
    //   label: 'Folder 2',
    //   folder: [
    //     {
    //       id: 3,
    //       label: 'Folder 3',
    //       folder: [
    //         {
    //           id: 4,
    //           label: 'Folder 4',
    //           folder: [],
    //           files: [
    //             { id: 'file5', fileName: 'File 5' },
    //             { id: 'file6', fileName: 'File 6' },
    //           ],
    //         },
    //       ],
    //       files: [{ id: 'file4', fileName: 'File 4' }],
    //     },
    //   ],
    //   files: [{ id: 'file3', fileName: 'File 3' }],
    // },
  ],
  files: [
    // { id: 'file1', fileName: 'File 1' },
    // { id: 'file2', fileName: 'File 2' },
  ],
};

export const App: FC<{ name: string }> = ({ name }) => {
  const [itemList, setItemList] = useState<FileExplorer>(obj11);
  const addFolder = (id: string, obj: FileExplorer, folderName: string) => {
    if (id === obj.id) {
      obj.folder.push({
        id: uuidv4(),
        files: [],
        folder: [],
        label: folderName,
      });
      return obj;
    }
    const latestArray = obj.folder.map((folder) => {
      return addFolder(id, folder, folderName);
    });

    return { ...obj, folder: latestArray };
  };

  const handleFolder = (id: string, folderName: string) => {
    console.log('isd-: ', id);
    const updatedList = addFolder(id, itemList, folderName);
    setItemList(updatedList);
  };

  const deleteFolder = (id: string | number, obj: FileExplorer) => {
    if (id === obj.id) {
      obj.id = null;
      return obj;
    }
    const latestArray = obj.folder.map((folder) => {
      return deleteFolder(id, folder);
    });
    const notNull = latestArray.filter((arr: FileExplorer) => {
      return arr.id !== null;
    });
    console.log(notNull);
    return { ...obj, folder: notNull };
  };

  const handleDeleteAction = (id: string | number, action: string) => {
    console.log(action, id);
    if (action === 'folder') setItemList(deleteFolder(id, itemList));
  };

  return (
    <div>
      <h1>File Explorer</h1>
      {
        <Add
          items={itemList}
          addFolder={(id, folderName) => handleFolder(id, folderName)}
          onDelete={(id, action) => handleDeleteAction(id, action)}
        />
      }
    </div>
  );
};
