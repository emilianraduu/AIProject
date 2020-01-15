import React, { useState, memo } from 'react'
import Select from 'react-select'
import { InfiniteSelectOption, SelectWrapper, InputModalWrapper } from './styles'
import { FieldError } from '../Input/styles'
import Modal from '../Modals/Modal'
import _ from 'lodash'
import { Input } from '../../../styles/shared/input'
import InfiniteScroll from '../InfiniteScroll'
import { isMobile } from 'react-device-detect'

export const InfiniteSelect = (props) => {
  if (isMobile) {
    return <MobileInfiniteSelect {...props} />
  } else {
    return <WebInfiniteSelect {...props} />
  }
}

export const WebInfiniteSelect = ({ input: { value, onChange, onFocus, onBlur }, options, meta: { error, touched },disabled, ...props }) => {
  const [inputValue, setInputValue] = useState('')
  return (
    <SelectWrapper error={touched && error}>
      <Select
        {...props}
        onInputChange={(e) => {
          e && props.onInputChange && props.onInputChange(e)
          !_.isEmpty(e) && setInputValue(e)
        }}
        className='react-select-container'
        classNamePrefix='react-select'
        options={options}
        disabled={disabled}
        selected={value}
        onChange={(e) => {
          onChange(e)
          !_.isEmpty(e) && setInputValue(e)
        }}
        onBlur={onBlur}
        inputValue={inputValue && inputValue.label}
        onFocus={onFocus}
        value={value.value ? value : options && options.filter(option => option.value === value)}
      />
      {touched && error && <FieldError>{error}</FieldError>}
    </SelectWrapper>
  )
}

export const MobileInfiniteSelect = ({ input: { value, onChange, onBlur }, title, options, inputValue, meta: { error, touched }, placeholder, pagination, handlePagination, onInputChange, ...props }) => {
  const [visible, setVisible] = useState(false)
  // const [selected, setSelected] = useState('')
  // const [indexSel, setIndex] = useState('')
  if (!pagination) {
    return <div />
  }
  return (
    <>
      <div onClick={(e) => {
        setVisible(true)
        e.preventDefault()
      }}>
        <Input error={error && touched}
          onFocus={() => { }}
          disabled
          normalizeDisabled
          value={value.label} style={{ cursor: 'pointer' }} placeholder={placeholder} />
      </div>
      {error && touched && <FieldError>{error}</FieldError>}
      <Modal style={{ position: 'relative' }} visible={visible} title={title} onClose={() => setVisible(false)}>
        {
          visible &&
          <>
            <InputModalWrapper>
              <Input
                {...props}
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => {
                  onInputChange(e.target.value)
                }}
              />
            </InputModalWrapper>
            <div style={{ marginTop: 55 }}>
              <InfiniteScroll data={options} pagination={pagination} handlePagination={handlePagination}>
                {
                  !_.isEmpty(options) ? _.map(options, (option, index) =>
                    <InfiniteSelectOption
                      key={index}
                      active={option.value === value.value}
                      onClick={() => {
                        onChange(option)
                        setVisible(false)
                      }}
                    >{option.label}
                    </InfiniteSelectOption>)
                    :
                    <div>No results</div>
                }
              </InfiniteScroll>
            </div>
          </>
        }
      </Modal>
    </>
  )
}
