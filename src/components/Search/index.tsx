import { FC, memo, useCallback, useRef, useState } from 'react';

import cn from 'classnames';

import s from './Search.module.scss';

interface ISearch {
  onChange: (str: string) => void;
  placeholder?: string;
  className?: string;
  realtime?: boolean;
  handleChangeVisible?: (isVisible: boolean) => void;
}

const Search: FC<ISearch> = memo(
  ({ onChange, placeholder, className, realtime = true, handleChangeVisible }) => {
    const inputNumberRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');

    const handleOnChange = useCallback(
      (str: string) => {
        setInputValue(str);
        if (realtime && onChange) {
          onChange(str);
        }
      },
      [onChange, realtime],
    );

    const handleImgClick = useCallback(() => {
      if (inputValue) {
        onChange(inputValue);
      }
      if (inputNumberRef.current) {
        inputNumberRef.current.focus();
      }
      return undefined;
    }, [inputValue, onChange]);

    const handleFocus = useCallback(() => {
      if (handleChangeVisible) {
        handleChangeVisible(true);
      }
    }, [handleChangeVisible]);

    const handleBlur = useCallback(() => {
      if (handleChangeVisible) {
        handleChangeVisible(false);
      }
    }, [handleChangeVisible]);

    return (
      <div className={cn(s.input, className)}>
        <div
          onClick={handleImgClick}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          className={s.input_img}
        />
        <input
          ref={inputNumberRef}
          onChange={(e) => handleOnChange(e.target.value)}
          type="text"
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={s.input__item}
        />
      </div>
    );
  },
);

export default Search;
