import { fireEvent, render, screen } from '@testing-library/react';
import TextTypingInput from './TextTypingInput';

test('renders the text as the remaining text', () => {
  const text = 'Some test text';
  render(<div data-testid="test"><TextTypingInput text={text} /></div>);
  const spans = screen.getByTestId("test").getElementsByTagName('span');
  expect(spans).toHaveLength(3);
  expect(spans[0]).toHaveClass('matchedText');
  expect(spans[0]).toBeEmptyDOMElement();
  expect(spans[1]).toHaveClass('unmatchedText');
  expect(spans[1]).toBeEmptyDOMElement();
  expect(spans[2]).toHaveClass('remainingText');
  expect(spans[2]).toHaveTextContent(text, { normalizeWhitespace: false });
});

test('does not render the text when remaining text is hidden', () => {
    const text = 'Some test text';
    render(<div data-testid="test"><TextTypingInput text={text} hideRemainingText /></div>);
    const spans = screen.getByTestId("test").getElementsByTagName('span');
    expect(spans).toHaveLength(3);
    expect(spans[0]).toHaveClass('matchedText');
    expect(spans[0]).toBeEmptyDOMElement();
    expect(spans[1]).toHaveClass('unmatchedText');
    expect(spans[1]).toBeEmptyDOMElement();
    expect(spans[2]).toHaveClass('remainingText');
    expect(spans[2]).toBeEmptyDOMElement();
  });

[
  { input: 'So', expected: { matched: /^So$/, unmatched: /^$/, remaining: /^me test text$/ } },
  { input: 'Some', expected: { matched: /^Some$/, unmatched: /^$/, remaining: /^ test text$/ } },
  { input: 'Some ', expected: { matched: /^Some $/, unmatched: /^$/, remaining: /^test text$/ } },
  { input: 'Some wrong', expected: { matched: /^Some $/, unmatched: /^wrong$/, remaining: /^test text$/ } },
].forEach(testcase => test(`renders the expected text when '${testcase.input}' is typed`, async () => {
  const { input: inputValue, expected } = testcase;
  const text = 'Some test text';
  render(<div data-testid="test"><TextTypingInput text={text} /></div>);

  fireEvent.change((await screen.findAllByRole('textbox'))[0], { target: { value: inputValue } });

  const spans = screen.getByTestId("test").getElementsByTagName('span');
  expect(spans).toHaveLength(3);
  expect(spans[0]).toHaveClass('matchedText');
  expect(spans[0]).toHaveTextContent(expected.matched, { normalizeWhitespace: false });
  expect(spans[1]).toHaveClass('unmatchedText');
  expect(spans[1]).toHaveTextContent(expected.unmatched, { normalizeWhitespace: false })
  expect(spans[2]).toHaveClass('remainingText');
  expect(spans[2]).toHaveTextContent(expected.remaining, { normalizeWhitespace: false });
}));
[
  { input: 'So', expected: { matched: /^So$/, unmatched: /^$/, remaining: /^$/ } },
  { input: 'Some', expected: { matched: /^Some$/, unmatched: /^$/, remaining: /^$/ } },
  { input: 'Some ', expected: { matched: /^Some $/, unmatched: /^$/, remaining: /^$/ } },
  { input: 'Some wrong', expected: { matched: /^Some $/, unmatched: /^wrong$/, remaining: /^$/ } },
].forEach(testcase => test(`renders the expected text when '${testcase.input}' is typed with remaining text hidden`, async () => {
  const { input: inputValue, expected } = testcase;
  const text = 'Some test text';
  render(<div data-testid="test"><TextTypingInput text={text} hideRemainingText /></div>);

  fireEvent.change((await screen.findAllByRole('textbox'))[0], { target: { value: inputValue } });

  const spans = screen.getByTestId("test").getElementsByTagName('span');
  expect(spans).toHaveLength(3);
  expect(spans[0]).toHaveClass('matchedText');
  expect(spans[0]).toHaveTextContent(expected.matched, { normalizeWhitespace: false });
  expect(spans[1]).toHaveClass('unmatchedText');
  expect(spans[1]).toHaveTextContent(expected.unmatched, { normalizeWhitespace: false })
  expect(spans[2]).toHaveClass('remainingText');
  expect(spans[2]).toHaveTextContent(expected.remaining, { normalizeWhitespace: false });
}));
