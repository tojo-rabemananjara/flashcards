# 21. Redux - Flashcards

## Intro

*   Test your Redux knowledge with this challenge project.

*   This app uses `uuidv4()` function from the [`uuid`](https://www.npmjs.com/package/uuid) package to create unique identifiers for topics/quizzes/cards. Below, you can see an example of how this function is used:

    ```react
    import { v4 as uuidv4 } from 'uuid';
     
    let uniqueId = uuidv4(); 
     
    console.log(uniqueId); // Prints '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    ```

    *   Though not required, if you would like to learn more about this function, check out its [documentation](https://www.npmjs.com/package/uuid#uuidv4options-buffer-offset).

*   This app uses `react-router` to handle routing between different pages.

## High Level

*   At a high level, your application will be able to handle the following URL routes, each with their own functionality:

    On the `'/topics/new'` page:

    *   Users can create topics

    On the `'/topics'` page:

    *   Users can view all topics
    *   Users can click on an individual topic and be redirected to the page for that topic

    On the `/topics/:topicId` page:

    *   Users can view an individual topic and all quizzes for that topic
    *   Users can click on a quiz associated with a topic and be redirected to that quiz’s page

    On the `'quizzes/new'` page:

    *   Users can create quizzes that are associated with topics and contain lists of flashcards
    *   Users can add and remove card fields in the new quiz form

    On the `'/quizzes'` page:

    *   Users can view all quizzes
    *   Users can click on an individual quiz and be redirected to that quiz’s page

    On the `'/quizzes/:quizId'` page:

    *   Users can view an individual quiz and flip cards over

## Recommended State Structure

*   3 slices:
    *   topics
    *   quizzes
    *   cards
*   Each slice's state should include an object storing all the topics/quizzes/cards keyed by their `id`.
*   Each individual quiz will have a `topicId` value corresponding to an individual topic in state.
*   Similarly, each topic which will have a `quizIds` array corresponding to the associated quizzes in state.

***==All together, your <u>app state</u> will look like this:==***

```react
//reducer... in store.js i.e:
/* 
export default configureStore({
  reducer: {
    topics: topicsReducer
  },
});

*/
{
  topics: {
    topics: {
      '123': {
        id: '123',
        name: 'example topic',
        icon: 'icon url',
        quizIds: ['456']
      }
    }
  },
  quizzes: {
    quizzes: {
      '456': {
        id: '456',
        topicId: '123',
        name: 'quiz for example topic',
        cardIds: ['789', '101', '102']
      }
    }
  },
  cards: {
    cards: {
      '789': {
        id: '789',
        front: 'front text',
        back: 'back text'
      },
      '101': {
        id: '101',
        front: 'front text',
        back: 'back text'
      },
      '102': {
        id: '102',
        front: 'front text',
        back: 'back text'
      },
    }
  }
}
```

```react
//index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import store from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## app

```react
//App.js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import NewQuizForm from "../components/NewQuizForm";
import NewTopicForm from "../components/NewTopicForm";
import Topics from "../features/topics/Topics";
import Topic from "../features/topics/Topic";
import Quiz from "../features/quizzes/Quiz";
import Quizzes from "../features/quizzes/Quizzes";
import ROUTES from "./routes";

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink to={ROUTES.topicsRoute()} activeClassName="active">
              Topics
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.quizzesRoute()} activeClassName="active">
              Quizzes
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.newQuizRoute()} activeClassName="active">
              New Quiz
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/topics">
          <TopicsRoutes /> //functional thing defined below
        </Route>
        <Route path="/quizzes">
          <QuizRoutes /> //functional thing defined below
        </Route>
      </Switch>
    </Router>
  );
}

function TopicsRoutes() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/new`}>
          <NewTopicForm />
        </Route>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={`${match.path}`}>
          <Topics />
        </Route>
      </Switch>
    </>
  );
}

function QuizRoutes() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/new`}>
          <NewQuizForm />
        </Route>
        <Route path={`${match.path}/:quizId`}>
          <Quiz />
        </Route>
        <Route path={`${match.path}`}>
          <Quizzes />
        </Route>
      </Switch>
    </>
  );
}
```

```react
//store.js
import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from "../features/topics/topicsSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";
import cardsReducer from "../features/cards/cardsSlice";

export default configureStore({
  reducer: {
    topics: topicsReducer,
    quizzes: quizzesReducer,
    cards: cardsReducer
  },
});
```

*   as you code, make sure to
    1.   import reducers
    2.   add them into configuerStore

```react
//routes.js
const ROUTES = {
  newQuizRoute: () => "/quizzes/new",
  quizRoute: (id) => `/quizzes/${id}`,
  quizzesRoute: () => "/quizzes",
  newTopicRoute: () => "/topics/new",
  topicRoute: (id) => `/topics/${id}`,
  topicsRoute: () => "/topics",
};

export default ROUTES;
```

## (data)

```js
//icons.js
export const BOOK_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/book.svg";
export const BALLOON_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/balloon.svg";
export const BIRD_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/bird.svg";
export const CALENDAR_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/calendar.svg";
export const CLOVER_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/clover.svg";
export const CRAYONS_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/crayons.svg";
export const DATA_FLOW_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/data-flow.svg";
export const FENCE_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/fence.svg";
export const GRILL_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/grill.svg";
export const HAND_DRILL_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/hand-drill.svg";
export const HAT_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/hat.svg";
export const INTERNET_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/internet.svg";
export const LADYBUG_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/ladybug.svg";
export const LEAVES_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/leaves.svg";
export const MEDICINE_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/medicine.svg";
export const NEST_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/nest.svg";
export const SHUTTLECOCK_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/shuttlecock.svg";
export const SPADE_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/spade.svg";
export const STATISTICS_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/statistics.svg";
export const SUN_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/sun.svg";
export const TREE_ICON =
  "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/tree.svg";

export const ALL_ICONS = [
  {
    url: BOOK_ICON,
    name: "Book",
  },
  {
    url: BALLOON_ICON,
    name: "Balloon",
  },
  {
    url: BIRD_ICON,
    name: "Bird",
  },
  {
    url: CALENDAR_ICON,
    name: "Calendar",
  },
  {
    url: CLOVER_ICON,
    name: "Clover",
  },
  {
    url: CRAYONS_ICON,
    name: "Crayons",
  },
  {
    url: DATA_FLOW_ICON,
    name: "Data",
  },
  {
    url: FENCE_ICON,
    name: "Fence",
  },
  {
    url: GRILL_ICON,
    name: "Grill",
  },
  {
    url: HAND_DRILL_ICON,
    name: "Hand",
  },
  {
    url: HAT_ICON,
    name: "Hat",
  },
  {
    url: INTERNET_ICON,
    name: "Internet",
  },
  {
    url: LADYBUG_ICON,
    name: "Ladybug",
  },
  {
    url: LEAVES_ICON,
    name: "Leaves",
  },
  {
    url: MEDICINE_ICON,
    name: "Medicine",
  },
  {
    url: NEST_ICON,
    name: "Nest",
  },
  {
    url: SHUTTLECOCK_ICON,
    name: "Shuttlecock",
  },
  {
    url: SPADE_ICON,
    name: "Spade",
  },
  {
    url: STATISTICS_ICON,
    name: "Statistics",
  },
  {
    url: SUN_ICON,
    name: "Sun",
  },
  {
    url: TREE_ICON,
    name: "Tree",
  },
];
```

## components

```react
//NewQuizForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { useDispatch, useSelector } from "react-redux";
import { selectTopics } from "../features/topics/topicsSlice";
import { addQuizForTopicId } from "../features/quizzes/quizzesSlice";
import { addCard } from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const history = useHistory();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const cardIds = [];
    // create the new cards here and add each card's id to cardIds

    cards.forEach((card) => {
      let cardId = uuidv4();
      cardIds.push(cardId)
      dispatch(addCard({
        ...card,
        id: cardId
      }));
    });

    // create the new quiz here
    let quizId = uuidv4();
    dispatch(
      addQuizForTopicId({
        name: name,
        topicId: topicId,
        cardIds: cardIds,
        id: quizId
      })
    );

    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
```

```react
//NewTopicForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { ALL_ICONS } from "../data/icons";
import { useDispatch } from "react-redux";
import { addTopic } from "../features/topics/topicsSlice";

export default function NewTopicForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    // dispatch your add topic action here
    dispatch(addTopic({
      name: name,
      id: uuidv4(),
      icon: icon
    }));
    history.push(ROUTES.topicsRoute());
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="center">Create a new topic</h1>
        <div className="form-section">
          <input
            id="topic-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Topic Name"
          />
          <select
            onChange={(e) => setIcon(e.currentTarget.value)}
            required
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Choose an icon
            </option>
            {ALL_ICONS.map(({ name, url }) => (
              <option key={url} value={url}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className="center">Add Topic</button>
      </form>
    </section>
  );
}
```

## features

### cards

```react
//Card.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCards } from "./cardsSlice";

export default function Card({ id }) {
  const cards = useSelector(selectCards);
  const card = cards[id];
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
```

```react
//cardsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
    name: "cards",
    initialState: {
        cards: {}
    },
    reducers: {
        addCard: (state, action) => {
            const { id } = action.payload;
            state.cards[id] = action.payload;
        }
    }
});

export const { addCard } = cardsSlice.actions;
export const selectCards = (state) => state.cards.cards;
export default cardsSlice.reducer;
```

### quizzes

```react
//Quiz.js
import { Link, useParams } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectQuizzes } from "./quizzesSlice";

export default function Topic() {
  const quizzes = useSelector(selectQuizzes);
  let { quizId } = useParams();
  // for the line above, remember in App.js:
  /*
    <Route path={`${match.path}/:quizId`}>
          <Quiz />
        </Route>
  */

  /*useParams returns:
    an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.*/
  const quiz = quizzes[quizId];

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
```

```react
//Quizzes.js
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectQuizzes } from "./quizzesSlice";

export default function Quizzes() {
  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to get all the quizzes in state
  return (
    <section className="center">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <Link key={quiz.id} to={ROUTES.quizRoute(quiz.id)}>
            <li className="quiz">{quiz.name}</li>
          </Link>
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button">
        Create New Quiz
      </Link>
    </section>
  );
}
```

*   note `import { selectQuizzes } from "./quizzesSlice";` and `const quizzes = useSelector(selectQuizzes); `

```react
//quizzesSlice.js
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
```

### topics

```react
//Topic.js
import NewTopicForm from "../../components/NewTopicForm";
import { Link, useParams } from "react-router-dom";
import ROUTES from "../../app/routes";

export default function Topic() {
  const topics = {}; // replace this with a call to your selector to select all the topics in state
  const quizzes = {}; // replace this with a call to your selector to select all the quizzes in state
  let { topicId } = useParams();
  const topic = topics[topicId];
  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>Topic: {topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/quizzes/new" className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
```

```react
//Topics.js
import NewTopicForm from "../../components/NewTopicForm";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector } from 'react-redux';
import { selectTopics } from "./topicsSlice";

export default function Topics() {
  const topics = useSelector(selectTopics); // replace this with a call to your selector to select all the topics in state

  return (
    <section className="center">
      <h1>Topics</h1>
      <ul className="topics-list">
        {Object.values(topics).map((topic) => (
          <li className="topic" key={topic.id}>
          <Link to={ROUTES.topicRoute(topic.id)} className="topic-link">
           <div className="topic-container">
             <img src={topic.icon} alt="" />
             <div className="text-content">
               <h2>{topic.name}</h2>
               <p>{topic.quizIds.length} Quizzes</p>
             </div>
           </div>
         </Link>
          </li>
        ))}
      </ul>
      <Link
        to={ROUTES.newTopicRoute()}
        className="button create-new-topic-button"
      >
        Create New Topic
      </Link>
    </section>
  );
}
```

```react
//topicsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        topics: {}
    },
    reducers: {
        addTopic: (state, action) => {
            const { id, name, icon } = action.payload;
            state.topics[id] = {
                id: id,
                name: name,
                icon: icon,
                quizIds: []
            }
        },
        addQuizIdForTopic: (state, action) => {
            const { quizId, topicId } = action.payload;
            state.topics[topicId].quizIds.push(quizId);
        }
  }
});

export const { addTopic, addQuizIdForTopic } = topicsSlice.actions;
export const selectTopics = (state) => state.topics.topics;
export default topicsSlice.reducer;
```

*   Really just **reviewing how to hook presentational and functional React/Redux pieces together**



## Typical Mistakes

*   Forgetting to setup store.js after creating a new slice ( & reducer for the slice)
*   Forgetting to import `useDispatch`
*   Forgetting to use `useDispatch`
*   Forgetting to import/use `useSelector`
*   Forgetting to import something that is used from a slice when wanting to use it
*   Not implementing `addX: (state, action)` correctly
*   Not knowing how to use `useParams` for navigation

