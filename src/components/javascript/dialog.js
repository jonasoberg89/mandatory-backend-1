import React, { useState } from 'react';
import styles from '../css/dialog.module.css';


const Dialog = (props) => {
  const [folderName, setFolderName] = useState("");

  function handleFolderName(e) {
    setFolderName(e.target.value);
  }

  function handleNewFolder() {

  };

  return (
    <div className={styles.overlay}>
      <div className={styles.Dialog}>
        <div className={styles.Dialog__header}>
          <div className={styles['Dialog__header-left']}>
            <span className={styles['Dialog__header-text']}>Create New Room</span>
          </div>
          <div className={styles['Dialog__header-right']}>
          </div>
        </div>
        <div className={styles.Dialog__content}>
          <span className={styles['Dialog__content-text']} >Give this Room a name</span>
          <input onChange={handleFolderName} value={folderName} type="text" className={styles['Dialog__content-input']} placeholder="Folder Name..." />
        </div>
        <div className={styles.Dialog__footer}>
          <button onClick={props.exitDialog} className={styles['Dialog__footer-cancel']}>Cancel</button>
          <button onClick={handleNewFolder} className={styles['Dialog__footer-create']}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default Dialog;