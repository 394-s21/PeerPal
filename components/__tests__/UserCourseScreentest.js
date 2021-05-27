import { render, fireEvent } from '@testing-library/react-native';
import  UserCourseScreen  from '../../screens/UserCourseScreen';
import React, {useState, useEffect} from 'react';

it("renders default elements", () => {
    const {getByText, getByLabelText, getByRole} = render(<UserCourseScreen />);
    getByRole("button")
    getByLabelText("GO")
    getByText("Test")
    // expect(getAllByText("Login").length).toBe(2);
    // getByPlaceholderText("example");
    // getByPlaceholderText("***");
});

// test('check dropdown list', () => {
//   const allQuestions = ['q1', 'q2'];
//   const mockFn = jest.fn();

//   const { getAllByA11yLabel, getByText } = render(
//     <QuestionsBoard questions={allQuestions} onSubmit={mockFn} />
//   );

//   const answerInputs = getAllByA11yLabel('answer input');

//   fireEvent.changeText(answerInputs[0], 'a1');
//   fireEvent.changeText(answerInputs[1], 'a2');
//   fireEvent.press(getByText('Submit'));

//   expect(mockFn).toBeCalledWith({
//     '1': { q: 'q1', a: 'a1' },
//     '2': { q: 'q2', a: 'a2' },
//   });
// });