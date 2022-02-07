import { FC, PropsWithChildren } from 'react';

import { observer } from 'mobx-react-lite';

import cn from 'classnames';
import Dialog from 'rc-dialog';

import { IModalProps } from 'types';

import { ReactComponent as CloseImg } from 'assets/img/icons/close_modal.svg';

import s from './Modal.module.scss';

const Modal: FC<PropsWithChildren<IModalProps>> = observer(
  ({ className, visible, onClose, children, title }) => {
    return (
      <Dialog
        prefixCls="modal"
        zIndex={1000}
        destroyOnClose
        className={cn(s.modal_wrapper, className)}
        closable={false}
        visible={visible}
        maskClosable
        onClose={onClose}
      >
        <div className={s.modal_header}>
          {title ? <div className={s.modal_title}>{title}</div> : null}
          <CloseImg className={s.modal_close} onClick={onClose} />
        </div>
        {children}
      </Dialog>
    );
  },
);

export default Modal;
