import { createSlice } from '@reduxjs/toolkit';
import { addQuizIdForTopic } from '../topics/topicsSlice';

export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes: {}
    },
    reducers: {
        addQuiz: (state, action) => {
            const { id } = action.payload;
            state.quizzes[id] = action.payload;
        }
    }
});

/*
    quiz looks like this:
    {
        name: 'name of quiz',
        topicId: '123',
        cardIds: ['4', '5', '6'],
        id: '789',
    }
*/
export const addQuizForTopicId = (quiz) => {
    const { topicId, id } = quiz;
    //this thunk is returned which dispatches the 2 actions 1 after the other
    return (dispatch) => {
        dispatch(quizzesSlice.actions.addQuiz(quiz));
        dispatch(addQuizIdForTopic({ topicId: topicId, quizId: id }));
    };
};

export const selectQuizzes = (state) => state.quizzes.quizzes;
export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;