import React from 'react';
import ProfileStatus from './ProfileStatus';
import TestRenderer from 'react-test-renderer';
import { act } from '@testing-library/react';

test('The text should be displayed according to passed down the props', () => {
    const testRenderer = TestRenderer.create(<ProfileStatus status={'1234567890'} />);
    const instance = testRenderer.root;
    expect(instance.findByType(ProfileStatus).props.status).toBe('1234567890');
});

test('no input at the beginning', () => {
    const testRenderer = TestRenderer.create(<ProfileStatus status={'1234567890'} />);
    const instance = testRenderer.root;
    expect(() => instance.findByType('input')).toThrow();
});

test('input should be displayed after doubleClick on the span', () => {
    const testRenderer = TestRenderer.create(<ProfileStatus status={'1234567890'} isOwner={true} />);
    const instance = testRenderer.root;
    const span = instance.findByType('span');
    TestRenderer.act(() => {
        span.props.onDoubleClick();
    })
    expect(instance.findByType('input').props.value).toBe('1234567890');
});

test('callback should be called', () => {
    const mockCallback = jest.fn();
    const testRenderer = TestRenderer.create(<ProfileStatus status={'1234567890'} isOwner={true} updateStatus={mockCallback} />); 
    const instance = testRenderer.root;
    const span = instance.findByType('span');
    TestRenderer.act(() => {
        span.props.onDoubleClick();
    })
    
    const input = instance.findByType('input');
    TestRenderer.act(() => {
        input.props.onBlur()
    })
    expect(mockCallback.mock.calls.length).toBe(1);
});