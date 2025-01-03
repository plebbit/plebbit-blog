import { useEffect, useRef, useState } from 'react';
import { deleteAccount, exportAccount, importAccount, setActiveAccount, useAccount, useAccounts } from '@plebbit/plebbit-react-hooks';
import usePublishReply from '../../hooks/use-publish-reply';
import styles from './reply-form.module.css';
import { isValidURL } from '../../lib/url-utils';
import Markdown from '../markdown/markdown';

interface ReplyFormProps {
  cid: string;
  hideReplyForm: () => void;
  isReplyingToReply: boolean;
  postCid: string;
  subplebbitAddress: string;
}

export const FormattingHelpTable = () => {
  return (
    <div className={styles.markdownHelp}>
      <table>
        <tbody>
          <tr className={styles.tableFirstRow}>
            <td>you type:</td>
            <td>you see:</td>
          </tr>
          <tr>
            <td>*{'italics'}*</td>
            <td>
              <Markdown content={`*italics*`} />
            </td>
          </tr>
          <tr>
            <td>**{'bold'}**</td>
            <td>
              <Markdown content={`**bold**`} />
            </td>
          </tr>
          <tr>
            <td>[plebbit!](https://plebbit.com)</td>
            <td>
              <Markdown content='[plebbit!](https://plebbit.com)' />
            </td>
          </tr>
          <tr>
            <td>
              * item 1<br />* item 2<br />* item 3
            </td>
            <td>
              <Markdown content={`* item 1\n* item 2\n* item 3`} />
            </td>
          </tr>
          <tr>
            <td>
              {'> quoted text'}
            </td>
            <td>
              <Markdown content={`> quoted text`} />
            </td>
          </tr>
          <tr>
            <td>~~strikethrough~~</td>
            <td>
              <Markdown content='~~strikethrough~~' />
            </td>
          </tr>
          <tr>
            <td>super^script^</td>
            <td>
              <Markdown content='super^script^' />
            </td>
          </tr>
          <tr>
            <td>sub~script~</td>
            <td>
              <Markdown content='sub~script~' />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ReplyForm = ({ cid, hideReplyForm, isReplyingToReply, postCid, subplebbitAddress }: ReplyFormProps) => {
  const account = useAccount();
  const [showOptions, setShowOptions] = useState(false);
  const [showFormattingHelp, setShowFormattingHelp] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const spoilerRef = useRef<HTMLInputElement>(null);

  const mdContainerClass = isReplyingToReply ? `${styles.mdContainer} ${styles.mdContainerReplying}` : styles.mdContainer;
  const urlClass = showOptions ? styles.urlVisible : styles.urlHidden;
  const spoilerClass = showOptions ? styles.spoilerVisible : styles.spoilerHidden;

  const { setContent, resetContent, replyIndex, publishReply } = usePublishReply({ cid, subplebbitAddress, postCid });

  const onPublish = () => {
    const currentContent = textRef.current?.value || '';
    const currentUrl = urlRef.current?.value || '';

    if (!currentContent.trim() && !currentUrl) {
      alert(`missing content or url`);
      return;
    }

    if (currentUrl && !isValidURL(currentUrl)) {
      alert('The provided link is not a valid URL.');
      return;
    }
    publishReply();
  };
  
  const resetFields = () => {
    if (textRef.current) {
      textRef.current.value = '';
    }
    if (urlRef.current) {
      urlRef.current.value = '';
    }
    if (spoilerRef.current) {
      spoilerRef.current.checked = false;
    }
  };

  useEffect(() => {
    if (typeof replyIndex === 'number') {
      resetContent();

      if (hideReplyForm) {
        hideReplyForm();
      }

      resetFields();
    }
  }, [replyIndex, resetContent, hideReplyForm]);


  const [switchToLastAccount, setSwitchToLastAccount] = useState(false);
  const { accounts } = useAccounts();

  useEffect(() => {
    if (switchToLastAccount && accounts.length > 0) {
      const lastAccount = accounts[accounts.length - 1];
      setActiveAccount(lastAccount.name);
      setSwitchToLastAccount(false);
    }
  }, [accounts, switchToLastAccount]);
  
  const _importAccount = async () => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';

    // Handle file selection
    fileInput.onchange = async (event) => {
      try {
        const files = (event.target as HTMLInputElement).files;
        if (!files || files.length === 0) {
          throw new Error('No file selected.');
        }
        const file = files[0];

        // Read the file content
        const reader = new FileReader();
        reader.onload = async (e) => {
          const fileContent = e.target!.result; // Non-null assertion
          if (typeof fileContent !== 'string') {
            throw new Error('File content is not a string.');
          }
          const newAccount = JSON.parse(fileContent);
          await importAccount(fileContent);
          setSwitchToLastAccount(true);
          alert(`Imported ${newAccount.account?.name}`);
        };
        reader.readAsText(file);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
          console.log(error);
        } else {
          console.error('An unknown error occurred:', error);
        }
      }
    };

    // Trigger file selection dialog
    fileInput.click();
  };

  const _exportAccount = async () => {
    try {
      const accountString = await exportAccount();
      const accountObject = JSON.parse(accountString);
      const formattedAccountJson = JSON.stringify(accountObject, null, 2);

      // Create a Blob from the JSON string
      const blob = new Blob([formattedAccountJson], { type: 'application/json' });

      // Create a URL for the Blob
      const fileUrl = URL.createObjectURL(blob);

      // Create a temporary download link
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${account.name}.json`;

      // Append the link, trigger the download, then remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the Blob URL
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        console.log(error);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

  const _deleteAccount = (accountName: string) => {
    if (!accountName) {
      return;
    } else if (window.confirm(`Are you sure you want to delete ${accountName}?`)) {
      if (window.confirm(`Are you really sure? This action is irreversible.`)) {
        deleteAccount(accountName);
      }
    } else {
      return;
    }
  };

  return (
    <div className={mdContainerClass}>
      <div className={styles.accountInfo}>
        using account: <span className={styles.accountAddress}>u/{account?.author?.shortAddress} </span>
        [
        <span className={styles.accountButton} onClick={_importAccount}>change</span>
        ][
          <span className={styles.accountButton} onClick={_exportAccount}>download</span>
        ][
          <span className={styles.accountButton} onClick={() => _deleteAccount(account?.name)}>delete</span>
        ]
      </div>
      <div className={styles.md}>
        <div className={styles.options}>
          <span className={urlClass}>
            media url: <input className={`${styles.url} ${urlClass}`} ref={urlRef} onChange={(e) => setContent.link(e.target.value)} />
          </span>
          <span className={`${styles.spoiler} ${spoilerClass}`}>
            <label>
              spoiler: <input type='checkbox' className={styles.checkbox} ref={spoilerRef} onChange={(e) => setContent.spoiler(e.target.checked)} />
            </label>
          </span>
        </div>
        <textarea className={styles.textarea} ref={textRef} onChange={(e) => setContent.content(e.target.value)} />
      </div>
      <div className={styles.bottomArea}>
        <button className={styles.save} onClick={onPublish}>
          save
        </button>
        {isReplyingToReply && (
          <button className={styles.cancel} onClick={hideReplyForm}>
            cancel
          </button>
        )}
        <span className={styles.optionsButton} onClick={() => setShowFormattingHelp(!showFormattingHelp)}>
          {showFormattingHelp ? 'hide help' : 'formatting help'}
        </span>
        <span className={styles.optionsButton} onClick={() => setShowOptions(!showOptions)}>
          {showOptions ? 'hide options' : 'options'}
        </span>
      </div>
      {showFormattingHelp && <FormattingHelpTable />}
    </div>
  );
};

export default ReplyForm;
