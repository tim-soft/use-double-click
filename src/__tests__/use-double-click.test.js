import React, { useRef } from 'react';
import 'babel-polyfill';
import { render, fireEvent } from '@testing-library/react';
import useDoubleClick from '../index';

const Button = props => {
  const buttonRef = useRef();
  useDoubleClick({ ref: buttonRef, ...props });
  return (
    <button ref={buttonRef} type="button">
      Click Me
    </button>
  );
};

test('calls "onSingleClick" callback on single click', async () => {
  const onSingleClick = jest.fn();
  const { getByText } = render(<Button onSingleClick={onSingleClick} />);

  fireEvent.click(getByText(/Click Me/i));

  await new Promise(r => setTimeout(r, 300));

  expect(onSingleClick).toHaveBeenCalledTimes(1);
});

test('calls "onDoubleClick" callback on double click', async () => {
  const onDoubleClick = jest.fn();
  const { getByText } = render(<Button onDoubleClick={onDoubleClick} />);

  fireEvent.click(getByText(/Click Me/i));
  fireEvent.click(getByText(/Click Me/i));

  await new Promise(r => setTimeout(r, 300));

  expect(onDoubleClick).toHaveBeenCalledTimes(1);
});

test('calls "onSingleClick" callback with custom latency', async () => {
  const onSingleClick = jest.fn();
  const latency = 150;
  const { getByText } = render(
    <Button onSingleClick={onSingleClick} latency={latency} />
  );

  fireEvent.click(getByText(/Click Me/i));

  await new Promise(r => setTimeout(r, latency));

  expect(onSingleClick).toHaveBeenCalledTimes(1);
});

test('calls "onDoubleClick" callback with custom latency', async () => {
  const onSingleClick = jest.fn();
  const latency = 150;
  const { getByText } = render(
    <Button onSingleClick={onSingleClick} latency={latency} />
  );

  fireEvent.click(getByText(/Click Me/i));

  await new Promise(r => setTimeout(r, latency));

  expect(onSingleClick).toHaveBeenCalledTimes(1);
});

test('calls "onSingleClick" callback consecutively outside of latency window', async () => {
  const onSingleClick = jest.fn();
  const onDoubleClick = jest.fn();
  const latency = 150;
  const { getByText } = render(
    <Button
      onSingleClick={onSingleClick}
      onDoubleClick={onDoubleClick}
      latency={latency}
    />
  );

  fireEvent.click(getByText(/Click Me/i));
  await new Promise(r => setTimeout(r, latency * 2));
  fireEvent.click(getByText(/Click Me/i));
  await new Promise(r => setTimeout(r, latency * 2));

  expect(onSingleClick).toHaveBeenCalledTimes(2);
  expect(onDoubleClick).toHaveBeenCalledTimes(0);
});

test('single click without onSingleClick handler', async () => {
  const { getByText } = render(<Button />);

  fireEvent.click(getByText(/Click Me/i));
  await new Promise(r => setTimeout(r, 300));

  fireEvent.click(getByText(/Click Me/i));
  await new Promise(r => setTimeout(r, 300));
});

test('double click without onDoubleClick handler', async () => {
  const { getByText } = render(<Button />);

  fireEvent.click(getByText(/Click Me/i));
  fireEvent.click(getByText(/Click Me/i));
  await new Promise(r => setTimeout(r, 300));
});
